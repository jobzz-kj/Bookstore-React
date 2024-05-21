package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
	public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {
		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}

	private Date getCardExpirationDate(String ccExpiryMonth, String ccExpiryYear) {
		int month = Integer.parseInt(ccExpiryMonth);
		int year = Integer.parseInt(ccExpiryYear);

		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1); // Month is zero-based
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		calendar.set(Calendar.MILLISECOND, 999);

		return calendar.getTime();
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}
	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}

	private void validateCustomer(CustomerForm customerForm) {
		String name = customerForm.getName();
		if (name == null || name.isEmpty()) {
			throw new ApiException.ValidationFailure("name", "Validation Failed: Name is required.");
		}
		if (name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("name", "Name must be between 4 and 45 characters.");
		}

		String address = customerForm.getAddress();
		if (address == null || address.isEmpty()) {
			throw new ApiException.ValidationFailure("address", "Validation Failed: Address is required.");
		}
		if (address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("address", "Address must be between 4 and 45 characters.");
		}

		String phone = customerForm.getPhone();
		if (phone == null || phone.isEmpty()) {
			throw new ApiException.ValidationFailure("phone", "Validation Failed: Phone number is required.");
		}
		String cleanedPhone = phone.replaceAll("[^\\d]", "");
		if (cleanedPhone.length() != 10) {
			throw new ApiException.ValidationFailure("phone", "Phone number must contain exactly 10 digits.");
		}

		String email = customerForm.getEmail();
		if (email == null || email.isEmpty()) {
			throw new ApiException.ValidationFailure("email", "Validation Failed: Email is required.");
		}
		if (!isValidEmail(email)) {
			throw new ApiException.ValidationFailure("email", "Invalid email address.");
		}

		String ccNumber = customerForm.getCcNumber();
		if (ccNumber == null || ccNumber.isEmpty()) {
			throw new ApiException.ValidationFailure("ccNumber", "Validation Failed: Credit card number is required.");
		}
		String cleanedCcNumber = ccNumber.replaceAll("\\s|-", "");
		if (cleanedCcNumber.length() < 14 || cleanedCcNumber.length() > 16) {
			throw new ApiException.ValidationFailure("ccNumber", "Credit card number must have between 14 and 16 digits.");
		}

		String ccExpiryMonth = customerForm.getCcExpiryMonth();
		String ccExpiryYear = customerForm.getCcExpiryYear();

		if (expiryDateIsInvalid(ccExpiryMonth, ccExpiryYear)) {
			throw new ApiException.ValidationFailure("date","Please enter a valid expiration date.");
		}
	}
	private boolean isValidEmail(String email) {
		String emailPattern = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,24}))$";
		return email.matches(emailPattern);
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
		try {
			int month = Integer.parseInt(ccExpiryMonth);
			int year = Integer.parseInt(ccExpiryYear);
			YearMonth expiryDate = YearMonth.of(year, month);
			YearMonth currentDate = YearMonth.now();
			return expiryDate.isBefore(currentDate);
		} catch (NumberFormatException | DateTimeException e) {
			return true;
		}
	}

	private void validateCart(ShoppingCart cart) {
		if (cart.getItems().isEmpty()) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item -> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Quantity must be between 1 and 99.");
			}

			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Invalid book in the cart.");
			}

			if (item.getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("Cart item price does not match the price in the database.");
			}

			if (item.getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Cart item category does not match the category in the database.");
			}
		});
	}

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}
}
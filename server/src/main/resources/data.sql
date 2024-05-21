DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Best Sellers'),('New Arrivals'),('Fiction'),('Non-Fiction'),('Kids');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Brief History of Time', 'Stephen Hawking', '', 6.99, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Brief History of Time Edition 2', 'Stephen Hawking', '', 7.99, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Email From the Future', 'Michael Rogers', '', 5.99, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Sapiens', 'Yuval Noah Harari', '', 6.659, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Dune Messiah', 'Frank Herbert', '', 12.59, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Dangerous Ones', 'Lauren BlackWood', '', 3.9, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Lost Bookshop', 'Evie Woods', '', 6.99, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Dopamine Nation', 'Dr. Anna Lembke', '',7, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Dare to Lead', ' Brene Brown', '',4.99, 0, FALSE, FALSE, 1001);







INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Email From the Future', 'Michael Rogers', '', 11.59, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Game of Thrones', 'George R. R. Martin', '', 25.64, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('They named him Primo', 'Jaka Tomc', '', 3.9, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Subtle Art of Not Giving a F*ck', 'Mark Manson', '', 6.00, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Dangerous Ones', 'Lauren BlackWood', '', 3.9, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('What We Kept to Ourselves', 'Nancy Jooyoun Kim', '', 3.9, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Mother''s Day', 'T. J. Emerson', '', 3.9, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Good House for Children', 'Kate Collins', '', 6, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Confessions of a Thug', 'Philip Meadows Taylor', '', 5.9, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Dangerous Ones', 'Lauren BlackWood', '', 3.9, 0, FALSE, FALSE, 1002);



INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Dune Messiah', 'Frank Herbert', '', 12.59, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Housemaid''s Secret', 'Freida McFadden', '', 7.99, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Court of Silver Flames', 'Sarah J Maas', '', 5.99, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Lost Bookshop', 'Evie Woods', '', 6.99, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Run', 'Christy Cooper-Burnett', '', 7.99, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Spice Gate:A Fantasy', 'Prashanth Srivatsa', '', 8.99, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Mother''s Day', 'T. J. Emerson', '', 3.9, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Good House for Children', 'Kate Collins', '', 6, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Confessions of a Thug', 'Philip Meadows Taylor', '', 5.9, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Dangerous Ones', 'Lauren BlackWood', '', 3.9, 0, FALSE, FALSE, 1003);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Atomic Habits', 'James Clear', '',7.99, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Rich Dad Poor Dad', 'Robert T Kiyosaki', '', 2.99, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Baby Steps Millionaires', 'Dave Ramsey', '', 12.99, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('American Marxism', 'Mark R Levin', '',15, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Anxious Generation', 'Jonathan Haidt', '',8.99, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Dare to Lead', ' Brene Brown', '',4.99, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Surrounded by Idiots', 'Thomas Erikson', '',3.99, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Dopamine Nation', 'Dr. Anna Lembke', '',7, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Think Again', 'Adam Grant', '',8.99, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Attached', 'Amir Levine', '',3.5, 0, FALSE, FALSE, 1004);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Dog Man', 'Dav Pilkey', '',7.99, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Alphablock', 'Christopher Franceschelli', '', 2.99, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Diary of a Wimpy Kid Book', 'Jeff Kinney', '', 12.99, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Wingfeather Saga Book', 'Andrew Peterson, Joe Sutphin', '',15, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Maybe', 'Kobi Yamada, Gabriella Barouch (Illustrator)', '',4.69, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Harold and the Purple Crayon', 'Crockett Johnson', '',1.99, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Lord of the Flies', 'William Golding', '',7.99, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Bad Guys', 'Aaron Blabey', '',2.99, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Lightning Thief', 'Rick Riordan', '',1.20, 0, FALSE, FALSE, 1005);


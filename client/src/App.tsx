import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import './assets/css/global.css';
import './assets/css/Home.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import {useContext} from "react";
import {CategoryItem} from "./types";
import {Category} from "./contexts/CategoryContext";
import Cart from "./components/Cart";
import CheckoutPage from './components/Checkout';
import ConfirmationPage from "./components/ConfirmationPage";

function App() {
    const categories = useContext<CategoryItem[]>(Category);

    return (
        <Router basename="JoblinBookstoreReactTransact">
            <AppHeader/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/categories/:categoryId" element={<CategoryBookList />}/>
                    <Route path="*" element={<div className="PageNotFound">Page Not Found</div>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<CheckoutPage />}/>
                    <Route path="/confirmation" element={<ConfirmationPage />}/>
                </Routes>
            <AppFooter/>
        </Router>
    );
}

export default App;


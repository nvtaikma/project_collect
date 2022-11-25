import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AllFoods from '../pages/AllFoods/AllFoods';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Contact from '../pages/Contact/Contact';
import FoodDetails from '../pages/FoodDetails/FoodDetails';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ProtectedRouter from '../component/hooks/ProtectedRouter';

const Routers = () => {
  return (
    <Routes>
      <Route path="/food-delivery" element={<Navigate to="/" />} />;
      <Route path="/" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />;
      <Route path="/foods/:id" element={<FoodDetails />} />;
      <Route path="/cart" element={<Cart />} />;
      <Route
        path="/checkout"
        element={
          <ProtectedRouter>
            <Checkout />
          </ProtectedRouter>
        }
      />
      <Route path="/login" element={<Login />} />;
      <Route path="/register" element={<Register />} />;
      <Route path="/contact" element={<Contact />} />;
    </Routes>
  );
};

export default Routers;

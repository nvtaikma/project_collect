import { useSelector } from 'react-redux';
import Path from '../../components/Path';
import CartTitle from './components/CartTitle';
import CartBody from './components/CartBody';
import CartTotal from './components/CartTotal';
import FormCustomer from './components/FormCustomer';
import Empty from './components/Empty';
function Cart() {
    const listCart = useSelector((state) => state.cart);
    const countProductInCart = listCart.cartItems.reduce((total, item) => {
        return (total += item.qty);
    }, 0);
    return (
        <>
            <Path list={[{ _name: 'Giỏ hàng', path: '/gio_hang' }]} />
            {listCart.cartItems.length > 0 ? (
                <div className="container box_shadow">
                    <CartTitle number={countProductInCart} />
                    {listCart.cartItems.map((item, index) => {
                        return (
                            <CartBody
                                key={index}
                                product={{
                                    ...item,
                                    promotions: [
                                        'Tặng gói iCloud 50GB miễn phí 3 tháng',
                                        'Giảm 50% eSIM MobiFone Triệu Phú Data 1T - 2.5GB/ ngày - miễn phí tháng đầu - giá chỉ 135.000đ',
                                        'Thu cũ đổi mới trợ giá 15%',
                                        'Bảo hành 2 năm chính hãng',
                                        'Giảm 50% eSIM MobiFone Big Data 1T - 6GB/ ngày - miễn phí tháng đầu - giá chỉ 165.000đ',
                                    ],
                                }}
                            />
                        );
                    })}
                    <CartTotal listCart={listCart} />
                    <FormCustomer />
                </div>
            ) : (
                <Empty />
            )}
        </>
    );
}

export default Cart;

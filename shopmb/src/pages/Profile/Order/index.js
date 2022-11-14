import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../api/order/orderApi';

import Title from '../Components/Title';
import OrderItem from './OrderItem';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import styles from './Order.module.css';
function Order() {
    const user = useSelector((state) => state.user);
    const [maxItem, setMaxItem] = useState(0);
    const [orders, setOrders] = useState([]);
    const [loading, setloading] = useState(false);
    const [payload, setPayload] = useState({
        limit: 3,
        page: 1,
        userId: user.id,
    });
    useEffect(() => {
        const getOrders = async () => {
            try {
                setloading(true);
                const res = await orderApi.getById(payload);
                setOrders(res[0].data);
                setMaxItem(res[0].max);
                setloading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getOrders();
    }, [payload]);
    return (
        <div className={styles.order_contain}>
            <Title text="Đơn đặt hàng" textCount={`${maxItem} đơn hàng`} />
            {loading ? (
                <Loading count={payload.limit} />
            ) : (
                orders.length > 0 &&
                orders.map((item) => {
                    return <OrderItem key={item.id} data={item} />;
                })
            )}

            {!loading && maxItem > payload.limit && (
                <Pagination maxItem={maxItem} payload={payload} setPayload={setPayload} />
            )}
        </div>
    );
}

export default Order;

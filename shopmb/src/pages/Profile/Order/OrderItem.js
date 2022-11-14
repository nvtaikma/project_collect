import { useState, useRef } from 'react';
import { formatNumber } from '../../../hooks/useFormat';
import Button from '../../../components/Button';
import styles from './Order.module.css';
function OrderItem({ data }) {
    const elRef = useRef();
    const [showAllOrder, setShowAllOrder] = useState(false);
    const handleScrollTop = () => {
        console.log([elRef.current]);
        if (elRef.current.offsetHeight > 300) {
            const timeoutId = setInterval(() => {
                document.documentElement.scrollTop -= 10;
                if (document.documentElement.scrollTop <= elRef.current.offsetTop) {
                    clearInterval(timeoutId);
                }
            }, 1);
        }
    };
    const handleClick = () => {
        setShowAllOrder((prev) => !prev);
        showAllOrder && handleScrollTop();
    };
    return (
        <div ref={elRef} className={styles.orders_list}>
            <div className={styles.order_top}>
                <div className={styles.order_top_item}>
                    <p>
                        <span>Mã đơn hàng:</span>
                        <strong>#{data.id}</strong>
                    </p>
                    <p>
                        <span>Ngày đặt hàng:</span>
                        <strong>{data.created}</strong>
                    </p>
                </div>
                <div className={styles.order_top_item}>
                    <p style={{ textAlign: 'center' }}>
                        <span>Tổng tiền</span>
                        <strong className="txt-error">{formatNumber(data.total)}₫</strong>
                    </p>
                </div>
                <div className={styles.order_top_item}>
                    <p style={{ textAlign: 'right' }}>Tình trạng</p>
                </div>
            </div>
            {data.orders_product.map((item, index) => {
                if (showAllOrder || index === 0)
                    return (
                        <div key={item.id} className={styles.order_info}>
                            <div className={styles.order_info_item}>
                                <img src={`${process.env.REACT_APP_API_URL}/assets/products/${item.pro_img}`} alt="" />
                                <span>{item.pro_name}</span>
                            </div>
                            <div className={styles.order_info_item}>
                                <p style={{ textAlign: 'center', width: '100%', lineHeight: '80px' }}>{`${
                                    item.pro_qty
                                } x ${formatNumber(item.pro_price)}₫`}</p>
                            </div>
                            <div className={styles.order_info_item}>
                                {data.status === '0' && (
                                    <p
                                        className="txt-waning"
                                        style={{ width: '100%', textAlign: 'right', lineHeight: '80px' }}
                                    >
                                        <i className="fa-solid fa-spinner"></i> Đang chờ duyệt
                                    </p>
                                )}
                                {data.status === '1' && (
                                    <p
                                        className="txt-success"
                                        style={{ width: '100%', textAlign: 'right', lineHeight: '80px' }}
                                    >
                                        <i className="fa-solid fa-check"></i> Đã giao hàng
                                    </p>
                                )}
                                {data.status === '2' && (
                                    <p
                                        className="txt-error"
                                        style={{ width: '100%', textAlign: 'right', lineHeight: '80px' }}
                                    >
                                        <i className="fa-solid fa-xmark"></i> Đã hủy
                                    </p>
                                )}
                            </div>
                        </div>
                    );
            })}
            {data.orders_product.length > 1 && (
                <div className={styles.button}>
                    <Button transparent colorBlue onClick={handleClick}>
                        {showAllOrder ? 'Thu gọn <<' : 'Xem tất cả >>'}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default OrderItem;

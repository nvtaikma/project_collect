import { formatNumber } from '../../../../hooks/useFormat';
import styles from './ViewOrder.module.css';
function InfoOrder({ data }) {
    return (
        <>
            <div className={`${styles.table} custom-scrollbars`}>
                <div className={styles.title}>
                    <h4>1.Thông tin đơn hàng</h4>
                </div>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Ảnh</th>
                            <th>Phiên bản</th>
                            <th>Màu sắc</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                        </tr>
                        {data[0].orders_product.map((item) => {
                            const pro_attr = JSON.parse(item.pro_attr);
                            return (
                                <tr key={item.id}>
                                    <td style={{ textAlign: 'center' }}>
                                        <span>{item.pro_name}</span>
                                    </td>
                                    <td>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/assets/products/${item.pro_img}`}
                                            alt=""
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{pro_attr[0].ver}</td>
                                    <td style={{ textAlign: 'center' }}>{pro_attr[0].color}</td>
                                    <td style={{ textAlign: 'center' }} className="txt-error">
                                        {formatNumber(item.pro_price)}₫
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{item.pro_qty}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan={6} style={{ backgroundColor: '#f0f3fc', textAlign: 'center' }}>
                                Tổng tiền: <strong className="txt-error">{formatNumber(data[0].total)}₫</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.table}>
                <div className={styles.title}>
                    <h4>2.Trạng thái đơn hàng</h4>
                </div>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <th>id đơn hàng</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>{data[0].id}</td>
                            <td style={{ textAlign: 'center' }}>
                                {data[0].status === '0' && (
                                    <strong className="txt-waning">
                                        <i className="fa fa-spinner"></i> Đang chờ
                                    </strong>
                                )}
                                {data[0].status === '1' && (
                                    <strong className="txt-success">
                                        <i className="fa-solid fa-check"></i> Đã giao
                                    </strong>
                                )}
                                {data[0].status === '2' && (
                                    <strong className="txt-error">
                                        <i className="fa-solid fa-xmark"></i> Đã hủy
                                    </strong>
                                )}
                            </td>
                            <td style={{ textAlign: 'center' }}>{data[0].created}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default InfoOrder;

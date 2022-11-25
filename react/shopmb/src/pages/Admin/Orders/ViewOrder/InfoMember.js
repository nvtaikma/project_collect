import styles from './ViewOrder.module.css';
function InfoMember({ data }) {
    return (
        <div className={styles.table}>
            <div className={styles.title}>
                <h4>1.Thông tin khách hàng</h4>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>id khách hàng</td>
                        <td>{data[0].user_id}</td>
                    </tr>
                    <tr>
                        <td>Tên khách hàng</td>
                        <td>{data[0].user_name}</td>
                    </tr>
                    <tr>
                        <td>Email khách hàng</td>
                        <td>{data[0].user_email}</td>
                    </tr>
                    <tr>
                        <td>Tỉnh / Thành phố</td>
                        <td>{data[0].city}</td>
                    </tr>
                    <tr>
                        <td>Quận / Huyện</td>
                        <td>{data[0].district}</td>
                    </tr>
                    <tr>
                        <td>Xã / Phường</td>
                        <td>{data[0].ward}</td>
                    </tr>
                    <tr>
                        <td>Điạ chỉ</td>
                        <td>{data[0].address}</td>
                    </tr>
                    {data[0].des && (
                        <tr>
                            <td>Nội dung</td>
                            <td>{data[0].des}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InfoMember;

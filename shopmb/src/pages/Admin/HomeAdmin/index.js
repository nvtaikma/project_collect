import { useState, useEffect } from 'react';
import userApi from '../../../api/user/userApi';

import PathAdmin from '../Components/Path';
import CardItem from '../Components/CardItem';
import TableContainer from '../Components/TableContainer';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import style from './HomeAdmin.module.css';

function HomeAdmin() {
    const timeNow = new Date().getTime();
    const getTime = Math.floor(timeNow / 1000);
    const timeDay = 86400;
    const [loading, setLoading] = useState(false);
    const [maxItem, setMaxItem] = useState(0);
    const [listUsers, setListUsers] = useState([]);
    const [payload, setPayload] = useState({
        time: getTime - timeDay,
        limit: 5,
        page: 1,
    });
    const handleOnChange = (name, value) => {
        setPayload({ ...payload, page: 1, [name]: getTime - value });
    };
    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const res = await userApi.getByTime(payload);
                setListUsers(res[0].data);
                setMaxItem(res[0].max);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, [payload]);
    return (
        <>
            <PathAdmin />
            <div className={style.row}>
                <CardItem title={'Tổng đơn hàng '} count={'21'} to={'/admin'} />
                <CardItem title={'Tổng số lượng sản phẩm đã bán '} count={'0'} to={'/admin'} />
                <CardItem title={'Tổng doanh thu '} count={'2.000.000₫'} to={'/admin'} />
            </div>
            <div className={style.wapper}>
                <div className={style.wapper_top}>
                    <div className={style.title}>
                        <h3>Thành viên đăng ký mới</h3>
                    </div>
                    <div className={style.action}>
                        <select onChange={(e) => handleOnChange('time', e.target.value)}>
                            <option value={timeDay}>1 ngày trước</option>
                            <option value={timeDay * 7}>1 tuần trước</option>
                            <option value={timeDay * 30}>1 tháng trước</option>
                        </select>
                    </div>
                </div>
                <div className={style.wapper_content}>
                    <TableContainer>
                        <table>
                            <tbody>
                                <tr>
                                    <th>#</th>
                                    <th>Tên thành viên</th>
                                    <th>Email</th>
                                    <th>Sđt</th>
                                    <th>Ngày đăng ký</th>
                                    <th>Trạng thái</th>
                                </tr>
                                {loading ? (
                                    <Loading count={payload.limit} />
                                ) : (
                                    listUsers.length > 0 &&
                                    listUsers.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                                <td>
                                                    <span>{item.name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.email}</span>
                                                </td>
                                                <td>{item.sdt}</td>
                                                <td>{item.created}</td>
                                                <td>
                                                    {item.status === '0' ? (
                                                        <b className="txt-success">Bình thường</b>
                                                    ) : (
                                                        <b className="txt-error">Đang chặn</b>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </TableContainer>
                </div>
                {!loading && maxItem > payload.limit && (
                    <Pagination maxItem={maxItem} payload={payload} setPayload={setPayload} />
                )}
            </div>
        </>
    );
}

export default HomeAdmin;

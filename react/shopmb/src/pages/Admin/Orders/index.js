import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import { formatNumber } from '../../../hooks/useFormat';
import orderApi from '../../../api/order/orderApi';

import PathAdmin from '../Components/Path';
import ViewOrder from './ViewOrder';
import Loading from './Loading';
import Title from '../Components/Title';
import ActionBox from '../Components/ActionBox';
import Button from '../../../components/Button';
import TableContainer from '../Components/TableContainer';
import ModalConfirm from '../Components/ModalConfirm';
import Pagination from '../../../components/Pagination';

import style from './Orders.module.css';
function Orders() {
    const dispatch = useDispatch();
    const [idOrder, setIdOrder] = useState('');
    const [status, setStatus] = useState('');
    const [ShowModal, setShowModal] = useState(false);
    const [ShowModalView, setShowModalView] = useState(false);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxItem, setMaxItem] = useState(0);
    const [orders, setOrders] = useState([]);
    const [payload, setPayload] = useState({
        limit: 5,
        page: 1,
        status: '',
    });
    useEffect(() => {
        const getOrders = async () => {
            try {
                setLoading(true);
                const res = await orderApi.get(payload);
                setOrders(res[0].data);
                setMaxItem(res[0].max);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getOrders();
    }, [payload]);
    const handleViewOrder = (id) => {
        const data = orders.filter((item) => {
            return item.id === id;
        });
        setOrder(data);
        setShowModalView(true);
    };
    const changeStatus = async () => {
        try {
            const params = new FormData();
            params.append('id', idOrder);
            params.append('status', status);
            const res = await orderApi.update(params);
            dispatch(addToastMessage(res[0].status, res[0].message));
            res[0].status === 'success' && setPayload({ ...payload });
        } catch (error) {
            console.log(error);
        }
    };
    const handleChangeStatus = (id, status) => {
        setIdOrder(id);
        setStatus(status);
        setShowModal(true);
    };
    return (
        <>
            <PathAdmin list={[{ _name: 'Đơn hàng', path: '/admin/don_hang' }]} />
            {ShowModalView && <ViewOrder showModal={setShowModalView} data={order} />}
            {ShowModal && (
                <ModalConfirm text={'Bạn có chắc muốn thay đổi ?'} showModal={setShowModal} confirm={changeStatus} />
            )}
            <div className={style.wapper}>
                <Title title={'Quản lý đơn hàng'} />
                <ActionBox
                    placeholder={'Tìm kiếm đơn hàng...'}
                    options={[
                        { name: 'Đang chờ', value: '0' },
                        { name: 'Đã giao', value: '1' },
                        { name: 'Đã hủy', value: '2' },
                    ]}
                    loading={loading}
                    payload={payload}
                    setPayload={setPayload}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên khách hàng</th>
                                <th>Email</th>
                                <th>Mã đơn hàng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                            {loading ? (
                                <Loading count={5} />
                            ) : (
                                orders.length > 0 &&
                                orders.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                            <td>
                                                <span>{item.user_name}</span>
                                            </td>
                                            <td>
                                                <span>{item.user_email}</span>
                                            </td>
                                            <td>{item.id}</td>
                                            <td>{formatNumber(item.total)}₫</td>
                                            <td>
                                                {item.status === '0' && (
                                                    <strong className="txt-waning">
                                                        <i className="fa fa-spinner"></i> Đang chờ
                                                    </strong>
                                                )}
                                                {item.status === '1' && (
                                                    <strong className="txt-success">
                                                        <i className="fa-solid fa-check"></i> Đã giao
                                                    </strong>
                                                )}
                                                {item.status === '2' && (
                                                    <strong className="txt-error">
                                                        <i className="fa-solid fa-xmark"></i> Đã hủy
                                                    </strong>
                                                )}
                                            </td>
                                            <td>{item.created}</td>
                                            <td>
                                                <Button
                                                    small1
                                                    transparent
                                                    onClick={() => {
                                                        handleViewOrder(item.id);
                                                    }}
                                                >
                                                    <label>
                                                        <i className="fa-solid fa-eye"></i>
                                                        <span>xem</span>
                                                    </label>
                                                </Button>
                                                <Button
                                                    small1
                                                    transparent
                                                    onClick={() => {
                                                        item.status === '0' && handleChangeStatus(item.id, 1);
                                                    }}
                                                >
                                                    <label
                                                        style={{
                                                            cursor: item.status === '0' ? 'pointer' : 'default',
                                                            color: item.status === '1' ? 'blue' : '',
                                                        }}
                                                    >
                                                        <i
                                                            className="fa-solid fa-circle-check"
                                                            style={{ color: item.status === '1' && '#4141a5' }}
                                                        ></i>
                                                        <span>Đã giao</span>
                                                    </label>
                                                </Button>
                                                <Button
                                                    small1
                                                    transparent
                                                    onClick={() => {
                                                        item.status === '0' && handleChangeStatus(item.id, 2);
                                                    }}
                                                >
                                                    <label
                                                        style={{ cursor: item.status === '0' ? 'pointer' : 'default' }}
                                                    >
                                                        <i
                                                            className="fa-solid fa-circle-xmark"
                                                            style={{ color: item.status === '2' && '#ff0000' }}
                                                        ></i>
                                                        <span>Hủy</span>
                                                    </label>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </TableContainer>
                {maxItem > payload.limit && <Pagination maxItem={maxItem} setPayload={setPayload} payload={payload} />}
            </div>
        </>
    );
}

export default Orders;

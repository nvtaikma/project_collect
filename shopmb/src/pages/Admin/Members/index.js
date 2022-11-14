import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import userApi from '../../../api/user/userApi';

import PathAdmin from '../Components/Path';
import Title from '../Components/Title';
import Button from '../../../components/Button';
import ActionBox from '../Components/ActionBox';
import TableContainer from '../Components/TableContainer';
import ModalConfirm from '../Components/ModalConfirm';
import Loading from './Loading';
import Pagination from '../../../components/Pagination';

import styles from './Members.module.css';
function Members() {
    const dispatch = useDispatch();
    const [statusUpdate, setUpdateStatus] = useState('');
    const [UpdateId, setUpdateId] = useState('');
    const [listUser, setListUser] = useState([]);
    const [maxItem, setMaxItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [payload, setPayload] = useState({
        name: '',
        page: 1,
        limit: 5,
        status: '',
    });
    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const res = await userApi.get(payload);
                setListUser(res[0].data);
                setMaxItem(res[0].max);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [payload]);
    const updateStatus = async (id, status) => {
        try {
            const params = new FormData();
            params.append('id', id);
            params.append('status', status);
            const res = await userApi.updateStatus(params);
            dispatch(addToastMessage(res[0].status, res[0].message));
            if (res[0].status === 'success') {
                setPayload({ ...payload });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleUpdateStatus = async (id, status) => {
        setUpdateId(id);
        setUpdateStatus(status);
        setShowModalConfirm(true);
    };
    return (
        <>
            <PathAdmin list={[{ _name: 'Quản lý thành viên', path: '/admin/thanh_vien' }]} />
            {showModalConfirm && (
                <ModalConfirm
                    text={'Bạn có chắc muốn thay đổi ?'}
                    confirm={() => {
                        updateStatus(UpdateId, statusUpdate);
                    }}
                    showModal={setShowModalConfirm}
                />
            )}
            <div className={styles.wapper}>
                <Title title={' Quản lý thành viên'} />
                <ActionBox
                    placeholder={'Tìm kiếm thành viên...'}
                    options={[
                        { name: 'Bình thường', value: '0' },
                        { name: 'Đang chặn', value: '1' },
                    ]}
                    payload={payload}
                    setPayload={setPayload}
                    loading={loading}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên thành viên</th>
                                <th>Email</th>
                                <th>Sđt</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                            {loading ? (
                                <Loading count={5} />
                            ) : (
                                listUser.length > 0 &&
                                listUser.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <span>{item.email}</span>
                                            </td>
                                            <td>{item.sdt}</td>
                                            <td>{item.created}</td>
                                            <td>
                                                {item.status === '0' ? (
                                                    <span className="txt-success">Bình thường</span>
                                                ) : (
                                                    <span className="txt-error">Đang chặn</span>
                                                )}
                                            </td>
                                            <td>
                                                {item.status === '0' ? (
                                                    <Button small transparent>
                                                        <label
                                                            onClick={() => {
                                                                handleUpdateStatus(item.id, '1');
                                                            }}
                                                        >
                                                            <i className="fa-solid fa-user-lock"></i>
                                                            <span>chặn</span>
                                                        </label>
                                                    </Button>
                                                ) : (
                                                    <Button small transparent>
                                                        <label
                                                            onClick={() => {
                                                                handleUpdateStatus(item.id, '0');
                                                            }}
                                                        >
                                                            <i className="fa-solid fa-user-check"></i>
                                                            <span>bỏ chặn</span>
                                                        </label>
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </TableContainer>
                {maxItem > payload.limit && <Pagination maxItem={maxItem} payload={payload} setPayload={setPayload} />}
            </div>
        </>
    );
}

export default Members;

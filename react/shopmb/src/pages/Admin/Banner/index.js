import { useEffect, useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { initValue, reducer } from '../useReducer';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import bannerApi from '../../../api/banner/bannerApi';
import PathAdmin from '../Components/Path';
import Title from '../Components/Title';
import Button from '../../../components/Button';
import Form from './Form';
import ActionBox from '../Components/ActionBox';
import TableContainer from '../Components/TableContainer';
import ModalConfirm from '../Components/ModalConfirm';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import styles from './Banner.module.css';
function Banner() {
    const _dispatch = useDispatch();
    const [state, dispatch] = useReducer(reducer, initValue);
    const [loading, setLoading] = useState(true);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [listBanner, setListBanner] = useState([]);
    const [banner, setBanner] = useState({});
    const [maxItem, setMaxItem] = useState(0);
    const [payload, setPayload] = useState({
        page: 1,
        limit: 5,
        status: '',
    });
    useEffect(() => {
        const getBanner = async () => {
            setLoading(true);
            const res = await bannerApi.get(payload);
            setListBanner(res[0].data);
            setMaxItem(res[0].max);
            setLoading(false);
            if (res[0].data.length < 1 && payload.page > 1) {
                setPayload({ ...payload, page: payload.page - 1 });
            }
        };
        getBanner();
    }, [payload]);

    const handleUpdate = (id) => {
        const data = listBanner.filter((item) => {
            return item.id === id;
        });
        setBanner(data[0]);
        dispatch('form_update');
    };
    const deleteBanner = async (id) => {
        try {
            const _payload = { id };
            const res = await bannerApi.delete(_payload);
            console.log(res);
            _dispatch(addToastMessage(res[0].status, res[0].message));
            if (res[0].status === 'success') {
                setPayload({ ...payload });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = (id) => {
        setModalConfirm(true);
        setDeleteId(id);
    };
    return (
        <>
            <PathAdmin list={[{ _name: 'Banner', path: '/admin/banner' }]} />
            {modalConfirm && (
                <ModalConfirm
                    text={'Bạn có chắc muốn xóa'}
                    showModal={setModalConfirm}
                    confirm={() => {
                        deleteBanner(deleteId);
                    }}
                />
            )}
            <div className={styles.wapper}>
                <Title title={'Quản lý banner'} />
                <div className={styles.btn}>
                    <Button
                        blueAdmin
                        icon={'fa-solid fa-plus'}
                        onClick={() => {
                            dispatch('form_add');
                        }}
                    >
                        Thêm mới
                    </Button>
                </div>
                {state.openForm && (
                    <Form
                        type={state.typeForm}
                        onClick={() => {
                            dispatch('close_form');
                        }}
                        setPayload={setPayload}
                        payLoad={payload}
                        data={banner}
                    />
                )}
                <ActionBox
                    options={[
                        { name: 'Hiển thị', value: '0' },
                        { name: 'Đang ẩn', value: '1' },
                    ]}
                    setPayload={setPayload}
                    payload={payload}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Banner</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                            {loading ? (
                                <Loading count={5} />
                            ) : (
                                listBanner.length > 0 &&
                                listBanner.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                            <td>
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/assets/banner/${item.img}`}
                                                    alt=""
                                                />
                                            </td>
                                            {item.status === '0' ? (
                                                <td className="txt-success">Hiển thị</td>
                                            ) : (
                                                <td className="txt-error">Đang ẩn</td>
                                            )}

                                            <td>{item.dateCreated}</td>
                                            <td>
                                                <Button
                                                    small1
                                                    transparent
                                                    onClick={() => {
                                                        handleUpdate(item.id);
                                                    }}
                                                >
                                                    <label>
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                        <span>sửa</span>
                                                    </label>
                                                </Button>
                                                <Button
                                                    small1
                                                    transparent
                                                    onClick={() => {
                                                        handleDelete(item.id);
                                                    }}
                                                >
                                                    {' '}
                                                    <label>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                        <span>xóa</span>
                                                    </label>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            {}
                        </tbody>
                    </table>
                </TableContainer>
                {maxItem > payload.limit && <Pagination maxItem={maxItem} setPayload={setPayload} payload={payload} />}
            </div>
        </>
    );
}

export default Banner;

import { useReducer, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initValue, reducer } from '../useReducer';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import categoryApi from '../../../api/news/category';

import PathAdmin from '../Components/Path';
import Title from '../Components/Title';
import Button from '../../../components/Button';
import Form from './Form';
import ActionBox from '../Components/ActionBox';
import TableContainer from '../Components/TableContainer';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import ModalConfirm from '../Components/ModalConfirm';

import style from './CategoryNews.module.css';

function CategoryNews() {
    const _dispatch = useDispatch();
    const [state, dispatch] = useReducer(reducer, initValue);
    const [listCategory, setListCategory] = useState([]);
    const [categoryNews, setCategoryNews] = useState({});
    const [maxItem, setMaxItem] = useState(0);
    const [deleteId, setDeleteId] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [payload, setPayload] = useState({
        limit: 5,
        page: 1,
        status: '',
    });
    useEffect(() => {
        const getCategoryNews = async () => {
            try {
                setLoading(true);
                const res = await categoryApi.get(payload);
                setListCategory(res[0].data);
                setMaxItem(res[0].max);
                setLoading(false);
                if (res[0].data.length < 1 && payload.page > 1) {
                    setPayload({ ...payload, page: payload.page - 1 });
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCategoryNews();
    }, [payload]);
    const handleUpdate = (id) => {
        const data = listCategory.filter((item) => {
            return item.id === id;
        });
        setCategoryNews(data[0]);
        dispatch('form_update');
    };
    const deleteCtNews = async (id) => {
        try {
            const res = await categoryApi.delete({ id: id });
            _dispatch(addToastMessage(res[0].status, res[0].message));
            setPayload({ ...payload });
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };
    return (
        <>
            <PathAdmin list={[{ _name: 'Danh mục tin tức', path: '/admin/danh_muc_tin_tuc' }]} />
            {showModal && (
                <ModalConfirm
                    text={'Bạn có chắc muốn xóa?'}
                    confirm={() => {
                        deleteCtNews(deleteId);
                    }}
                    showModal={setShowModal}
                />
            )}
            <div className={style.wapper}>
                <Title title={'Danh mục tin tức'} />
                <div className={style.btn}>
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
                        data={categoryNews}
                        payload={payload}
                        setPayload={setPayload}
                    />
                )}
                <ActionBox
                    placeholder={'Tìm kiếm danh mục tin tức...'}
                    options={[
                        { name: 'Hiển thị', value: '0' },
                        { name: 'Đang ẩn', value: '1' },
                    ]}
                    payload={payload}
                    setPayload={setPayload}
                    loading={isLoading}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                            {isLoading ? (
                                <Loading count={5} />
                            ) : (
                                listCategory.length > 0 &&
                                listCategory.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                            <td>
                                                <span>{item.name}</span>
                                            </td>
                                            <td>
                                                {item.status === '0' ? (
                                                    <span className="txt-success"> Hiển thị</span>
                                                ) : (
                                                    <span className="txt-error"> Đang ẩn</span>
                                                )}
                                            </td>
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
                        </tbody>
                    </table>
                </TableContainer>
                {maxItem > payload.limit && <Pagination maxItem={maxItem} payload={payload} setPayload={setPayload} />}
            </div>
        </>
    );
}

export default CategoryNews;

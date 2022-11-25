import { useReducer, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initValue, reducer } from '../useReducer';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import categoryApi from '../../../api/product/categoryApi';

import PathAdmin from '../Components/Path';
import Title from '../Components/Title';
import ActionBox from '../Components/ActionBox';
import TableContainer from '../Components/TableContainer';
import Button from '../../../components/Button';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import ModalConfirm from '../Components/ModalConfirm';
import Form from './Form';

import style from './CategoryProduct.module.css';

function QlCategoryProduct() {
    const _dispatch = useDispatch();
    const [state, dispatch] = useReducer(reducer, initValue);
    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState();
    const [maxItem, setMaxItem] = useState(0);
    const [deleteId, setDeleteId] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [payload, setPayload] = useState({
        limit: 5,
        page: 1,
    });
    useEffect(() => {
        const getCategory = async () => {
            try {
                setLoading(true);
                const response = await categoryApi.get(payload);
                setMaxItem(response[0].max);
                setListCategory(response[0].data);
                setLoading(false);
                if (response[0].data.length < 1 && payload.page > 1) {
                    setPayload({ ...payload, page: payload.page - 1 });
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCategory();
    }, [payload]);
    const handleUpdate = (id) => {
        const data = listCategory.filter((item) => item.id === id);
        setCategory(data[0]);
        dispatch('form_update');
    };
    const deleteCtProduct = async (id) => {
        try {
            const _payload = { id: id };
            const res = await categoryApi.delete(_payload);
            _dispatch(addToastMessage(res[0].status, res[0].message));
            if (res[0].status === 'success') {
                setPayload({ ...payload });
            }
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
            <PathAdmin list={[{ _name: 'Danh mục sản phẩm', path: '/admin/danh_muc' }]} />
            {showModal && (
                <ModalConfirm
                    text={'Bạn có chắc muốn xóa?'}
                    confirm={() => {
                        deleteCtProduct(deleteId);
                    }}
                    showModal={setShowModal}
                />
            )}
            <div className={style.wapper}>
                <div className={style.title}>
                    <Title title={'Danh mục sản phẩm'} />
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
                            data={category}
                            payload={payload}
                            setPayload={setPayload}
                        ></Form>
                    )}
                    <ActionBox
                        placeholder={'Tìm kiếm danh mục'}
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
                                    <th>stt</th>
                                    <th>Tên danh mục</th>
                                    <th>Hình ảnh</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày tạo</th>
                                    <th>Thao tác</th>
                                </tr>
                                {isLoading ? (
                                    <Loading count={5} />
                                ) : (
                                    listCategory &&
                                    listCategory.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                                <td>
                                                    <span>{item.name}</span>
                                                </td>
                                                <td>
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}/assets/category/${item.img}`}
                                                        alt=""
                                                    />
                                                </td>
                                                <td>
                                                    {item.status === '0' ? (
                                                        <strong className="txt-success">
                                                            <i className="fa-solid fa-eye"></i> Hiển thị
                                                        </strong>
                                                    ) : (
                                                        <strong className="txt-error">
                                                            <i className="fa-solid fa-eye-slash"></i> Đang ẩn
                                                        </strong>
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
                    {maxItem > payload.limit && (
                        <Pagination payload={payload} setPayload={setPayload} maxItem={maxItem} />
                    )}
                </div>
            </div>
        </>
    );
}

export default QlCategoryProduct;

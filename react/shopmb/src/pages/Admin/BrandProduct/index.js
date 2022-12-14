import { useReducer, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import { initValue, reducer } from '../useReducer';
import brandApi from '../../../api/product/brandApi';

import PathAdmin from '../Components/Path';
import Title from '../Components/Title';
import Button from '../../../components/Button';
import ActionBox from '../Components/ActionBox';
import Form from './Form';
import TableContainer from '../Components/TableContainer';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import ModalConfirm from '../Components/ModalConfirm';

import style from './BrandProduct.module.css';

function QlBrandProduct() {
    const _dispatch = useDispatch();
    const [state, dispatch] = useReducer(reducer, initValue);
    const [listBrand, setListBrand] = useState([]);
    const [brand, setBrand] = useState();
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
        const getBrand = async () => {
            try {
                setLoading(true);
                const response = await brandApi.get(payload);
                setMaxItem(response[0].max);
                setListBrand(response[0].data);
                setLoading(false);
                if (response[0].data.length < 1 && payload.page > 1) {
                    setPayload({ ...payload, page: payload.page - 1 });
                }
            } catch (error) {
                console.log(error);
            }
        };
        getBrand();
    }, [payload]);
    const handleUpdate = (id) => {
        const data = listBrand.filter((item) => item.id === id);
        setBrand(...data);
        dispatch('form_update');
    };
    const deleteBrProduct = async (id) => {
        try {
            const _payload = { id: id };
            const res = await brandApi.delete(_payload);
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
            <PathAdmin list={[{ _name: 'Nh??n h??ng s???n ph???m', path: '/admin/nhan_hang' }]} />
            {showModal && (
                <ModalConfirm
                    text={'B???n c?? ch???c mu???n x??a?'}
                    confirm={() => {
                        deleteBrProduct(deleteId);
                    }}
                    showModal={setShowModal}
                />
            )}
            <div className={style.wapper}>
                <div className={style.title}>
                    <Title title={'Nh??n h??ng s???n ph???m'} />
                </div>
                <div className={style.btn}>
                    <Button
                        blueAdmin
                        icon={'fa-solid fa-plus'}
                        onClick={() => {
                            dispatch('form_add');
                        }}
                    >
                        Th??m m???i
                    </Button>
                </div>
                {state.openForm && (
                    <Form
                        type={state.typeForm}
                        onClick={() => {
                            dispatch('close_form');
                        }}
                        data={brand}
                        payload={payload}
                        setPayload={setPayload}
                    ></Form>
                )}
                <ActionBox
                    placeholder={'T??m ki???m nh??n h??ng'}
                    options={[
                        { name: 'Hi???n th???', value: '0' },
                        { name: '??ang ???n', value: '1' },
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
                                <th>T??n nh??n h??ng</th>
                                <th>Logo</th>
                                <th>Danh m???c</th>
                                <th>Tr???ng th??i</th>
                                <th>Ng??y t???o</th>
                                <th>Thao t??c</th>
                            </tr>
                            {isLoading ? (
                                <Loading count={5} />
                            ) : (
                                listBrand.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                            <td>
                                                <span>{item.name}</span>
                                            </td>
                                            <td>
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/assets/category/${item.logo}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{item.categoryName}</td>
                                            <td>
                                                {item.status === '0' ? (
                                                    <strong className="txt-success">
                                                        <i className="fa-solid fa-eye"></i> Hi???n th???
                                                    </strong>
                                                ) : (
                                                    <strong className="txt-error">
                                                        <i className="fa-solid fa-eye-slash"></i> ??ang ???n
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
                                                        <span>s???a</span>
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
                                                        <span>x??a</span>
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
                {maxItem > payload.limit && <Pagination payload={payload} setPayload={setPayload} maxItem={maxItem} />}
            </div>
        </>
    );
}

export default QlBrandProduct;

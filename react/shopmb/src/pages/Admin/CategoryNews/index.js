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
            <PathAdmin list={[{ _name: 'Danh m???c tin t???c', path: '/admin/danh_muc_tin_tuc' }]} />
            {showModal && (
                <ModalConfirm
                    text={'B???n c?? ch???c mu???n x??a?'}
                    confirm={() => {
                        deleteCtNews(deleteId);
                    }}
                    showModal={setShowModal}
                />
            )}
            <div className={style.wapper}>
                <Title title={'Danh m???c tin t???c'} />
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
                        data={categoryNews}
                        payload={payload}
                        setPayload={setPayload}
                    />
                )}
                <ActionBox
                    placeholder={'T??m ki???m danh m???c tin t???c...'}
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
                                <th>#</th>
                                <th>T??n danh m???c</th>
                                <th>Tr???ng th??i</th>
                                <th>Ng??y t???o</th>
                                <th>Thao t??c</th>
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
                                                    <span className="txt-success"> Hi???n th???</span>
                                                ) : (
                                                    <span className="txt-error"> ??ang ???n</span>
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
                {maxItem > payload.limit && <Pagination maxItem={maxItem} payload={payload} setPayload={setPayload} />}
            </div>
        </>
    );
}

export default CategoryNews;

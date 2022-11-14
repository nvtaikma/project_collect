import { useState, useEffect } from 'react';
import commentApi from '../../../api/comment/commentApi';
import Title from '../Components/Title';
import PathAdmin from '../Components/Path';
import ActionBox from '../Components/ActionBox';
import TableContainer from '../Components/TableContainer';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import style from './Comments.module.css';
function Comments() {
    const [listComments, setListComments] = useState([]);
    const [maxItem, setMaxItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        limit: 5,
        page: 1,
    });
    useEffect(() => {
        const getComments = async () => {
            setLoading(true);
            const res = await commentApi.get(payload);
            setListComments(res[0].data);
            setMaxItem(res[0].max);
            setLoading(false);
        };
        getComments();
    }, [payload]);
    return (
        <>
            <PathAdmin list={[{ _name: 'Quản lý bình luận', path: '/admin/binh_luan' }]} />
            <div className={style.wapper}>
                <Title title={'Quản lý bình luận'} />
                <ActionBox payload={payload} setPayload={setPayload} />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên khách hàng</th>
                                <th>id sản phẩm</th>
                                <th>Nội dung</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                            {loading ? (
                                <Loading count={payload.limit} />
                            ) : (
                                listComments.length > 0 &&
                                listComments.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                            <td>
                                                <span>{item.user_name}</span>
                                            </td>
                                            <td>{item.pro_id}</td>
                                            <td>
                                                <span>{item.content}</span>
                                            </td>
                                            <td>{item.created}</td>
                                            <td>
                                                <label>
                                                    <i className="fa-solid fa-eye"></i>
                                                    <span>xem</span>
                                                </label>
                                                <label>
                                                    <i className="fa-solid fa-comment-dots"></i>
                                                    <span>phản hồi</span>
                                                </label>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </TableContainer>
                {!loading && maxItem > payload.limit && (
                    <Pagination maxItem={maxItem} setPayload={setPayload} payload={payload} />
                )}
            </div>
        </>
    );
}

export default Comments;

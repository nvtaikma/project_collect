import { useState, useEffect } from 'react';
import ratingApi from '../../../api/rating/ratingApi';
import PathAdmin from '../Components/Path';
import Title from '../Components/Title';
import ActionBox from '../Components/ActionBox';
import TableContainer from '../Components/TableContainer';
import style from './Rating.module.css';
function Rating() {
    const [listRatings, setListRatings] = useState([]);
    const [maxItem, setMaxItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        limit: 5,
        page: 1,
    });
    useEffect(() => {
        const getRatings = async () => {
            setLoading(true);
            const res = await ratingApi.get(payload);
            console.log(res);
            setListRatings(res[0].data);
            setMaxItem(res[0].max);
            setTimeout(() => {
                setLoading(false);
            }, 4000);
        };
        getRatings();
    }, [payload]);
    return (
        <>
            <PathAdmin list={[{ _name: 'Quản lý đánh giá', path: '/admin/danh_gia' }]} />
            <div className={style.wapper}>
                <Title title={'Quản lý đánh giá'} />
                <ActionBox payload={payload} setPayload={setPayload} />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên khách hàng</th>
                                <th>id sản phẩm</th>
                                <th>Số sao</th>
                                <th>Nội dung</th>
                                <th>Ngày tạo</th>
                            </tr>
                            {listRatings.length > 0 &&
                                listRatings.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{(payload.page - 1) * payload.limit + index + 1}</td>
                                            <td>{item.user_name}</td>
                                            <td>{item.pro_id}</td>
                                            <td>
                                                {item.star}{' '}
                                                <i className="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                                            </td>
                                            <td>
                                                <span>{item.content}</span>
                                            </td>
                                            <td>{item.created}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </TableContainer>
            </div>
        </>
    );
}

export default Rating;

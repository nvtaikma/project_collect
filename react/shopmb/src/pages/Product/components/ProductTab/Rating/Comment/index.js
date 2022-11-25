import { useState, useEffect, useContext } from 'react';
import { productProvider } from '../../../../productProvider';
import ratingApi from '../../../../../../api/rating/ratingApi';

import Loading from './Loading';
import CommentItem from './CommentItem';
import Pagination from '../../../../../../components/Pagination';
import styles from './comment.module.css';
function Comment({ loadPage }) {
    const productContext = useContext(productProvider);
    const [listComments, setListComments] = useState([]);
    const [MaxItem, setMaxItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        page: 1,
        limit: 4,
    });
    useEffect(() => {
        const getRating = async () => {
            try {
                setLoading(true);
                const _payload = { ...payload, pro_id: productContext.id };
                const res = await ratingApi.get(_payload);
                setListComments(res[0].data);
                setMaxItem(res[0].max);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getRating();
    }, [productContext.id, payload, loadPage]);
    return (
        <>
            {loading ? (
                <Loading count={payload.limit} />
            ) : (
                listComments.length > 0 &&
                listComments.map((item) => {
                    return <CommentItem key={item.id} data={item} />;
                })
            )}
            {MaxItem > payload.limit && <Pagination maxItem={MaxItem} payload={payload} setPayload={setPayload} />}
        </>
    );
}

export default Comment;

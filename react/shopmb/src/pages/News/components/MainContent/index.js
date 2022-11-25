import { useEffect, useState } from 'react';
import NewsLeft from './NewsLeft';
import NewsRight from './NewsRight';
import styles from './MainContent.module.css';
import newsApi from '../../../../api/news/news';
import Pagination from '../../../../components/Pagination';
function MainConTent({ payload, setPayload }) {
    const [listNews, setListNews] = useState([]);
    const [maxItem, setMaxItem] = useState(0);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const getListNews = async () => {
            try {
                setLoading(true);
                const res = await newsApi.get(payload);
                setListNews(res[0].data);
                setMaxItem(res[0].max);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getListNews();
    }, [payload]);
    return (
        <div className={styles.row}>
            <div className={styles.colum_left}>
                <NewsLeft listNews={listNews} loading={isLoading} />
                {maxItem > payload.limit && <Pagination maxItem={maxItem} payload={payload} setPayload={setPayload} />}
            </div>
            <div className={styles.colum_right}>
                <NewsRight />
            </div>
        </div>
    );
}

export default MainConTent;

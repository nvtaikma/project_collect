import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newsApi from '../../../../../../api/news/news';
import styles from './NewsSection.module.css';
function NewsSection() {
    const payload = {
        limit: 7,
        status: '0',
    };
    const [listNews, setListNews] = useState([]);
    useEffect(() => {
        const getListNews = async () => {
            const res = await newsApi.get(payload);
            setListNews(res[0].data);
        };
        getListNews();
    }, []);
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                <h3>Xem nhiều nhất</h3>
            </div>
            <div className={styles.content}>
                {listNews.length > 0 &&
                    listNews.map((item, index) => {
                        return (
                            <div key={index} className={styles.news_item}>
                                <div className={styles.index}>{index + 1}</div>
                                <div className={styles.text}>
                                    <Link to={`/xem_tin_tuc/${item.id}`}>{item.title}</Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default NewsSection;

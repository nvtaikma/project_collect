import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatTimestamp } from '../../hooks/useFormat';
import newsApi from '../../api/news/news';

import Loading from './Loading';
import Path from '../../components/Path';
import styles from './ViewNews.module.css';
function ViewNews() {
    const { id } = useParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState();
    const [ListNews, setListNews] = useState([]);
    useEffect(() => {
        const getNewsById = async () => {
            try {
                const payload = {
                    id,
                };
                setLoading(true);
                const res = await newsApi.getById(payload);
                setNews(res[0]);
                setCategory(res[0].id_category);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getNewsById();
    }, [id]);
    useEffect(() => {
        if (category) {
            const getNews = async () => {
                try {
                    const payload = {
                        idCategory: category,
                        noId: id,
                        limit: 3,
                    };
                    setLoading(true);
                    const res = await newsApi.get(payload);
                    setListNews(res[0].data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            getNews();
        }
    }, [category]);
    return (
        <>
            <Path list={[{ _name: 'Xem tin tức', path: `/xem_tin_tuc/${id}` }]} />;
            <div className="container">
                {loading ? (
                    <Loading />
                ) : (
                    <div className={styles.wapper}>
                        <div className={styles.title}>
                            <h2>{news.title}</h2>
                        </div>
                        <div className={styles.created}>
                            <ul>
                                <li>
                                    <span>
                                        <i className="fa-regular fa-circle-user"></i>
                                    </span>
                                    <span className="txt-error"> Admin</span>
                                </li>
                                <li>
                                    <span>
                                        <i className="fa-regular fa-eye"></i>
                                    </span>
                                    <span>312312</span>
                                </li>
                                <li>
                                    <span>{formatTimestamp(news.created)}</span>
                                </li>
                            </ul>
                        </div>
                        {ListNews.length > 0 && (
                            <div className={styles.relatedNews}>
                                <ul>
                                    {ListNews.map((item) => {
                                        return (
                                            <li key={item.id}>
                                                <Link to={`/xem_tin_tuc/${item.id}`}>{item.title}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                        <div className={styles.des} dangerouslySetInnerHTML={{ __html: news.des }}></div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ViewNews;

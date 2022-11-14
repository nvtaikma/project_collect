import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../../../../../../hooks/useFormat';
import newsApi from '../../../../../../api/news/news';
import Loading from './Loading';
import styles from './NewsHot.module.css';
function NewsHot() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const [listNewsHot, setListNewsHot] = useState([]);
    useEffect(() => {
        const payload = {
            limit: 3,
            status: '0',
        };
        if (id) {
            payload.idCategory = id;
        }
        const getNewsHot = async () => {
            setLoading(true);
            const res = await newsApi.get(payload);
            setListNewsHot(res[0].data);
            setLoading(false);
        };
        getNewsHot();
    }, [id]);
    return (
        <div className={styles.news_hot}>
            {isLoading ? (
                <Loading count={3} />
            ) : (
                listNewsHot.length > 0 &&
                listNewsHot.map((item, index) => {
                    return (
                        <div key={index} className={styles.news_hot_item}>
                            <div className={styles.img}>
                                <Link to={`/xem_tin_tuc/${item.id}`}>
                                    <img src={`${process.env.REACT_APP_API_URL}/assets/news/${item.img}`} alt="" />
                                </Link>
                                <span className={styles.category_name}>
                                    <Link to={`/tin_tuc/danh_muc/${item.category_id}`}>{item.category_name}</Link>
                                </span>
                            </div>
                            <div className={styles.box}>
                                {index === 0 ? (
                                    <h3>
                                        <Link to={`/xem_tin_tuc/${item.id}`}>{item.title}</Link>
                                    </h3>
                                ) : (
                                    <h4>
                                        <Link to={`/xem_tin_tuc/${item.id}`}>{item.title}</Link>
                                    </h4>
                                )}
                                {index === 0 && (
                                    <span className={styles.des} dangerouslySetInnerHTML={{ __html: item.des }}></span>
                                )}

                                <span className={styles.created}>
                                    {/* <i className="fa-solid fa-calendar-days"></i> */}
                                    {formatTimestamp(item.created)}
                                </span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default NewsHot;

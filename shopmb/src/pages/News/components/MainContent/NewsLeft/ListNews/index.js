import { Link } from 'react-router-dom';
import { formatTimestamp } from '../../../../../../hooks/useFormat';
import Loading from './Loading';
import styles from './ListNews.module.css';
function ListNews({ data, loading }) {
    return (
        <div className={styles.wapper}>
            {loading ? (
                <Loading count={6} />
            ) : (
                data.length > 0 &&
                data.map((item, index) => {
                    return (
                        <div key={index} className={styles.news}>
                            <div className={styles.img}>
                                <Link to={`/xem_tin_tuc/${item.id}`}>
                                    <img src={`${process.env.REACT_APP_API_URL}/assets/news/${item.img}`} alt="" />
                                </Link>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.item}>
                                    <Link to={`/tin_tuc/danh_muc/${item.category_id}`}>
                                        <span style={{ color: 'blue' }}>{item.category_name}</span>
                                    </Link>
                                </div>
                                <div className={styles.item}>
                                    <Link to={`/xem_tin_tuc/${item.id}`}>
                                        <h3>{item.title}</h3>
                                    </Link>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.des} dangerouslySetInnerHTML={{ __html: item.des }}></span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.created}>{formatTimestamp(item.created)}</span>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ListNews;

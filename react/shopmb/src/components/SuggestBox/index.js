import { Link } from 'react-router-dom';
import { formatNumber } from '../../hooks/useFormat';
import Loading from './Loading';
import styles from './SuggestBox.module.css';
function SuggestBox({ data, loading, closeSearch, payload }) {
    return (
        <div className={styles.wapper}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {data.length > 0 ? (
                        <div className={styles.box}>
                            <div className={styles.title}>
                                <p>Sản phẩm</p>
                            </div>
                            <div className={styles.result}>
                                <ul>
                                    {data.map((item) => {
                                        return (
                                            <li key={item.id}>
                                                <Link to={`/product/${item.id}`} onClick={() => closeSearch(false)}>
                                                    <div className={styles.img}>
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}/assets/products/${item.img}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className={styles.info}>
                                                        <h4>{item.name}</h4>
                                                        <span className="txt-error">{formatNumber(item.price)}₫</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className={styles.nextPage}>
                                <Link to={`/tim_kiem/${payload.name}`} onClick={() => closeSearch(false)}>
                                    {'Xem tất cả >>'}
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.err}>
                            <i className="fa-solid fa-circle-exclamation txt-error"></i>
                            <p>Không tìm thấy kết quả theo yêu cầu của bạn. </p>
                            <span className="">Vui lòng thử lại .</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default SuggestBox;

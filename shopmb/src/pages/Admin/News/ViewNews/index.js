import FadeIn from '../../../../components/FadeIn';
import styles from './ViewNews.module.css';
function ViewNews({ data, showModal }) {
    console.log(data);
    return (
        <FadeIn>
            <div className={styles.box}>
                <div className={styles.title}>
                    <h3>Thông tin tin tức</h3>
                    <div className={styles.icon} onClick={() => showModal(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.titleNews}>
                        <h4>{data.title}</h4>
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
                                <span>{data.created}</span>
                            </li>
                        </ul>
                    </div>
                    <div
                        className={`${styles.des} custom-scrollbars`}
                        dangerouslySetInnerHTML={{ __html: data.des }}
                    ></div>
                </div>
            </div>
        </FadeIn>
    );
}

export default ViewNews;

import LoadingSkeleton from '../../components/LoadingSkeleton';
import styles from './ViewNews.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.wapper}>
                    <div className={styles.title}>
                        <LoadingSkeleton width="60%" height="36px" />
                    </div>
                    <div className={styles.created}>
                        <ul>
                            <li>
                                <LoadingSkeleton width="80px" height="18px" />
                            </li>
                            <li>
                                <LoadingSkeleton width="80px" height="18px" />
                            </li>
                            <li>
                                <LoadingSkeleton width="80px" height="18px" />
                            </li>
                        </ul>
                    </div>
                    <div className={styles.relatedNews}>
                        <ul>
                            <li>
                                <LoadingSkeleton width="70%" height="18px" />
                            </li>
                            <li key={item.id}>
                                <LoadingSkeleton width="70%" height="18px" />
                            </li>
                        </ul>
                    </div>
                    <div className={styles.des}>
                        <LoadingSkeleton height="300px" />
                    </div>
                </div>
            );
        });
}

export default Loading;

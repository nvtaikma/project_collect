import LoadingSkeleton from '../../components/LoadingSkeleton';
import styles from './SuggestBox.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.box}>
                    <div className={styles.title} style={{ background: 'transparent' }}>
                        <LoadingSkeleton width="50%" height="20px" />
                    </div>
                    <div className={styles.result}>
                        <ul>
                            <li>
                                <div className={styles.img}>
                                    <LoadingSkeleton />
                                </div>
                                <div className={styles.info}>
                                    <h4>
                                        <LoadingSkeleton height="20px" />
                                    </h4>
                                    <span>
                                        <LoadingSkeleton width="50%" height="20px" />
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.img}>
                                    <LoadingSkeleton />
                                </div>
                                <div className={styles.info}>
                                    <h4>
                                        <LoadingSkeleton height="20px" />
                                    </h4>
                                    <span>
                                        <LoadingSkeleton width="50%" height="20px" />
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.img}>
                                    <LoadingSkeleton />
                                </div>
                                <div className={styles.info}>
                                    <h4>
                                        <LoadingSkeleton height="20px" />
                                    </h4>
                                    <span>
                                        <LoadingSkeleton width="50%" height="20px" />
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.img}>
                                    <LoadingSkeleton />
                                </div>
                                <div className={styles.info}>
                                    <h4>
                                        <LoadingSkeleton height="20px" />
                                    </h4>
                                    <span>
                                        <LoadingSkeleton width="50%" height="20px" />
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        });
}

export default Loading;

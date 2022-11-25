import LoadingSkeleton from '../../../../../../components/LoadingSkeleton';
import styles from './comment.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.comment}>
                    <div className={styles.avatar}>
                        <LoadingSkeleton width="50px" height="50px" circle />
                    </div>
                    <div className={styles.comment_right}>
                        <div className={`${styles.comment_right_item} ${styles.user_name}`}>
                            <LoadingSkeleton width="100px" height="18px" />
                        </div>
                        <div style={{ display: 'flex' }} className={`${styles.comment_right_item} ${styles.star}`}>
                            <LoadingSkeleton width="90px" height="18px" />
                        </div>

                        <div className={`${styles.comment_right_item} ${styles.commemt}`}>
                            <LoadingSkeleton width="60%" height="50px" />
                        </div>
                    </div>
                </div>
            );
        });
}

export default Loading;

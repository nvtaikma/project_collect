import LoadingSkeleton from '../../../../../components/LoadingSkeleton';
import styles from './CommentItem.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.comment}>
                    <div className={styles.left}>
                        <LoadingSkeleton width="50px" height="50px" circle />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.name}>
                            <LoadingSkeleton width="104px" height="18px" />
                        </div>
                        <div className={styles.created}>
                            <LoadingSkeleton width="70px" height="18px" />
                        </div>
                        <div className={styles.content}>
                            <LoadingSkeleton width="70%" height="56px" />
                        </div>
                    </div>
                </div>
            );
        });
}

export default Loading;

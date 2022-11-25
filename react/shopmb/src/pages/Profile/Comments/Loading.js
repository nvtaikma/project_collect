import LoadingSkeleton from '../../../components/LoadingSkeleton';
import styles from './CommentsProfile.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.list_comments_item}>
                    <div className={styles.img}>
                        <LoadingSkeleton width="80px" height="80px" />
                    </div>
                    <div className={styles.info} style={{ paddingTop: '0' }}>
                        <div className={styles.name}>
                            <LoadingSkeleton width="250px" height="18px" />
                        </div>
                        <div className={styles.created}>
                            <LoadingSkeleton width="100px" height="18px" />
                        </div>
                        <div className={styles.content}>
                            <LoadingSkeleton width="90px" height="18px" />
                        </div>
                    </div>
                </div>
            );
        });
}

export default Loading;

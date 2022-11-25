import LoadingSkeleton from '../../../components/LoadingSkeleton';
import styles from './RatingProfile.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.list_ratings_item}>
                    <div className={styles.img}>
                        <LoadingSkeleton width="80px" height="80px" />
                    </div>
                    <div className={styles.info} style={{ paddingTop: '0' }}>
                        <div className={styles.name}>
                            <LoadingSkeleton width="250px" height="18px" style={{ maxWidth: '90%' }} />
                            <div className={styles.rating}>
                                <LoadingSkeleton width="100px" height="18px" />
                            </div>
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

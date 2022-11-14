import LoadingSkeleton from '../../../../../components/LoadingSkeleton';
import styles from './rating.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.review_star_rating}>
                    <div className={styles.start_rating_item}>
                        <LoadingSkeleton style={{ margin: '0 auto 7px auto' }} width="100px" height="18px" />
                        <LoadingSkeleton style={{ margin: '0 auto 7px auto' }} width="50px" height="18px" />
                        <LoadingSkeleton style={{ margin: '0 auto' }} width="70px" height="18px" />
                    </div>
                    <div className={styles.star_line}>
                        <LoadingSkeleton style={{ margin: '0 auto ' }} width="100%" height="10px" />
                        <LoadingSkeleton style={{ margin: '10px auto 0 auto ' }} width="100%" height="10px" />
                        <LoadingSkeleton style={{ margin: '10px auto 0 auto' }} width="100%" height="10px" />
                        <LoadingSkeleton style={{ margin: '10px auto 0 auto' }} width="100%" height="10px" />
                        <LoadingSkeleton style={{ margin: '10px auto 0 auto' }} width="100%" height="10px" />
                    </div>
                    <div className={styles.start_rating_item}>
                        <LoadingSkeleton style={{ margin: '0 auto 10px auto' }} width="190px" height="18px" />
                        <LoadingSkeleton style={{ margin: '0 auto' }} width="140px" height="37px" />
                    </div>
                </div>
            );
        });
}

export default Loading;

import LoadingSkeleton from '../../../../../../components/LoadingSkeleton';
import styles from './NewsHot.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.news_hot_item}>
                    <div className={styles.img}>
                        <LoadingSkeleton />
                    </div>
                    <div className={styles.box}>
                        <span>
                            <LoadingSkeleton height="20px" />
                        </span>
                        <span>
                            <LoadingSkeleton height="20px" width="50%" />
                        </span>
                    </div>
                </div>
            );
        });
}

export default Loading;

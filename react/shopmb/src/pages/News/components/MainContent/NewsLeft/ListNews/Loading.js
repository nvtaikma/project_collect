import LoadingSkeleton from '../../../../../../components/LoadingSkeleton';
import styles from './ListNews.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.news}>
                    <div className={styles.img} style={{ height: '150px' }}>
                        <LoadingSkeleton />
                    </div>
                    <div className={styles.info} style={{ height: '150px' }}>
                        <div className={styles.item} style={{ height: '80px', marginTop: '10px' }}>
                            <LoadingSkeleton width="80%" />
                        </div>
                        <div className={styles.item} style={{ height: '20px' }}>
                            <LoadingSkeleton width="50%" />
                        </div>
                    </div>
                </div>
            );
        });
}

export default Loading;

import LoadingSkeleton from '../../../../../components/LoadingSkeleton';
import styles from './description.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.description}>
                    <div className={styles.title}>
                        <LoadingSkeleton width="100px" height="21px" style={{ margin: '0 auto' }} />
                    </div>
                    <div className={styles.content}>
                        <LoadingSkeleton height="36px" />
                        <LoadingSkeleton width="784px" height="522px" style={{ margin: '15px auto' }} />
                    </div>
                </div>
            );
        });
}

export default Loading;

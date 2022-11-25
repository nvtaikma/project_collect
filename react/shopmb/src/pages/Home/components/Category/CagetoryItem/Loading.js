import LoadingSkeleton from '../../../../../components/LoadingSkeleton';
import styles from './cagetoryItem.module.css';
function Loading({ count = 1, width }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.cagetory_item} style={{ width: `${width}px` }}>
                    <LoadingSkeleton height="80px" />
                </div>
            );
        });
}

export default Loading;

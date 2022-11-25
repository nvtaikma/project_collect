import LoadingSkeleton from '../../../../../components/LoadingSkeleton';
import styles from './productTop.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.title_top}>
                    <div className={styles.name_product}>
                        <h2>
                            <LoadingSkeleton width="150px" height="27px" />
                        </h2>
                    </div>
                </div>
            );
        });
}

export default Loading;

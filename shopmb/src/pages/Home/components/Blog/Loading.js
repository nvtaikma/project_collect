import LoadingSkeleton from '../../../../components/LoadingSkeleton';
import styles from './BlogItem/blogItem.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.blog_item}>
                    <div className={styles.blog_item_img}>
                        <LoadingSkeleton />
                    </div>
                    <div className={styles.blog_item_bottom}>
                        <div className={styles.item}>
                            <h4 className={styles.title}>
                                <LoadingSkeleton width="80%" height="36px" />
                            </h4>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.des}>
                                <LoadingSkeleton height="34px" />
                            </span>
                        </div>
                        <div className={styles.item}>
                            <LoadingSkeleton width="30%" height="18px" />
                        </div>
                    </div>
                </div>
            );
        });
}

export default Loading;

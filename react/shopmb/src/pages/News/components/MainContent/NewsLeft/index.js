import a from '../../../../../assets/images/news/news1.jpg';
import NewsHot from './NewsHot';
import ListNews from './ListNews';
import styles from './NewsLeft.module.css';
function NewsLeft({ listNews, loading }) {
    return (
        <div className={styles.colum_left}>
            <div className={styles.colum_left_item}>
                <NewsHot />
            </div>
            <div className={styles.colum_left_item}>
                <ListNews data={listNews} loading={loading} />
            </div>
        </div>
    );
}

export default NewsLeft;

import { useState, useEffect } from 'react';
import newsApi from '../../../../api/news/news';
import Loading from './Loading';
import TitleBox from '../../../../components/TitleBox';
import BlogItem from './BlogItem';
import Button from '../../../../components/Button';
import style from './blog.module.css';
function Blog() {
    const payload = { limit: 3, status: '0' };
    const [listNews, setListNews] = useState([]);
    const [maxItem, setMaxItem] = useState(0);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const getListNews = async () => {
            try {
                setLoading(true);
                const res = await newsApi.get(payload);
                setListNews(res[0].data);
                setMaxItem(res[0].max);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getListNews();
    }, []);
    return (
        <>
            <div className="container">
                <TitleBox titleName={'Tin tức mới nhất'} />
                <div className={style.list_blog}>
                    {isLoading ? (
                        <Loading count={3} />
                    ) : (
                        listNews.length > 0 &&
                        listNews.map((item) => {
                            return <BlogItem key={item.id} data={item} />;
                        })
                    )}
                </div>
                <div className={style.button}>
                    {maxItem > 3 && (
                        <Button to={`/tin_tuc`} borderBlue colorBlue transparent large>
                            {'Xem thêm >>'}
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Blog;

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import productApi from '../../api/product/productApi';
import newsApi from '../../api/news/news';
import Path from '../../components/Path';
import ListProduct from '../../components/ListProduct';
import ListNews from '../../pages/News/components/MainContent/NewsLeft/ListNews';
import Pagination from '../../components/Pagination';
import styles from './Search.module.css';
function Serach() {
    const { name } = useParams();
    const [listProduct, setListProduct] = useState([]);
    const [countItemProduct, setCountItemProduct] = useState(0);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [listNews, setListNews] = useState([]);
    const [countItemNews, setCountItemNews] = useState(0);
    const [loadingNews, setLoadingNews] = useState(false);
    const [checkBox, setCheckBox] = useState({
        all: true,
        product: false,
        news: false,
    });
    const [payLoadProduct, setPayLoadProduct] = useState({
        name,
        page: 1,
        limit: 8,
    });
    const [payloadNews, setPayloadNews] = useState({
        name,
        page: 1,
        limit: 6,
    });
    useEffect(() => {
        setPayLoadProduct({ ...payLoadProduct, name });
        setPayloadNews({ ...payloadNews, name });
    }, [name]);
    useEffect(() => {
        if (checkBox.all || checkBox.product) {
            const getProduct = async () => {
                setLoadingProduct(true);
                const res = await productApi.get(payLoadProduct);
                setListProduct(res[0].data);
                setCountItemProduct(res[0].max);
                setLoadingProduct(false);
            };
            getProduct();
        }
    }, [payLoadProduct]);
    useEffect(() => {
        if (checkBox.all || checkBox.news) {
            const getNews = async () => {
                setLoadingNews(true);
                const res = await newsApi.get(payloadNews);
                setListNews(res[0].data);
                setCountItemNews(res[0].max);
                setLoadingNews(false);
            };
            getNews();
        }
    }, [payloadNews]);
    return (
        <>
            <Path list={[{ _name: `Tìm kiếm : ${name}`, path: `/tim_kiem/${name}` }]} />
            <div className="container">
                <div className={styles.title}>
                    <p>Tìm thấy </p>
                    <strong>{`${
                        (checkBox.product || checkBox.all ? countItemProduct : 0) +
                        (checkBox.news || checkBox.all ? countItemNews : 0)
                    }`}</strong>
                    <p> kết quả với từ khóa </p>
                    <strong>{`"${name}"`}</strong>
                </div>
                <div className={styles.sort_head}>
                    <div className={styles.sort}>
                        <input
                            id="all"
                            type="radio"
                            readOnly
                            checked={checkBox.all}
                            onFocus={() => {
                                setCheckBox({ ...checkBox, all: true, product: false, news: false });
                            }}
                        />
                        <label htmlFor="all">Tất cả</label>
                    </div>
                    <div className={styles.sort}>
                        <input
                            id="product"
                            type="radio"
                            readOnly
                            checked={checkBox.product}
                            onFocus={() => {
                                setCheckBox({ ...checkBox, all: false, product: true, news: false });
                            }}
                        />
                        <label htmlFor="product">Sản phẩm</label>
                    </div>
                    <div className={styles.sort}>
                        <input
                            id="news"
                            type="radio"
                            readOnly
                            checked={checkBox.news}
                            onFocus={() => {
                                setCheckBox({ ...checkBox, all: false, product: false, news: true });
                            }}
                        />
                        <label htmlFor="news">Tin tức</label>
                    </div>
                </div>
                {checkBox.product || checkBox.all ? (
                    <div className={styles.wapper_pd}>
                        <ListProduct listProduct={listProduct} isLoading={loadingProduct} />
                        {countItemProduct > payLoadProduct.limit && (
                            <Pagination
                                maxItem={countItemProduct}
                                payload={payLoadProduct}
                                setPayload={setPayLoadProduct}
                            />
                        )}
                    </div>
                ) : (
                    ''
                )}
                {checkBox.news || checkBox.all ? (
                    <div className={styles.wapper_nw}>
                        <ListNews data={listNews} loading={loadingNews} />
                        {countItemProduct > payLoadProduct.limit && (
                            <Pagination maxItem={countItemNews} payload={payloadNews} setPayload={setPayloadNews} />
                        )}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}

export default Serach;

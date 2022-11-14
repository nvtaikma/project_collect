import { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '../../api/product/productApi';
import Path from '../../components/Path';
import ProductProvider from './productProvider';
import ProductInfo from './components/ProductInfo';
import ProductTab from './components/ProductTab';
import Comments from './components/Comments';
import TitleBox from '../../components/TitleBox';
import ListProduct from '../../components/ListProduct';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState('');
    const [listProduct, setListProduct] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingListProduct, setLoadingListProduct] = useState(true);
    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoadingProduct(true);
                const response = await productApi.getById({ id: id });
                setProduct(response[0]);
                setLoadingProduct(false);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, [id]);
    useEffect(() => {
        if (product) {
            const payload = {
                id: product.category_id,
                limit: 4,
            };
            const getListProduct = async () => {
                setLoadingListProduct(true);
                const response = await productApi.getByIdCategory(payload);
                setListProduct(response[0].data);
                setLoadingListProduct(false);
            };
            getListProduct();
        }
    }, [product]);
    return (
        <>
            <Path
                list={[
                    { _name: product.category, path: `/danh_muc/${product.category_id}` },
                    { _name: 'iPhone XR', path: '' },
                ]}
            />
            {product && (
                <ProductProvider data={product}>
                    <ProductInfo loading={loadingProduct} />
                    <ProductTab loading={loadingProduct} />
                    <Comments />
                </ProductProvider>
            )}
            {listProduct.length > 0 && (
                <div className="container box_shadow">
                    <TitleBox titleName="Sản phẩm liên quan" />
                    <ListProduct listProduct={listProduct} isLoading={loadingListProduct} countLoading={4} />
                </div>
            )}
        </>
    );
}

export default Product;

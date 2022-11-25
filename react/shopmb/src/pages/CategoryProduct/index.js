import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Path from '../../components/Path';
import TitleBox from '../../components/TitleBox';
import Filter from './components/Filter';
import ListProduct from '../../components/ListProduct';
import Pagination from '../../components/Pagination';
import WarrantyPolicy from '../../components/WarrantyPolicy';
import productApi from '../../api/product/productApi';

function CategoryProduct() {
    const { id } = useParams();
    const [idCategory, setIdCategory] = useState(id);
    const [nameCategory, setNameCategory] = useState('');
    const [listProduct, setListProduct] = useState([]);
    const [maxItem, setMaxItem] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [payload, setPayload] = useState({
        id,
        limit: 8,
        page: 1,
        brand: '',
        max: '',
        min: '',
        status: '',
        sort: '',
    });

    useEffect(() => {
        getProducts(payload);
    }, [payload]);

    useEffect(() => {
        if (id !== idCategory) {
            setIdCategory(id);
            setPayload({ ...payload, id, page: 1 });
        }
    }, [id]);
    const getProducts = async (payload) => {
        setLoading(true);
        const response = await productApi.getByIdCategory(payload);
        setListProduct(response[0].data);
        setMaxItem(response[0].max);
        setNameCategory(response[0].category_product);
        setLoading(false);
    };
    return (
        <>
            <div className="container">
                <Path list={[{ _name: nameCategory, path: `/danh_muc/${id}` }]} />
                <TitleBox titleName={nameCategory} />
                {/* <payloadContext.Provider value={value}> */}
                <Filter payload={payload} setPayload={setPayload} />
                {/* </payloadContext.Provider> */}
                <ListProduct listProduct={listProduct} isLoading={isLoading} countLoading={payload.limit} />
                {maxItem > payload.limit && <Pagination payload={payload} setPayload={setPayload} maxItem={maxItem} />}
                {/* chính sách bảo hành */}
                <WarrantyPolicy />
            </div>
        </>
    );
}

export default CategoryProduct;

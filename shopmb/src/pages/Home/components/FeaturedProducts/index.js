import { useState, useEffect } from 'react';
import categoryApi from '../../../../api/product/categoryApi';
import productApi from '../../../../api/product/productApi';

import ListProduct from '../../../../components/ListProduct';
import TitleBox from '../../../../components/TitleBox';
import Button from '../../../../components/Button';

import style from './FeaturedProducts.module.css';
function FeaturedProducts() {
    const [listCategory, setListCategory] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [idCategory, setIdCategory] = useState(0);
    const [maxItem, setMaxItem] = useState(0);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const getCategory = async () => {
            const response = await categoryApi.get({ limit: 3, desc: false });
            setListCategory(response[0].data);
            setIdCategory(response[0].data[0].id);
        };
        getCategory();
    }, []);
    useEffect(() => {
        if (idCategory) {
            const getProductById = async () => {
                try {
                    setLoading(true);
                    const response = await productApi.getByIdCategory({ limit: 8, id: idCategory });
                    setListProduct(response[0].data);
                    setMaxItem(response[0].max);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            getProductById();
        }
    }, [idCategory]);
    return (
        <div className="container">
            <TitleBox titleName={'Sản phẩm nổi bật'} />
            <div className={style.category_tabs}>
                <ul>
                    {listCategory.length > 0 &&
                        listCategory.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    className={item.id === idCategory ? style.select : ''}
                                    onClick={() => {
                                        setIdCategory(item.id);
                                    }}
                                >
                                    <span>{item.name}</span>
                                </li>
                            );
                        })}
                </ul>
            </div>
            {listProduct.length > 0 && <ListProduct listProduct={listProduct} isLoading={isLoading} />}
            {maxItem > 8 && (
                <div className={style.button}>
                    <Button to={`/danh_muc/${idCategory}`} colorBlue borderBlue large transparent>
                        <span>{'Xem thêm >>'}</span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default FeaturedProducts;

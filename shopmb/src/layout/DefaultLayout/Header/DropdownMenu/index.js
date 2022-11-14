import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../../../hooks/useFormat';
import categoryApi from '../../../../api/product/categoryApi';
import productApi from '../../../../api/product/productApi';
import styles from './DropDownMenu.module.css';

function DropdownMenu() {
    // const payload = {}
    const [listCategory, setListCategory] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await categoryApi.get();
                setListCategory(res[0].data);
            } catch (error) {
                console.log(error);
            }
        };
        getCategory();
        const getProduct = async () => {
            try {
                const payload = { sold: 'max', limit: 6 };
                const res = await productApi.get(payload);
                setListProduct(res[0].data);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, []);
    return (
        <>
            <div className={styles.dropdown_menu_left}>
                <ul>
                    <h3>Danh mục sản phẩm</h3>
                    {listCategory.length > 0 &&
                        listCategory.map((item) => {
                            return (
                                <li key={item.id}>
                                    <Link to={`/danh_muc/${item.id}`}>{item.name}</Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div className={styles.dropdown_menu_right}>
                <h3>Bán chạy nhất</h3>
                <div className={styles.list_product}>
                    {listProduct.length > 0 &&
                        listProduct.map((item) => {
                            return (
                                <div key={item.id} className={styles.item}>
                                    <div className={styles.imageProduct}>
                                        <Link to={`/product/${item.id}`}>
                                            <img src={`${process.env.REACT_APP_API_URL}/assets/products/${item.img}`} />
                                        </Link>
                                    </div>
                                    <div className={styles.content}>
                                        <div className={styles.nameProduct}>
                                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                                        </div>
                                        <div className={styles.priceProduct}>{formatNumber(item.price)} đ</div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default DropdownMenu;

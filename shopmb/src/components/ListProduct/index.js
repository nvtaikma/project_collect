import Product from './Product';
import Loading from './Loading';
import NotiSearch from '../NotiSearch';
import style from './listProduct.module.css';
function ListProduct({ listProduct, isLoading, countLoading = 8 }) {
    if (Array.isArray(listProduct) && listProduct.length > 0) {
        return (
            <div className={style.wapper}>
                <div className={style.box}>
                    <div className={style.list_product}>
                        {isLoading ? (
                            <Loading count={countLoading} />
                        ) : (
                            listProduct.length > 0 &&
                            listProduct.map((item) => {
                                return <Product key={item.id} data={item} />;
                            })
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return <NotiSearch />;
    }
}

export default ListProduct;

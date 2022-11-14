import { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addCart } from '../../../../../redux/actions/cart';
import { addToastMessage } from '../../../../../redux/actions/toastMessage';
import { productProvider } from '../../../productProvider';
import { formatNumber } from '../../../../../hooks/useFormat';
import ProductOption from './ProductOption';
import BoxPromo from './BoxPromo';
import Button from '../../../../../components/Button';
import Loading from './Loading';
import style from './productRight.module.css';

function ProductRight({ loading }) {
    const dispatch = useDispatch();
    const productContext = useContext(productProvider);
    const versions = JSON.parse(productContext.versions);
    const colors = JSON.parse(productContext.colors);
    const [qty, setQty] = useState(1);
    const [cartProduct, setCartProduct] = useState({});
    useEffect(() => {
        if (productContext) {
            const newCartProduct = {
                idProduct: productContext.id,
                name: productContext.name,
                img: productContext.img,
                ver: versions[0],
                color: colors[0],
                qty,
                price: productContext.price,
                sale: productContext.sale,
            };
            setCartProduct({ ...newCartProduct });
        }
    }, [productContext.id]);
    const clickMinus = () => {
        if (qty > 1) {
            setQty((prev) => prev - 1);
            setCartProduct({ ...cartProduct, qty: cartProduct.qty - 1 });
        }
    };
    const clickPlus = () => {
        if (qty < +productContext.qty) {
            setQty((prev) => prev + 1);
            setCartProduct({ ...cartProduct, qty: cartProduct.qty + 1 });
        }
    };
    const clickAddCart = () => {
        if (+productContext.qty <= 0) {
            dispatch(addToastMessage('error', 'Sản phẩm này đã bán hết!'));
        } else {
            dispatch(addCart(cartProduct));
            dispatch(addToastMessage('success', 'Thêm giỏ hàng thành công!'));
        }
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={style.product_right}>
                    <div className={style.product_price}>
                        <strong>
                            {productContext.sale > 0
                                ? formatNumber(
                                      productContext.price - productContext.price * (productContext.sale / 100),
                                  )
                                : formatNumber(productContext.price)}
                            ₫
                        </strong>
                        {productContext.sale > 0 && <s>{formatNumber(productContext.price)} ₫</s>}
                    </div>
                    <div className={style.status_product}>
                        <ul>
                            <li>
                                <label htmlFor="">Thương hiệu:</label>
                                <span className="txt-success">{productContext.brand}</span>
                            </li>
                            <li>
                                <label htmlFor="">Tình trạng:</label>
                                {+productContext.qty > 0 ? (
                                    <span className="txt-success">Còn hàng {productContext.qty}</span>
                                ) : (
                                    <span className="txt-error">Hết hàng</span>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className={style.product_quantily}>
                        <span>Số lượng:</span>
                        <div className={style.quantily}>
                            <div className={style.minus}>
                                <Button onClick={clickMinus}>
                                    <i className="fa fa-minus"></i>
                                </Button>
                            </div>
                            <input type="text" value={qty} readOnly />
                            <div className={style.plus}>
                                <Button onClick={clickPlus}>
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <ProductOption
                        label="Lựa chọn Phiên bản"
                        list={versions}
                        name={'ver'}
                        state={cartProduct}
                        setState={setCartProduct}
                    />
                    <ProductOption
                        label="Lựa chọn màu"
                        list={colors}
                        name={'color'}
                        state={cartProduct}
                        setState={setCartProduct}
                    />
                    <BoxPromo />
                    <div className={style.btn}>
                        <Button
                            to={+productContext.qty > 0 ? '/gio_hang' : ''}
                            blue
                            large
                            // cursorDefault={+productContext.qty <= 0}
                            onClick={clickAddCart}
                        >
                            <span>THÊM VÀO GIỎ HÀNG</span>
                            <p>Đặt hàng ngay để nhận những ưu đãi hấp dẫn</p>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductRight;

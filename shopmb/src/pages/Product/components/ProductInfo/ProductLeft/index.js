import { useRef, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../../../redux/actions/user';
import { productProvider } from '../../../productProvider';
import userApi from '../../../../../api/user/userApi';

import Button from '../../../../../components/Button';
import Loading from './Loading';
import style from './productLeft.module.css';
function ProductLeft({ loading }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const productContext = useContext(productProvider);
    const widthImgRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    const [indexSlider, setIndexSlider] = useState(0);
    const [likeProduct, setLikeProduct] = useState(false);

    useEffect(() => {
        // check like Product
        if (user.likeProducts) {
            const arrLikeProducts = JSON.parse(user.likeProducts);
            const newArr = arrLikeProducts.filter((item) => {
                return item === productContext.id;
            });
            setLikeProduct(newArr.length > 0);
        }
    }, [productContext.id]);

    useEffect(() => {
        const timeId = setInterval(() => {
            next();
        }, 4000);
        return () => {
            clearInterval(timeId);
        };
    }, [productContext.id, indexSlider]);

    useEffect(() => {
        if (widthImgRef.current) {
            setClientWidth(widthImgRef.current.clientWidth);
        }
    }, [window.innerWidth]);

    const imgs = JSON.parse(productContext.imgs);
    const pictures = [productContext.img];
    for (let i = 0; i < imgs.length; i++) {
        pictures.push(imgs[i][i + 1]);
    }

    const next = () => {
        if (indexSlider > imgs.length - 1) {
            setIndexSlider(0);
        } else {
            setIndexSlider(indexSlider + 1);
        }
    };
    const likePro = async () => {
        try {
            setLikeProduct((prev) => !prev);
            const params = new FormData();
            params.append('user_id', user.id);
            params.append('pro_id', productContext.id);
            const res = await userApi.updateLikePro(params);
        } catch (error) {
            console.log(error);
        }
    };
    const handleLikePro = () => {
        const arrLikeProducts = JSON.parse(user.likeProducts);
        if (user.id && likeProduct) {
            const newArr = arrLikeProducts.filter((item) => item !== productContext.id);
            const toString = JSON.stringify(newArr);
            dispatch(updateUser({ likeProducts: toString }));
            likePro();
        }
        if (user.id && !likeProduct) {
            arrLikeProducts.push(productContext.id);
            const toString = JSON.stringify(arrLikeProducts);
            dispatch(updateUser({ likeProducts: toString }));
            likePro();
        }
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={style.product_left}>
                    <div className={style.wapper}>
                        <div ref={widthImgRef} className={style.widthImg} style={{ width: '100%', height: '100%' }}>
                            <div
                                className={style.imgs}
                                style={{ transform: `translateX(-${indexSlider * clientWidth}px)` }}
                            >
                                {pictures.map((item, index) => {
                                    return (
                                        <div key={index} className={style.img} style={{ width: clientWidth }}>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/assets/products/${item}`}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <Button circle1 colorRed={likeProduct} transparent onClick={handleLikePro}>
                            <i className="fa-solid fa-heart"></i>
                        </Button>
                    </div>
                    <div className={style.additional_carousel}>
                        <div className={style.slider_wrapper_outer}>
                            <div className={style.slider_wrapper}>
                                {pictures.map((picture, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`${style.silder_item} ${index === indexSlider && style.active} `}
                                            onClick={() => {
                                                setIndexSlider(index);
                                            }}
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/assets/products/${picture}`}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductLeft;

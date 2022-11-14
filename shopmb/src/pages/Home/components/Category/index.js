import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import categoryApi from '../../../../api/product/categoryApi';

import CagetoryItem from './CagetoryItem';
import TitleBox from '../../../../components/TitleBox';
import Button from '../../../../components/Button';
import Loading from './CagetoryItem/Loading';

import styles from './category.module.css';
function Category() {
    const containerCagetory = useRef();
    const listCagetory = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    const [indexSlider, setIndexSlider] = useState(0);
    const [number, setNumber] = useState(0);
    const [showBtn, setShowBtn] = useState(false);
    const [categorys, setCategorys] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const getCategoryProduct = async () => {
            setLoading(true);
            const response = await categoryApi.getALL();
            setCategorys(response[0].data);
            setLoading(false);
        };
        getCategoryProduct();
    }, []);
    useEffect(() => {
        window.innerWidth > 1024 && setNumber(6);
        window.innerWidth >= 700 && window.innerWidth <= 1024 && setNumber(4);
        window.innerWidth < 700 && setNumber(3);
    }, []);
    useEffect(() => {
        if (containerCagetory.current) {
            setClientWidth(containerCagetory.current.clientWidth / number);
        }
    }, [number, window.innerWidth]);
    useEffect(() => {
        if (listCagetory.current.clientWidth > containerCagetory.current.clientWidth) {
            setShowBtn(true);
        }
    }, [categorys, window.innerWidth]);
    const prev = () => {
        if (indexSlider <= 0) {
            setIndexSlider(categorys.length - number);
        } else {
            setIndexSlider(indexSlider - 1);
        }
    };
    const next = () => {
        if (indexSlider >= categorys.length - number) {
            setIndexSlider(0);
        } else {
            setIndexSlider(indexSlider + 1);
        }
    };
    return (
        <div className="container">
            <TitleBox titleName={'Danh mục sản phẩm'} />
            <div className={styles.box}>
                {showBtn && !isLoading && (
                    <div className={styles.prev}>
                        <Button circle1 onClick={prev}>
                            <i className="fa-solid fa-angle-left"></i>
                        </Button>
                    </div>
                )}
                {showBtn && !isLoading && (
                    <div className={styles.next}>
                        <Button circle1 onClick={next}>
                            <i className="fa-solid fa-angle-right"></i>
                        </Button>
                    </div>
                )}
                <div ref={containerCagetory} className={styles.container_list_cagetory}>
                    <div
                        ref={listCagetory}
                        className={styles.list_cagetory}
                        style={{ transform: `translateX(-${indexSlider * clientWidth}px)` }}
                    >
                        {isLoading ? (
                            <Loading count={number} width={clientWidth} />
                        ) : (
                            categorys.length > 0 &&
                            categorys.map((item) => {
                                return (
                                    <Link key={item.id} to={`/danh_muc/${item.id}`} style={{ width: clientWidth }}>
                                        <CagetoryItem img={item.img} name={item.name} />
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;

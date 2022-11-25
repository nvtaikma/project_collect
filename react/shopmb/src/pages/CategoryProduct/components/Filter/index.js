import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import brandApi from '../../../../api/product/brandApi';

import Fiters from './Filters';
import FadeIn from '../../../../components/FadeIn';
import style from './filter.module.css';

function Filter({ payload, setPayload }) {
    const { id } = useParams();
    const _payload = {
        idCategory: id,
    };
    const [listBrand, setListBrand] = useState([]);
    const [showFiters, setShowFiters] = useState(false);
    useEffect(() => {
        const getBrands = async () => {
            const response = await brandApi.getById(_payload);
            setListBrand(response);
        };
        getBrands();
    }, []);
    const openFiters = () => {
        setShowFiters(true);
    };
    const handleChangeSort = (e) => {
        const name = 'sort';
        const value = e.target.children[e.target.selectedIndex].value;
        setPayload({ ...payload, page: 1, [name]: value });
    };
    return (
        <div className={style.filter}>
            <Fiters
                show={showFiters}
                closeFiters={() => {
                    setShowFiters(false);
                }}
                listBrand={listBrand}
                payload={payload}
                setPayload={setPayload}
                priceList={[
                    { name: 'Tất cả', max: '', min: '' },
                    { name: 'Dưới 5 triệu', min: '', max: '5' },
                    { name: 'Từ 5 - 10 triệu', min: '5', max: '10' },
                    { name: 'Từ 10 - 15 triệu', min: '10', max: '15' },
                    { name: 'Từ 15 - 20 triệu', min: '15', max: '20' },
                    { name: 'Trên 25 triệu', min: '25', max: '' },
                ]}
                statusList={[
                    { name: 'Tất cả', value: '' },
                    { name: 'Đang giảm giá', value: '1' },
                ]}
            />
            {showFiters && <FadeIn onClick={() => setShowFiters(false)} />}
            <div className="container">
                <div className={style.filters}>
                    <button onClick={openFiters}>
                        <i className="fa-solid fa-filter"></i>Bộ lọc
                    </button>
                </div>
                <div className={style.sort}>
                    {/* <span>
                        <i className="fa-solid fa-sort"></i>Sắp xếp
                    </span> */}
                    <select name="" id="" onChange={handleChangeSort}>
                        <option value="">---chọn sắp xếp---</option>
                        <option value="hot">Bán chạy nhất</option>
                        <option value="min">Giá thấp</option>
                        <option value="max">Giá cao</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Filter;

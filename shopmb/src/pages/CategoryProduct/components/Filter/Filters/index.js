import { useContext } from 'react';
import { payloadContext } from '../../../index';
import Button from '../../../../../components/Button';
import style from './filters.module.css';
function Fiters({ show, closeFiters, listBrand, payload, setPayload, priceList = [], statusList = [] }) {
    let _payload = { ...payload };
    const handleChange = (name, value) => {
        _payload = { ...payload, page: 1, [name]: value };
    };
    const handleChangePrice = (e) => {
        const option = e.target.children[e.target.selectedIndex];
        const max = option.getAttribute('max');
        const min = option.getAttribute('min');
        _payload = { ...payload, page: 1, min: min, max: max };
    };
    const handleClick = () => {
        setPayload(_payload);
        closeFiters();
    };
    return (
        <div className={`${style.filters} ${show && style.show}`}>
            <div className={style.filters_title}>
                <h4>
                    <i className="fa-solid fa-filter"></i>Bộ lọc
                </h4>
                <div className={style.close}>
                    <Button small transparent onClick={closeFiters}>
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                </div>
            </div>
            <div className={style.filters_item}>
                <label htmlFor="">Nhãn hàng:</label>
                <select
                    name=""
                    id=""
                    onChange={(e) => {
                        handleChange('brand', e.target.children[e.target.selectedIndex].value);
                    }}
                >
                    <option value="">Tất cả</option>
                    {listBrand.length > 0 &&
                        listBrand.map((item) => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className={style.filters_item}>
                <label htmlFor="">Chọn giá:</label>
                <select name="" id="" onChange={handleChangePrice}>
                    {priceList.length > 0 &&
                        priceList.map((item, index) => {
                            return (
                                <option key={index} max={item.max ? item.max : ''} min={item.min ? item.min : ''}>
                                    {item.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className={style.filters_item}>
                <label htmlFor="">Trạng thái:</label>
                <select
                    name=""
                    id=""
                    onChange={(e) => {
                        handleChange('status', e.target.children[e.target.selectedIndex].value);
                    }}
                >
                    {statusList.length > 0 &&
                        statusList.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className={style.btn_submit}>
                <Button gray1 large onClick={handleClick}>
                    Lọc ngay
                </Button>
            </div>
        </div>
    );
}

export default Fiters;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import { deleteAll } from '../../../../redux/actions/cart';
import useForm from '../../../../hooks/useForm';

import Loading from '../../../../components/Loading';
import Button from '../../../../components/Button';
import style from './formCustomer.module.css';
import orderApi from '../../../../api/order/orderApi';
function FormCustomer() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const validates = [
        { name: 'fullName', rules: { isRequired: true, minLength: 6 } },
        { name: 'phoneNumber', rules: { isRequired: true, isPhoneNumber: true } },
        { name: 'email', rules: { isRequired: true, isEmail: true } },
        { name: 'cityCode', rules: { isRequired: true } },
        { name: 'districtCode', rules: { isRequired: true } },
        { name: 'wardCode', rules: { isRequired: true } },
        { name: 'detailedAddress', rules: { isRequired: true } },
    ];
    const initValues = {
        fullName: user.name,
        phoneNumber: user.sdt,
        email: user.email,
        cityCode: '',
        cityName: '',
        districtCode: '',
        districtName: '',
        wardCode: '',
        wardName: '',
        detailedAddress: '',
        content: '',
    };
    const [formValues, setFormValues] = useState(initValues);
    const [citys, setCitys] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const getData = await fetch('https://provinces.open-api.vn/api/p/');
            const data = await getData.json();
            setCitys(data);
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (formValues.cityCode) {
            const addDistrict = async () => {
                const getData = await fetch(`https://provinces.open-api.vn/api/p/${formValues.cityCode}?depth=2`);
                const data = await getData.json();
                setDistricts(data.districts);
            };
            addDistrict();
        }
    }, [formValues.cityCode]);
    useEffect(() => {
        if (formValues.districtCode) {
            const addWards = async (id) => {
                const getData = await fetch(`https://provinces.open-api.vn/api/d/${formValues.districtCode}?depth=2`);
                const data = await getData.json();
                setWards(data.wards);
            };
            addWards();
        }
    }, [formValues.districtCode]);

    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('user_id', user.id);
            params.append('user_name', formValues.fullName);
            params.append('user_email', formValues.email);
            params.append('total', cart.totalPrice);
            params.append('city', formValues.cityName);
            params.append('district', formValues.districtName);
            params.append('ward', formValues.wardName);
            params.append('address', formValues.detailedAddress);
            params.append('des', formValues.content);
            params.append('products', JSON.stringify(cart.cartItems));

            setLoading(true);
            const res = await orderApi.add(params);
            setLoading(false);
            dispatch(addToastMessage(res[0].status, res[0].message));
            if ((res[0].status = 'success')) {
                dispatch(deleteAll());
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validates, handleSubmit);
    const handleChangeCity = (name, element) => {
        const value = element.options[element.options.selectedIndex].value;
        const text = element.options[element.options.selectedIndex].innerText;
        setFormValues({ ...formValues, [name]: value, cityName: text, districtCode: '', wardCode: '' });
        removeError(name);
    };
    const handleChangeDistrict = (name, element) => {
        const value = element.options[element.options.selectedIndex].value;
        const text = element.options[element.options.selectedIndex].innerText;
        setFormValues({ ...formValues, [name]: value, districtName: text, wardCode: '' });
        removeError(name);
    };
    const handleChangeWard = (name, element) => {
        const value = element.options[element.options.selectedIndex].value;
        const text = element.options[element.options.selectedIndex].innerText;
        setFormValues({ ...formValues, [name]: value, wardName: text });
        removeError(name);
    };
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'phoneNumber') {
            value.slice(-1) % 1 === 0 && setFormValues({ ...formValues, [name]: value });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
        removeError(name);
    };
    return (
        <div className={style.wapper}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    !loading && formSubmit(e, formValues);
                }}
            >
                <div className={style.title}>
                    <h3>Thông tin khách hàng</h3>
                </div>
                <div className={style.form_colums}>
                    <div className={style.formItem}>
                        <input
                            className={errors.fullName && 'error'}
                            type="text"
                            name="fullName"
                            value={formValues.fullName}
                            placeholder="Nhập họ và tên"
                            onChange={handleOnChange}
                            onBlur={() => {
                                invalid('fullName', formValues.fullName);
                            }}
                        />
                        <div className={style.error}>
                            <p className="txt-error">{errors.fullName}</p>
                        </div>
                    </div>
                    <div className={style.formItem}>
                        <input
                            className={errors.phoneNumber && 'error'}
                            type="text"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            placeholder="Nhập số điện thoại"
                            onChange={handleOnChange}
                            onBlur={() => {
                                invalid('phoneNumber', formValues.phoneNumber);
                            }}
                        />
                        <div className={style.error}>
                            <p className="txt-error">{errors.phoneNumber}</p>
                        </div>
                    </div>
                </div>
                <div className={style.formItem}>
                    <input
                        className={errors.email && 'error'}
                        type="text"
                        name="email"
                        value={formValues.email}
                        placeholder="Nhập email"
                        onChange={handleOnChange}
                        onBlur={() => {
                            invalid('email', formValues.email);
                        }}
                    />
                    <div className={style.error}>
                        <p className="txt-error">{errors.email}</p>
                    </div>
                </div>
                <div className={style.form_colums}>
                    <div className={style.formItem}>
                        <select
                            className={errors.cityCode && 'error'}
                            name="cityCode"
                            onChange={(e) => {
                                handleChangeCity('cityCode', e.target);
                            }}
                            onBlur={(e) => {
                                invalid('cityCode', e.target.value);
                            }}
                        >
                            <option value="">---Chọn Tỉnh / Thành phố---</option>
                            {citys &&
                                citys.map((city) => {
                                    return (
                                        <option key={city.code} value={city.code}>
                                            {city.name}
                                        </option>
                                    );
                                })}
                        </select>
                        <div className={style.error}>
                            <p className="txt-error">{errors.cityCode}</p>
                        </div>
                    </div>
                    <div className={style.formItem}>
                        <select
                            className={errors.districtCode && 'error'}
                            name="districtCode"
                            onChange={(e) => {
                                handleChangeDistrict('districtCode', e.target);
                            }}
                            onBlur={(e) => {
                                invalid('districtCode', e.target.value);
                            }}
                        >
                            <option value="">---Chọn Quận / Huyện---</option>
                            {districts &&
                                districts.map((district) => {
                                    return (
                                        <option key={district.code} value={district.code}>
                                            {district.name}
                                        </option>
                                    );
                                })}
                        </select>
                        <div className={style.error}>
                            <p className="txt-error">{errors.districtCode}</p>
                        </div>
                    </div>
                </div>
                <div className={style.formItem}>
                    <select
                        className={errors.wardCode && 'error'}
                        name="wardCode"
                        onChange={(e) => {
                            handleChangeWard('wardCode', e.target);
                        }}
                        onBlur={(e) => {
                            invalid('wardCode', e.target.value);
                        }}
                    >
                        <option value="">---Chọn Xã / Phường---</option>
                        {wards &&
                            wards.map((ward) => {
                                return (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                );
                            })}
                    </select>
                    <div className={style.error}>
                        <p className="txt-error">{errors.wardCode}</p>
                    </div>
                </div>
                <div className={style.formItem}>
                    <input
                        className={errors.detailedAddress && 'error'}
                        type="text"
                        name="detailedAddress"
                        value={formValues.detailedAddress}
                        placeholder="Nhập chi tiết địa chỉ: Thôn, phố, số nhà..."
                        onChange={handleOnChange}
                        onBlur={() => {
                            invalid('detailedAddress', formValues.detailedAddress);
                        }}
                    />
                    <div className={style.error}>
                        <p className="txt-error">{errors.detailedAddress}</p>
                    </div>
                </div>
                <div className={style.formItem}>
                    <textarea
                        rows="5"
                        type="text"
                        name="content"
                        value={formValues.content}
                        placeholder="Nhập nội dung (nếu cần) "
                        onChange={handleOnChange}
                        onBlur={() => {
                            invalid('content', formValues.content);
                        }}
                    />
                </div>
                <div className={style.btn}>
                    <Button blue cursorDefault={loading}>
                        <span style={{ display: 'flex' }}>HOÀN TẤT ĐẶT HÀNG {loading && <Loading />}</span>
                    </Button>
                    <p>Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng của Shop</p>
                </div>
            </form>
        </div>
    );
}

export default FormCustomer;

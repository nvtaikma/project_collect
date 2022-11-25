import { useState, useEffect } from 'react';
function useForm(validates, callback) {
    const ojRules = {
        isRequired: (value) => {
            if (typeof value === 'object') {
                return value.length > 0 ? undefined : `Mục này không được để trống`;
            }
            return value.trim() ? undefined : 'Mục này không được để trống';
        },
        isFileImg: (value) => {
            const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
            for (let key in value) {
                if (+key % 1 === 0) {
                    const check = types.includes(value[key].type);
                    if (!check) {
                        return `Bạn vui lòng nhập đúng file (${types.join(', ')} )`;
                    }
                }
            }
        },
        isEmail: (value) => {
            const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regexEmail.test(value) ? undefined : 'Bạn vui lòng nhập đúng email';
        },
        minLength: (value, init) => {
            return value.trim().length >= init ? undefined : `Vui lòng nhập ít nhất ${init} ký tự`;
        },
        maxLength: (value, init) => {
            return value.trim().length <= init ? undefined : `Vui lòng nhập tối đa ${init} ký tự`;
        },
        isConfrimed: (value, getPassword) => {
            return value === getPassword() ? undefined : `Nhập lại mật khẩu không khớp`;
        },
        isNumber: (value) => {
            return value % 1 === 0 ? undefined : 'Nhập số không hợp lệ';
        },
        isInteger: (value) => {
            const number = value % 1;
            return value > 0 && number === 0 ? undefined : 'Nhập số nguyên lớn hơn 0';
        },
        isPhoneNumber: (value) => {
            const regexPhoneNumber = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g;
            return regexPhoneNumber.test(value) ? undefined : `Nhập số điện thoại không hợp lệ`;
        },
    };
    const [errors, SetErrors] = useState({});
    const [submit, SetSubmit] = useState(false);
    const [count, SetcCount] = useState(0);
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submit) {
            callback();
        }
    }, [count]);
    const invalid = (name, value) => {
        const validate = validates.filter((item) => item.name === name);
        if (validate.length > 0) {
            const rules = validate[0].rules;
            for (const key in rules) {
                if (rules[key]) {
                    let message = ojRules[key](value, rules[key]);
                    if (message) {
                        SetErrors((prev) => ({ ...prev, [name]: message }));
                        break;
                    }
                }
            }
        }
    };
    const removeError = (name) => {
        delete errors[name];
        SetErrors(errors);
    };
    const formSubmit = (e, values) => {
        e && e.preventDefault();
        for (const key in values) {
            invalid(key, values[key]);
        }
        SetSubmit(true);
        SetcCount((prev) => prev + 1);
    };
    return { invalid, errors, removeError, formSubmit };
}

export default useForm;

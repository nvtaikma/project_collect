import { useEffect, useRef, useState } from 'react';
import Loading from '../ModalConfirm/Loading';
import styles from './ActionBox.module.css';
function ActionBox({ placeholder, options, payload, setPayload, loading }) {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        const timeId = setTimeout(() => {
            const value = searchValue.trim();
            if ( value && value !== payload.name) {
                setPayload({ ...payload, page: 1, name: value });
            }
        }, 700);
        return () => {
            clearTimeout(timeId);
        };
    }, [searchValue]);
    return (
        <div className={styles.wapper}>
            <div className={styles.actionBox_left}>
                <label>Số mục/trang</label>
                <select onChange={(e) => setPayload({ ...payload, page: 1, limit: e.target.value })}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
            <div className={styles.actionBox_right}>
                {placeholder && (
                    <div className={styles.input}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder={placeholder}
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                        {searchValue && !loading && (
                            <div className={styles.loading}>
                                <i
                                    className="fa-solid fa-circle-xmark"
                                    onClick={() => {
                                        inputRef.current.focus();
                                        setSearchValue('');
                                        setPayload({ ...payload, name: '' });
                                    }}
                                ></i>
                            </div>
                        )}
                        {searchValue && loading && searchValue !== payload.name && (
                            <div className={styles.loading}>
                                <Loading />
                            </div>
                        )}
                    </div>
                )}

                {options && (
                    <select onChange={(e) => setPayload({ ...payload, page: 1, status: e.target.value })}>
                        <option value="">Theo trạng thái</option>
                        {options.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                )}
            </div>
        </div>
    );
}

export default ActionBox;

import React from 'react';
import PropTypes from 'prop-types';

import './TableTr.scss';
import { useDispatch } from 'react-redux';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { cartActions } from '../../../store/reducer';

const TableTr = ({ item }) => {
    const dispatch = useDispatch();

    const HandleDelete = () => {
        dispatch(cartActions.deleteCart({ id: item.id }));
    };

    return (
        <>
            <tr>
                <td>
                    <img src={item.image01} alt="product-img" className="table__img" />
                </td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.quantity}pcs</td>
                <td>
                    <DeleteOutlineOutlinedIcon className="icon" onClick={HandleDelete} />
                </td>
            </tr>
        </>
    );
};

TableTr.propTypes = {
    items: PropTypes.object,
};

export default TableTr;

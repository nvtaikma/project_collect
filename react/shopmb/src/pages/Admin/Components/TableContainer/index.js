import style from './TableContainer.module.css';
function TableContainer({ children }) {
    return <div className={`${style.wapper} custom-scrollbars`}>{children}</div>;
}

export default TableContainer;

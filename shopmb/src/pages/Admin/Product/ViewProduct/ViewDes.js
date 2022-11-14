import styles from './ViewProduct.module.css';
function ViewDes({ data }) {
    return (
        <div className={`${styles.des} custom-scrollbars`} dangerouslySetInnerHTML={{ __html: data.product_des }}></div>
    );
}

export default ViewDes;

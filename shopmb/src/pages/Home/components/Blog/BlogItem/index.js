import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../../../../../hooks/useFormat';
import Button from '../../../../../components/Button';
import Overlay from '../../Overlay';
import style from './blogItem.module.css';
function BlogItem({ data }) {
    // const [overlay, setOverlay] = useState(false);
    // const showOverlay = () => {
    //     setOverlay(true);
    // };
    // const closeOverlay = () => {
    //     setOverlay(false);
    // };
    return (
        <>
            <div className={style.blog_item}>
                <div className={style.blog_item_img}>
                    <Link to={`/xem_tin_tuc/${data.id}`}>
                        <img src={`${process.env.REACT_APP_API_URL}/assets/news/${data.img}`} alt="" />
                    </Link>
                    <span className={style.category}>
                        <Link to={`/tin_tuc/danh_muc/${data.category_id}`}>{data.category_name}</Link>
                    </span>
                </div>
                <div className={style.blog_item_bottom}>
                    <div className={style.item}>
                        <h4 className={style.title}>
                            <Link to={`/xem_tin_tuc/${data.id}`}>{data.title}</Link>
                        </h4>
                    </div>
                    <div className={style.item}>
                        <span className={style.des}>
                            <span dangerouslySetInnerHTML={{ __html: data.des }}></span>
                        </span>
                    </div>
                    <div className={style.item}>
                        <span className={style.created}>{formatTimestamp(data.created)}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogItem;

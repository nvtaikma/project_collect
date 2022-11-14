import notiSearch from '../../assets/images/icon/noti-search.png';
import style from './notiSearch.module.css';
function NotiSearch() {
    return (
        <div className={style.noti_search}>
            <img src={notiSearch} alt="" />
            <p>Rất tiếc chúng tôi không tìm thấy kết quả theo yêu cầu của bạn. </p>
            <span>Vui lòng thử lại .</span>
        </div>
    );
}

export default NotiSearch;

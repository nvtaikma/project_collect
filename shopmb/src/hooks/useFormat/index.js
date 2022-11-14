import avt from '../../assets/images/icon/no-avt.png';
export const formatNumber = (num) => {
    return num
        .toString()
        .split(/(?=(?:\d{3})+(?:\.|$))/g)
        .join('.');
};
export const formatTimestamp = (time) => {
    if (!time) {
        return undefined;
    }
    const timestamp = time.trim();
    const DateObj = new Date(timestamp);
    const fullTime = DateObj.getTime();
    const timeNow = new Date().getTime();
    const seconds = Math.floor((timeNow - fullTime) / 1000);
    const day = DateObj.getDate();
    const month = DateObj.getMonth();
    const year = DateObj.getFullYear();
    if (seconds < 60) {
        return seconds < 10 ? 'vừa xong' : `${seconds} giây trước`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} phút trước`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} giờ trước`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} ngày trước`;
    }
    return ` ngày ${day}/${month}/${year}`;
};

export const renderAvt = (textImg) => {
    return textImg ? `${process.env.REACT_APP_API_URL}/assets/user/${textImg}` : avt;
};

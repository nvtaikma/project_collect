import style from './BackgroundLogin.module.css';
function BackgroundLogin({ children }) {
    return <div className={`${style.wapper} custom-scrollbars-none`}>{children}</div>;
}

export default BackgroundLogin;

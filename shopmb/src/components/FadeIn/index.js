import styles from './fadeIn.module.css';
function FadeIn({ children, style = {}, onClick = () => {} }) {
    return (
        <div className={styles.fade_in} style={{ ...style }} onClick={onClick}>
            {children}
        </div>
    );
}
export default FadeIn;

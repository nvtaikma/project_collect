import styles from './Title.module.css';
function Title({ text, textCount }) {
    return (
        <div className={styles.title}>
            <h3>
                {text}
                {textCount && <span>{`(${textCount})`}</span>}
            </h3>
        </div>
    );
}

export default Title;

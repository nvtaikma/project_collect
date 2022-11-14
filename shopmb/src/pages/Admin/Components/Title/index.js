import style from './Title.module.css';
function Title({ title }) {
    return (
        <div className={style.title}>
            <p>{title}</p>
        </div>
    );
}

export default Title;

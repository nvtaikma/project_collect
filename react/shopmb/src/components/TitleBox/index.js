import style from './titleBox.module.css';
function TitleBox({ titleName }) {
    return (
        <div className={style.title}>
            <h2>{titleName}</h2>
        </div>
    );
}

export default TitleBox;

import { Link } from 'react-router-dom';
import style from './Path.module.css';
function PathAdmin({ list }) {
    return (
        <div className={style.path}>
            <ul>
                <li>
                    <i className="fa-solid fa-house"></i>
                    <Link to="/admin">Trang chủ</Link>
                </li>
                {list &&
                    list.map((li, index) => {
                        return (
                            <li key={index}>
                                <Link to={li.path}> {li._name} </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default PathAdmin;

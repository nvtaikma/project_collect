import { Link } from 'react-router-dom';
import style from './path.module.css';
function Path({ list }) {
    return (
        <div className={style.path}>
            <div className="container">
                <ul>
                    <li>
                        <i className="fa-solid fa-house"></i>
                        <Link to="/">Trang chủ</Link>
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
        </div>
    );
}

export default Path;

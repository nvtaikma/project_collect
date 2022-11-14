import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/actions/user';
import { renderAvt } from '../../../hooks/useFormat';
import Button from '../../../components/Button';
import styles from './LayoutRight.module.css';
function LayoutRight({ children, setShowMenu, showMenu, isMobile }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(deleteUser());
        navigate('/dang_nhap');
    };
    return (
        <div className={styles.wapper}>
            <div className={styles.header}>
                {isMobile && (
                    <div className={styles.icon} onClick={() => setShowMenu((prev) => !prev)}>
                        <strong>
                            <i className="fa-solid fa-bars"></i>
                        </strong>
                    </div>
                )}
                <div className={styles.search}>
                    <input type="text" placeholder="Tìm kiếm" />
                    <div className={styles.btn}>
                        <Button transparent small>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </div>
                </div>
                <ul>
                    <li>
                        <label onClick={handleLogOut}>
                            <img src={renderAvt(user.avt)} alt="" />
                            Log out
                        </label>
                    </li>
                    <li>
                        <label>
                            <i className="fa-solid fa-envelope"></i>
                            <span>99</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <i className="fa-solid fa-bell"></i>
                            <span>99</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className={`${styles.content} custom-scrollbars-none`}> {children}</div>
        </div>
    );
}

export default LayoutRight;

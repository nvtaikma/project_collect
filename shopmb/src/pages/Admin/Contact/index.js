import PathAdmin from '../Components/Path';
import Title from '../Components/Title';
import ActionBox from '../Components/ActionBox';
import TableContainer from '../Components/TableContainer';
import style from './Contact.module.css';

function ContactAdmin() {
    return (
        <>
            <PathAdmin list={[{ _name: 'Liên hệ', path: '/admin/lien_he' }]} />
            <div className={style.wapper}>
                <Title title={'Quản lý liên hệ'} />
                <ActionBox
                    placeholder={'type here...'}
                    options={[
                        { name: 'Chưa phản hồi', value: '1' },
                        { name: 'Đã phản hồi', value: '2' },
                    ]}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Email khách hàng</th>
                                <th>Trạng thái</th>
                                <th>Nội dung</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>
                                    <span>nguyentuanh6062@gmail.com</span>
                                </td>
                                <td>
                                    <span className="txt-waning">
                                        <i className="fa-solid fa-paper-plane"></i> Chờ phản hồi
                                    </span>
                                </td>
                                <td>
                                    <span>Về tính năng mới, macOS Ventura mang ...</span>
                                </td>
                                <td>2022-02-08 14:37:25 </td>
                                <td>
                                    <p>
                                        <label>
                                            <i className="fa-solid fa-eye"></i>
                                            <span>xem</span>
                                        </label>
                                        <label>
                                            <i className="fa-solid fa-comment-dots"></i>
                                            <span>phản hồi</span>
                                        </label>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>
                                    <span>nguyentung62@gmail.com</span>
                                </td>
                                <td>
                                    <span className="txt-success">
                                        <i className="fa-solid fa-check"></i> Đã phản hồi
                                    </span>
                                </td>
                                <td>
                                    <span>Về tính năng mới, macOS Ventura mang ...</span>
                                </td>
                                <td>2022-02-08 14:37:25 </td>
                                <td>
                                    <p>
                                        <label>
                                            <i className="fa-solid fa-eye"></i>
                                            <span>xem</span>
                                        </label>
                                        <label>
                                            <i className="fa-solid fa-comment-dots"></i>
                                            <span>phản hồi</span>
                                        </label>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </TableContainer>
            </div>
        </>
    );
}

export default ContactAdmin;

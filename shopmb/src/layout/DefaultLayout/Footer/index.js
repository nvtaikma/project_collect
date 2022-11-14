import Button from '../../../components/Button';
import logo from '../../../assets/images/icon/logo1.png';
import american_express from '../../../assets/images/icon/american_express.png';
import discover from '../../../assets/images/icon/discover.png';
import google_wallet from '../../../assets/images/icon/google_wallet.png';
import paypal from '../../../assets/images/icon/paypal.png';
import visa from '../../../assets/images/icon/visa.png';

import style from './footer.module.css';
function Footer() {
    return (
        <footer>
            <div className={style.footer_top}>
                <div className={`${style.row} container`}>
                    <div className={style.footer_top_left}>
                        <span>stay connected with our email updates</span>
                    </div>
                    <div className={style.footer_top_right}>
                        <input type="text" placeholder="Enter Your Email Address" />
                        <Button gray1>subscribe</Button>
                    </div>
                </div>
            </div>
            <div className={style.footer_content}>
                <div className="row container margin_top50">
                    <div className={`col_sm3 ${style.mobile}`}>
                        <div className={style.logo}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={style.des}>
                            <span>There are many variations of passages of look even slightly believable</span>
                        </div>
                        <div className={style.social_block}>
                            <ul>
                                <li className="bg-facebook">
                                    <Button circle1 gray1 href="#">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </Button>
                                </li>
                                <li className="bg-twitter">
                                    <Button circle1 gray1 href="#">
                                        <i className="fa-brands fa-twitter"></i>
                                    </Button>
                                </li>
                                <li className="bg-youtube">
                                    <Button circle1 gray1 href="#">
                                        <i className="fa-brands fa-youtube"></i>
                                    </Button>
                                </li>
                                <li className="bg-googleplus">
                                    <Button circle1 gray1 href="#">
                                        <i className="fa-brands fa-google-plus-g"></i>
                                    </Button>
                                </li>
                                <li className="bg-instagram">
                                    <Button circle1 gray1 href="#">
                                        <i className="fa-brands fa-instagram"></i>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${style.colum2} col_sm2`}>
                        <h4>Information</h4>
                        <ul>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Delivery Information</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#">Site Map</a>
                            </li>
                        </ul>
                    </div>
                    <div className={`${style.colum2} col_sm2`}>
                        <h4>Extras</h4>
                        <ul>
                            <li>
                                <a href="#">Brands</a>
                            </li>
                            <li>
                                <a href="#">Gift Certificates</a>
                            </li>
                            <li>
                                <a href="#">Affiliate</a>
                            </li>
                            <li>
                                <a href="#">Specials</a>
                            </li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className={`${style.colum2} col_sm3`}>
                        <h4>Store Information</h4>
                        <ul>
                            <li>
                                <i className="fa-solid fa-location-dot"></i>
                                <span>Artcraft - Art Store United States</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-phone"></i>
                                <span>0966743975</span>
                            </li>
                            <li>
                                <i className="fa fa-fax"></i>
                                <span>0966743975</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-envelope"></i>
                                <span>anhvas@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.footer_bottom}>
                <div className={`${style.row} container`}>
                    <p>Powered By NTA Artcraft - Arts & Craft Store © 2022</p>
                    <div className={style.logo_payment}>
                        <ul>
                            <li>
                                <img src={visa} alt="" />
                            </li>
                            <li>
                                <img src={paypal} alt="" />
                            </li>
                            <li>
                                <img src={google_wallet} alt="" />
                            </li>
                            <li>
                                <img src={discover} alt="" />
                            </li>
                            <li>
                                <img src={american_express} alt="" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

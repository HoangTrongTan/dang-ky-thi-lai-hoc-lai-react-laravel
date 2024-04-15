import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Footer.module.scss";
import classNames from "classnames/bind";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faGraduationCap, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { memo } from "react";

const cx = classNames.bind(style);

function Footer() {
    return ( 
        <div className={cx('wrapper')}>
            <main className={cx('box')}>
                
                <div className={cx('item-left')}>
                    <Link to={'https://www.facebook.com/TruongDHSaoDo'} className={cx('btn')} target="_blank">
                            <FontAwesomeIcon icon={faFacebook} className={cx('icon')}/>
                    </Link>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faInstagram}  className={cx('icon')} />
                    </button>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faTwitter}  className={cx('icon')} />
                    </button>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faYoutube}  className={cx('icon')} />
                    </button>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faPhone}  className={cx('icon')} />
                    </button>
                </div>
                

                <div className={cx('item-right')}>
                    <div className={cx('info')}>
                        <h4>Trường Đại Học Sao Đỏ</h4>
                        <FontAwesomeIcon icon={faGraduationCap} className={cx('icon')}/>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default memo(Footer);
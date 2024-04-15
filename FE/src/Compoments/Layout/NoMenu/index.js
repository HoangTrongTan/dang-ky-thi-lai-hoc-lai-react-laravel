import classNames from "classnames/bind";
import styles from './NoMenu.module.scss';
import Header from '../../Header';
import Footer from '../../Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NoMenu({children}) {
    return ( <div className={cx('wrapper')}>
        <Header />
        <div className={cx('body')}> 
            <div className={cx('back-home')}>
                <Link to={"/"} className={cx('btn-back_home')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <p className={cx('text-back-home')}>Quay trở về trang chủ</p>
                </Link>
            </div>
            {children}
        </div>
        <Footer />
    </div> );
}

export default NoMenu;
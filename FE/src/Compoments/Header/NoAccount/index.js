import style from "./NoAccount.module.scss";
import classNames from "classnames/bind";
import { Wheat } from "../../icons";
const cx = classNames.bind(style);
function NoAccount() {
    return ( 
        <>
        <button className={cx('logo-wheat')}>
          <p>S D U</p>
          <div className={cx('icon-1')}>
            <Wheat.WheatIcon1 width={35} height={65} />
          </div>
          <div className={cx('icon-2')}>
            <Wheat.WheatIcon2 width={18} height={40} />
          </div>
          <div className={cx('icon-3')}>
            <Wheat.WheatIcon3 width={23} height={56} />
          </div>
        </button>
        </>
     );
}

export default NoAccount;
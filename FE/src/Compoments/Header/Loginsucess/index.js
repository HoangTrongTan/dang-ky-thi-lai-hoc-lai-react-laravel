import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ring, Search } from "../../icons";
import style from "./Loginsucess.module.scss";
import classNames from "classnames/bind";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import LogoutForm from "../logoutForm";

const cx = classNames.bind(style);
function Loginsucess() {

    return ( 
        <>
        <div className={cx("input-container")}>
          <input
            placeholder="Search something..."
            className={cx("input")}
            name="text"
            type="text"
          />
          <Search className={cx("icon")} />
        </div>
        <Hr />
        
        <button className={cx("button")}>
          <Ring className={cx("bell")} />
        </button>

        <Hr />
        <div className={cx("avatar")}>
          <LogoutForm  >
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/4/49/Logo_dhsaodo_moi.PNG"
              alt="saodo"
            />
          </LogoutForm>
          <FontAwesomeIcon icon={faChevronDown} className={cx("icon")} />

        </div>
        </>
     );
}
function Hr() {
    return <div className={cx("Hr")}></div>;
  }
export default Loginsucess;
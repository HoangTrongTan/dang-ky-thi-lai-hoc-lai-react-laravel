import Tippy from "@tippyjs/react/headless";
import styles from "./logoutForm.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTheme, setUser } from "../../Global/globalSlice";

const cx = classNames.bind(styles);
function LogoutForm({ children }) {
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = '/';

  };
  const hadleChangeThemeColor = (ele) => {
    if(ele.checked){
      dispatch(setTheme("dark"))
    }else{
      dispatch(setTheme(""))
    }
  }
  return (
    <>
      <Tippy
        delay={[0, 1000]}
        placement="bottom-start"
        interactive
        render={(attr) => (
          <form className={cx("wrapper")}>
            <ul className={cx("item")} onClick={() => handleLogout()}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className={cx("title")}>Đăng xuất</span>
            </ul>
            <ul className={cx("item")}>
              <div className={cx("item-left")}>
                <FontAwesomeIcon icon={faMoon} />
                <span className={cx("title")}>Chế độ tối</span>
              </div>
              <div className={cx("item-right")}>
                <label className={cx("switch")}>
                  <input type="checkbox" onChange={(e) => hadleChangeThemeColor(e.target)} />
                  <span className={cx("slider")}></span>
                </label>
              </div>
            </ul>
          </form>
        )}
      >
        {children}
      </Tippy>
    </>
  );
}

export default LogoutForm;

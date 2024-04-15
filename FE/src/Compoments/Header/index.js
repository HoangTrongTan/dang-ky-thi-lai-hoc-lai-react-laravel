import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { memo, useState } from "react";
import LoginForm from "../LoginForm";
import Loginsucess from "./Loginsucess";
import NoAccount from "./NoAccount";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonToolbar} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(style);

function Header() {
  const userGlobal = useSelector((state) => state.global.user);
  
  const [user,setUser] = useState({})
  useEffect( () => {
    try{
      const userData = JSON.parse(localStorage.getItem("userData") )[0];
      if (userData === undefined ?? userData === null) {
        userData = {};
      }
      setUser(
        {
          ...userData
        }
      )
    }catch(err){
      setUser({})
    }
  } , [userGlobal.tendangnhap]);

  

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(prev => !prev);
  };
  return (
    
    <div className={cx("wrapper")}>
      <div className={cx("info")}>
        {Object.keys(user).length === 0 ? (
            <NoAccount />
        ) : (
          <>
            <h3>{user.hodem+" " + user.ten}</h3>
            <p>{user.tendangnhap}</p>
          </>
        )}
      </div>
      <div className={cx("actions")}>
        {
          Object.keys(user).length === 0?(
            <>
              <ButtonToolbar>
                <Button
                  onClick={handleOpen}
                  style={{ backgroundColor: "#B05CFF" }}
                  appearance="primary"
                >
                  <p style={{letterSpacing:5}}>Đăng nhập <FontAwesomeIcon icon={faArrowRightToBracket} /></p>
                </Button>
              </ButtonToolbar>
              {/*------------------------------ Login ở đây -------------------------- */}
              <LoginForm open={[open, setOpen]} state={[user,setUser]} />
              {/*------------------------------ Login ở đây -------------------------- */}
            </>
          ):(
            <Loginsucess  />
          )
        }
        
      </div>
    </div>
  );
}

export default memo(Header);

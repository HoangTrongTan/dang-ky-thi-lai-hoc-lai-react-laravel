import "rsuite/dist/rsuite.css";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Global/globalSlice";
import { Message, Modal, toaster} from "rsuite";
import style from "./LoginForm.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { PassWordIcon } from "../icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import useToaster from "rsuite";

const cx = classNames.bind(style);


const LoginForm = ({open , state}) => {
  // console.log();


  const [acount,setAcount] = useState({});
  const [isOpen,setOpen] = open;
  const [userlogin,setUserLogin] = state;
  const dispatch = useDispatch();
  const handlesetAccount = (obj) => {
    setAcount( prev => ({
      ...prev,
      [obj.name]:obj.value,
    }) );
  }
  const handleClose = () => {
    setOpen(prev => !prev);
  };
  const handleCheckLogin = () => {
    axios({
      method:'get',
      headers: {
        "Content-Type":"application/json"
      },
      params: {
        tk: acount.tk,
        mk: acount.mk
      },
      url: 'http://127.0.0.1:8000/api/acount/login'
    }).then( response => {
      localStorage.setItem("userData",JSON.stringify(response.data));
      if(response.data[0] === undefined ?? response.data[0] === null){
        setUser({});
        dispatch(setUser({}) );
        toaster.push( <Message showIcon type="error" closable>Tài khoản mật khẩu không đúng</Message>,{
          duration:4000,
          placement:"topEnd"
        } );
      }else{
        dispatch(setUser(response.data[0]) );
        setUser(response.data[0] );
        toaster.push( <Message showIcon type="success" closable>Đăng nhập thành công</Message>,{
          duration:3000,
          placement:"topEnd"
        } );
        toaster.push( <Message showIcon type="info" closable>Xin chào {`${response.data[0].hodem }  ${response.data[0].ten}`}</Message>,{
          duration:3000,
          placement:"topCenter"
        } )
        
      }
    } ).catch( err => {
      console.log(err);
    })

    
    
  };
  // console.log('re-render');
  return (
    <>
      <Modal style={{ top: 70 }} size="xs" open={isOpen} onClose={handleClose}>
        <Modal.Body >
          <div className={cx('form')}>
            <p className={cx('form-title')}>Đăng nhập</p>
            <div className={cx('input-container')} >
              <input  className={cx('input-field')}  type="text" name="tk" onChange={e => handlesetAccount(e.target)}  />
              <label  className={cx('input-label')} >Mã sinh viên</label>
              <span className={cx('input-highlight')} ></span>
              <FontAwesomeIcon icon={faUser} className={cx('icon')} />
            </div>

            <div className={cx('input-container')} >
              <input  className={cx('input-field')} type="password" name="mk" onChange={e => handlesetAccount(e.target)} />
              <label  className={cx('input-label')} >Mật khẩu</label>
              <span className={cx('input-highlight')} ></span>
              <PassWordIcon className={cx('icon')} />
            </div>

            <button className={cx("btn-login")} onClick={handleCheckLogin}>
              
              <span>BUTTON <FontAwesomeIcon icon={faArrowRightToBracket} /></span>
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginForm;

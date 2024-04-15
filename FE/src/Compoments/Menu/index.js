import style from "./Menu.module.scss";
import classNames from "classnames/bind";
import MenuItem from "./MenuItem";
import { FormIcon, ThiLaiIcon } from "../icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const menu_item = [
  {
    icon: <FontAwesomeIcon icon={faFolderPlus} />,
    title: "Đăng kí học lại, cải thiện",
    data: "",
    path: "/hoclai",
  },
  {
    icon: <FormIcon />,
    title: "Đăng ký thi lại,cải thiện",
    data: [
      {
        title: "Đăng ký thi lần 1",
        path: "/prf",
      },
      {
        title: "Đăng ký thi lần 2",
        path: "/dkthi2",
      },
      {
        title: "Danh sách đã đăng ký",
        path: "/thilai",
      },
    ],
  },
  {
    icon: <ThiLaiIcon />,
    title: "Trang chủ",
    data: "",
    path: "/",
  }
];

const cx = classNames.bind(style);
function Menu({ isExpan }) {
  

  const [expan, setExpan] = isExpan;
  const [menuHide,setMenuHide] = useState(false);
  const [menutitle,setMenuTitle] = useState(false);

  const handleToggleExpanModel = () => {
    console.log("vào", expan);
    setExpan(!expan);
  };
  const handleHideMenu = () => {
    setMenuHide(prev => !prev);
  }
  useEffect(() => {
    window.onresize = () => {
      console.log(menutitle);
      var width = window.innerWidth;
      console.log(window.innerWidth);
      if(width > 768 && width < 1024){
        setMenuTitle(true);
      }
      else{
        setMenuTitle(false);
        setMenuHide(false);
      }
    }
    return () => {
      window.onresize = null;
    }
  }, []);
  
  // console.log("hiện tại",expan)
  return (
    <>
      <div className={cx("btn--menu-hide", { "icon-rotate":menuHide })} onClick={handleHideMenu}>
        <p>
          <FontAwesomeIcon icon={faChevronRight} className={cx({ "icon-rotate":menuHide })}/>
        </p>
      </div>
      {
        menuHide && <div onClick={() => setMenuHide(prev => !prev)} className={cx('bg-full')}></div>
      }
      <main className={cx("wrapper")} style={{ transform:menuHide && 'translateX(0)', width: expan && 80 }} data-theme="theme">
        {
          menutitle?
          <div className={cx("TiTle")} >
              <button onClick={() => setMenuHide(prev => !prev)} className={cx("btn--left--mini-menu")}><FontAwesomeIcon icon={faChevronLeft} /></button>
          </div>:
          <div className={cx("TiTle")}>
          <h4
            className={cx("text")}
            style={{
              display: expan && "none",
            }}
          >
            Menu
          </h4>
          <div className={cx("btn")}>
            <input type="checkbox" className={cx("checkbox")} id="checkbox" />
            <label
              htmlFor="checkbox"
              className={cx("toggle")}
              onClick={handleToggleExpanModel}
            >
              <div className={cx("bars", "bar1")}></div>
              <div className={cx("bars", "bar2")}></div>
              <div className={cx("bars", "bar3")}></div>
            </label>
          </div>
        </div>
        }
        
        
        <MenuItem title={"Menu"} menu_item={menu_item} isExpand={expan} menuHide={setMenuHide}/>
        {/* -----------------------Item---------------------- */}
      </main>
    </>
  );
}

export default Menu;

import style from "./MenuItem.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";

import {
  Sidebar,
  Menu as Menu1,
  MenuItem as MenuItem1,
  SubMenu,
} from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);

function MenuItem({ title, menu_item, isExpand, menuHide }) {

  var user = useSelector((state) => state.global.user);

  try {
    if (Object.keys(user).length === 0) {
      user = JSON.parse(localStorage.getItem("userData"))[0];
      if (user === undefined ?? user === null) user = {};
    }
  } catch (error) {
    user = {};
  }

  return (
    <div className={cx("wrapper")}>
      {isExpand ? (
        <div className={cx("title-expan-wrraper")}>
          <div className={cx("title-expan")}></div>
        </div>
      ) : (
        <div className={cx("title")}>{title}</div>
      )}
      {/*  */}
      <Sidebar
        style={{
          border: "none",
          backgroundColor: "#fff",
          marginLeft: isExpand ? "-20px" : "-5px",
        }}
        rootStyles={cx("btn-expan")}
        collapsed={isExpand}
        collapsedWidth="75px"
      >
        <Menu1 style={{ backgroundColor: "#fff" }}>
          {menu_item.map((obj, index) => {
            if (Array.isArray(obj.data) && Object.keys(user).length > 0) {
              return (
                <SubMenu
                  label={obj.title}
                  icon={obj.icon}
                  key={index}
                  rootStyles={{ zIndex: 5 }}
                >
                  <div className={cx("item-expan")}>
                    {obj.data.map((item, index) => (
                      <MenuItem1
                        key={index + 2}
                        onClick={() => menuHide(false)}
                        style={{ color: "#000", textDecoration: "none" }}
                        component={<Link to={item.path} />}
                      >
                        <p>{item.title}</p>
                      </MenuItem1>
                    ))}
                  </div>
                </SubMenu>
              );
            }
            if (obj.path) {
              return (
                <MenuItem1
                  key={index}
                  onClick={() => menuHide(false)}
                  icon={obj.icon}
                  style={{ color: "#000", textDecoration: "none" }}
                  component={<Link to={obj.path}></Link>}
                >
                  <p>{obj.title}</p>
                </MenuItem1>
              );
            }
            return (
              <MenuItem1 key={index} icon={obj.icon}>
                {obj.title}
              </MenuItem1>
            );
          })}
        </Menu1>
      </Sidebar>
    </div>
  );
}

export default MenuItem;

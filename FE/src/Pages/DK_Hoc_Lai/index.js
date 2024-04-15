import style from "../Form_Generate_CSS/Form_Generate_CSS.module.scss";
import classNames from "classnames/bind";
import FormModelContent from "../../Compoments/FormModelContentDK_ThiLai_HocLai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setdataHocAll } from "../../Compoments/Global/globalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faClock, faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import FormFixInfo from "../../Compoments/FormFixInfo";
import { useRef } from "react";
import * as request from "../../Compoments/Util/index";
import { Message, useToaster } from "rsuite";
import TableHoclai from "./Table_Hoclai";

const cx = classNames.bind(style);

function DK_Hoc_Lai() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const allDangkY = useSelector((state) => state.global.dataHocAll);
  const dispatch = useDispatch();
  const [configInfo, setConfigInfo] = useState(false);
  const objsFix = useRef({});
  const toaster = useToaster();

  useEffect(() => {
    const setData = async () => {
      try {
        const res = await request.get("hoc/" + user[0].tendangnhap);
        dispatch(setdataHocAll(res));
        toaster.push(
          <Message showIcon type="success" closable>
            {"Tải lên thành công"}
          </Message>,
          {
            duration: 3000,
            placement: "topEnd",
          }
        );
      } catch (err) {
        console.log(JSON.stringify(err));
        toaster.push(
          <Message showIcon type="error" closable>
            {"Mất kết nối internet, trang web không thể hoạt động."}
          </Message>,
          {
            duration: 3000,
            placement: "topEnd",
          }
        );
      }
    };
    setData();
  }, []);

  const handleXoaDangKy = async (id) => {
    try {
      await request.del("hoc/" + id);
      const response = await request.get("hoc/" + user[0].tendangnhap);
      dispatch(setdataHocAll(response));
      toaster.push(
        <Message showIcon type="success" closable>
          xóa thành công
        </Message>,
        {
          duration: 3000,
          placement: "topEnd",
        }
      );
    } catch (err) {
      console.log(err);
      toaster.push(
        <Message showIcon type="error" closable>
          {err}
        </Message>,
        {
          duration: 3000,
          placement: "topEnd",
        }
      );
    }
  };
  const handleConfigInfo = (obj) => {
    objsFix.current = obj;
    setConfigInfo((prev) => !prev);
  };
  const handleUnSave = async (item) => {
    try {
      const item_new = { ...item };
      item_new.check_truongkhoa = 0;
      await request.put("hoc/" + item_new.id, item_new);
      const response = await request.get("hoc/" + user[0].tendangnhap);
      dispatch(setdataHocAll(response));
      toaster.push(
        <Message showIcon type="success" closable>
          Sửa thành công
        </Message>,
        {
          duration: 3000,
          placement: "topEnd",
        }
      );
    } catch (err) {
      console.log(err);
      toaster.push(
        <Message showIcon type="error" closable>
          {err}
        </Message>,
        {
          duration: 3000,
          placement: "topEnd",
        }
      );
    }
  };
  return (
    <main className={cx("wrapper")}>
      <h3 className={cx("title")}>
        <span>Đăng ký học lại, cải thiện</span>
      </h3>
      {/* From đăng ký thi lại  */}
      <FormModelContent checkTable={1} />
      <h3 style={{textAlign:"center"}}>
        Danh sách đăng ký
      </h3>
      <div style={{display:"flex", justifyContent:"center"}}>
          <TableHoclai />
      </div>
    </main>
  );
}

export default DK_Hoc_Lai;

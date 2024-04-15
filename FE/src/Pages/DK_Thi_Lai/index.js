import style from "../Form_Generate_CSS/Form_Generate_CSS.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setdataThiAll } from "../../Compoments/Global/globalSlice";
import FormFixInfo from "../../Compoments/FormFixInfo";
import { useState } from "react";
import { useRef } from "react";
import * as request from "../../Compoments/Util/index";
import { Message, useToaster } from "rsuite";
import TableThiLai from "./Table_thiLai";
const cx = classNames.bind(style);

function DK_Thi_Lai() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const allDangkY = useSelector((state) => state.global.dataThiAll);
  const dispacth = useDispatch();
  const toaster = useToaster();
  const [configInfo, setConfigInfo] = useState(false);
  const objsFix = useRef({});
  useEffect(() => {
    const setData = async () => {
      try {
        const res = await request.get("thi/" + user[0].tendangnhap);
        dispacth(setdataThiAll(res));
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

  return (
    <main className={cx("wrapper")}>
      <h3 className={cx("title")}>
        <span>Danh sách đăng ký thi</span>
      </h3>
      {configInfo && (
        <FormFixInfo
          OnSetVisibleFormFixInfo={setConfigInfo}
          OBJ={objsFix.current}
          page={"thilai"}
        />
      )}
      <div style={{display:"flex", justifyContent:"center"}}>
        <TableThiLai arr={allDangkY} />
      </div>
    </main>
  );
}

export default DK_Thi_Lai;

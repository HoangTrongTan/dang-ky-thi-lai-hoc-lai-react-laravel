import { useState } from "react";
import style from "./Table_thiLai.module.scss";
import classNames from "classnames/bind";
import FormFixInfo from "../../../Compoments/FormFixInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Message, toaster } from "rsuite";
import * as request from "../../../Compoments/Util/index";
import { setdataThiAll } from "../../../Compoments/Global/globalSlice";
import { useDispatch } from "react-redux";

const cx = classNames.bind(style);
function TableThiLai({ arr }) {
const user = JSON.parse(localStorage.getItem("userData"));
  const [configInfo, setConfigInfo] = useState(false);
  const dispacth = useDispatch();
  const objsFix = useRef({});
  const handleConfigInfo = (obj) => {
    objsFix.current = obj;
    setConfigInfo((prev) => !prev);
  };
  const handleXoaDangKy = async (id) => {
    try {
      await request.del("thi/" + id);
      const response = await request.get("thi/" + user[0].tendangnhap);
      dispacth(setdataThiAll(response));
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
  return (
    <>
      <table className={cx('table-thilai')}>
        <thead>
          <tr className={cx('title-heading')}>
            <th>STT</th>
            <th>Tên học phần</th>
            <th>Số tín chỉ</th>
            <th>Thi</th>
            <th>Điểm lần 1</th>
            <th>Kỳ</th>
            <th>Năm</th>
            <th>Ghi chú</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((obj, index) => {
            return (
              <tr key={index} className={cx("item-list")}>
                <td >{index+1}</td>
                <td>{obj.tenhocphan}</td>
                <td>{obj.sotin}</td>
                <td>{obj.loai === 1 ? " Thi lại " : " Thi cải thiện "}</td>
                <td>{obj.diemlan1}</td>
                <td>{obj.ky}</td>
                <td>{obj.nam}</td>
                <td>{obj.ghichu}</td>
                <td>{obj.thoigian}</td>
                <nav style={{ float: "right" }}>
                  <button
                    className={cx("btn-xoa")}
                    onClick={() => handleXoaDangKy(obj.id)}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>

                  <button
                    className={cx("btn-sua")}
                    onClick={() => handleConfigInfo(obj)}
                  >
                    sửa
                  </button>
                </nav>
              </tr>
            );
          })}
        </tbody>
      </table>
      {configInfo && (
        <FormFixInfo
          OnSetVisibleFormFixInfo={setConfigInfo}
          OBJ={objsFix.current}
          page={"thilai"}
        />
      )}
    </>
  );
}

export default TableThiLai;

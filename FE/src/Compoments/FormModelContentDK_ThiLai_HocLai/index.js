import style from "./FormModelContent.module.scss";
import classNames from "classnames/bind";
import RowInfo from "../Row_Info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { PaperPlaneIcon, ThungRacIcon } from "../icons";
import { useDispatch } from "react-redux";
import { setdataHocAll } from "../Global/globalSlice";
import * as request from "../Util";
import * as Services from "../../Services";
import { useToaster, Message } from "rsuite";

const cx = classNames.bind(style);
function FormModelContent({ checkTable }) {
  const toaster = useToaster();
  const sinhvien = JSON.parse(localStorage.getItem("userData"));

  const [rowValue, setRowValue] = useState([
    { id: 0, id_sinh_vien: sinhvien[0].tendangnhap },
  ]);
  const [fileinputs, setFileInputs] = useState([]);
  const curentRow = rowValue[rowValue.length - 1].id;

  const dispatch = useDispatch();

  const handleAddRow = () => {
    setRowValue((prev) => [...prev, { id: curentRow + 1 }]);
    setFileInputs((prev) => [...prev, []]);
  };

  const CheckDiem = () => {
    var vlu = true;
    rowValue.forEach((obj,i) => {
      if (Number(obj.loai) === 1) {
        if (obj.diemdadat > 3 || !obj.diemdadat || obj.diemdadat === "") {
          Services.ToastGenarator(`dòng ${i+1} điểm phải bé hơn 4 !!`, 3000);
          vlu = false;
        }
      } else {
        if (
          obj.diemdadat > 5 || obj.diemdadat < 4 || !obj.diemdadat ||  obj.diemdadat === ""
        ) {
          Services.ToastGenarator(`dòng ${i+1} điểm phải lớn hơn 4 và bé hơn 5 !!`, 3000);
          vlu = false;
        }
      }
    });
    return vlu;
  };
  const handleSendRegister = async () => {
    console.log(rowValue);
    try {
      if (!CheckDiem()) {
        return;
      }
      await Promise.all(
        rowValue.map(async (objs, index) => {
          await request.post("hoc", objs);
        })
      );
      // nếu ở dạng thi
      // đăng ký sự kiện khác
      const res = await request.get("hoc/" + sinhvien[0].tendangnhap);
      dispatch(setdataHocAll(res));
      setRowValue([{ id: 0 }]);
      Services.ToastGenarator(`Thêm thành công !!`, 3000);
    } catch (err) {
      console.log(err.message);
      toaster.push(
        <Message showIcon type="error" closable>
          {"có lỗi xảy ra"}
        </Message>,
        {
          duration: 3000,
          placement: "topEnd",
        }
      );
    }
  };

  const handleDelRow = () => {
    if (rowValue.length === 1) return;
    setRowValue((prev) => prev.slice(0, prev.length - 1));
  };

  return (
    <>
      <div className={cx("form-wrapper")}>
        <article className={cx("form")}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ width: "100%" }} className={cx("title-heding")}>
                <th style={{ minWidth: 30 }}>
                  <span>STT</span>
                </th>
                <th style={{ minWidth: 200, textAlign: "center" }}>
                  <span>Tên Học Phần</span>
                </th>
                <th style={{ minWidth: 70 }}>
                  <span>Số Tín</span>
                </th>
                <th style={{ minWidth: 60 }}>
                  <span>Kỳ</span>
                </th>
                <th style={{ minWidth: 100 }}>
                  <span>Năm</span>
                </th>
                <th style={{ minWidth: 100 }}>
                  {checkTable === 1 ? (
                    <span>Điểm đã đạt</span>
                  ) : (
                    <span>Điểm lần 1</span>
                  )}
                </th>
                <th style={{ minWidth: 100 }}>
                  <span>Lý do học</span>
                </th>

                <th style={{ width: "100%" }}>
                  <span>Ghi chú</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rowValue &&
                rowValue.map((obj, index) => (
                  <RowInfo
                    checkTable={checkTable}
                    key={index}
                    STT={index}
                    state={[rowValue, setRowValue]}
                    stateFile={[fileinputs, setFileInputs]}
                  />
                ))}
            </tbody>
          </table>

          <div className={cx("button")} onClick={handleAddRow}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div className={cx("btn-xoa-wrapper")} onClick={handleDelRow}>
            <div className={cx("button-del")}>
              <ThungRacIcon className={cx("svgIcon")} />
            </div>
          </div>

          <div className={cx("BtnSend-wrapper")}>
            <button className={cx("btn-send")} onClick={handleSendRegister}>
              <div>
                <div className={cx("svg-wrapper")}>
                  <PaperPlaneIcon />
                </div>
              </div>
              <span>Gửi</span>
            </button>
          </div>

          {/* phần ghi chú địa chỉ ngày giờ  */}
        </article>
      </div>
    </>
  );
}

export default FormModelContent;

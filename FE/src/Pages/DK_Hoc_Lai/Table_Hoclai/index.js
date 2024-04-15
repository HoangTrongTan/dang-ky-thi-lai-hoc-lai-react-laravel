import { useRef, useState, useEffect } from "react";
import style from "./Table_Hoclai.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Message, useToaster } from "rsuite";
import * as request from "../../../Compoments/Util";
import { setdataHocAll } from "../../../Compoments/Global/globalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleXmark,
  faClock,
  faFaceSadTear,
} from "@fortawesome/free-solid-svg-icons";
import FormFixInfo from "../../../Compoments/FormFixInfo";
const cx = classNames.bind(style);

function TableHoclai() {
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
    <div>
      <table className={cx("table-thilai")}>
        <thead>
          <tr className={cx("title-heading")}>
            <th>STT</th>
            <th>Tên học phần</th>
            <th>Số tín chỉ</th>
            <th>Kỳ</th>
            <th>Thi</th>
            <th>Điểm lần 1</th>
            <th>Năm</th>
            <th>Ghi chú</th>
            <th>Thời gian</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {allDangkY.map((item, index) => {
            return (
              <>
                <tr
                  key={item.id}
                  className={cx("item-list")}
                  style={
                    item.check_truongkhoa === 1
                      ? { background: "#E3FFB9" }
                      : item.check_truongkhoa === 2
                      ? { background: "#FEAEC0" }
                      : {}
                  }
                >
                  <td>{index + 1}</td>
                  <td>{item.tenhocphan}</td>
                  <td>{item.sotin}</td>
                  <td>{item.ky}</td>
                  <td>{item.loai === 1 ? " Học lại " : " Học cải thiện "}</td>
                  <td>{item.diemdadat}</td>
                  <td>{item.nam}</td>
                  <td>{item.ghichu}</td>
                  <td>{item.thoigian}</td>
                  <td
                    className={cx({
                      "process-title": item.check_truongkhoa === 2,
                    })}
                  >
                    {item.check_truongkhoa === 1 ? (
                      <>
                        {" "}
                        <FontAwesomeIcon icon={faCheck} /> {"Đã phê duyệt"}{" "}
                      </>
                    ) : item.check_truongkhoa === 2 ? (
                      <>
                        <FontAwesomeIcon icon={faFaceSadTear} /> {"không duyệt"}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faClock} /> {"Đợi duyệt"}
                      </>
                    )}
                  </td>
                  {item.check_truongkhoa === 0 && (
                  <div className={cx("nav-btn")}>
                    <button
                      className={cx("btn-xoa")}
                      onClick={() => handleXoaDangKy(item.id)}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>

                    <button
                      className={cx("btn-sua")}
                      onClick={() => handleConfigInfo(item)}
                    >
                      sửa
                    </button>
                  </div>
                )}
                {item.check_truongkhoa === 1 && (
                    <button
                      className={cx("btn-xoa-check-truongkhoa")}
                      onClick={() => handleXoaDangKy(item.id)}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {item.check_truongkhoa === 2 && (
                  <>
                    <div className={cx("nav-btn")}>
                      <button
                        className={cx("btn-xoa")}
                        onClick={() => handleXoaDangKy(item.id)}
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </button>

                      <button
                        className={cx("btn-sua")}
                        onClick={() => handleConfigInfo(item)}
                      >
                        sửa
                      </button>
                    </div>
                    <button
                      className={cx("btn-gui-lai")}
                      onClick={() => handleUnSave(item)}
                    >
                      gửi lại
                    </button>
                  </>
                )}
                </tr>
                
              </>
              
            );
          })}
        </tbody>
      </table>
      {configInfo && (
        <FormFixInfo
          OnSetVisibleFormFixInfo={setConfigInfo}
          OBJ={objsFix.current}
        />
      )}
    </div>
  );
}

export default TableHoclai;

import { useEffect } from "react";
import style from "./ListFile.module.scss";
import classNames from "classnames/bind";
import * as request from "../Util";
import { useDispatch, useSelector } from "react-redux";
import { setdataDataFile } from "../Global/globalSlice";
import { Message, toaster } from "rsuite";
const cx = classNames.bind(style);

function ListFile({ idsinhvien }) {
  const dataFile = useSelector((state) => state.global.dataFile);
  const dispatch = useDispatch();
  const listFile = async () => {
    const res = await request.get("upload/" + idsinhvien);
    dispatch(setdataDataFile(res));
  };
  useEffect(() => {
    listFile();
  }, []);
  const hanldeXoa = async (id) => {
    try {
      await request.del("upload/" + id);
      listFile();
      toaster.push(
        <Message children="Xóa thành công" showIcon type="success" closable />,
        { duration: 3000, placement: "topEnd" }
      );
    } catch (err) {
      console.log(err);
      toaster.push(
        <Message children="Có lỗi xảy ra" showIcon type="error" closable />,
        { duration: 3000, placement: "topEnd" }
      );
    }
  };
  const setText = (e) => {
    if (e.length > 20) {
      const start = e.substr(0, 7);
      const end = e.substr(e.length - 7, e.length - 1);
      return start + "..." + end;
    } else {
      return e;
    }
  };
  return (
    <div className={cx("wrapper")}>
      {dataFile.map((obj, i) => (
        <div key={i} className={cx("card")}>
          <div className={cx("top-section")}>
            <div className={cx("border")}></div>
            <div className={cx("btn-del")} onClick={() => hanldeXoa(obj.id)}>
              &times;
            </div>
            <div style={{padding: "6px"}}>
              <a
                href={`http://localhost:8000/uploads/` + obj.file}
                target="_blank"
              >
                {setText(obj.file)}
              </a>
              <p>{obj.thoigian}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListFile;

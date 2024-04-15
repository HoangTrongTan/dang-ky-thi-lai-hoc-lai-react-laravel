import Tippy from "@tippyjs/react/headless";
import { useEffect, useRef, useState } from "react";
import style from "./RowInfo.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function RowInfo({ STT, state, checkTable, LamMoiInput, stateFile }) {
  const sinhvien =  JSON.parse(localStorage.getItem("userData") ); 
  const [checkInputs, setCheckInputs] = useState({});
  const refFile = useRef();
  const refSpanFile = useRef();
  const [hocKy, setHocKy] = useState(1);
  const [dangKyThi, setDangKyThi] = useState(1);
  const [rowValue, setRowValue] = state;
  const [fileinputs,setFileInputs] = stateFile;

  const checkInputsWhenBlur = (e, ten) => {
    if (e.target.value === "") {
      setCheckInputs((prev) => ({
        ...prev,
        [ten]: true,
      }));
    } else {
      setCheckInputs((prev) => ({
        ...prev,
        [ten]: false,
      }));
    }
  };

  const handleInputTenMon = (e) => {
    const arrNew = rowValue;
    arrNew[STT] = {
      ...arrNew[STT],
      id_sinh_vien: sinhvien[0].tendangnhap,
      tenhocphan: e.target.value,
      ky: hocKy,
      loai: dangKyThi,
    };
    setRowValue(arrNew);
  };

  const setNewArrayWhenRenderComp = (ten, value) => {
    const arrNew = rowValue;
    arrNew[STT] = {
      ...arrNew[STT],
      [ten]: value,
    };
    setRowValue(arrNew);
  };

  useEffect(() => {
    setNewArrayWhenRenderComp("ky", hocKy);
  }, [hocKy]);

  useEffect(() => {
    setNewArrayWhenRenderComp("loai", dangKyThi);
  }, [dangKyThi]);

  const handleInputTinChi = (value) => {
    setNewArrayWhenRenderComp("sotin", value);
  };
  const handleInputDiemThiLan1 = (value) => {
    const arrNew = rowValue;
    if (checkTable === 1) {
      arrNew[STT] = { ...arrNew[STT], diemdadat: value };
    } else {
      arrNew[STT] = { ...arrNew[STT], diemlan1: value };
    }
    setRowValue(arrNew);
  };
  const handleInputGhiChu = (value) => {
    const arrNew = rowValue;
    arrNew[STT] = { ...arrNew[STT], ghichu: value };
    setRowValue(arrNew);
  };
  const getYears = () => {
    const currentyear = new Date().getFullYear();
    const arryear = [];
    for (let index = currentyear - 4; index < currentyear + 1; index++) {
      arryear.push(index);
    }
    return arryear;
  };

  const handleFileInputClick = () => {
    refFile.current.click();
  }
  const handleInputChange = (e) => {
    console.log(e);
    if(!e) return;
    if(e.name.length > 20){
      const start = e.name.substr(0,7);
      const end = e.name.substr(e.name.length - 7,e.name.length - 1)
      refSpanFile.current.innerHTML = start +"..."+end;
    }else{
      refSpanFile.current.innerHTML = e.name;
    }
    const fileinputs_new = fileinputs;
    fileinputs_new[STT] = e;
    setFileInputs(fileinputs_new);
  }
  return (
    <tr className={cx("wapper")}>
      <td>
        <div className={cx("item")}>{STT + 1}</div>
      </td>
      {/* Tên học phần */}
      <td>
        <div className={cx("item")}>
          <div className={cx("form")}>
            <input
              value={LamMoiInput && ""}
              onChange={handleInputTenMon}
              onBlur={(e) => checkInputsWhenBlur(e, "tenhocphan")}
              spellCheck="false"
              className={cx("input", { isrequied: checkInputs.tenhocphan })}
              placeholder="..."
              required=""
              type="text"
            />
            <span
              className={cx("input-border")}
              style={
                checkInputs.tenhocphan
                  ? { background: "red", width: "100%" }
                  : {}
              }
            ></span>
            {checkInputs.tenhocphan && (
              <span className={cx("requied_span")}>bắt buộc !!</span>
            )}
          </div>
        </div>
      </td>
      {/* Số tín chỉ */}
      <td>
        <div className={cx("item")}>
          <div className={cx("form")}>
            <input
              value={LamMoiInput && ""}
              onChange={(e) => handleInputTinChi(e.target.value)}
              onBlur={(e) => checkInputsWhenBlur(e, "tinchi")}
              spellCheck="false"
              className={cx("input", { isrequied: checkInputs.tinchi })}
              placeholder="..."
              required=""
              type="number"
            />
            <span
              className={cx("input-border")}
              style={
                checkInputs.tinchi ? { background: "red", width: "100%" } : {}
              }
            ></span>
            {checkInputs.tinchi && (
              <span className={cx("requied_span")}>bắt buộc!</span>
            )}
          </div>
        </div>
      </td>
      {/* Học kỳ */}
      <td>
        <div className={cx("item")}>
          <Tippy
            interactive
            placement="bottom-start"
            render={(attrs) => (
              <div className={cx("choose-for-item")} style={{ width: 60 }}>
                <button onClick={() => setHocKy(1)}>kì 1</button>
                <button onClick={() => setHocKy(2)}>kì 2</button>
              </div>
            )}
          >
            <div className={cx("choose")}>
              <span>Kì {hocKy}</span>
            </div>
          </Tippy>
        </div>
      </td>
      {/* Năm */}
      <td>
        <div className={cx("item")} style={{ paddingLeft: "10px" }}>
          <select
          className={cx('nam-hoc')}
            onChange={(e) => {
              setNewArrayWhenRenderComp("nam", e.target.value);
            }}
          >
            {getYears().map((ite) => (
              <option key={ite} value={` ${ite} - ${ite+1} `}>
                {` ${ite} - ${ite+1} `}
              </option>
            ))}
          </select>
        </div>
      </td>
      {/* Điểm thi lần 1 */}
      <td>
        <div className={cx("item")}>
          <div className={cx("form")}>
            <input
              onChange={(e) => handleInputDiemThiLan1(e.target.value)}
              onBlur={(e) => checkInputsWhenBlur(e, "diem")}
              spellCheck="false"
              className={cx("input", { isrequied: checkInputs.diem })}
              placeholder="..."
              required=""
              type="number"
            />
            <span
              className={cx("input-border")}
              style={
                checkInputs.diem ? { background: "red", width: "100%" } : {}
              }
            ></span>
            {checkInputs.diem && (
              <span className={cx("requied_span")}>bắt buộc!</span>
            )}
          </div>
        </div>
      </td>
      {/* Đăng kí thi */}
      <td>
        <div className={cx("item")}>
          <Tippy
            interactive
            placement="bottom-start"
            render={(attrs) => (
              <div className={cx("choose-for-item")}>
                <button onClick={() => setDangKyThi(1)}>Lại</button>
                <button onClick={() => setDangKyThi(2)}>Cải thiện</button>
              </div>
            )}
          >
            <div className={cx("choose")}>
              <span>{dangKyThi === 1 ? "Lại" : "Cải thiện"}</span>
            </div>
          </Tippy>
        </div>
      </td>

      
      {/*  */}
      {/* Đăng kí ở ghép với lớp */}
      {checkTable !== 1 && (
        <td>
          <input ref={refFile} type="file" style={{display:"none"}} onChange={(e) => handleInputChange(e.target.files[0])}/>
          <span ref={refSpanFile} onClick={handleFileInputClick}>Chọn tệp</span>
        </td>
      )}
      {/* ghi chú */}
      <td>
        <div className={cx("item")}>
          <div className={cx("form")}>
            <input
              onChange={(e) => handleInputGhiChu(e.target.value)}
              spellCheck="false"
              className={cx("input")}
              placeholder="..."
              required=""
              type="text"
            />
            <span className={cx("input-border")}></span>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default RowInfo;

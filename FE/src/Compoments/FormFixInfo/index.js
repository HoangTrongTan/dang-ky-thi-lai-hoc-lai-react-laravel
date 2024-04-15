import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./FormFixInfo.module.scss";
import classNames from "classnames/bind";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setdataHocAll, setdataThiAll } from "../Global/globalSlice";
import { Message, useToaster } from "rsuite";
import * as request from '../Util'

const cx = classNames.bind(style);

function FormFixInfo({ OnSetVisibleFormFixInfo, OBJ, page = "hoclai" }) {
  
  const sinhvien = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const toaster = useToaster();
  const [years,setYears] = useState([]);
  useEffect( () => {
      const temp = [];
      const times = new Date();
      for(let i = 0;i< 4; i++){
        temp.push( `${times.getFullYear() - i} - ${times.getFullYear() - i - 1 }` )
      }
      setYears([...temp]);
  } , [years.length]);

  const [objInput, setObjInput] = useState({
    id: OBJ.id,
    tenhocphan: OBJ.tenhocphan,
    sotin: OBJ.sotin,
    ky: OBJ.ky,
    diemdadat: OBJ.diemdadat ? OBJ.diemdadat : OBJ.diemlan1 ,
    loai: OBJ.loai,
    ghichu: OBJ.ghichu,
    nam: OBJ.nam,
  });

  const onChangeText = (value, key) => {
    setObjInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const onChangeRadio = (e, key) => {
    if (e.target.checked) {
      setObjInput((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    } else {
      setObjInput((prev) => ({
        ...prev,
      }));
    }
  };

  const handleSendInfoFix = async () => {
    try{
      await request.put( ( (page === "thilai" ? "thi/" : "hoc/") + objInput.id) , objInput );
      OnSetVisibleFormFixInfo(false);
      const response = await request.get((page === "thilai" ? "thi/" : "hoc/") + sinhvien[0].tendangnhap);
      if(page === 'hoclai'){
        dispatch(setdataHocAll(response));
      }else{
        dispatch(setdataThiAll(response));
      }
      toaster.push( <Message showIcon type="success" closable >Sửa thành công</Message> , {
        duration: 3000,
        placement: 'topEnd'
      } );
    }catch(err){
      toaster.push( <Message showIcon type="error" closable >Có lỗi xảy ra</Message> , {
        duration: 3000,
        placement: 'topEnd'
      } );
    }
    
  };

  return (
    <aside className={cx("wrapper")}  >
      <h4 className={cx("title")}>Sửa thông tin</h4>
      <button
        className={cx("btn-close")}
        onClick={() => OnSetVisibleFormFixInfo(false)}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
      <div className={cx("form")}>
        {/* input */}
        <input
          onChange={(e) => onChangeText(e.target.value, "tenhocphan")}
          value={objInput.tenhocphan}
          placeholder="Tên học phần"
          type="text"
          className={cx("input")}
        />
        <span className={cx("input-border")}></span>
        {/* input end */}
      </div>

      <div className={cx("form")}>
        {/* input */}
        <input
          onChange={(e) => onChangeText(e.target.value, "sotin")}
          value={objInput.sotin}
          placeholder="Số tín chỉ"
          type="number"
          className={cx("input")}
        />
        <span className={cx("input-border")}></span>
        {/* input end */}
      </div>

      <div className={cx("select_box")}>
        <div className={cx("box-radio")}>
          <input
            type="radio"
            name="ky"
            className={cx("radio-ky")}
            value="1"
            onChange={(e) => onChangeRadio(e, "ky")}
          />
          <p>kỳ 1</p>
        </div>
        <div className={cx("box-radio")}>
          <input
            type="radio"
            name="ky"
            className={cx("radio-ky")}
            value="2"
            onChange={(e) => onChangeRadio(e, "ky")}
          />
          <p>kỳ 2</p>
        </div>
      </div>

      <div className={cx("form")}>
        {/* input */}
        <input
          onChange={(e) => onChangeText(e.target.value, "diemdadat")}
          value={objInput.diemdadat}
          placeholder="Điểm đã đạt"
          type="number"
          step="0.01"
          className={cx("input")}
        />
        <span className={cx("input-border")}></span>
        {/* input end */}
      </div>

      <div className={cx("select_box")}>
        <div className={cx("box-radio")}>
          <input
            type="radio"
            name="loai"
            value="1"
            className={cx("radio-ky")}
            onChange={(e) => onChangeRadio(e, "loai")}
          />
          <p>Học lại</p>
        </div>
        <div className={cx("box-radio")}>
          <input
            type="radio"
            name="loai"
            value="2"
            className={cx("radio-ky")}
            onChange={(e) => onChangeRadio(e, "loai")}
          />
          <p>Học cải thiện</p>
        </div>
      </div>
      <div className={cx("form")}>
        {/* input */}
        <select
          onChange={(e) => onChangeText(e.target.value, "nam") }
          value={objInput.nam}
        >
          {
            years.map( (obj,index) => {
              return <option key={index} value={obj}>{obj}</option>
            } )
          }
          
        </select>
        <span className={cx("input-border")}></span>
        {/* input end */}
      </div>

      <div className={cx("ghichu-form")}>
        <textarea
          value={objInput.ghichu}
          onChange={(e) => onChangeText(e.target.value, "ghichu")}
          placeholder="Ghi chú"
          className={cx("ghichu-text")}
        ></textarea>
      </div>
      <div className={cx("box-btn-gui")}>
        <button onClick={handleSendInfoFix}>Gửi</button>
      </div>
    </aside>
  );
}

export default FormFixInfo;

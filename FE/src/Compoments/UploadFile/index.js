import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./UploadFile.module.scss";
import classNames from "classnames/bind";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button, Message, toaster } from "rsuite";
import { useRef } from "react";
import { PaperPlaneIcon } from "../icons";
import * as request from "../Util";
import { useDispatch } from "react-redux";
import { setdataDataFile } from "../Global/globalSlice";
import axios from "axios";

const cx = classNames.bind(style);

function UploadFile() {
  const sinhvien = JSON.parse(localStorage.getItem("userData"))[0];
  const dispacth = useDispatch();
  const [open, setOpen] = useState(false);
  const [fileinput, setFileInput] = useState([]);

  const inputFile = useRef();
  const forminputFile = useRef();
  const handleFileInputClick = () => {
    inputFile.current.click();
  };
  const SpanInputFile = (e) => {
    if (e.name.length > 20) {
      const start = e.name.substr(0, 7);
      const end = e.name.substr(e.name.length - 7, e.name.length - 1);
      return start + "..." + end;
    } else {
      return e.name;
    }
  };
  const handleInputChange = (e) => {
    if (!e) return;
    setFileInput((prev) => [...prev, e]);
  };
  const handleUpFile = async () => {
    try {
      await Promise.all(
        fileinput.map(async (ite) => {
          console.log(ite);
          const form = new FormData();
          form.append("file", ite);
          form.append("id", sinhvien.tendangnhap);

          const res_post = await axios.post('http://127.0.0.1:8000/api/upload',form);
          console.log(res_post);
        })
      );
      const res = await request.get('upload/'+sinhvien.tendangnhap);
      dispacth(setdataDataFile(res));
      setFileInput([]);
      toaster.push(<Message showIcon type="success" closable>tải dữ liệu thành công</Message>,{
        duration:3000,
        placement:"topEnd"
      })
    } catch (err) {
      console.error(err);
      toaster.push(<Message showIcon type="error" closable>{err.message}</Message>,{
        duration:3000,
        placement:"topEnd"
      })
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    forminputFile.current.style.border = "4px dashed blue";
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    forminputFile.current.style.border = "1px dashed blue";
  };
  const handeDrop = (e) => {
    e.preventDefault();
    forminputFile.current.style.border = "1px dashed blue";
    const fileobj = Array.from(e.dataTransfer.files);
    // setSpanInputFile(fileobj);
    setFileInput(fileobj);
  };
  const handleDelFile = (id) => {
    setFileInput((prev) => prev.filter((ite, index) => index !== id));
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("btn-wrapper")}>
          <button
            className={cx("upload-btn")}
            onClick={() => setOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faCloudUpload} />
          </button>
          {open && (
            <div className={cx("upload-form")}>
              <div
                className={cx("drag-file")}
                onDragOver={handleDragOver}
                onDrop={handeDrop}
                onDragLeave={handleDragLeave}
                ref={forminputFile}
                onClick={handleFileInputClick}
              >
                <input
                  ref={inputFile}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleInputChange(e.target.files[0])}
                  multiple
                />
                <p>Nhấn hoặc kéo thả tệp vào đây</p>
                {Array.from(fileinput).map((item, index) => (
                  <p key={index}>
                    {SpanInputFile(item)}
                    <span
                      className={cx("btn-del")}
                      onClick={(e) => {
                        handleDelFile(index);
                        e.stopPropagation();
                      }}
                    >
                      &times;
                    </span>
                  </p>
                ))}
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  color="yellow"
                  appearance="primary"
                  endIcon={<PaperPlaneIcon />}
                  onClick={handleUpFile}
                  className={cx("btn-up")}
                >
                  Tải lên
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UploadFile;

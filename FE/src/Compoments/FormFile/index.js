
import style from "./FormFile.module.scss";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import { useEffect } from "react";
import * as req from '../Util';
import { Message, toaster } from "rsuite";
import FormTableThiLai from "../FormTableThiLai";

const cx = classNames.bind(style);
const FormFile = forwardRef((props, ref) => {
  const sinhvien = JSON.parse(localStorage.getItem("userData"))[0];
  const [hoso,setHoSo] = useState([{dienthoai: 0}]);
  const actionsTable = useRef();
  const KHOA = useRef([
    {
      name:"Công nghệ thông tin"
    },
    {
      name:"May và thời trang"
    },
    {
      name:"Cơ khí"
    },
    {
      name:"Thực phẩm"
    },
    {
      name:"Ô tô"
    },
    {
      name:"Điện tử"
    },
  ])
  
 
  const currentDate = new Date();
  useEffect( () => {
    const setDataHoSo = async () => {
      try{
          const res = await req.get("hoso/"+sinhvien.tendangnhap);
          setHoSo(res);
      }catch(err){
        console.log(JSON.stringify(err.message));
        toaster.push(
          <Message showIcon closable type="error">
            lỗi hồ sơ
          </Message>,
          {
            duration: 3000,
            placement: "topEnd",
          }
        );
      }
    };
    setDataHoSo();
  } , []);
  var chuoi = sinhvien.nhom_id;
  // Sử dụng phương pháp split để tách chuỗi
  var mangChuoi = chuoi.split("-");
  var khoadk = mangChuoi[0].substr(2); // "11"
  var lop = mangChuoi[1]; // "CNTT2"
  var khoa = mangChuoi[1].substr(0, mangChuoi[1].length - 1); // "CNTT"
  return (
    <div className={cx("wrapper")}>
      <div
        ref={ref}
        style={{ background: "#fff", padding: "90px 70px 200px 70px" }}
      >
        {/* Tiêu đề */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <p>BỘ CÔNG THƯƠNG</p>
            <p
              style={{
                fontWeight: 900,
                color: "#000",
                margin: 0,
                textDecoration: "underline",
              }}
            >
              <b>TRƯỜNG ĐẠI HỌC SAO ĐỎ</b>
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <p>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
            <p
              style={{
                fontWeight: 900,
                color: "#000",
                margin: 0,
                textDecoration: "underline",
              }}
            >
              <b>Độc lập - Tự do - Hạnh phúc</b>
            </p>
          </div>
        </div>
        {/*  */}
        {/* gửi khoa */}
        <p
          style={{
            textAlign: "center",
            padding: 30,
            color: "#000",
            fontSize: "22px",
          }}
        >
          ĐƠN XIN THI LẠI, THI CẢI THIỆN KẾT QUẢ HỌC TẬP
        </p>
        <div
          style={{
            textAlign: "center",
            margin: "0 0 20px  0",
            fontSize: 20,
          }}
        >
          <span>Kính gửi: Khoa </span>
          <select style={{border:"none", outline:"none", appearance: "none", paddingRight: "20px",cursor:"pointer"}}>
            {
              KHOA.current.map( (obj,index) => {
                return <option key={index}>{obj.name}</option>
              } )
            }
          </select>
        </div>
        {/*  */}
        {/* nhập tên tuổi ...... */}
        <div className={cx("info-text")}>
          <div style={{ fontSize: 20, marginBottom: "10px" }}>
            <span>Tên em là: </span>
            <span>{`${sinhvien.hodem} ${sinhvien.ten}`}</span>&ensp;
            <span>Số điện thoại : </span>
            <span>{hoso[0].dienthoai}</span>
          </div>
          <div style={{ fontSize: 20, marginBottom: "10px" }}>
            <span>Mã sinh viên: </span>
            <span>{sinhvien.tendangnhap}</span>&ensp; <span>Lớp: {lop}&ensp;&ensp; </span>
            <span>Khoá: {khoadk}&ensp;&ensp; </span>
            <span>Khoa: {khoa}&ensp;</span>
          </div>
        </div>
        {/* kết thúc nhập tên tuôi */}
        {/* Lý do */}
        <div style={{ fontSize: 20 }}>
          <p>
            Em viết đơn này xin đăng ký thi lại/thi cải thiện kết quả học tập
            học phần như sau :
          </p>
        </div>
        {/* bảng đăng ký */}
          <FormTableThiLai />
        {/*  */}
        <i style={{ fontSize: 20, marginTop:"20px" }}>
          <b style={{ color: "#000" }}>* Ghi chú:</b> Học phần có kết quả thi
          lần 1 điểm D và D+ mới đủ điều kiện thi cải thiện. Khi đăng ký thi cải
          thiện thành công hệ thống tự động hủy kết quả thi lần 1.
        </i>
        {/* Xác nhận */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
            fontSize: 20,
          }}
        >
          <div className={cx("xac-nhan")}>
            <p style={{ textAlign: "center" }}>
              Chí Linh, ngày {currentDate.getDate()} tháng{" "}
              {currentDate.getMonth() + 1} năm {currentDate.getFullYear()}
            </p>
            <p style={{ textAlign: "center" }}>
              <b>Sinh viên</b>
            </p>
            <br />
            <br />
            <p
              style={{ textAlign: "center" }}
            >{`${sinhvien.hodem} ${sinhvien.ten}`}</p>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
});

export default FormFile;

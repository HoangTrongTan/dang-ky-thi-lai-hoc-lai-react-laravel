import { useDispatch, useSelector } from "react-redux";
import { setdataRowObject } from "../Global/globalSlice";
import { useEffect, useRef, useState } from "react";

function RowThiLai({ stt }) {
  const row = useSelector((state) => state.global.rowObject);
  const [validateDiemLan1, setValidateDiemLan1] = useState({
    text: "",
    min: 0,
    max: 10,
  });

  const dispatch = useDispatch();
  var year = useRef([]);
  useEffect(() => {
    var namHienTai = new Date();
    var temp = [];
    for (var i = 1; i <= 4; i++) {
      temp.push(
        `${parseInt(namHienTai.getFullYear()) - i + 1} - ${
          parseInt(namHienTai.getFullYear()) - i + 2
        }`
      );
    }
    year.current = temp;
  }, []);

  const sv = JSON.parse(localStorage.getItem("userData"))[0];

  const checkValueDiemThi = () => {
    var objectRow = row[stt];

    if (Number(objectRow.loai) === 1) {
      if (objectRow.diemlan1 > 3) {
        setValidateDiemLan1((prev) => ({
          ...prev,
          text: "điểm phải bé hơn 4 !!",
          min: 0,
          max: 4,
        }));
      } else {
        setValidateDiemLan1((prev) => ({
          ...prev,
          text: "",
          min: 0,
          max: 4,
        }));
      }
    } else {
      if (objectRow.diemlan1 > 5 || objectRow.diemlan1 < 4) {
        setValidateDiemLan1((prev) => ({
          ...prev,
          text: "điểm phải lớn hơn 4 và bé hơn 5 !!",
          min: 4,
          max: 5,
        }));
      } else {
        setValidateDiemLan1((prev) => ({
          ...prev,
          text: "",
          min: 4,
          max: 5,
        }));
      }
    }
  };

  useEffect(() => {
    checkValueDiemThi();
  }, [row[stt].diemlan1, row[stt].loai]);

  const setDataObjSv = (filed, value) => {
    console.log(filed, value);
    const arrN = [...row];
    arrN[stt] = {
      ...arrN[stt],
      [filed]: value,
      id_sinh_vien: sv.tendangnhap,
    };
    dispatch(setdataRowObject(arrN));
  };
  const handleSetObjSv = (filed, value) => {
    setDataObjSv(filed, value);
  };
  return (
    <>
      <tr>
        {/* stt */}
        <td
          style={{ border: "1px solid #000", padding: 2, textAlign: "center" }}
        >
          {stt + 1}
        </td>
        {/* Tên học phần */}
        <td style={{ border: "1px solid #000" }}>
          <textarea
            style={{ width: 90, border: 0, paddingLeft: 10, margin: 0 }}
            onChange={(e) => handleSetObjSv("tenhocphan", e.target.value)}
          ></textarea>
        </td>
        {/* Số tín */}
        <td style={{ border: "1px solid #000", padding: 2 }}>
          <input
            type="number"
            style={{
              width: 44,
              paddingLeft: 17,
              border: "none",
              outline: "none",
            }}
            onChange={(e) => handleSetObjSv("sotin", e.target.value)}
          />
        </td>
        {/* Học kỳ */}
        <td style={{ border: "1px solid #000", padding: 2 }}>
          <select
            style={{
              border: "none",
              outline: "none",
              appearance: "none",
              cursor:"pointer"
            }}
            onChange={(e) => handleSetObjSv("ky", e.target.value)}
          >
            <option value={1}>Kỳ 1</option>
            <option value={2}>Kỳ 2</option>
          </select>
        </td>
        {/* năm học */}
        <td style={{ border: "1px solid #000", padding: 2 }}>
          <select
            onChange={(e) => handleSetObjSv("nam", e.target.value)}
            style={{
              border: "none",
              outline: "none",
              appearance: "none",
              padding: "0 7px 0 7px",
              cursor: "pointer",
            }}
          >
            {year.current.map((obj, index) => {
              return (
                <option key={index} value={obj}>
                  {obj}
                </option>
              );
            })}
          </select>
        </td>

        <td
          style={{ border: "1px solid #000", padding: 2, textAlign: "center" }}
        >
          <input
            type="number"
            style={{
              width: 50,
              paddingLeft: 20,
              border: "none",
              outline: "none",
            }}
            min={validateDiemLan1.min}
            max={validateDiemLan1.max}
            onChange={(e) => handleSetObjSv("diemlan1", e.target.value)}
          />
        </td>
        <td style={{ border: "1px solid #000", padding: 2 }}>
          <select
            onChange={(e) => handleSetObjSv("loai", e.target.value)}
            style={{
              border: "none",
              outline: "none",
              appearance: "none",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <option value={1}>Thi Lai</option>
            <option value={2}>Thi cải thiện</option>
          </select>
        </td>
        <td
          style={{ border: "1px solid #000", padding: 2, position: "relative" }}
        >
          <textarea
            style={{ width: 200, border: 0, paddingLeft: 2 }}
            onChange={(e) => handleSetObjSv("ghichu", e.target.value)}
          ></textarea>
          <div
            style={{
              position: "absolute",
              background: "red",
              left: "100%",
              top: "50%",
              transform: "translateY(-50%)",
              marginLeft: 5,
              padding: "0 10px",
              borderRadius: 6,
              color: "#fff",
              transition: "linear all 0.3s",
              height: !validateDiemLan1.text ? 0 : 20,
              width: "250px",
            }}
          >
            <p>{validateDiemLan1.text}</p>
          </div>
        </td>
      </tr>
    </>
  );
}

export default RowThiLai;

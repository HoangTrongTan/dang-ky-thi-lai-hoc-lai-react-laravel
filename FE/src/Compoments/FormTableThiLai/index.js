import { useDispatch, useSelector } from "react-redux";
import RowThiLai from "../RowThiLai";
import { useRef } from "react";
import { setdataRowObject } from "../Global/globalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function FormTableThiLai() {
  const row = useSelector((state) => state.global.rowObject);
  const actionsTable = useRef();
  const dispatch = useDispatch();
  const handleIncresRow = () => {
    const dataOld = { ...row[row.length - 1] };
    dispatch(setdataRowObject([...row, dataOld]));
  };
  const handleDescRow = () => {
    if (row.length === 1) return;
    const newar = [...row];
    newar.pop();
    dispatch(setdataRowObject(newar));
  };
  return (
    <div
      style={{
        position: "relative",
        marginTop: "20px",
        fontSize: "15px",
        marginBottom: "20px",
      }}
      onMouseEnter={() => {
        actionsTable.current.style.right = "-20px";
        actionsTable.current.style.opacity = "1";
      }}
      onMouseLeave={() => {
        actionsTable.current.style.right = "-10px";
        actionsTable.current.style.opacity = "0";
      }}
    >
      <table>
        <thead>
          <tr style={{ fontSize: 15 }}>
            <th style={{ border: "1px solid #000", padding: 2 }}>STT</th>
            <th style={{ border: "1px solid #000", padding: 2 }}>
              Tên Học Phần
            </th>
            <th style={{ border: "1px solid #000", padding: 2 }}>Số tín</th>
            <th style={{ border: "1px solid #000", padding: 2 }}>Học kỳ</th>
            <th style={{ border: "1px solid #000", padding: 2 }}>Năm</th>
            <th style={{ border: "1px solid #000", padding: 2 }}>
              Điểm thi lần 1
            </th>
            <th style={{ border: "1px solid #000", padding: 8 }}>Loại thi</th>
            <th style={{ border: "1px solid #000", padding: "8px 3px" }}>
              Ghi chú
            </th>
          </tr>
        </thead>
        <tbody>
          {row.map((obj, index) => (
            <RowThiLai key={index} stt={index} />
          ))}
        </tbody>
      </table>
      <div
        ref={actionsTable}
        style={{
          position: "absolute",
          zIndex: "100",
          right: "-10px",
          opacity: "0",
          top: "50%",
          transform: "translateY(-50%)",
          transition: "all 0.4s linear",
        }}
      >
        <div
          onClick={handleIncresRow}
          style={{ cursor: "pointer", fontSize: "25px" }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
        <div
          onClick={handleDescRow}
          style={{ cursor: "pointer", fontSize: "25px" }}
        >
          <FontAwesomeIcon icon={faMinusCircle} />
        </div>
      </div>
    </div>
  );
}

export default FormTableThiLai;

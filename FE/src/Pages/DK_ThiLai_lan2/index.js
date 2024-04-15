import "./DK_ThiLai_Lan2.scss";
import FormTableThiLai from "../../Compoments/FormTableThiLai";
import { useDispatch, useSelector } from "react-redux";
import { Button, Message, Modal, toaster } from "rsuite";
import { setdataRowObject } from "../../Compoments/Global/globalSlice";
import InfoVerify from "../PrintFile/InfoVerify";
import { useState } from "react";
import * as request from "../../Compoments/Util";
import * as config from "../../Config";
import * as Services from "../../Services";
function DK_ThiLai_Lan2() {
  const row = useSelector((state) => state.global.rowObject);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const checkData = () => {
    var vlu = true;
    row.map((obj, id) => {
      config.validateFiled.map((ite) => {
        if (!obj[ite.filed] || obj[ite.filed] === "") {
          Services.ToastGenarator(
            "trường " + ite.name + " dòng " + (id + 1) + " bị rỗng",
            3000
          );
          vlu = false;
        }
      });
    });
    return vlu;
  };
  const CheckDiem = () => {
    var vlu = true;
    row.forEach((obj) => {
      if (Number(obj.loai) === 1) {
        if (obj.diemlan1 > 3 || !obj.diemlan1 || obj.diemlan1 === "") {
          Services.ToastGenarator(`điểm phải bé hơn 4 !!`, 3000);
          vlu = false;
        } else {
          if (
            obj.diemlan1 > 5 || obj.diemlan1 < 4 || !obj.diemlan1 ||  obj.diemlan1 === ""
          ) {
            Services.ToastGenarator(`điểm phải lớn hơn 4 và bé hơn 5 !!`, 3000);
            vlu = false;
          }
        }
      }
    });
    return vlu;
  };
  const handleSaveInFo = async () => {
    try {
      if (!CheckDiem()) {
        return;
      }
      if (!checkData()) {
        return;
      }
      console.log("vào vào");
      await Promise.all(
        row.map(async (obj, index) => {
          await request.post("thi", obj);
        })
      );
      toaster.push(
        <Message showIcon closable type="success">
          cập nhật dữ liệu thành công
        </Message>,
        {
          duration: 5000,
          placement: "topEnd",
        }
      );
      dispatch(setdataRowObject([{}]));
    } catch (err) {
      console.log(JSON.stringify(err));
      toaster.push(
        <Message showIcon closable type="error">
          cập nhật dữ liệu không thành công
        </Message>,
        {
          duration: 3000,
          placement: "topEnd",
        }
      );
    }
  };
  return (
    <div className="wrapper-DK_ThiLai_Lan2">
      <h3>Đăng ký thi lần 2</h3>
      <Button onClick={handleOpenModal} appearance="primary">
        Lưu thông tin
      </Button>
      <div className="FormTableThiLai--table">
        <FormTableThiLai />
      </div>
      <Modal
        backdrop={"static"}
        keyboard={false}
        open={openModal}
        onClose={handleCloseModal}
      >
        <Modal.Title style={{ textAlign: "center", fontWeight: "bolder" }}>
          Xác nhận lại các thông tin !!
        </Modal.Title>
        <Modal.Body>
          <InfoVerify data={row} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveInFo} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleCloseModal} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DK_ThiLai_Lan2;

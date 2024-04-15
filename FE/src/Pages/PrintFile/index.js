import ReactToPrint from "react-to-print";
import FormFile from "../../Compoments/FormFile";
import style from "./PrintFile.module.scss";
import classNames from "classnames/bind";
import { Button, Message, Modal, toaster } from "rsuite";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as request from "../../Compoments/Util";
import { setdataRowObject } from "../../Compoments/Global/globalSlice";
import InfoVerify from "./InfoVerify";
import * as config from "../../Config";
import * as Services from "../../Services";
const cx = classNames.bind(style);
function PrintFile() {
  const fileToCreate = useRef();
  const objSv = useSelector((state) => state.global.rowObject);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleBeforePrint = () => {
    console.log("before print");
  };
  const handleAfterprint = async (success) => {
    console.log("after print");
    // console.log(objSv, "thành công hay khôgn",success);
  };
  const checkData = () => {
    var vlu = true;
    objSv.map((obj, id) => {
      config.validateFiled.map((ite) => {
        if (!obj[ite.filed] || obj[ite.filed] === "") {
          console.log(ite.name);
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
    objSv.forEach((obj) => {
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
        objSv.map(async (obj, index) => {
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
    <div className={cx("wrapper")}>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
      >
        <Button
          style={{ display: "inline-block" }}
          appearance="primary"
          onClick={handleOpenModal}
        >
          Lưu thông tin đăng ký
        </Button>
      </div>
      <ReactToPrint
        trigger={() => (
          <div className={cx("btn-xuat-file")}>
            <Button appearance="primary">In File</Button>
          </div>
        )}
        content={() => fileToCreate.current}
        onBeforePrint={handleBeforePrint}
        onAfterPrint={handleAfterprint}
        onClose={() => {
          console.log("cancelllllllllllllllllll");
        }}
      />

      <FormFile ref={fileToCreate} />
      <Modal
        backdrop={"static"}
        keyboard={false}
        open={openModal}
        onClose={handleCloseModal}
      >
        <Modal.Title>
          <h3 style={{ textAlign: "center" }}>Xác nhận lại các thông tin !!</h3>
        </Modal.Title>
        <Modal.Body>
          <InfoVerify data={objSv} />
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

export default PrintFile;

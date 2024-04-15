import { Message, toaster } from "rsuite";

function ToastGenarator(text, duration) {
    toaster.push(
        <Message showIcon closable type="warning">
          {text}
        </Message>,
        {
          duration: duration,
          placement: "topEnd",
        }
      );
}
export {ToastGenarator};
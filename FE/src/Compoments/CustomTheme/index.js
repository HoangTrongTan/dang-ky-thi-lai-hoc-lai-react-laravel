import style from "./CustomTheme.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
function CustomTheme({ children , theme}) {

  return <div className={cx(theme)} >
    {children}
  </div>;
}

export default CustomTheme;

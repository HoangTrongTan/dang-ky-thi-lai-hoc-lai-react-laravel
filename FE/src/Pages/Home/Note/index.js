import { faAngleRight, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import style from "../Home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
function Note({compoment , title , height}) {
    const [dropdown,setDropdown] = useState(false);
    return ( 

        <div className={cx('note')}>
                <button
                    onClick={() => setDropdown(!dropdown)}
                >
                    <FontAwesomeIcon icon={faChalkboardUser} />
                    <p>{title}</p>
                    <FontAwesomeIcon icon={faAngleRight} className={cx( 'turn' ,{'spin':dropdown} )} />
                </button>
                <div className={cx('text')} style={{height:dropdown && height}} >
                    {/* <TextNoteHocLai /> */}
                    {compoment}
                </div>
            </div>
     );
}

export default Note;
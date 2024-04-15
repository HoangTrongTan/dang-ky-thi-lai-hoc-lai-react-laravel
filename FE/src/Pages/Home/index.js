import { Carousel } from "rsuite";
import { imgHomes } from "../../Compoments/ImageHomeConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faChevronLeft,
  faChevronRight,
  faHandPointDown,
} from "@fortawesome/free-solid-svg-icons";
import { faLeanpub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { PinIcon } from "../../Compoments/icons";
import Note from "./Note";
import { TextNoteHocLai, TextNoteThiLai } from "./TextNote";
import { useState } from "react";
import { useEffect } from "react";

import style from "./Home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

function Home() {
  var userGlobal = {};
  try{
    userGlobal = JSON.parse(localStorage.getItem('userData'))[0];
  }catch(err){
    userGlobal = {};
  }
  if(userGlobal === undefined ?? userGlobal === null){
    userGlobal = {};
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [noteTextWidth,setNotTextWidth] = useState({noteWidthThiLai: 30, noteWidthHocLai: 170});
  const handleNext = () => {
    // Tăng chỉ số trang hiện tại lên 
    setActiveIndex((prevIndex) => (prevIndex - 1 + numberOfSlides) % numberOfSlides);
    
  };
  useEffect(() => {
    // Tự động chuyển trang sau một khoảng thời gian
    const interval = setInterval(handlePrevious, 5000); // Chuyển trang mỗi 5 giây
    
    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);
  useEffect( () => {
    const setResizeNoteTextWidth = (thilai, hoclai) => {
        setNotTextWidth( prev => ({
          ...prev,
          noteWidthThiLai: thilai,
          noteWidthHocLai: hoclai
      }) )
    }
    window.onresize = () => {
      console.log("mobile");
      var width = window.innerWidth
      if(width < 480){
          setResizeNoteTextWidth(100,450);
      }else if(width > 500 && width < 1025){
          setResizeNoteTextWidth(40,190);
      }else{
        setResizeNoteTextWidth(30,170);
      }
    }
    return () => {
      window.onresize = null;
    };
  } , [])
  // console.log(noteTextWidth);
  const handlePrevious = () => {
    // Giảm chỉ số trang hiện tại đi 1
    setActiveIndex((prevIndex) => (prevIndex + 1) % numberOfSlides);
  };
  const numberOfSlides = imgHomes.length;
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("wrapper1")}>
          <aside className={cx("wrapper-carousel")}>
            <Carousel
              autoplay
              activeIndex={activeIndex}
              onSelect={(index) => setActiveIndex(index)}
              style={{ zIndex: -1 }}
              className={cx("wrapper-img")}
              shape="bar"
            >
              {imgHomes.map((obj, index) => (
                <img key={index} src={obj.img} alt={obj.img} />
              ))}
            </Carousel>

            <button className={cx("btn-carousel1")} onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronLeft} className={cx("icon")} />
            </button>
            <button className={cx("btn-carousel2")} onClick={handlePrevious}>
              <FontAwesomeIcon icon={faChevronRight} className={cx("icon")} />
            </button>
          </aside>

          <main className={cx("link-to-page")} >
            <h4 className={cx("title")}>
              Sinh viên có thể đăng ký tại đây
              <FontAwesomeIcon className={cx("icon")} icon={faHandPointDown} />
            </h4>
            <div className={cx("link-btn")}>
              <Link className={cx("card-link")} to={Object.keys(userGlobal).length > 0 ?  "/hoclai" : ""} >
                <FontAwesomeIcon className={cx("icon-link")} icon={faLeanpub} />
                <h5>Học lại cải thiện</h5>
                <i className={cx('animation')} ></i>
              </Link>
              <Link className={cx("card-link")}  to={Object.keys(userGlobal).length > 0 ?  "/thilai" : ""}>
                <FontAwesomeIcon
                  className={cx("icon-link")}
                  icon={faChalkboardUser}
                />
                <h5>Thi lại cải thiện</h5>
                <i className={cx('animation')}></i>
              </Link>
            </div>
            <PinIcon className={cx("pin-icon")} width="1.5em" height="1.5em" />
          </main>

        </div>

        <main className={cx("wrapper2")}>
          <Note
            compoment={<TextNoteHocLai />}
            title={"Chú ý khi đăng kí học lại"}
            height={noteTextWidth.noteWidthHocLai}
            // 170
          />
          <Note
            compoment={<TextNoteThiLai />}
            title={"Chú ý khi đăng kí thi lại"}
            height={noteTextWidth.noteWidthThiLai}
            // 30
          />
        </main>
      </div>
    </>
  );
}

export default Home;

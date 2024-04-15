import "./Globalstyle/Globalstyle.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Compoments/Layout/DefaultLayout";
import routes from "./Routes";
import { CustomProvider } from "rsuite";
import { useSelector } from "react-redux";
import CustomTheme from "./Compoments/CustomTheme";

function App() {
  const themeGlobal = useSelector(state => state.global.theme);
  return (
    <Router>
      <Routes>
        {routes.map((obj, index) => {
          let Comp = obj.compoment;
          let Layout = obj.layout;
          if(obj.layout){
            Layout = obj.layout;
          }else{
            Layout = DefaultLayout;
          }
          return (
            <Route
              key={index}
              path={obj.path}
              element={
                <CustomTheme theme={themeGlobal}>
                  <Layout isHome={!obj.path.split("/").join("")}>
                    {Comp && <Comp />}
                  </Layout>
                </CustomTheme>
              }
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;

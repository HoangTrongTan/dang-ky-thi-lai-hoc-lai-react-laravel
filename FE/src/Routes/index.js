import NoMenu from "../Compoments/Layout/NoMenu";
import DK_Hoc_Lai from "../Pages/DK_Hoc_Lai";
import DK_ThiLai_Lan2 from "../Pages/DK_ThiLai_lan2";
import DK_Thi_Lai from "../Pages/DK_Thi_Lai";
import Home from "../Pages/Home";
import PrintFile from "../Pages/PrintFile";
const routes = [
    {
        path:'/', compoment:Home
    },
    {
        path:'/thilai', compoment:DK_Thi_Lai
    },
    {
        path:"/hoclai", compoment:DK_Hoc_Lai,
    },
    {
        path:"/prf", compoment:PrintFile, layout:NoMenu
    },
    {
        path:"/dkthi2", compoment:DK_ThiLai_Lan2
    },
]
export default routes;
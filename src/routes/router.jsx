import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/public/loginPage";
import { Layout } from "../pages/private/layout";
import { Dashboard } from "../pages/private/dashboard";
import { Services } from "../pages/private/services";
import { Colaborators } from "../pages/private/colaborators";
import { Forms } from "../pages/private/forms";
import FormsWelcomePage from "../pages/public/formsWelcomePage";
import FormsTermsConditionsPage from "../pages/public/formsTermsConditionsPage";
import FormsClientInfosPage from "../pages/public/formsClientInfosPage";
import FormsServicesPage from "../pages/public/formsServicesPage";
import FormsSubmitPage from "../pages/public/formsSubmitPage";
import { useContext } from "react";
import { UsersContext } from "../contexts/userContext";
<<<<<<< HEAD
=======
import ChatPartners from "../pages/private/chatPartners";
import ChatCheckins from "../pages/private/chatCheckins";
>>>>>>> 3e586fecf93bed95ec346097d78e902133aeb56e

export default function Routers() {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={
                <ProtectedRouteGuard>
                    <Layout/>
                </ProtectedRouteGuard>
            }>

                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="services" element={<Services/>}/>
                <Route path="colaborators" element={<Colaborators/>}/>
                <Route path="forms" element={<Forms/>}/>
<<<<<<< HEAD
=======
                <Route path="/chat/partners" element={<ChatPartners/>}/>
                <Route path="/chat/checkins" element={<ChatCheckins/>}/>
>>>>>>> 3e586fecf93bed95ec346097d78e902133aeb56e
            </Route>

            <Route path="/forms/:formIdentify" element={<FormsWelcomePage/>}/>
            <Route path="/forms/:formIdentify/terms" element={<FormsTermsConditionsPage/>}/>
            <Route path="/forms/:formIdentify/infos" element={<FormsClientInfosPage/>}/>
            <Route path="/forms/:formIdentify/services" element={<FormsServicesPage/>}/>
            <Route path="/forms/:formIdentify/submit" element={<FormsSubmitPage/>}/>
        </Routes>
    </BrowserRouter>
    )
};


function ProtectedRouteGuard({ children }) {
    const { setToken, verifyToken, token  } = useContext(UsersContext);

    const localToken = localStorage.getItem('token');

    let hasToken = false;
    
    if(!token){
        if(localToken){
            hasToken = verifyToken(localToken);
            if(hasToken) setToken(localToken);
        }
    }

    if (hasToken) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
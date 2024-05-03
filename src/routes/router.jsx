import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default function Routers() {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Layout/>}>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="services" element={<Services/>}/>
                <Route path="colaborators" element={<Colaborators/>}/>
                <Route path="forms" element={<Forms/>}/>
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

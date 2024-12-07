import { GlobalStyle } from "./styles/globalStyle";
import Routers from "./routes/router";
import styled from "styled-components";
import { UserContextProvider } from "./contexts/userContext";
import { ServicesContextProvider } from "./contexts/servicesContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormsContextProvider } from "./contexts/formsContext";
import { GlobalContextProvider } from "./contexts/globalContext";
<<<<<<< HEAD
=======
import './assets/index.css';
>>>>>>> 3e586fecf93bed95ec346097d78e902133aeb56e

function App() {
  return (
    <>
    <GlobalContextProvider>
        <UserContextProvider>
          <ServicesContextProvider>
            <FormsContextProvider>
              <FontFamilyGlobal>
                <GlobalStyle/>
                <Routers/>
              </FontFamilyGlobal>
            </FormsContextProvider>
          </ServicesContextProvider>
        </UserContextProvider>
      </GlobalContextProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;

const FontFamilyGlobal = styled.div`

font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`;

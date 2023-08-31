import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./Router/Layout";
import ProtectRouters from "./Router/ProtectRouters";
import Auth from "./Pages/AuthPage/Auth";

function App() {
  return (
    <>

        <Routes>
          <Route path={'/'} element={
            <ProtectRouters><Layout></Layout></ProtectRouters>
          }></Route>
          <Route path={'login'} element={<Auth/>}></Route>

        </Routes>

    </>
  );
}

export default App;

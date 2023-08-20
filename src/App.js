
import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./Router/Layout";

function App() {
  return (
   <>
     <Routes>
       <Route path={'/'} element={<Layout/>}>

       </Route>
     </Routes>
   </>
  );
}

export default App;

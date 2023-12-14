import { Route, Routes } from "react-router-dom";
import LeftComponent from "../areas/Left";
import MainComponent from "../areas/Main";
import RightComponent from "../areas/Right";
import NewQuestion from "./NewQuestion";

const Home = () => {
   return (
      <div className="container">
         <div className="row">
            <div className="col-md-2">
               <LeftComponent />
            </div>
            <div className="col-md-8">
               <Routes>
                  <Route path="/" element={<MainComponent />} />
                  <Route path="/question" element={<NewQuestion />} />
               </Routes>
            </div>
            <div className="col-md-2">
               <RightComponent />
            </div>
         </div>
      </div>
   );
};

export default Home;

import "./App.css";
import Home from "./components/routes/Home";
import Navigation from "./components/areas/Navigation";

function App() {
   return (
      <div className="container-xxl">
         <div className="row">
            <Navigation />
         </div>
         <div className="row">
            <Home />
         </div>
      </div>
   );
}

export default App;

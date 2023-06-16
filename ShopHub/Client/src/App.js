import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NAvbar from "./Components/NAvbar";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Start from "./Page/Start";
import Registration from "./Components/Registration";
import UserCard from "./Components/UserCard";
import Alert from "./Components/Alert";
import { CartState } from "./context/ContextCart";
import NoNavbar from "./Components/NoNavbar";
import ForgotPass from "./Components/ForgotPass";

// import Productdata from "./Productdata";

function App() {
  const { alert } = CartState();
  return (
    <div>
      <BrowserRouter>
        <div
          className="fixed-top"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            {!localStorage.getItem("token") ? <NoNavbar /> : <NAvbar />}
          </div>
          <div>
            <Alert alert={alert} />
          </div>
        </div>

        <div style={{ paddingTop: "80px" }}>
          <Routes>
            <Route exact path="/" element={<Start />} />
            <Route exact path="/signup" element={<Registration />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/user" element={<UserCard />} />
            <Route exact path="/forgotpass" element={<ForgotPass />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

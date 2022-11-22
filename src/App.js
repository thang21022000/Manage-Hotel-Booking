import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hotelInputs, orderInputsUpdate, productInputs, roomInputs, roomInputsDelete, userInputs, userInputsUpdate } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelsColumns, OrderColumns, roomsColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import DeleteRooom from "./pages/deleteRoom/DeleteRoom";
import SingleHotel from "./pages/singleHotel/SingleHotel";
import SingleRoom from "./pages/singleRoom/SingleRoom";
import UpdateUser from "./pages/updateUser/UpdateUser";
import UpdateHotel from "./pages/updateHotel/UpdateHotel";
import UpdateRoom from "./pages/updateRoom/UpdateRoom";
import SingleOrder from "./pages/singleOrder/SingleOrder";
import UpdateOrder from "./pages/updateOrder/UpdateOrder";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {user} = useContext(AuthContext)

  const ProtectedRoute =({children}) => {
    if(!user) {
      return <Navigate to="/login"/>
    }
    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="users">
              <Route index element={<ProtectedRoute><List columns={userColumns}/></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>}
              />
              <Route
                path="update/:id"
                element={<ProtectedRoute><UpdateUser inputs={userInputsUpdate} title="Update User" /></ProtectedRoute>}
              />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute><List columns={hotelsColumns}/></ProtectedRoute>} />
              <Route path=":hotelId" element={<ProtectedRoute><SingleHotel /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewHotel inputs={hotelInputs} title="Add New Hotel" /></ProtectedRoute>}
              />
              <Route
                path="update/:hotelid"
                element={<ProtectedRoute><UpdateHotel inputs={hotelInputs} title="Update Hotel" /></ProtectedRoute>}
              />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoute><List columns={roomsColumns}/></ProtectedRoute>} />
              <Route path=":rooomId" element={<ProtectedRoute><SingleRoom /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewRoom inputs={roomInputs} title="Add New Room" /></ProtectedRoute>}
              />
              <Route
                path="update/:id"
                element={<ProtectedRoute><UpdateRoom inputs={roomInputs} title="Update Room" /></ProtectedRoute>}
              />
              <Route
                path="delete/:id"
                element={<ProtectedRoute><DeleteRooom inputs={roomInputsDelete} title="Delete Room" /></ProtectedRoute>}
              />
            </Route>
            <Route path="orders">
              <Route index element={<ProtectedRoute><List columns={OrderColumns}/></ProtectedRoute>} />
              <Route path=":orderId" element={<ProtectedRoute><SingleOrder /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewRoom inputs={roomInputs} title="Add New Room" /></ProtectedRoute>}
              />
              <Route
                path="update/:id"
                element={<ProtectedRoute><UpdateOrder inputs={orderInputsUpdate} title="Update Order" /></ProtectedRoute>}
              />
              <Route
                path="delete/:id"
                element={<ProtectedRoute><DeleteRooom inputs={roomInputsDelete} title="Delete Room" /></ProtectedRoute>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

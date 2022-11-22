import "./updateroom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios  from "axios";
import useFetch from "../../hook/useFetch";
import { useLocation, useNavigate } from "react-router-dom";


const UpdateRoom = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [infoUpdate, setInfoUpdate] = useState({});
  const {data, loading, error} = useFetch("/hotels");
  const [numberOfRooms, setNumberOfRooms] = useState();

  const location = useLocation();
  const info = location.state;

  const HandleOnchange = (e) => {
    setInfoUpdate((prev) => {
      return {...prev, [e.target.id]: e.target.value}
    })
  }

  const HandleOnclick = async (e) => {
    e.preventDefault();
    try {
      const newRoom = {...infoUpdate}
      await axios.put(`/rooms/${info._id}`, newRoom);
      navigate("/rooms")
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} defaultValue={info[input.id]} onChange={(e) => HandleOnchange(e)} id={input.id}/>
                </div>
              ))}
              {/* <div className="formInput" >
                  <label>Number of Room</label>
                  <textarea 
                    rows={3} style={{width: "100%"}} 
                    onChange={(e) => setInfoUpdate(prev => { return {...prev, roomNumber:e.target.value}})} 
                    // defaultValue={info.roomNumber.map(room => room.number)} 
                  />
                </div> */}
              <button onClick={HandleOnclick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;

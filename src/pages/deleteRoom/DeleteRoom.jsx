import "./deleteroom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios  from "axios";
import useFetch from "../../hook/useFetch";
import { useLocation, useNavigate } from "react-router-dom";


const DeleteRoom = ({ inputs, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[3];

  const {data, loading, error} = useFetch(`/rooms/gethotels/${id}`);
  const room = useFetch(`/rooms/${id}`);
  console.log(data)
  const [hotelId, setHotelId] = useState("");



  const HandleOnclick = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/rooms/${id}/${hotelId}`);
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
                  <input type={input.type} placeholder={input.placeholder} value={room.data.title} disabled id={input.id}/>
                </div>
              ))}
              <div className="formInput" >
                <label>Hotel</label>
                <select onChange={(e) => setHotelId(e.target.value)}>
                  {loading ? "loading" : data.map(hotel => (
                    <option value={hotel._id} key={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={HandleOnclick}>Delete</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoom;

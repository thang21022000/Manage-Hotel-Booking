import "./updatehotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios  from "axios";
import useFetch from "../../hook/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select'

const UpdateHotel = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  
  const optionsFetured = [
    {label:"Yes", value:"true"},
    {label:"No", value:"false"}
  ]
  
  const optionsTypes = [
    {label:"Whole Room", value:"wholeroom"},
    {label:"Private Room", value:"privateroom"},
    {label:"Hotel Room", value:"hotelroom"},
  ]
  
  const [services, setServices] = useState("")

  const { data, loading, error } = useFetch("/rooms");
  const [rooms, setRooms] = useState([])
  const optionsRooms = data.map(room => ({label:room.title, value:room._id}))
  

  const location = useLocation();
  const info = location.state
  const [infoUpdate, setInfoUpdate] = useState({}); 
  console.log("infoUpdate",infoUpdate)
  const HandleOnchange = (e) => {
    setInfoUpdate((prev) => {
      return {...prev, [e.target.id]: e.target.value}
    })
  }

  const HandleSelect = (e) => {
    const listOPtions = Array.from(e , (option) => option.value)
    setInfoUpdate(prev => {return {...prev, rooms: listOPtions}});    
  }

  const HandleOnclick = async (e) => {
    e.preventDefault();
    const servicesOfRoom = [];

    if(services) {
      const servicesList = services.split(',');
      const servicesAfter = servicesList.map(
        service => (service.split(":")
        )
      )
      servicesAfter.map(service => servicesOfRoom.push(({service: service[0], fee: service[1]})))
    }
    
    if(files !== "") {
      try {
        const photoList = await Promise.all(Object.values(files).map(async file => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset","upload");
        const resUpload = await axios.post("https://api.cloudinary.com/v1_1/dbwpsbsg6/image/upload", data);
        
        // destructure
        const {url} = resUpload.data
  
        return url
  
        }))
        const newHotel = {...infoUpdate, rooms, photo: photoList};
        
        await axios.put(`/hotels/${info._id}`, newHotel);
        navigate("/hotels");
  
      }catch(err) {console.log(err)}
    } else {
      await axios.put(`/hotels/${info._id}`, infoUpdate);
      navigate("/hotels");
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
                  <input 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    onChange={(e) => HandleOnchange(e)} 
                    id={input.id}
                    defaultValue = {info ? info[input.id] :""}
                  />
                </div>
              ))}
               <div className="formInput">
                  <label>Types of rooms</label>
                  <Select 
                    options={optionsTypes}
                    defaultValue={optionsTypes.filter(option => option.value === info.type)}
                    onChange={option => setInfoUpdate(prev => { return {...prev, "type" : option.value }})}
                    inputId="type"
                  />
                  
                </div>
                <div className="formInput">
                  <label>Featured</label>
                  <Select 
                    options={optionsFetured} 
                    defaultValue={info.type ? {label:"Yes",value:info.type} :{label:"No", value:info.type}}
                    onChange={option => setInfoUpdate(prev => { return {...prev, "featured" : option.value }})}
                  />

                </div>
              <button onClick={HandleOnclick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHotel;

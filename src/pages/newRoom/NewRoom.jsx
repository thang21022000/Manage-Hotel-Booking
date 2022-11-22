import "./newroom.scss";
import { useState } from "react";
import axios  from "axios";
import useFetch from "../../hook/useFetch";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Select from 'react-select'

const NewRoom = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const {data, loading} = useFetch("/hotels");
  const [hotelId, setHotelId] = useState("");
  const [files, setFiles] = useState("");
  const [facilities, setFacilities] = useState([]);
  console.log("facilities",facilities);
  const HandleOnchange = (e) => {
    setInfo((prev) => {
      return {...prev, [e.target.id]: e.target.value}
    })
  }

  const HandleOnclick = async (e) => {
    e.preventDefault();
    
    if(files) {
        const photoList = await Promise.all(Object.values(files).map(async file => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset","upload");
          const resUpload = await axios.post("https://api.cloudinary.com/v1_1/dbwpsbsg6/image/upload", data);
          
          // destructure
          const {url} = resUpload.data
          return url
          }
        ))
      try {
        const newRoom = {...info, photo: photoList, facilities: facilities}
        await axios.post(`/rooms/${hotelId}`, newRoom);
        navigate("/rooms")
      }catch(err) {
        console.log(err);
      }
    } else {
      try {
        const newRoom = {...info, facilities: facilities}
        await axios.post(`/rooms/${hotelId}`, newRoom);
        navigate("/rooms")
        console.log(newRoom)
      }catch(err) {
        console.log(err);
      }
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
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <h3 className="form-title">Thông tin</h3>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => {setFiles(e.target.files)
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput" >
                <label>Hotel</label>
                <Select options={
                  data.map(hotel => {
                    return {value: hotel._id, label: hotel.name}
                  })}
                  onChange={e => setHotelId(e.value)} 
                />
                {/* <select onChange={(e) => setHotelId(e.target.value)}>
                  {loading ? "loading" : data.map(hotel => (
                    <option value={hotel._id} key={hotel._id}>{hotel.name}</option>
                  ))}
                </select> */}
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={(e) => HandleOnchange(e)} id={input.id}/>
                </div>
              ))}
              <h3 className="form-title">Tiện nghi</h3>
              <div className="formInput" >
                <label>Wifi</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'wifi', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <div className="formInput" >
                <label>Nhà bếp</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'kitchen', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <div className="formInput" >
                <label>Điều hòa</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'airconditioner', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <div className="formInput" >
                <label>Nơi đổ xe</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'park', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <div className="formInput" >
                <label>TV</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'tv', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <div className="formInput" >
                <label>Được phép hút thuốc</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'smokingAllowed', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <div className="formInput" >
                <label>Được phép thú cưng</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'petAllowed', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <div className="formInput" >
                <label>Tủ lạnh</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'refrigerator', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <div className="formInput" >
                <label>Hồ bơi</label>
                <Select onChange={(e) => setFacilities(prev => { return [...prev, {option: 'pool', value: e.value}]} )}
                  options={[{value: "true",label: "Yes"},{value: "false",label: "No"}]}
                />
              </div>
              <button onClick={HandleOnclick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;

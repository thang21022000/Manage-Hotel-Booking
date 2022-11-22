import "./updateuser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios  from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";


const UpdateUser = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [infoUpdate, setInfoUpdate] = useState({})

  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const { data } = useFetch(`/users/${userId}`);

  console.log(infoUpdate)
  useEffect(() => {
    setInfo(data);
  }, [data])
  
  const HandleOnchange = (e) => {
    setInfoUpdate((prev) => {
      return {...prev, [e.target.id]: e.target.value}
    })
  }


  const HandleOnclick = async (e) => {
    e.preventDefault();
    if(file !== "") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset","upload");

      try {
        const resUpload = await axios.post("https://api.cloudinary.com/v1_1/dbwpsbsg6/image/upload", data);
        
        // destructure
        const {url} = resUpload.data
        const newUser = {...infoUpdate, image: url}

        await axios.put(`/users/${userId}`, newUser);
        navigate("/users");
        
      }catch(err) { 
        console.log(err);
      }
    } else {
      try {        
        await axios.put(`/users/${userId}`, infoUpdate);
        navigate("/users");
        
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
                file
                  ? URL.createObjectURL(file)
                  : info.image
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} defaultValue={info ? info[input.id] : ""} onChange={(e) => HandleOnchange(e)} id={input.id}/>
                </div>
              ))}
              <button onClick={HandleOnclick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

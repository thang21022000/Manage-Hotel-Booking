import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";


const New = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  console.log(info)
  const HandleOnchange = (e) => {
    setInfo((prev) => {
      return {...prev, [e.target.id]: e.target.value}
    })
  }
  console.log("info", info)
  
  const HandleOnclick = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset","upload");

    try {
      const resUpload = await axios.post("https://api.cloudinary.com/v1_1/dbwpsbsg6/image/upload", data);
      
      // destructure
      const {url} = resUpload.data
      const newUser = {...info, image: url}

      await axios.post("/auth/register", newUser);
      navigate("/users");
      
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
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                  <input type={input.type} placeholder={input.placeholder} onChange={(e) => HandleOnchange(e)} id={input.id}/>
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

export default New;

import "./newhotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";


const NewHotel = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [featured, setFeatured] = useState(false)
  const [type, setType] = useState()

  const HandleOnchange = (e) => {
    setInfo((prev) => {
      return {...prev, [e.target.id]: e.target.value}
    })
  }
  // const HandleSelect = (e) => {
  //   const listOPtions = Array.from(e.target.selectedOptions , (option) => option.value)
  //   setRooms(listOPtions);
  // }

  const HandleOnclick = async (e) => {
    e.preventDefault();

    try {
      const newHotel = {...info, type:type, featured:featured};
      await axios.post("/hotels", newHotel);
      navigate("/hotels");

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
                  <input 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    onChange={(e) => HandleOnchange(e)} 
                    id={input.id}
                  />
                </div>
              ))}
               <div className="formInput">
                  <label>Type</label>
                  <select onChange={(e) => setType(e.target.value)}>
                    <option  value="wholeroom" defaultValue="wholeroom" >Whole room</option>
                    <option  value="privateroom" >Private room</option>
                    <option  value="hotelroom" >Hotel room</option>
                  </select>
                </div>
                <div className="formInput">
                  <label>Featured</label>
                  <select onChange={(e) => setFeatured(e.target.value)}>
                    <option  value="false" defaultValue={false}>No</option>
                    <option  value="true">Yes</option>
                  </select>
                </div>
              <button onClick={HandleOnclick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;

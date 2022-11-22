import "./singleroom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import Slider from "../../components/slider/Slider"

const SingleRoom = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const roomId = location.pathname.split("/")[2];
  const {data} = useFetch(`/rooms/${roomId}`);
  
  console.log(data)

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => navigate(`/rooms/update/${roomId}`, {state: data})}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{data.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Desciption:</span>
                  <span className="itemValue">{data.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data.price && data.price.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Max people:</span>
                  <span className="itemValue">{data.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Facilities:</span>
                  <table>
                    {data.facilities && data.facilities.map(facility => (
                      <>
                        <tr>
                          <th style={{textTransform: "capitalize" , textAlign: "left"}}>{facility.option}: </th>  
                          <td>{facility.value ? "Yes" : "No" }</td>
                        </tr>
                      </>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
            {data.photo && <Slider
              image={data.photo}
              id={data._id} 
            /> }
          </div>
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default SingleRoom;

import "./singleorder.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import {format} from "date-fns";
import Slider from "../../components/slider/Slider"

const SingleOrder = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const orderId = location.pathname.split("/")[2];

  const { data, loading } = useFetch(`/orders/${orderId}`);
  console.log(data)

  return (
    <div className="single"> 
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => navigate(`/orders/update/${orderId}`, {state: data})}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              {data.user && <img 
                src={data.user.image}
                alt=""
                className="itemImg"
              />}
              
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
            {data.user && <div className="details">
                <h1 className="itemTitle">{data.user.username}</h1>
                <hr />
                <h3>User</h3>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.user.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data.user.city}</span>
                </div>
                <hr />
                <h3>Order</h3>
                {/* <h1 className="itemTitle">{data.title}</h1> */}
                <div className="detailItem">
                  <span className="itemKey">Hotel:</span>
                  <span className="itemValue">{data.hotel.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Room:</span>
                  {data.roomList.map(room =>(
                    <span className="itemValue">{room.name}</span>
                  ))}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date in:</span>
                  <span className="itemValue">{`${format(new Date(data.checkIn), 'dd/MM/yyyy')}`}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date out: </span>
                  <span className="itemValue">{`${format(new Date(data.checkOut), 'dd/MM/yyyy')}`}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Trạng thái: </span>
                  <span className="itemValue" style={{color: "red", textTransform: "uppercase"}}>{data.status}</span>
                </div>
              </div>}
            </div>
          </div>
          <div className="right">
          {data.roomList && <Slider 
            image={data.roomList[0].photo}
            id={data.roomList[0]._id}
          />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;

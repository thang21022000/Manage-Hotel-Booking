import "./singlehotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";

const SingleHotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotelId = location.pathname.split("/")[2];

  const { data } = useFetch(`/hotels/${hotelId}`);
  console.log(data)

  const HandleOnClick = (e) => {
    navigate(`/hotels/update/${hotelId}`, {state: data});
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={e => HandleOnClick(e)}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src={data.photo ? data.photo[0] : null}
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Summary:</span>
                  <span className="itemValue">{data.summary}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.address}
                  </span>
                </div>
                <div className="detailItem roomList">
                  <span className="itemKey">Rooms:</span>
                  <div>
                    {data.rooms 
                      ? (data.rooms.map(room =>  
                        <Link to={`/rooms/${room._id}/`} className="roomLink">
                          <p className="itemValueRoom">{room.name}</p>
                        </Link>
                      )) 
                      : <span className="itemValue">No room</span> 
                    }
                  </div>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{data.type}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default SingleHotel;

import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";

const Single = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const { data } = useFetch(`/users/${userId}`);

  console.log(data)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => navigate(`/users/update/${userId}`)}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data.image}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Số điện thoại:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Số dư:</span>
                  <span className="itemValue">
                    {data.bugdet && (data.bugdet).toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nơi ở:</span>
                  <span className="itemValue">{data.city}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
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

export default Single;

import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import useFetch from "../../hook/useFetch";
import { useEffect } from "react";

const Featured = () => {

  const {data} = useFetch('/orders');
  const calculateSum = () => {
    let sum = 0;
    data.map(item => {
      sum += item.bill
    })
    return sum;
  }

  const total = calculateSum();
  
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng doanh thu</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Doanh thu ngày</p>
        <p className="amount">{total.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</p>
        <p className="desc">
          Các giao dịch trước đang được xử lý. Lần thanh toán cuối cùng có thể chưa được tính vào
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Mục tiêu</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">{(10000000).toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tuần trước</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{(5000000).toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tháng trước</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{(14000000).toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

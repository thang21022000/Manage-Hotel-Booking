import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HouseIcon from '@mui/icons-material/House';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BedIcon from '@mui/icons-material/Bed';
import useFetch from "../../hook/useFetch";
import { Link } from "@mui/material";

const Widget = ({ type }) => {
  let widget;

  const {data} = useFetch(`${type}`);
  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "users":
      widget = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "orders":
      widget = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "hotels":
      widget = {
        title: "HOTELS",
        isMoney: false,
        link: "View all hotels",
        icon: (
          <HouseIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "rooms":
      widget = {
        title: "ROOMS",
        isMoney: false,
        link: "View all rooms",
        icon: (
          <BedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{widget.title}</span>
        <span className="counter">
          {widget.isMoney && "$"} {data.length}
        </span>
        {/* <span className="link">{widget.link}</span> */}
        <Link to={widget.title} className="link">{widget.link}</Link>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {widget.icon}
      </div>
    </div>
  );
};

export default Widget;

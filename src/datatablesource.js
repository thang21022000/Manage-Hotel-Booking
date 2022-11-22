import {format} from "date-fns";
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 160,
  },
];

export const hotelsColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 330,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },

  {
    field: "city",
    headerName: "City",
    width: 200,
  },
];

export const roomsColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "desc",
    headerName: "desc",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  }
];

export const OrderColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Guest",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params.row.user 
          ?  <span>{params.row.user.fullname}</span>
          : ""}
         
        </div>
      );
    },
  },
  {
    field: "hotel",
    headerName: "Hotel",
    width: 250,
    renderCell: (params) => {
      return (
        <div>
          {params.row.hotel 
          ?  <span>{params.row.hotel.name}</span>
          : ""}
         
        </div>
      );
    },
  },
  {
    field: "checkIn",
    headerName: "Come",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithStatus">
          {params.row.checkIn 
          ? <span>{`${format(new Date(params.row.checkIn), 'dd/MM/yyyy')}`}</span>
          : ""}
        </div>
      );
    },
  },
  {
    field: "checkOut",
    headerName: "Leave",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithStatus">
          {params.row.checkOut
          ? <span>{`${format(new Date(params.row.checkOut), 'dd/MM/yyyy')}`}</span>
          : ""}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithStatus">
          <span className={`cellWithStatus ${params.row.status}`}>{params.row.status}</span>
        </div>
      );
    },
  },
];
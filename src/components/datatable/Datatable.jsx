import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import  useFetch  from "../../hook/useFetch";
import axios from 'axios'
import { style } from "@mui/system";

const Datatable = ({columns}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1]

  const [list, setList] = useState([]);
  const [hotelList, setHotelList] = useState([])
  const { data } = useFetch(`/${path}`);
  useEffect(() => {
    setList(data);
  }, [data])

  const handleDelete = async (id) => {
    try{
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    }catch(err){}

  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
          </div>
          
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {path}
        {path !== "orders" && 
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        }
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      />
    </div>
  );
};

export default Datatable;

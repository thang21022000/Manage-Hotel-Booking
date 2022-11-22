import "./updateorder.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios  from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import Select from 'react-select';
import {format} from 'date-fns';
import { DateRange } from 'react-date-range';
import locale from 'date-fns/locale/vi';

const UpdateOrder = ({ inputs, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data } = useFetch(`/orders/${id}`);

  const [changeRoom, setChangeRoom] = useState([]);
  const [priceChangeRoom, setPriceChangeRoom] = useState(0);
  const [dateChange, setDateChange] = useState([]);

  let listDateBooked = [];

  const getRoomInHotel = (listId) => {
    return data.hotel.rooms.filter(room => listId.includes(room._id))
  }

  const calculateSum = (listValue) => {
    let sum = 0;
    listValue.forEach(value => {
        sum += value;
    });
    return sum;
  }

  const CaculateDay = (date1, date2) => {
    const MILLISECONDS_PER_DAY = (1000 * 60 * 60 * 24) ;
    const timeDiff = Math.abs(date1.getTime() - date2.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays
  }

  const checkChangeRoom = (changeroom) => {
    console.log("changeroom", changeroom)
    // no room chosen
    if(changeroom.length == 0) {
      setPriceChangeRoom(0)
    } 
    else {
      // price is greater
      const listRooms = getRoomInHotel(changeroom);
      const sum = calculateSum(listRooms.map((room) => room.price))
      const numDateChanged = CaculateDay(dateChange[0].endDate, dateChange[0].startDate)

      // if(data.roomList[0].price < getRoomInHotel(changeroom[0].value)[0].price) {
        setPriceChangeRoom(sum * numDateChanged)
      // }
    }
      setChangeRoom(changeroom.map(room => room))
  }
  

  const checkChangeDate = (datechange) => {
    const numDateChanged = CaculateDay(datechange[0].endDate, datechange[0].startDate);
    if(numDateChanged > 0) {
      const listRooms = getRoomInHotel(changeRoom)
      const sum = calculateSum(listRooms.map((room) => room.price))
      setPriceChangeRoom(numDateChanged * sum);
      console.log(numDateChanged * sum)
    }

    setDateChange(datechange);

  }


  const getDateInDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    
    const list = [];

    while(date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  }

  const HandleVNPayGateway = async (orderId, userId, bill) => {
    // có số dư trong tài khoản
    if(data.user.bugdet > 0) {
        //số dư lớn hơn hoặc bằng bill
        if(data.user.bugdet >= bill) {

            const deposit = data.user.bugdet - bill;
            await axios.put(`/orders/${orderId}`, {status: "paid"})
            await axios.put(`/users/${userId}`, {bugdet: deposit})
            navigate(0);
        
        // số dư bé hơn bill
        } else {
            const deposit = bill - data.user.bugdet;
            const vnp_Params = {
                vnp_TxnRef : orderId + new Date().getTime(),
                vnp_OrderInfo : orderId,
                vnp_Amount : deposit,
            };
            try {
                await axios.put(`/users/${data.user._id}`, {bugdet: -data.user.bugdet})
            } catch (err) {
                console.log(err)
            }
            const res = await axios.post("/payment/vnpaypayment", vnp_Params)
            if(res) {
                window.location.replace(`${res.data}`);
            }
        }
    } 
    else {
        const vnp_Params = {
            vnp_TxnRef : orderId + new Date().getTime(),
            vnp_OrderInfo : orderId,
            vnp_Amount : bill,
        };
        
        const res = await axios.post("/payment/vnpaypayment", vnp_Params)
        console.log(res)
        if(res) {
            window.location.replace(`${res.data}`);
        }
    }
}
  
  const handleUpdate = async (e) => { 
    e.preventDefault();

    const listDateUpdate = getDateInDates(dateChange[0].startDate, dateChange[0].endDate);
    const listDateOld = getDateInDates(data.checkIn, data.checkOut);

    // chưa thanh toán
    if(data.status === "pending") {
      try{
        await axios.put(`/orders/${id}`, {
          checkIn: dateChange[0].startDate,
          checkOut: dateChange[0].endDate, 
          roomList: changeRoom, 
          bill: priceChangeRoom, 
          status: "pending", 
          listDateOld: listDateOld,
          listDateUpdate: listDateUpdate 
        })
      }
      catch(err){
        console.log(err)
      }
    } 
    // đã thanh toán
    else {
      // giá thay đổi lớn hơn giá hóa đơn => thanh toán thêm
      if(priceChangeRoom > data.bill) {
        let bill = priceChangeRoom - data.bill;

        try{
          await axios.put(`/orders/${id}`, {
            checkIn: dateChange[0].startDate,
            checkOut: dateChange[0].endDate, 
            roomList: changeRoom, 
            bill: priceChangeRoom, 
            status: "pending", 
            listDateOld: listDateOld,
            listDateUpdate: listDateUpdate 
          })
        }
        catch(err){
          console.log(err)
        }
        HandleVNPayGateway(id, data.user._id, bill);

      } 
      // giá thay đổi nhỏ hơn giá hóa đơn => hoàn tiền
      else {
        let bill = data.bill - priceChangeRoom;
        try{
          await axios.put(`/orders/${id}`, {
            checkIn: dateChange[0].startDate,
            checkOut: dateChange[0].endDate, 
            roomList: changeRoom, 
            bill: priceChangeRoom, 
            listDateOld: listDateOld,
            listDateUpdate: listDateUpdate 
          })

          try {
            await axios.put(`/users/${data.user._id}`, {bugdet: bill})
          }
          catch (err) {
            console.log(err)
          }
        
        }
        catch(err){
          console.log(err)
        }
        
      }
    }

    //  bỏ bớt phòng
    if(data.roomList.length > changeRoom.length) {
      let listRoomUnchose=  data.roomList.filter(room => !changeRoom.includes(room._id))
      let listRoomId = listRoomUnchose.map(room => room._id)
      try {
        await axios.put(`rooms/update/availibility/${listRoomId}`, {
          listDateOld: listDateOld 
        })
      } catch (err) {
        console.log(err)
      }
    }
    navigate('/account')
  }


  useEffect(() => {
    if(data.checkIn) {
      setDateChange([
        {
          startDate: new Date(data["checkIn"]), 
          endDate: new Date(data["checkOut"]), 
          key: "selection"
        }
      ])

    }
    
    if(data.roomList) {
      setChangeRoom(data.roomList.map(room => room._id))
    }

  },[data])

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
            {dateChange.length > 0 && 
                <DateRange 
                  editableDateInputs={true}
                  onChange={item => checkChangeDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateChange}
                  locale={locale}
                  disabledDates={data.roomList[0].unAvailableDate.filter(date => 
                    !getDateInDates(data["checkIn"], data["checkOut"]).includes(new Date(date).getTime()))
                    .map(item => new Date(item))
                  }
                  minDate={new Date()}
                />
              }
          </div>
          <div className="right">
            <form>
              <div className="formInput" >
                <label>Khách hàng</label>
                {data.user && <input type="text" name="user" id="user" defaultValue={data.user.username} /> }
              </div>
              <div className="formInput" >
                <label>Nơi ở</label>
                {data.hotel && 
                  <Select 
                    options={[{value: data.hotel._id, label: data.hotel.name}]} 
                    defaultValue={[{value: data.hotel._id, label: data.hotel.name}]}
                    isDisabled
                  /> 
                }
              </div>
              <div className="formInput" >
                <label>Phòng</label>
                {data.hotel && 
                  <Select
                    options={data.hotel.rooms.map(room => {return {value: room._id, label: room.name}})} 
                    defaultValue={data.roomList.map(room => {return {value: room._id, label: room.name}})} 
                    isMulti
                    onChange={(option) => checkChangeRoom(option.map(op => op.value))}
                  /> 
                }
              </div>
              {/* <div className="formInput">
                <label>Nhận phòng</label>
                {data.checkIn && <input type="date" name="checkIn" id="checkIn" value={format(new Date(data.checkIn), "yyyy-MM-dd")} /> }
              </div>
              <div className="formInput">
                <label>Trả phòng</label>
                {data.checkIn && <input type="date" name="checkIn" id="checkIn" value={format(new Date(data.checkOut), "yyyy-MM-dd")} /> }
              </div> */}
          
              <div className="formInput">
                <label>Hóa đơn</label>
                {data.bill && <input type="number" name="room" id="room" defaultValue={data.bill} disabled /> }
              </div>
              {priceChangeRoom > 0 && <div style={{flexBasis: "100%"}}>
                  <span className="bold-text" style={{color: "red"}}>Tổng tiền: </span>
                  <span className="bold-text" style={{letterSpacing: "1px"}}>{priceChangeRoom.toLocaleString("vi-VN", {style: "currency", currency: "VND"})} VND</span>
                  <br/> 
                  {priceChangeRoom >= data.bill 
                    ? <> 
                      <span className="bold-text" style={{color: "red"}}>Số tiền cần thanh toán thêm: </span>
                      <span className="bold-text" style={{letterSpacing: "1px"}}>{(priceChangeRoom - data.bill).toLocaleString("vi-VN", {style: "currency", currency: "VND"})} VND</span>
                    </> 
                    : <>
                      <span className="bold-text" style={{color: "red"}}>Số tiền sẽ được hoàn vào lần đặt phòng tiếp theo: </span>
                      <span className="bold-text" style={{letterSpacing: "1px"}}>{(data.bill - priceChangeRoom).toLocaleString("vi-VN", {style: "currency", currency: "VND"})} VND</span>
                    </>
                  }
                </div>
              }
              <div className="formInput" >
                <label>Trạng thái</label>
                {data.hotel && 
                  <Select 
                    options={[{value: "pending", label: "Chưa thanh toán"}, {value: "paid", label: "Đã thanh toán"}]} 
                    defaultValue={[{value: data.status, label: data.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}]}
                  /> 
                }
              </div>
              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} defaultValue={info ? info[input.id] : ""} onChange={(e) => HandleOnchange(e)} id={input.id}/>
                </div>
              ))} */}
              <button onClick={handleUpdate}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;

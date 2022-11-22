import "./login.scss"
import React, {useContext, useRef, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [warning, setWarning] = useState('');
    
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const {loading, error, dispatch} = useContext(AuthContext);

    const HandleOnchange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
    }


    const HandleLogin =  async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", credentials);
            if(res.data.isAdmin) {
                dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
                navigate("/");
            } else {
                dispatch({type: "LOGIN_FAILURE", payload: {message:"You are not allowed"}})
            }
        }catch (err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
        }
    }
    
    return (
        <div className="form-container">
        <div className="form">
            <div className="wrap-form">
            <div className="form-above">
                <h3 id="h3">đăng nhập</h3>
            </div>
            
            <div className="form-middle" ref={containerRef}>     
            <form onSubmit={(e)=>HandleLogin(e)}>
                <div className="form-small account">
                    <input className="" type="text" name="username" id="username" required  onChange={HandleOnchange}/>
                    <label htmlFor="name" className="label-name">
                        <span className="content-name">email</span>
                    </label>
                </div>
                <div className="form-small password">
                    <input className="phone" type="password" name="password" id="password" required onChange={HandleOnchange}/>
                    <label htmlFor="name" className="label-name">
                        <span className="content-name">Mật khẩu</span>
                    </label>
                </div>
                {error && <div style={{fontSize: 12, color: "red", textAlign: "center"}}>{error}</div>}   
                <p className="note">Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn</p>          
                <button className="button-continue" type="submit">Đăng nhập</button>   
            </form>          
                <div className="or">
                    <hr />
                    <p>hoặc</p>
                    <hr />
                </div>
            </div>

            {/* <!--  khung tiếp tục--> */}
            <Link  className="tieptucwith-link" to="#">
                <div className="tieptucwith">           
                    <div className="img">
                        <img src="/images/letter.png" alt="icon-letter" />
                    </div>
                    <div className="textcontent">
                        <p>Tiếp tục với Email</p>
                    </div>
                    <div></div>
                </div>
            </Link>

            <Link className="tieptucwith-link" to="#">
                <div className="tieptucwith">           
                    <div className="img">
                        <img src="/images/facebook(1).png" alt="icon-fb" />
                    </div>
                    <div className="textcontent">
                        <p>Tiếp tục với Facebook</p>
                    </div>
                    <div></div>
                </div>
            </Link>

            <Link className="tieptucwith-link" to="#">
                <div className="tieptucwith">           
                    <div className="img">
                        <img src="/images/google.png" alt="icon-gg" />
                    </div>
                    <div className="textcontent">
                        <p>Tiếp tục với Google</p>
                    </div>
                    <div></div>
                </div>
            </Link>

            <Link className="tieptucwith-link" to="#">
                <div className="tieptucwith">           
                    <div className="img">
                        <img src="/images/apple.png" alt="icon-apple" />
                    </div>
                    <div className="textcontent">
                        <p>Tiếp tục với Apple</p>
                    </div>
                    <div></div>
                </div>
            </Link>
            </div>      
        </div>
        </div>
    )
}

export default Login
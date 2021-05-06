import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import Consts from '../utils/Consts';
import App from '../App';
import bg2 from '../assets/images/bg2.jpg';
import shoe from '../assets/images/shoe.png'
import Server from '../utils/Server';

class Authentication extends Component {

    state={phone_number:"", password:""}

    componentDidMount(){

        App.instance.changeBG(bg2);

        this.auth_page.addEventListener("keyup", (event)=>{

            if (event.keyCode === 13) {
                this.login();
            }
        })

    }

    onPhone = (ev)=>{
        this.state.phone_number = ev.target.value;
    }

    onPassword = (ev)=>{
        this.state.password = ev.target.value;
    }

    login = async ()=>{

        let res = await Server.postReq(Server.urls.ADMIN_LOG_IN, this.state);

        if(res.result_code == Server.result_codes.SUCCESS){

            App.user = res.data;

            this.props.history.push("/admin/");

        }else{

            alert(res.result_code);
        }
    }

    home = ()=>{

        this.props.history.push("/");
    }

    render() {
        return (
            <div style={s.con} ref={r=>this.auth_page = r}>

                <div style={s.sec1}>

                    <div style={s.sec2}>

                        <div style={s.text1}>{"کتونی ادمین"}</div>

                        <div style={s.line1}/>

                        <div style={s.text2}>{"به عنوان یه همکار این سامانه بهت اجازه تولید و کنترل محتوا برای سایت و اپلیکیشن کتونی رو میده."}</div>

                        <div style={s.btn1} onClick={this.home}>{"سایت کتونی"}</div>

                    </div>

                    <div style={s.sec3}>

                        <div style={s.sec4}>
                            <img style={s.img1} src={shoe}/>
                        </div>

                        <input style={s.input1} onChange={this.onPhone} type="username" placeholder="شماره همراه"/>

                        <input style={s.input1} onChange={this.onPassword} type="password" placeholder="رمز عبور"/>

                        <div style={s.btn2} onClick={this.login}>{"ورود"}</div>

                    </div>

                </div>
                
            </div>
        )
    }
}

export default withRouter(Authentication);

const s = {

    con:{
        height:'115%',
        fontFamily:"IranSans", 
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },

    btn1:{
        cursor:'pointer',
        height:40,
        width:140,
        fontSize:15,
        color:Consts.colors.b1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        alignSelf:'center',
        backgroundColor:Consts.colors.d1
    },

    btn2:{
        cursor:'pointer',
        height:40,
        width:'36%',
        fontSize:15,
        marginTop:20,
        color:Consts.colors.b1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        alignSelf:'center',
        backgroundColor:Consts.colors.d1
    },

    img1:{

        height:'80%',
        width:'80%'
    },

    input1:{

        height:'8%',
        width:'50%',
        marginTop:15,
        textAlign:'center',
        color:Consts.colors.b3,
        fontFamily:'IranSans',
        fontSize:16,
        fontWeight:500,
        borderRadius:20,
        backgroundColor:Consts.colors.a3
    },

    sec1:{
        height:'86%',
        width:'80%',
        display:'flex',
        flexDirection:"row-reverse",
        borderRadius:5,
        overflow:'hidden',
    },

    sec2:{
        height:'100%',
        width:'40%',
        display:'flex',
        opacity:0.94,
        flexDirection:'column',
        justifyContent:'center',
        color:Consts.colors.a1,
        backgroundColor:Consts.colors.c1
    },

    sec3:{
        height:'100%',
        width:'60%',
        display:'flex',
        flexDirection:"column",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.85)'
    },

    sec4:{

        height:90,
        width:90,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:45,
        marginBottom:35,
        backgroundColor:Consts.colors.c1
    },

    line1:{

        height:1,
        width:'30%',
        opacity:0.6,
        marginRight:50,
        alignSelf:'flex-end',
        marginBottom:20,
        backgroundColor:Consts.colors.a1
    },

    text1:{
        fontSize:32,
        marginRight:50,
        textAlign:'right',
        fontWeight:600,
        marginBottom:20,
    },

    text2:{
        fontSize:14,
        marginRight:50,
        marginLeft:40,
        direction:'rtl',
        textAlign:'right',
        opacity:0.75,
        marginBottom:100,
    }
}

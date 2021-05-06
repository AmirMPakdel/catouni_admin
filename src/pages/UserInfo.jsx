import React from 'react';
import Server from '../utils/Server';
import App from '../App';
import profile from '../assets/images/profile.png'
import {withRouter} from 'react-router-dom';
import Consts from '../utils/Consts';

class UserInfo extends React.Component{

    state = {pic:profile, user:{checkins:[], medals:[]}}

    componentWillMount(){

        if(!App.Selected_User._id){
        
            this.props.history.push("/admin/users");
        
        }else{

            let url = Server.domain+Server.urls.GET_PROFILE_PIC+"?file_name="+App.Selected_User.phone_number;
            this.state.pic = url;
            this.state.user = App.Selected_User;
        }
    }

    async componentDidMount(){
        
    }

    showPic = ()=>{

        if(this.state.pic != profile){

            window.open(this.state.pic)
        }
    }

    noPic = ()=>{

        this.state.pic = profile;
        this.setState(this.state);
    }

    render(){
        let {verified, type} = this.state.user;
        verified = verified?"تایید شده":"تایید نشده";
        type = userType(type);

        return(
            <div style={s.con}>

                <div style={s.sec1}>

                    <div style={s.sec2}>

                        <div style={s.text1}>{"نام کاربر : "+ this.state.user.full_name}</div>

                        <div style={s.text1}>{"وضعیت تایید : "+verified}</div>

                        <div style={s.text1}>{"شماره همراه : "+this.state.user.phone_number_dcr}</div>

                        <div style={s.text1}>{"نوع کاربر : "+type}</div>
                        
                        <div style={s.text1}>{"بایو : "+ this.state.user.bio}</div>
                        
                    </div>

                    <div style={s.sec3}>

                        <img onError={this.noPic} onClick={this.showPic} style={{height:'90%', cursor:'pointer', borderRadius:20}} src={this.state.pic}/>

                    </div>

                </div>

                <div style={s.sec4}>

                    <div style={s.text1}>{"پرچم ها : "+this.state.user.checkins.length}</div>
                    <div style={s.text1}>{"مدال ها : "+this.state.user.medals.length}</div>
                    <div style={s.text1}>{"امتیاز : "+this.state.user.xp}</div>

                </div>

            </div>
        )
    }
}

export default withRouter(UserInfo);

const s = {
    con:{
        height:"100%",
        width:'100%',
        borderRadius:10,
        opacity:0.9,
        fontFamily:'IranSans',
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'rgba(255,255,255,0.4)'
    },

    sec1:{
        height:'60%',
        width:'100%',
        display:'flex',
        flexDirection:'row-reverse',
        //backgroundColor:'blue',       
    },

    sec2:{
        height:'100%',
        width:'70%',
        textAlign:'right',
        display:'flex',
        boxSizing: 'border-box',
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent:'space-around',
        paddingRight:'5%',
        paddingTop:'2%',
        paddingBottom:'2%',
        //backgroundColor:'orange'
    },

    sec3:{
        height:'100%',
        width:'30%',
        display:'flex',
        boxSizing:'border-box',
        paddingTop:30,
        paddingLeft:30,
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },

    sec4:{
        height:'40%',
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
    },

    text1:{
        
        borderRadius:6,
        paddingRight:10,
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        direction:'rtl',
        backgroundColor:Consts.colors.a3,
    },
}

function userType(type){

    if(type == "regular")
        return "عادی";
    else
        return "ادمین"
}
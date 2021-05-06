import React from 'react';
import shoe from '../assets/images/shoe.png';
import {withRouter} from "react-router-dom";
import App from '../App';
import profile from '../assets/images/profile.png';
import bg1 from '../assets/images/bg1.jpg'
import Server from '../utils/Server';

class Header extends React.Component{

    state={pic:profile, hideWeekly:true}

    componentWillMount(){

        if(App.user.phone_number){
            this.state.pic = Server.domain+Server.urls.GET_PROFILE_PIC+"?file_name="+App.user.phone_number;
            
            if(App.user.type == "admin-1"){
                this.state.hideWeekly = false;
            }
        }
        
    }

    componentDidMount(){

        App.instance.changeBG(bg1);
    }

    picNotFound=()=>{

        this.state.pic = profile;
        this.setState(this.state);
    }

    render(){
        return(
            <div className="Header">

                <img className="logo" onClick={()=>{this.props.history.push('/admin/')}} src={shoe}/>
                
                <div className="heder_title" hidden={this.state.hideWeekly} onClick={()=>{this.props.history.push('/admin/weekly')}}>{"معمای هفته"}</div>

                <div className="heder_title" onClick={()=>{this.props.history.push('/admin/users')}}>{"کاربران"}</div>

                <div className="heder_title" onClick={()=>{this.props.history.push('/admin/')}}>{"ایستگاه ها"}</div>

                <div className="header_name">{App.user.full_name || ""}</div>

                <img className="profile_pic" onError={this.picNotFound} src={this.state.pic}/>

            </div>
        )
    }
}

export default withRouter(Header);
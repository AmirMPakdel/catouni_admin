import React from 'react';
import Server from '../utils/Server';
import {withRouter} from 'react-router-dom';
import add from '../assets/images/add.png';
import App from '../App';
import Consts from '../utils/Consts';
import { async } from 'q';
const axios = require("axios");


class Weekly extends React.Component{

    state = {weekly:{location:{}, checkins:[], created_at:""}, pic:add, file:undefined}

    async componentDidMount(){

        if(!App.weekly._id){
            
            if(App.user._id){

                await this.updateWeekly();

            }else{
                
                this.props.history.push("/admin/auth");
            }
        }

        this.state.weekly = App.weekly;
        this.state.pic = Server.domain+Server.urls.GET_SATION_PIC+"?file_name=wk_"+App.weekly._id+`&d=${Date.now()}`;
        this.setState(this.state);
    }

    onTitle = (e)=>{
        this.state.weekly.title = e.target.value;
        this.setState(this.state);
    }

    onAnswer = (e)=>{
        this.state.weekly.answer = e.target.value;
        this.setState(this.state);
    }

    onInfo = (e)=>{
        this.state.weekly.info = e.target.value;
        this.setState(this.state);
    }

    onLat = (e)=>{
        this.state.weekly.location.lat = e.target.value;
        this.setState(this.state);
    }

    onLng = (e)=>{
        this.state.weekly.location.lng = e.target.value;
        this.setState(this.state);
    }

    updateWeekly = async ()=>{

        let res = await Server.postReq(Server.urls.ADMIN_WEEKLY_INFO, {token:App.user._id});

        if(res.result_code == Server.result_codes.SUCCESS){

            App.weekly = res.data;

        }else if(res.result_code === Server.result_codes.INVALID_TOKEN){

            this.props.history.push("/admin/auth");

        }else{

            alert(res.result_code);
        }
    }

    _handleUpload = (evt)=>{

        
        let file = evt.target.files[0];

        let url = URL.createObjectURL(file);

        let img = new Image();
        img.src = url;
        
        img.onload = ()=>{

            if(img.width == 840 && img.height == 560){

                this.state.file = file;
                this.state.pic = url;
                this.setState(this.state);
            }else{
                alert("the image's width and height should be 840 x 560")
            }
        };

        // free up the fileInput again
        this.filePicker.value = null;
    }

    showPic = ()=>{

        this.filePicker.click();
    }

    edit = async ()=>{

        let ans = window.confirm("Do you wanna edit?");

        if(ans){

            await this.upload();
        }
    }

    upload = async ()=>{

        let formData = new FormData();
        formData.append("token", App.user._id);
        formData.append("_id", this.state.weekly._id);
        formData.append("title", this.state.weekly.title);
        formData.append("answer", this.state.weekly.answer);
        formData.append("info", this.state.weekly.info);
        formData.append("lat", this.state.weekly.location.lat);
        formData.append("lng", this.state.weekly.location.lng);
        formData.append('file',this.state.file);

        let res = await fetch(Server.urls.ADMIN_EDIT_WEEKLY,{
            method:"POST",
            body:formData,
        });

        res = await res.json();

        if(res.result_code === Server.result_codes.SUCCESS){

            this.showMessage("Weekly has been edited successfully");
        
        }else{

            alert(res.result_code);
        }
    }

    showMessage = (m)=>{
        alert(m)
    }

    render(){
        return(
            <div style={s.con}>

                <div style={s.sec1}>

                    <div style={s.sec3}>

                    <input type={'file'} style={{ display: 'none' }} accept=".jpg" onChange={this._handleUpload} ref={r=>this.filePicker = r}/>

                        <img style={s.img1} onClick={this.showPic}
                        src={this.state.pic}/>

                    </div>

                    <div style={s.sec4}>

                        <div style={s.sec5}>

                            <div style={s.text1}>{"امتیاز : "+this.state.weekly.xp}</div>

                            <div style={s.text1}>{"تعداد پرچم : "+this.state.weekly.checkins.length}</div>
                            
                            <div style={s.text1}>{"تاریخ نمایش : "+this.state.weekly.created_at.slice(0,10)}</div>

                        </div>

                        <div style={s.sec6}>

                            <div style={s.text1}><input style={s.input1} onChange={this.onTitle} value={this.state.weekly.title}/>{" : عنوان"}</div>

                            <div style={s.text1}><input style={s.input1} onChange={this.onAnswer} value={this.state.weekly.answer}/>{" : جواب"}</div>                            

                        </div>

                    </div>

                </div>

                <div style={s.sec2}>

                    <div style={s.info_sec}><textarea style={s.input_info} onChange={this.onInfo} value={this.state.weekly.info}/>&emsp;{" : صورت معما"}</div>

                    <div style={s.text1}>{"latitude : "}<input style={s.input2} onChange={this.onLat} value={this.state.weekly.location.lat}/>&emsp;&emsp;&emsp;
                    {"longitude : "}<input style={s.input2} onChange={this.onLng} value={this.state.weekly.location.lng}/>&emsp;&emsp;{" : مختصات"}</div>

                    <div style={s.submit_btn} onClick={this.edit}>{"ویرایش معمای هفته"}</div>

                </div>

            </div>
        )
    }
}

export default withRouter(Weekly);

const s = {
    con:{
        height:'100%',
        width:'100%',
        borderRadius:10,
        fontFamily:'IranSans',
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'rgba(255,255,255,0.4)'  
    },

    img1:{
        width:'80%',
        cursor:'pointer',
        borderRadius:10,
    },

    submit_btn:{
        cursor:'pointer',
        height:40,
        width:300,
        alignSelf:'center',
        boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontSize:16,
        color:Consts.colors.b1,
        borderRadius:10,
        backgroundColor:Consts.colors.d1,
    },

    input_info:{

        width:'90%',
        display:'flex',
        flex:1,
        textAlign:'right',
        resize: 'none',
        direction:'rtl',
        fontFamily:'IranSans',
        fontSize:16,
    },

    input1:{

        fontFamily:'IranSans',
        fontSize:16,
        textAlign:'right',
        direction:'rtl'
    },

    input2:{

        fontFamily:'IranSans',
        fontSize:16,
        textAlign:'left',
    },

    sec1:{
        height:'45%',
        width:'100%',
        opacity:0.9,
        display:'flex',
        //backgroundColor:'green'
    },

    sec2:{
        height:'55%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'flex-end',
        paddingRight:'6vw',
        boxSizing:'border-box'
    },

    sec3:{
        height:'100%',
        width:'30%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },

    sec4:{
        height:'100%',
        width:'70%',
        opacity:0.9,
        display:'flex',
        justifyContent:'flex-end',
        paddingRight:'6vw',
        //backgroundColor:'yellow'
    },

    sec5:{

        height:'100%',
        width:'40%',
        opacity:0.9,
        display:'flex',
        flexDirection:'column',
        marginLeft:'2vw',
        justifyContent:'space-evenly',
        alignItems:'flex-end',
        //backgroundColor:'red',
    },

    sec6:{
        height:'100%',
        width:'50%',
        opacity:0.9,
        display:'flex',
        flexDirection:'column',
        marginLeft:'2vw',
        justifyContent:'space-evenly',
        alignItems:'flex-end',
    },

    info_sec:{
        height:'20%',
        width:'80%',
        display:'flex',
        justifyContent:'flex-end',
        borderRadius:6,
        paddingRight:10,
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:Consts.colors.a3,
    },


    text1:{
        borderRadius:6,
        paddingRight:10,
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:Consts.colors.a3,
    }
}

function getBase64(file, cb) {
    
    if(!file){

        cb(true);

    }else{

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
    
        reader.onerror = function (error) {
            
            cb();
        };
    }
}
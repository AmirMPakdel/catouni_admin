import React from 'react';
import Server from '../utils/Server';
import App from '../App';
import {withRouter} from "react-router-dom";
import Consts from '../utils/Consts';


class StationInfo extends React.Component{

    state={station:{ location:{}, checkins:[], created_at:"", updated_at:"" }, url:"",
    hideEdit:{},
    pics_status:{1:false,2:false,3:false}, pics:[{},{},{}]}
    
    componentWillMount(){

        if(!App.Selected_Station._id){

            this.props.history.push('/admin');

        }else{

            let writter = App.Selected_Station.writter;
            console.log(writter._id !== App.user._id);
            console.log(App.user.type);
            
            if(App.user.type == "admin-3" && writter._id !== App.user._id){
                this.state.hideEdit = {display:'none'};
            }

            let url = `${Server.domain+Server.urls.GET_SATION_PIC}?file_name=${App.Selected_Station._id}`
            this.state.pics[0].url = url+"-1"+`&d=${Date.now()}`;
            this.state.pics[1].url = url+"-2"+`&d=${Date.now()}`;
            this.state.pics[2].url = url+"-3"+`&d=${Date.now()}`;
        }   
    }

    async componentDidMount(){

        if(App.user._id && App.Selected_Station._id){

            let json = {token:App.user._id, id:App.Selected_Station._id};

            let res = await Server.postReq(Server.urls.ADMIN_INFO_STATION, json);
            
            if(res.result_code == Server.result_codes.SUCCESS){

                let newState = Object.assign({},this.state);
                newState.station = res.data;
                App.Selected_Station = res.data;
                this.setState(newState);

            }else if(res.result_code == Server.result_codes.INVALID_TOKEN){

                this.props.history.push('/admin/auth');
            
            }else{

                this.showMessage(res.result_code);
            }
        }
    }

    showPic = (num)=>{

        if(this.state.pics_status[num]){
            window.open(this.state.url+"-"+num)
        }else{
            alert("dd")
        }
    }

    edit = ()=>{

        this.props.history.push("/admin/stationedit");
    }

    delete = async ()=>{

        let ans = window.confirm("do you want to delete?");

        if(ans){

            let json = {id : App.Selected_Station._id, token: App.user._id};

            let res = await Server.postReq(Server.urls.ADMIN_DELETE_STATION, json);

            if(res.result_code == Server.result_codes.SUCCESS){
                
                DeleteStationFromList(App.Selected_Station);

                this.props.history.push("/admin/");

            }else{

                alert(res.result_code)
            }
        }
    }

    addDefaultSrc(ev, num){
        let newState = Object.assign({},this.state);
        newState.pics_status[num] = false;
        this.setState(newState);
        //ev.target.src = require('../assets/images/add.png'); -> $AMP-> if want default src set some default pic
    }

    enablePic(num){
        let newState = Object.assign({},this.state);
        newState.pics_status[num] = true;
        this.setState(newState);
    }

    showMessage = (message, type)=>{

        alert(message);
    }

    render(){
        let url = `${Server.domain+Server.urls.GET_SATION_PIC}?file_name=${App.Selected_Station._id}`
        this.state.url = url;

        let {title, info, short_info, type, xp, location, checkins, is_special, created_at, updated_at} = this.state.station;
        created_at = created_at.slice(0,10);
        updated_at = updated_at.slice(0,10);
        is_special = is_special?"بله":"خیر"

        return(
            <div style={s.con}>

                <div style={s.pics_con}>

                    <img style={s.pic} src={this.state.pics[0].url} hidden={!this.state.pics_status[1]} onLoad={()=>{this.enablePic(1)}} onError={(ev)=>{this.addDefaultSrc(ev, 1)}} onClick={()=>{this.showPic(1)}}/>
                    
                    <img style={s.pic} src={this.state.pics[1].url} hidden={!this.state.pics_status[2]} onLoad={()=>{this.enablePic(2)}} onError={(ev)=>{this.addDefaultSrc(ev, 2)}} onClick={()=>{this.showPic(2)}}/>

                    <img style={s.pic} src={this.state.pics[2].url} hidden={!this.state.pics_status[3]} onLoad={()=>{this.enablePic(3)}} onError={(ev)=>{this.addDefaultSrc(ev, 3)}} onClick={()=>{this.showPic(3)}}/>

                </div>

                <div style={s.info_con}>

                    <div style={{...s.sec1, ...this.state.hideEdit}}>

                        <div style={s.edit_btn} onClick={this.edit}>{"ویرایش ایستگاه"}</div>

                        <div style={s.edit_btn} onClick={this.delete}>{"حذف ایستگاه"}</div>

                    </div>

                    <div style={s.sec1}>

                        <div style={s.text1}>{"عنوان : "+title}</div>

                        <div style={s.text1}>{"نوع : "+Type2Farsi(type)}</div>

                        <div style={s.text1}>{"امتیاز : "+xp}</div>

                    </div>

                    <div style={s.sec1}>

                        <div style={s.text1}>{"توضیح مختصر : "+short_info}</div>

                        <div style={s.text1}>{"تعداد پرچم : "+ checkins.length}</div>

                    </div>

                    <div style={s.sec1}>

                    <div style={s.text1}>{"ویژه : "+is_special}</div>

                    <div style={s.text1}>{"تاریخ ساخت : "+created_at}</div>

                    <div style={s.text1}>{"تاریخ بروزرسانی : "+updated_at}</div>

                    </div>

                    <div style={s.sec2}>

                        <div style={s.info_t}>{" : "+"توضیحات"}</div>
                        <div style={s.info}>{info}</div>
                        <div style={s.location_t}>{" : "+"مختصات"}</div>
                        <div style={s.location}>

                            <a href={`https://www.google.com/maps/@${location.lat},${location.lng},21z`}>گوگل مپ</a>

                            <div style={s.text2}>{"latitude"}&emsp;{": "+ location.lat}</div>

                            <div style={s.text2}>{"longitude : "+ location.lng}</div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default withRouter(StationInfo);

const s = {

    con:{
        height:'100%',
        width:'100%',
        borderRadius:10,
        opacity:0.9,
        fontFamily:'IranSans',
        overflow:'hidden',
        display:'flex',
        backgroundColor:'rgba(255,255,255,0.4)'
    },

    pics_con:{
        height:'100%',
        width:'25%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection:'column',
        backgroundColor:Consts.colors.c2
    },

    pic:{
        height:'30%',
        width:'90%',
        borderRadius:6,
        cursor:'pointer',
    },

    info_con:{
        height:'100%',
        width:'75%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around'
    },

    sec1:{
        height:'12%',
        width:'100%',
        display:'flex',
        flexDirection:'row-reverse',
        justifyContent:'space-around',
        alignItems:'center',
        //backgroundColor:'red'
    },

    sec2:{
        height:'45%',
        width:'100%',
        display:'flex',
        flexDirection:'row-reverse',
    },

    edit_btn:{
        cursor:'pointer',
        height:40,
        width:200,
        boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontSize:16,
        color:Consts.colors.b3,
        borderRadius:10,
        backgroundColor:Consts.colors.d1
    },

    info_t:{
        height:'90%',
        width:'10%',
        fontSize:13,
        paddingTop:5,
        marginRight:30,
        boxSizing: 'border-box',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:Consts.colors.a3,
    },

    info:{
        height:'90%',
        width:'45%',
        padding:10,
        baddingRight:20,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        textAlign:'right',
        display:'flex',
        overflow:'auto',
        boxSizing: 'border-box',
        backgroundColor:Consts.colors.a3,
    },

    location_t:{
        height:'90%',
        width:'10%',
        paddingTop:5,
        fontSize:13,
        boxSizing: 'border-box',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        marginRight:20,
        backgroundColor:Consts.colors.a3,
    },

    location:{
        height:'90%',
        width: '25%',
        display:'flex',
        boxSizing: 'border-box',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        padding:20,
        marginLeft:20,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:Consts.colors.a3,
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

    text2:{
        borderRadius:6,
        alignSelf:'flex-start',
        marginRight:20,
        paddingRight:10,
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:Consts.colors.a3,
    }

}

function DeleteStationFromList(station){
    
    let newList = [];

    App.All_Stations.forEach(s=>{

        if(s._id != station._id){
            newList.push(s);
        }
    });

    App.Selected_Station = {};
}

function Type2Farsi(type){

    switch(type){
        case"landmark":return"نشان شهر"
        case"walking":return"پیادگردی"
        case"eating":return"خوردنی"
        case"sitting":return"نشستنی"
        case"shopping":return"خریدنی"
    }
}
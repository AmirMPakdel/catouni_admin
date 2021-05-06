import React from 'react';
import Server from '../utils/Server';
import App from '../App';
import {withRouter} from "react-router-dom";
import Consts from '../utils/Consts';
const axios = require("axios");


class StationEdit extends React.Component{

    state={station:{ location:{}, checkins:[], info:"", created_at:"", updated_at:"" },
    hideXp:false, hideIs_special:false,
    url:"", pics_status:{1:true,2:true,3:true}, 
    pic:[{num:"1",status:"", file:"", url:""}, {num:"2",status:"", file:"", url:""}, {num:"3",status:"", file:"", url:""}]}
    
    componentWillMount(){

        if(!App.Selected_Station._id){

            this.props.history.push('/admin');
        
        }else{

            if(App.user.type == "admin-3"){
                this.state.hideIs_special = true;
                this.state.hideXp = true;
            }

            this.state.station = App.Selected_Station;
            
            let url = `${Server.domain+Server.urls.GET_SATION_PIC}?file_name=${App.Selected_Station._id}`
            this.state.pic[0].url = url+"-1";
            this.state.pic[1].url = url+"-2";
            this.state.pic[2].url = url+"-3";
        }
    }

    async componentDidMount(){

        let newState = Object.assign({},this.state);
        this.setState(newState);
    }

    onTitle = (ev)=>{
        this.state.station.title = ev.target.value;
        this.setState(this.state);
    }

    onXp = (ev)=>{
        this.state.station.xp = Number(ev.target.value);
        this.setState(this.state);
    }

    onShortInfo = (ev)=>{
        this.state.station.short_info = ev.target.value;
        this.setState(this.state);
    }

    onType = (ev)=>{
        this.state.station.type = Type2Eng(ev.target.value);
    }

    onSpecial = (ev)=>{
        this.state.station.is_special = Special2Eng(ev.target.value);
    }

    onLat = (ev)=>{
        this.state.station.location.lat = Number(ev.target.value);
        this.setState(this.state);
    }

    onLng = (ev)=>{
        this.state.station.location.lng = Number(ev.target.value);
        this.setState(this.state);
    }

    infoChange = (event)=>{

        let newState = Object.assign({},this.state);
        newState.station.info = event.target.value;
        this.setState(newState);
    }

    _handleUpload = (evt)=>{

        let exit = false;

        this.state.pic.forEach(ele => {
            if(ele.file.name){

                if(ele.file.name === evt.target.files[0].name){
                    
                    alert("you cant selects same pictures!")
                    exit = true;
                }
            }
        });

        if(exit){return};
        
        this.state.pic.forEach(ele => {
            
            if(ele.status == "ready"){
                
                let file = evt.target.files[0];

                let url = URL.createObjectURL(file);

                let img = new Image();
                img.src = url;
                
                img.onload = ()=>{

                    if(img.width == 840 && img.height == 560){

                        ele.file = file;
                        ele.url = url;
                        ele.status = "";
                        this.setState(this.state);
                    }else{
                        alert("the image's width and height should be 840 x 560")
                    }
                };
            }
        });

        // free up the fileInput again
        this.filePicker.value = null;
    }

    showPic = (num)=>{

        // for not selecting 2 pic at once
        this.state.pic.forEach(ele => {
            if(ele.status == "ready"){
                ele.status = "";
            }
        });

        this.state.pic.forEach(ele => {
            if(ele.num == num){
                ele.status = "ready";
            }
        });

        this.filePicker.click()
        
    }

    edit = async ()=>{

        let ans = window.confirm("Do you wanna save the changes?");

        if(ans){

            let formData = new FormData();
            formData.append("token", App.user._id);
            formData.append("_id", this.state.station._id);
            formData.append("title", this.state.station.title);
            formData.append("type", this.state.station.type);
            formData.append("xp", this.state.station.xp);
            formData.append("is_special", this.state.station.is_special);
            formData.append("short_info", this.state.station.short_info);
            formData.append("info", this.state.station.info);
            formData.append("lat", this.state.station.location.lat);
            formData.append("lng", this.state.station.location.lng);
            let pics = this.state.pic;
            if(pics[0].file){formData.append(pics[0].file.name+pics[0].file.size , pics[0].num); formData.append('file',pics[0].file)}
            if(pics[1].file){formData.append(pics[1].file.name+pics[1].file.size , pics[1].num); formData.append('file',pics[1].file)}
            if(pics[2].file){formData.append(pics[2].file.name+pics[2].file.size , pics[2].num); formData.append('file',pics[2].file)}
            console.log(pics[0].file);
            

            let res = await fetch(Server.urls.ADMIN_EDIT_STATION,{
                method:"POST",
                body:formData,
            });

            res = await res.json();

            if(res.result_code === Server.result_codes.SUCCESS){

                this.showMessage("Station edited successfully");

                this.props.history.push("/admin/stationinfo");
            
            }else{

                this.showMessage(res.result_code);
            }
        }
    }

    addDefaultSrc(ev, num){
        this.state.pics_status[num]=false;
        ev.target.src = require('../assets/images/add.png');
    }

    showMessage = (m)=>{
        this.alert(m);
    }

    render(){
        let url = `${Server.domain+Server.urls.GET_SATION_PIC}?file_name=${App.Selected_Station._id}`
        this.state.url = url;

        let {title, info, short_info, type, xp, location, checkins, is_special, created_at, updated_at} = this.state.station;
        created_at = created_at.slice(0,10);
        updated_at = updated_at.slice(0,10);
        is_special = is_special?"بله":"خیر";

        return(
            <div style={s.con}>

                <div style={s.pics_con}>

                    <input type={'file'} style={{ display: 'none' }} accept=".jpg" onChange={this._handleUpload} ref={r=>this.filePicker = r}/>

                    <img style={s.pic} src={this.state.pic[0].url} onError={(ev)=>{this.addDefaultSrc(ev, 1)}} onClick={()=>{this.showPic(1)}}/>

                    <img style={s.pic} src={this.state.pic[1].url} onError={(ev)=>{this.addDefaultSrc(ev, 2)}} onClick={()=>{this.showPic(2)}}/>

                    <img style={s.pic} src={this.state.pic[2].url} onError={(ev)=>{this.addDefaultSrc(ev, 3)}} onClick={()=>{this.showPic(3)}}/>

                </div>

                <div style={s.info_con}>

                    <div style={s.sec1}>

                        <div style={s.edit_btn} onClick={this.edit}>{"ثبت"}</div>

                    </div>

                    <div style={s.sec1}>

                        <div style={s.text1}><input style={s.input1} onChange={this.onTitle} value={title}/>{" : عنوان"}</div>

                        <div style={s.text1}>
                            <select value={Type2Farsi(this.state.station.type)} onChange={this.onType}>
                                <option>{"نشان شهر"}</option>
                                <option>{"پیادگردی"}</option>
                                <option>{"خوردنی"}</option>
                                <option>{"نشستنی"}</option>
                                <option>{"خریدنی"}</option>
                            </select>
                            {" : نوع"}
                        </div>

                        <div hidden={this.state.hideXp} style={s.text1}><input style={s.xp_input} onChange={this.onXp} type="number" value={xp}/>{" : امتیاز"}</div>

                    </div>

                    <div style={s.sec1}>

                        <div style={s.text1}><input style={s.short_info_input} onChange={this.onShortInfo} value={short_info}/>{" : توضیح مختصر"}</div>

                        <div hidden={this.state.hideIs_special} style={s.text1}>
                            <select value={Special2Farsi(this.state.station.is_special)} onChange={this.onSpecial}>
                                <option>{"بله"}</option>
                                <option>{"خیر"}</option>
                            </select>
                            {" : ویژه"}
                        </div>

                    </div>

                    <div style={s.sec2}>

                        <div style={s.info_t}>{" : "+"توضیحات"}</div>
                        
                        <textarea style={s.info} value={info} onChange={this.infoChange} />
                        
                        <div style={s.location_t}>{" : "+"مختصات"}</div>
                        <div style={s.location}>

                            <a href={`https://www.google.com/maps/@${location.lat},${location.lng},21z`}>گوگل مپ</a>

                            <div style={s.text1}>{"latitude"}&emsp;{": "}<input style={s.input2} onChange={this.onLat} value={location.lat}/></div>

                            <div style={s.text1}>{"longitude : "}<input style={s.input2} onChange={this.onLng} value={location.lng}/></div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default withRouter(StationEdit);

const s = {

    con:{
        height:'100%',
        width:'100%',
        display:'flex',
        borderRadius:10,
        opacity:0.9,
        fontFamily:'IranSans',
        overflow:'hidden',
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

    input1:{

        fontFamily:'IranSans',
        fontSize:16,
        textAlign:'right',
        direction:'rtl'
    },

    input2:{

        width:80,
        fontFamily:'IranSans',
        fontSize:16,
        textAlign:'left',
    },

    xp_input:{
        width:60,
        fontFamily:'IranSans',
        fontSize:16,
        textAlign:'left',
    },

    short_info_input:{
        width:320,
        fontFamily:'IranSans',
        fontSize:16,
        textAlign:'right',
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
        //backgroundColor:'blue'
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
        color:Consts.colors.b1,
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
        resize:'none',
        fontFamily:'IranSans',
        fontSize:16,
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
        backgroundColor:Consts.colors.a3,
    },

    text2:{
        borderRadius:6,
        alignSelf:'flex-start',
        marginRight:10,
        paddingRight:10,
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:Consts.colors.a3,
    },

}

function Type2Eng(type){

    switch(type){
        case"نشان شهر":return"landmark"
        case"پیادگردی":return"walking"
        case"خوردنی":return"eating"
        case"نشستنی":return"sitting"
        case"خریدنی":return"shopping"
    }
}

function Special2Farsi(special){
    switch(special){
        case true:return "بله"
        case false:return "خیر"
    }
}

function Special2Eng(special){
    switch(special){
        case"بله":return true
        case"خیر":return false
    }
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
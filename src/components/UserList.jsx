import React from 'react';
import App from '../App';
import {withRouter} from 'react-router-dom';
import Server from '../utils/Server';
import UserListItem from './UserListItem';
import Consts from '../utils/Consts';


class UserList extends React.Component{

    state={list : []}

    async componentDidMount(){

        if(!App.All_Users) App.All_Users=[];

        if(App.All_Users.length === 0){

            let res = await this.updateAllUsers();

            if(res === Server.result_codes.SUCCESS){

                let newState = Object.assign({},this.state);
                newState.list = App.All_Users;
                this.setState(newState);

            }else if(res === Server.result_codes.INVALID_TOKEN){

                this.props.history.push('/admin/auth');
            }

        }else{

            let newState = Object.assign({},this.state);
            newState.list = App.All_Users;
            this.setState(newState);
        }
    }

    updateAllUsers = async ()=>{

        if(App.user._id){

            let res = await Server.postReq(Server.urls.ADMIN_ALL_USERS, {token:App.user._id});
        
            App.All_Users = res.data;
        
            return res.result_code;
        
        }else{

            return Server.result_codes.INVALID_TOKEN;
        }
    }

    render(){
        return(
            <div style={s.con}>
                <div style={s.headers}>
                    <div style={{...s.header,...{width:"38%"}}}>{"نام کاربر"}</div>
                    <div style={{...s.header,...{width:"16%"}}}>{"شماره موبایل"}</div>
                    <div style={{...s.header,...{width:"8%"}}}>{"پرچم"}</div>
                    <div style={{...s.header,...{width:"16%"}}}>{"امتیاز"}</div>
                    <div style={{...s.header,...{width:"14%", borderLeftWidth:0}}}>{"تاریخ عضویت"}</div>
                </div>
                
                <div style={s.scroller}>
                    
                    <div style={{height:10}}/>
                    {this.state.list.map((v, i)=>(<UserListItem index={i} data={v}/>))}
                    <div style={{height:5}}/>

                </div>
            </div>
        )
    }
}

export default withRouter(UserList);

const s = {

    con:{

        height:'95%',
        width:'100%',
        borderRadius:10,
        opacity:0.8,
        overflow:'hidden',
        backgroundColor:'white'
    },

    headers:{
        height:'10%',
        widt:'100%',
        marginRight:17,
        display:'flex',
        justifyContent:'center',
        flexDirection:'row-reverse',
        //backgroundColor:'gray'
    },

    header:{
        height:'100%',
        display:'flex',
        borderWidth:0,
        borderColor:'rgba(0,0,0,0.2)',
        borderStyle:'solid',
        borderLeftWidth:1,
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'IranSans',
    },

    scroller:{
        height:'90%',
        overflow:'auto',
        backgroundColor:Consts.colors.d1
    }
}
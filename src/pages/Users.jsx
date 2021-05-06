import React from 'react';
import Server from '../utils/Server';
import {withRouter} from "react-router-dom";
import UserList from '../components/UserList';
import Consts from '../utils/Consts';

export default class Users extends React.Component{

    async componentDidMount(){
    }

    render(){
        return(
            <div style={s.con}>

                <div style={s.bar}>

                </div>

                <div style={s.list_con}>
                    
                    <UserList/>
                
                </div>

            </div>
        )
    }
}

const s = {
    con:{
        height:'100%',
        width:'100%',
        //backgroundColor:'green'  
    },

    bar:{
        height:'10%',
        width:'100%',
        borderRadius:10,
        backgroundColor:Consts.colors.a5
    },

    list_con:{
        height:'90%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'blue'
    }
}
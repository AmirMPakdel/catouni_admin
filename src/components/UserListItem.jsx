import React from 'react';
import {withRouter} from "react-router-dom";
import App from '../App';
import Consts from '../utils/Consts';

class StationList extends React.Component{

    state = {list:{checkins:[]}, backgroundColor:Consts.colors.a1}
    
    componentWillMount(){
        if(this.props.index % 2 == 1){
            this.state.backgroundColor = Consts.colors.a3
        }
    }

    onClick = (e)=>{
        App.Selected_User = this.props.data;
        this.props.history.push("/admin/userinfo");
    }

    render(){
        let {full_name, created_at, xp, phone_number_dcr, checkins} = this.props.data;
        created_at = created_at.slice(0,10)
        return(
            <div style={s.con} onClick={(this.onClick)}>
                <div style={{...s.header,...{width:"38%"}}}>{full_name}</div>
                <div style={{...s.header,...{width:"16%"}}}>{phone_number_dcr}</div>
                <div style={{...s.header,...{width:"8%"}}}>{checkins.length}</div>
                <div style={{...s.header,...{width:"16%"}}}>{xp}</div>
                <div style={{...s.header,...{width:"14%", borderLeftWidth:0}}}>{created_at}</div>
            </div>
        )
    }
}

export default withRouter(StationList)

const s = {

    con:{
        cursor:'pointer',
        height:'10%',
        width:'100%',
        fontFamily:'IranSans',
        fontSize:15,
        marginBottom:8,
        display:'flex',
        justifyContent:'center',
        flexDirection:'row-reverse',
        backgroundColor:'white'
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
    },
}
import React from 'react';
import {withRouter} from "react-router-dom";
import App from '../App';
import Consts from '../utils/Consts';

class StationList extends React.Component{

    state={backgroundColor:Consts.colors.a1}
    
    componentWillMount(){
        if(this.props.index % 2 == 1){
            this.state.backgroundColor = Consts.colors.a3
        }
    }

    onClick = (e)=>{
        App.Selected_Station = this.props.data;
        this.props.history.push("/admin/stationinfo");
    }

    render(){
        let {title, writter, created_at, xp, type} = this.props.data;
        created_at = created_at.slice(0,10)
        return(
            <div style={{...s.con,...{backgroundColor:this.state.backgroundColor}}} onClick={(this.onClick)}>
                <div style={{...s.header,...{width:"36%"}}}>{title}</div>
                <div style={{...s.header,...{width:"10%"}}}>{Type2Farsi(type)}</div>
                <div style={{...s.header,...{width:"24%"}}}>{writter.name}</div>
                <div style={{...s.header,...{width:"8%"}}}>{xp}</div>
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
        fontSize:14,
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

function Type2Farsi(type){

    switch(type){
        case"landmark":return"نشان شهر"
        case"walking":return"پیادگردی"
        case"eating":return"خوردنی"
        case"sitting":return"نشستنی"
        case"shopping":return"خریدنی"
    }
}
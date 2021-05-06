import React from 'react';
import Server from '../utils/Server';
import StationList from '../components/StationList';
import Consts from '../utils/Consts';
import {withRouter} from 'react-router-dom';

class Stations extends React.Component{

    

    async componentDidMount(){
    }

    onAdd = ()=>{

        this.props.history.push("/admin/addstation");
    }

    render(){
        return(
            <div style={s.con}>

                <div style={s.bar}>

                    <div style={s.btn1} onClick={this.onAdd}>{"ایستگاه جدید"}</div>

                </div>

                <div style={s.list_con}>
                    
                    <StationList/>
                
                </div>

            </div>
        )
    }
}

export default withRouter(Stations);

const s = {
    con:{
        height:'100%',
        width:'100%',
        //backgroundColor:'yellow'  
    },

    bar:{
        height:'10%',
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly',
        borderRadius:10,
        backgroundColor:Consts.colors.a5
    },

    btn1:{
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

    list_con:{
        height:'90%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'red'
    }
}
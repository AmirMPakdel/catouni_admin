import React, { Component } from 'react';
import App from '../App';
import bg1 from '../assets/images/bg1.jpg';
import Consts from '../utils/Consts';

class My404Page extends Component {
    state = {  }

    componentDidMount(){

        let con = document.getElementsByClassName("App")[0];
        con.style.backgroundImage = `url(${bg1})`
    }

    render() { 
        return ( 
        
            <div style={s.con}>

                <div style={{
                display:'flex',
                justifyContent:'center',
                margin:0,
                width:'100%',
                height:'30%',
                borderTopLeftRadius:15,
                borderTopRightRadius:15,
                backgroundColor:'rgb(63,74,80)'}}>

                <div style={s.logo_con}>

                <div style={s.icon}>
                    <div style={{color:'white', 
                    fontSize:55, userSelect: 'none' }}>ادمین&thinsp;</div>
                    <div style={{ color:Consts.colors.c1, 
                    fontSize:55, userSelect: 'none' }}>کتونی</div>
                </div>
                </div>
                
            </div>

            <div style={{opacity:0.85,
                display:'flex',
                height:'70%',
                width:'100%',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-around',
                borderBottomLeftRadius:15,
                borderBottomRightRadius:15,
                backgroundColor:'rgb(255,255,255,0.8'}}>

                    <div style={s.text}>!صفحه مورد نظر یافت نشد</div>

                </div>
            </div>);
    }
}

const s ={
    con:{
        //position:'absolute',
        height:'90%',
        width:'80%',
        fontFamily:'IranSans',
    },
    logo_con:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'space-around',
        height:'100%',
        width:'20%',
    },

    text:{
        color:'white',
        fontSize:30,
        color:Consts.colors.b3
    },

    icon:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
}
 
export default My404Page;
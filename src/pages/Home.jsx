import React, { Component } from 'react'
import bg from '../assets/images/rasht.jpg'
import App from '../App';
import Consts from '../utils/Consts';
import {withRouter} from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.js";
import Contact from "../components/Contact/Contact.js";
import Footer from "../components/Footer/Footer.js";
import Gallery from "../components/Gallery/Gallery.js";
import Header from "../components/Header/Header.js";

class Home extends Component {

    componentDidMount(){
        let con = document.getElementsByClassName("App")[0];
        //App.instance.changeBG(bg);
    }

    admin = ()=>{

        this.props.history.push("/admin/auth");
    }

    render() {
        return (
            <div className="web">
            <Header />
            <Gallery />
            <Sidebar />
            <Contact />
            <Footer />
        </div>
        )
    }
}

export default withRouter(Home);

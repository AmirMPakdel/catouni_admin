import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Stations from "./pages/Stations";
import Users from "./pages/Users";
import Weekly from "./pages/Weekly";
import Server from "./utils/Server";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import StationInfo from "./pages/StationInfo";
import StationEdit from "./pages/StationEdit";
import NotFound from "./pages/NotFound";
import Authentication from "./pages/Authentication";
import AddStation from "./pages/AddStation";

class App extends React.Component {
	static All_Stations = [];
	static All_Users = [];
	static Selected_Station = {};
	static Selected_User = {};
	static weekly = {};
	static user = "";
	static instance = {};

	state = {};

	componentWillMount() {
		App.All_Stations = [];
		App.All_Users = [];
		App.instance = this;
	}

	async componentDidMount() {}

	changeBG = (bg) => {
		let con = document.getElementsByClassName("App")[0];
		con.style.backgroundImage = `url(${bg})`;
	};

	render() {
		return (
			<Router>
				<div className="App">
					<Route
						exact
						component={Header}
						path={[
							"/admin/",
							"/admin/users",
							"/admin/weekly",
							"/admin/userinfo",
							"/admin/stationinfo",
							"/admin/stationedit"
						]}
					/>

					<div className="MainContainer">
						<Switch>
							<Route exact path="/" component={Home} />

							<Route exact path="/admin/" exact component={Stations} />

							<Route path="/admin/auth" component={Authentication} />

							<Route exact path="/admin/users" component={Users} />

							<Route exact path="/admin/weekly" component={Weekly} />

							<Route exact path="/admin/userinfo" component={UserInfo} />

							<Route exact path="/admin/stationinfo" component={StationInfo} />

							<Route exact path="/admin/stationedit" component={StationEdit} />

							<Route exact path="/admin/addstation" component={AddStation} />

							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

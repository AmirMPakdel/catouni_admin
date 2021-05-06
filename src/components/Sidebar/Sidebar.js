import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
	//Return Of Sidebar Component
	return (
		<div className="sidebar">
			<ul>{sidebarItemsHandler()}</ul>
		</div>
	);
};

//Function For Returning Sidebar Items
function sidebarItemsHandler() {
	const sidebarItems = [
		{ glyphIcon: "fa fa-home", title: "خانه", link: "#home" },
		{ glyphIcon: "fa fa-image", title: "گالری", link: "#gallery" },
		{ glyphIcon: "fa fa-envelope", title: "ارتباط با ما", link: "#contactus" }
	];
	return sidebarItems.map((items, index) => {
		return (
			<li key={index}>
				<a className="nodec" href={items.link}>
					<i className={items.glyphIcon}></i>
					{items.title}
				</a>
			</li>
		);
	});
}

export default Sidebar;

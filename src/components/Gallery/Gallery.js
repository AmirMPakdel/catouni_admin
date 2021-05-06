import React from "react";
import "./Gallery.css";
import { isTSEnumMember } from "@babel/types";

const Gallery = () => {
	return (
		<div id="gallery" className="gallerysection">
			<div className="wrapper">
				<h1 className="maincolor sectiontitle">عکس های گالری</h1>
				<hr className="hr"></hr>
				<div className="gallerywrapper">
					<div className="gallery">{galleryImageHandler()}</div>
				</div>
			</div>
		</div>
	);
};

function galleryImageHandler() {
	const galleryImage = [
		{
			link: "../../Assets/IMG_20180928_160701.jpg",
			title: "خانه میرزا کوچک خان جنگلی"
		},
		{
			link: "../../Assets/IMG_20180928_160701.jpg",
			title: "خانه میرزا کوچک خان جنگلی"
		},
		{
			link: "../../Assets/IMG_20180928_160701.jpg",
			title: "خانه میرزا کوچک خان جنگلی"
		},
		{
			link: "../../Assets/IMG_20180928_160701.jpg",
			title: "خانه میرزا کوچک خان جنگلی"
		},
		{
			link: "../../Assets/IMG_20180928_160701.jpg",
			title: "خانه میرزا کوچک خان جنگلی"
		},
		{
			link: "../../Assets/IMG_20180928_160701.jpg",
			title: "خانه میرزا کوچک خان جنگلی"
		},
		{
			link: "../../Assets/IMG_20180928_160701.jpg",
			title: "خانه میرزا کوچک خان جنگلی"
		},
		{
			link: "../../Assets/IMG_20180928_160701.jpg",
			title: "خانه میرزا کوچک خان جنگلی"
		}
	];
	return galleryImage.map((item, index) => {
		return (
			<div key={index} className="galleryimage">
				<img src={"http://picsum.photos/140/220?random"} />
				<div className="imagetitle">
					<h3>{item.title}</h3>
					<p id="photographer">
						<a>منتشر کننده</a> : علی
					</p>
					<p id="photographer">
						<a>امتیاز</a> : 4.9
					</p>{" "}
					<p className="description">
						میرزا کوچک یک خانه بسیار زیبا در مرکز شهر رشت دارد که موزه ای که
						فلان فلان فلان .
					</p>
				</div>
			</div>
		);
	});
}

export default Gallery;

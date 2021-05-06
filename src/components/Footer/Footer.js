import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<div className="footer">
			<div className="wrapper">
				<ul>{socialMediaIconsHandler()}</ul>
				<p className="copyright">تمام حقوق کار محفوظ است</p>
			</div>
		</div>
	);
};
function socialMediaIconsHandler() {
	const itemGlyph = [
		{
			name: "facebook",
			class: "fa fa-facebook-official",
			link: "http://google.com"
		},
		{ name: "instagram", class: "fa fa-instagram", link: "http://google.com" },
		{ name: "printest", class: "fa fa-pinterest-p", link: "http://google.com" },
		{ name: "twitter", class: "fa fa-twitter", link: "http://google.com" },
		{ name: "linkedin", class: "fa fa-linkedin", link: "http://google.com" }
	];
	return itemGlyph.map((item, index) => {
		return (
			<li key={index}>
				<a className="socialmedia" href={item.link}>
					<i className={item.class}></i>
				</a>
			</li>
		);
	});
}

export default Footer;

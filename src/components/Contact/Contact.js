import React from "react";
import "./Contact.css";

const Contact = () => {
	//Class Of Send Icon
	const classGlyph = ["fa", "fa-paper-plane"];
	classGlyph.push("send");

	//Return Of Contact Component
	return (
		<div id="contactus" className="contact">
			<div className="wrapper">
				<h1 className="maincolor sectiontitle">ارتباط با ما</h1>
				<hr className="hr"></hr>
				<ul className="contactdetail">{contactItemHandler()}</ul>
				<br></br>
				<p className="callustext">لطفا برای ما پیام بگذارید</p>
				<div className="formbox">
					{contactFromHandler()}
					<button>
						<i className={classGlyph.join(" ")}></i>ارسال
					</button>
				</div>
			</div>
		</div>
	);
};

//Function For Returning Sidebar Items
function contactItemHandler() {
	const contactItem = [
		{
			title: "گیلان - فومن - خونه صابر",
			glyphIcon: "fa fa-map-marker maincolor"
		},
		{ title: "09118064351", glyphIcon: "fa fa-phone maincolor" },
		{
			title: "support@catouni.ir",
			glyphIcon: "fa fa-envelope maincolor"
		}
	];
	return contactItem.map((item, index) => {
		return (
			<li key={index}>
				<p className="contactlist">
					<i className={item.glyphIcon}></i>
					<a className="Contactlisttext">{item.title}</a>
				</p>
			</li>
		);
	});
}

//Function For Returning Contact Form
function contactFromHandler() {
	const contactFormItems = [
		{ placeholder: "نام", name: "name" },
		{ placeholder: "ایمیل", name: "email" },
		{ placeholder: "موضوع", name: "subject" },
		{ placeholder: "پیام", name: "message" }
	];
	return contactFormItems.map((item, index) => {
		return (
			<input
				key={index}
				type="text"
				className="contactform"
				placeholder={item.placeholder}
			></input>
		);
	});
}

export default Contact;

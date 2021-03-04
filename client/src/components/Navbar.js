import React from "react";

//css
import "./Navbar.style.css";

//import custom component

function Navbar(props) {
	return (
		<header className="navbar">
			<div className="all-container">
				<a href="/" class="logo">
					fosha
				</a>

				<a className="write-post" href="/post/compose">
					<span>Write post</span>
				</a>
			</div>
		</header>
	);
}

export default Navbar;

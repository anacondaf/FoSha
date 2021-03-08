import React, { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { Icon } from "@mdi/react";
import { mdiCheckboxBlankCircle } from "@mdi/js";

//css
import "./readpost.style.css";

function Readpost(props) {
	let [MARKDOWN, setMarkdown] = useState("");

	useEffect(() => {
		setMarkdown(JSON.parse(localStorage.getItem("post-content")).content);
	});

	return (
		<div className="read-post">
			<div className="app-container">
				<div className="view-content">
					<img
						src="https://i.imgur.com/zTZVw4C.jpg"
						style={{ width: "100%", height: 300, objectFit: "cover" }}
					></img>

					<div className="content-main">
						<div className="content-header">
							<h1>Integrate ESLint with your React project (javascript)</h1>

							<ul className="tags">
								<li>
									<a>#javascript</a>
								</li>
								<li>
									<a>#nodejs</a>
								</li>
								<li>
									<a>#react</a>
								</li>
							</ul>

							<div className="author-date">
								<div className="author">
									<a>
										<img src="https://martinfowler.com/img/mf-dallas.jpg"></img>
									</a>
									<p>Martin Fowler</p>
								</div>

								<div className="date">
									<p>Mar 8</p>
									<Icon path={mdiCheckboxBlankCircle} />
									<p>2 min read</p>
								</div>
							</div>
						</div>

						<div className="content-body">
							{/* Markdown render here */}
							<p>
								First of all we need to install ESLint Note: with a single
								command will install 6 plugins: eslint-config-airbnb,
								eslint-plugin-import, eslint-plugin-react,
								eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y. You can
								also install these plugins individually.
							</p>
						</div>
					</div>
				</div>

				<div className="author-detail">
					<div className="style-on-top"></div>

					<div className="data-inner">
						<div className="upper-part">
							<img
								className="user-avatar"
								src="https://martinfowler.com/img/mf-dallas.jpg"
								style={{
									width: 60,
									height: 60,
									objectFit: "cover",
									borderRadius: "100%",
								}}
							></img>

							<blockquote className="author-name">Martin Fowler</blockquote>
						</div>

						<div className="below-part">
							<button>
								<span>Follow</span>
							</button>
							<div className="join-date">
								<p>JOINED</p>
								<p className="full-date">Jun 13, 2020</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Readpost;

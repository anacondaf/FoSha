import React, { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { Icon } from "@mdi/react";
import { mdiCheckboxBlankCircle } from "@mdi/js";
import axios from "axios";

import { useParams } from "react-router-dom";

//css
import "./readpost.style.css";

function Readpost(props) {
	let [MARKDOWN, setMarkdown] = useState("");
	let [post, setPostContent] = useState({});

	let { post_id } = useParams();

	useEffect(() => {
		let result = axios
			.get(`http://localhost:3004/getPosts/${post_id}`)
			.then((result) => {
				setPostContent(result.data.postContent);
				setMarkdown(result.data.postContent.content);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="read-post">
			<div className="app-container">
				<div className="view-content">
					<img
						src={post.mainbackground}
						style={{ width: "100%", height: 300, objectFit: "cover" }}
					></img>

					<div className="content-main">
						<div className="content-header">
							<ReactMarkDown children={post.caption} />

							<ul className="tags">
								{/* {post.tags.map((tag) => {
									return (
										<li>
											<a># {tag}</a>
										</li>
									);
								})} */}
							</ul>

							<div className="author-date">
								<div className="author">
									<a>
										<img src="https://yt3.ggpht.com/ytc/AAUvwnhSeGCbeHJD09S7X-Qo8yuQKJqYdHa85OqkBDzSmg=s900-c-k-c0x00ffffff-no-rj"></img>
									</a>
									<p>Gordon Ramsay</p>
								</div>

								<div className="date">
									<p>{post.date}</p>
									<Icon path={mdiCheckboxBlankCircle} />
									<p>2 min read</p>
								</div>
							</div>
						</div>

						<div className="content-body">
							<ReactMarkDown children={MARKDOWN} />
						</div>
					</div>
				</div>

				<div className="author-detail">
					<div className="style-on-top"></div>

					<div className="data-inner">
						<div className="upper-part">
							<img
								className="user-avatar"
								src="https://yt3.ggpht.com/ytc/AAUvwnhSeGCbeHJD09S7X-Qo8yuQKJqYdHa85OqkBDzSmg=s900-c-k-c0x00ffffff-no-rj"
								style={{
									width: 60,
									height: 60,
									objectFit: "cover",
									borderRadius: "100%",
								}}
							></img>

							<blockquote className="author-name">Gordon Ramsay</blockquote>
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

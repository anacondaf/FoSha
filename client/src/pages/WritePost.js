import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

//css
import "./Writepost.style.css";

import Icon from "@mdi/react";
import { mdiArrowLeft, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Loader from "react-loader-spinner";

function WritePost(props) {
	//cover image state
	let [coverUrl, setCoverUrl] = useState("");

	//upload spinner state
	let [loading, setLoading] = useState(0);

	//upload failed
	let [uploadFailed, setUploadFailed] = useState(false);

	//user put content
	let [postContent, setPostContent] = useState({
		caption: "",
		mainbackground: "",
		category: "Food",
		content: "",
		tagsList: [],
	});

	let [tags, setTags] = useState("");

	//redirect to /newsfeed
	let [redirect, setRedirect] = useState(null);

	//caption-field and content-field height
	let [captionHeight, setCaptionHeight] = useState(60);
	let [contentHeight, setContentHeight] = useState(240);

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("post-content")) === null) {
			localStorage.setItem("post-content", JSON.stringify(postContent));
		} else {
			let postFromStorage = JSON.parse(localStorage.getItem("post-content"));
			setPostContent(postFromStorage);
			postFromStorage.mainbackground ? setLoading(2) : setLoading(0);
			setCoverUrl(postFromStorage.mainbackground);
		}

		if (JSON.parse(localStorage.getItem("textarea-height")) === null) {
			localStorage.setItem(
				"textarea-height",
				JSON.stringify({
					captionHeight,
					contentHeight,
				})
			);
		} else {
			let textareaHeight = JSON.parse(localStorage.getItem("textarea-height"));
			setCaptionHeight(textareaHeight.captionHeight);
			setContentHeight(textareaHeight.contentHeight);
		}
	}, []);

	//prevent tags input enter for new line
	const preventNewLine = (e) => {
		return (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
			}
		};
	};

	const onKeyUp = (e) => {
		if (e.keyCode === 188) {
			setTags(tags + "  ");
		}
	};

	//value change for tags input
	const changeTags = (e) => {
		setTags(e.target.value);
	};

	const dropOption = (e) => {
		let options = document.querySelector(".options");
		options.classList.toggle("drop");
	};

	const userChooseOption = (e) => {
		let option = e.target;
		let options = document.querySelector(".select-button");
		options.children[0].innerHTML = option.innerHTML;

		//add category to localStorage
		let { caption, mainbackground, content, tagsList } = postContent;

		setPostContent(
			(postContent = {
				caption: caption,
				mainbackground: mainbackground,
				category: option.innerHTML,
				content: content,
				tagsList: tagsList,
			})
		);

		localStorage.setItem("post-content", JSON.stringify(postContent));

		dropOption(e);
	};

	const OPTIONS = [
		{ id: 1, name: "Trang mieng" },
		{ id: 2, name: "Trai cay" },
		{ id: 3, name: "Banh" },
		{ id: 4, name: "Cocktail" },
		{ id: 5, name: "Detox" },
		{ id: 6, name: "Sinh to" },
	];

	let sendImage = async (e) => {
		let files = e.target.files;
		let data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "bdyzskvu");

		setLoading(1);

		const response = await fetch(
			"https://api.cloudinary.com/v1_1/djbkxkx8m/image/upload",
			{
				method: "POST",
				body: data,
			}
		);

		const file = await response.json();

		setCoverUrl(file.secure_url);

		let { caption, category, content, tagsList } = postContent;

		setPostContent(
			(postContent = {
				caption: caption,
				mainbackground: file.secure_url,
				category: category,
				content: content,
				tagsList: tagsList,
			})
		);

		localStorage.setItem("post-content", JSON.stringify(postContent));

		setLoading(2);
	};

	let uploadComponent;

	if (loading === 0) {
		uploadComponent = (
			<>
				<button className="post-cover-image">
					<label for="cover-image-input">Add cover image</label>
					<input
						id="cover-image-input"
						type="file"
						accept="image/*"
						className="upload-cover-btn"
						name="cover-image"
						onChange={sendImage}
					/>
				</button>
				{uploadFailed ? (
					<div className="error-logs">
						<span>Image resolution must below 1920x1080</span>
					</div>
				) : null}
			</>
		);
	} else if (loading === 1) {
		uploadComponent = (
			<>
				<Loader
					type="ThreeDots"
					color="#000"
					height={24}
					width={24}
					radius={0}
				/>
				<h3
					style={{
						marginLeft: "5px",
					}}
				>
					Uploading....
				</h3>
			</>
		);
	} else if (loading === 2) {
		localStorage.getItem("post-content");

		uploadComponent = (
			<>
				<img
					src={coverUrl}
					style={{
						width: 235,
						height: 100,
						objectFit: "cover",
						borderRadius: "5px",
						marginRight: "1em",
					}}
				/>
				<div className="change-and-remove">
					<button
						className="post-cover-image"
						style={{
							padding: "0.5em 1em",
						}}
					>
						<span
							style={{
								fontFamily: "Nunito",
								fontSize: "15px",
								fontWeight: "600",
							}}
						>
							Change
						</span>
					</button>

					<button
						className="post-cover-image"
						style={{ padding: "0.5em 1em", border: "none" }}
					>
						<span
							style={{
								fontFamily: "Nunito",
								fontSize: "15px",
								fontWeight: "600",
								color: "red",
							}}
						>
							Remove
						</span>
					</button>
				</div>{" "}
			</>
		);
	}

	const changePostContent = (e) => {
		return (e) => {
			let {
				caption,
				mainbackground,
				category,
				content,
				tagsList,
			} = postContent;

			let textarea = JSON.parse(localStorage.getItem("textarea-height"));

			switch (e.target.ariaLabel) {
				case "Post Title":
					setCaptionHeight(e.target.scrollHeight);
					textarea.captionHeight = e.target.scrollHeight;

					setPostContent(
						(postContent = {
							caption: e.target.value,
							mainbackground: mainbackground,
							category: category,
							content: content,
							tagsList: tagsList,
						})
					);

					break;
				case "Post Content":
					textarea.contentHeight = e.target.scrollHeight;
					setContentHeight(e.target.scrollHeight);

					setPostContent(
						(postContent = {
							caption: caption,
							mainbackground: mainbackground,
							category: category,
							content: e.target.value,
							tagsList: tagsList,
						})
					);

					break;
			}

			localStorage.setItem("textarea-height", JSON.stringify(textarea));
			localStorage.setItem("post-content", JSON.stringify(postContent));
		};
	};

	const postPostToApi = () => {
		postContent.caption = "# ".concat(postContent.caption);

		let tagWords = tags.split(/\W+/);

		if (tagWords[tagWords.length] === "") {
			postContent.tagsList = tagWords.slice(0, tagWords.length - 1);
		} else postContent.tagsList = tagWords.slice(0, tagWords.length);

		axios.post("http://localhost:3004/addPost", { postContent });

		localStorage.removeItem("post-content");
		localStorage.removeItem("textarea-height");
		setLoading(0);
		setRedirect("/newsfeed");
	};

	return redirect !== null ? (
		<Redirect to={redirect} />
	) : (
		<div className="write-post main">
			<div className="all-container">
				<div className="left-side-block">
					<div className="top-navbar">
						<div className="controll-block">
							<a href="/newsfeed" className="back-to-home">
								<Icon path={mdiArrowLeft} color="rgb(148, 148, 148" />
							</a>

							<p>Write new post</p>
						</div>

						<div className="combo-function">
							<a href="" className="edit-btn isFocused">
								Edit
							</a>
							<a href="" className="preview-btn">
								Preview
							</a>
						</div>
					</div>

					<div className="editing-content">
						<div className="post-header-field post-inner">
							<div className="upload-cover-image">{uploadComponent}</div>

							<div className="article-form-title">
								<textarea
									type="text"
									id="article-form-title"
									placeholder="New post title here..."
									autocomplete="off"
									className="caption-textfield"
									aria-label="Post Title"
									autofocus="true"
									onKeyDown={preventNewLine()}
									onChange={changePostContent()}
									value={postContent.caption}
									style={{ height: captionHeight }}
								></textarea>
							</div>

							<input
								data-testid="tag-input"
								id="tag-input"
								type="text"
								placeholder="Add up to 4 tags..."
								autocomplete="off"
								className="tags-textfield"
								aria-label="Post Tag"
								pattern="[0-9A-Za-z, ]+"
								onKeyDown={preventNewLine()}
								onKeyUp={onKeyUp}
								onChange={changeTags}
								value={tags}
							></input>

							<div className="category-group">
								<label for="sel-btn" className="select-label">
									Give your recipe a category
								</label>

								<div className="select-area">
									<div
										className="select-button"
										id="sel-btn"
										onClick={dropOption}
									>
										<span>Food</span>
										<div className="chevrons">
											<i className="fas fa-chevron-up icon-chevron"></i>
											<i className="fas fa-chevron-down icon-chevron"></i>
										</div>
									</div>
									<div className="options drop">
										{OPTIONS.map((option) => {
											return (
												<div className="option" onClick={userChooseOption}>
													{option.name}
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>

						<div className="post-body-field post-inner">
							<div className="post-body-wrap-content">
								<textarea
									type="text"
									placeholder="Start your content ..."
									autocomplete="off"
									className="content-textfield"
									aria-label="Post Content"
									onChange={changePostContent()}
									value={postContent.content}
									style={{ height: contentHeight }}
								></textarea>
							</div>
						</div>
					</div>

					<div className="publish-and-save ml-5">
						<a
							className="btn btn-outline-custom isFocused"
							onClick={postPostToApi}
						>
							Publish
						</a>

						<a className="btn btn-outline-custom">Save</a>
					</div>
				</div>

				<div className="right-side-block"></div>
			</div>
		</div>
	);
}

export default WritePost;

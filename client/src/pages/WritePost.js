import React, { useState, useEffect } from "react";

//css
import "./Writepost.style.css";

import Icon from "@mdi/react";
import { mdiArrowLeft, mdiChevronDown, mdiChevronUp } from "@mdi/js";

import Loader from "react-loader-spinner";

function WritePost(props) {
	//categories select options
	let [selectedOption, setSelectedOption] = useState("Food");

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
		category: "",
		content: "",
		tagsList: [],
	});

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("post-content")) === null) {
			localStorage.setItem("post-content", JSON.stringify(postContent));
		} else {
			let postFromStorage = JSON.parse(localStorage.getItem("post-content"));
			setPostContent(postFromStorage);
			setCoverUrl(postFromStorage.mainbackground);
			setLoading(2);
		}
	}, []);

	//prevent textarea enter for new line
	const preventNewLine = (e) => {
		return (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
			}
		};
	};

	const dropOption = (e) => {
		let options = document.querySelector(".options");
		options.classList.toggle("drop");
	};

	const userChooseOption = (e) => {
		let option = e.target;
		let options = document.querySelector(".select-button");
		options.children[0].innerHTML = option.innerHTML;

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
						class="upload-cover-btn"
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
			// let postContentStorage = localStorage.getItem("post-content");

			// localStorage.setItem("post-content", e.target.value);

			let {
				caption,
				mainbackground,
				category,
				content,
				tagsList,
			} = postContent;

			switch (e.target.ariaLabel) {
				case "Post Title":
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

			localStorage.setItem("post-content", JSON.stringify(postContent));
		};
	};

	return (
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
									class="crayons-textfield"
									aria-label="Post Title"
									autofocus="true"
									onKeyDown={preventNewLine()}
									onChange={changePostContent()}
									value={postContent.caption}
								></textarea>
							</div>

							<textarea
								type="text"
								placeholder="Tags(max 4)"
								autocomplete="off"
								class="tags-textfield"
								aria-label="Post Tag"
								onKeyDown={preventNewLine()}
							></textarea>

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
											<i class="fas fa-chevron-up icon-chevron"></i>
											<i class="fas fa-chevron-down icon-chevron"></i>
										</div>
									</div>
									<div className="options drop">
										{OPTIONS.map((option) => {
											return (
												<div class="option" onClick={userChooseOption}>
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
									class="content-textfield"
									aria-label="Post Content"
									onChange={changePostContent()}
									value={postContent.content}
								></textarea>
							</div>
						</div>
					</div>

					<div className="publish-and-save ml-5">
						<a href="index.html" class="btn btn-outline-custom isFocused">
							Publish
						</a>

						<a
							class="btn btn-outline-custom"
							onClick={() => {
								console.log(postContent);
							}}
						>
							Save
						</a>
					</div>
				</div>

				<div className="right-side-block"></div>
			</div>
		</div>
	);
}

export default WritePost;

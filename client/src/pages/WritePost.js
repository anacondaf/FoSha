import React from "react";

//css
import "./Writepost.style.css";

import Icon from "@mdi/react";
import { mdiArrowLeft, mdiChevronDown, mdiChevronUp } from "@mdi/js";

function WritePost(props) {
	//prevent textarea enter for new line
	const preventNewLine = (e) => {
		return (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
			}
		};
	};

	const selectList = {
		selectedOption: "Mango",
		options: ["Apple", "Orange", "Mango"],
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

					<div className="editing-content ml-5">
						<div className="post-header-field post-inner">
							<button className="post-cover-image">
								<label for="cover-image-input">Add cover image</label>
								<input
									id="cover-image-input"
									type="file"
									accept="image/*"
									class="upload-cover-btn"
									data-max-file-size-mb="25"
								/>
							</button>

							<div className="article-form-title">
								<textarea
									type="text"
									id="article-form-title"
									placeholder="New post title here..."
									autocomplete="off"
									class="crayons-textfield"
									aria-label="Post Title"
									autofocus="false"
									onKeyDown={preventNewLine()}
								></textarea>
							</div>

							<div className="category-group">
								<label for="sel-btn" className="select-label">
									Give your recipe a category
								</label>

								<div className="select-area">
									<div className="select-button" id="sel-btn">
										<span>Food</span>
										<div className="chevrons">
											<i class="fas fa-chevron-up icon-chevron"></i>
											<i class="fas fa-chevron-down icon-chevron"></i>
										</div>
									</div>
									<div className="options">
										<div class="option">
											<input
												class="s-c top"
												type="radio"
												name="platform"
												value="codepen"
											/>
											<input
												class="s-c bottom"
												type="radio"
												name="platform"
												value="codepen"
											/>
											<i class="fab fa-codepen" />
											<span class="label">CodePen</span>
											<span class="opt-val">CodePen</span>
										</div>
										<div id="option-bg"></div>
									</div>
								</div>
							</div>
						</div>

						<div className="post-body-field post-inner"></div>
					</div>

					<div className="publish-and-save ml-5">
						<a href="index.html" class="btn btn-outline-custom isFocused">
							Publish
						</a>

						<a href="index.html" class="btn btn-outline-custom">
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

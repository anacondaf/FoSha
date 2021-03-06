import React from "react";

//css
import "./Writepost.style.css";

import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";

function WritePost(props) {
	return (
		<div className="write-post main">
			<div className="all-container">
				<div className="left-side-block">
					<div className="top-navbar">
						<div className="controll-block">
							<Icon path={mdiArrowLeft} color="rgb(148, 148, 148" />
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

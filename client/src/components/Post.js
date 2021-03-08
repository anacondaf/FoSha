import React from "react";

import Icon from "@mdi/react";
import {
	mdiTagTextOutline,
	mdiCalendar,
	mdiCommentMultipleOutline,
	mdiArrowRight,
	mdiArrowUp,
} from "@mdi/js";

function PostItem(props) {
	let { item } = props;

	return (
		<article class="post">
			<div class="post-header">
				<h2 class="post-title">
					<a href="/view/dsadsaj">{item.caption}</a>
				</h2>
				<ul class="post-meta">
					<li>
						<Icon clasName="mdi" path={mdiCalendar} />
						<a>May 03, 2020</a>
					</li>
					<li>
						<Icon clasName="mdi" path={mdiTagTextOutline} />{" "}
						<a href="index.html">{item.tags}</a>
					</li>
					<li>
						<Icon clasName="mdi" path={mdiCommentMultipleOutline} />{" "}
						<a href="index.html">{item.comments} Comments</a>
					</li>
				</ul>
			</div>

			<div class="post-preview">
				<a href="/view/dsadsaj">
					<img src={item.mainbackground} alt="" class="img-fluid rounded" />
				</a>
			</div>

			<div class="post-content">
				<p>{item.description} [...]</p>
			</div>

			<div>
				<a href="index.html" class="btn btn-outline-custom">
					Read More <Icon path={mdiArrowRight} />
				</a>
			</div>
		</article>
	);
}

export default PostItem;

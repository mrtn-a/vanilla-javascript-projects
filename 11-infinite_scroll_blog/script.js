const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
	);

	const data = await res.json();

	return data;
}

// Show posts in DOM
async function showPosts() {
	const posts = await getPosts();

	// Iterate over all the posts and add them with HMTL
	posts.forEach((post) => {
		const postElement = document.createElement("div");
		postElement.classList.add("post");
		postElement.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

		postsContainer.appendChild(postElement);
	});
}

// Show loader, remote it with time and fetch more posts
function showLoading() {
	loading.classList.add("show");

	setTimeout(() => {
		loading.classList.remove("show");

		setTimeout(() => {
			page++; // increment
			showPosts();
		}, 300);
	}, 1000);
}

// Filter posts by input
function filterPosts(e) {
	const term = e.target.value.toUpperCase();
	const posts = document.querySelectorAll(".post"); // -> we get a node list

	posts.forEach((post) => {
		const title = post.querySelector(".post-title").innerText.toUpperCase();
		const body = post.querySelector(".post-body").innerText.toUpperCase();

		// indexOf to check if it matches; if there is no match, there'll be -1 returned, that's why we check for values above -1
		if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
			post.style.display = "flex";
		} else {
			post.style.display = "none";
		}
	});
}

// Show initial posts
showPosts();

// EVENT LISTENERS

// Run loading on window scroll
window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if (scrollTop + clientHeight >= scrollHeight - 5) {
		showLoading();
	}
});

// Run filter when someone types input
filter.addEventListener("input", filterPosts);

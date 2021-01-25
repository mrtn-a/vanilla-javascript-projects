const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
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
// Show initial posts
showPosts();

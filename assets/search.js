document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("search-box");
  const resultsList = document.getElementById("results");

  fetch("/search.json")
    .then((response) => response.json())
    .then((data) => {
      searchBox.addEventListener("input", function () {
        const query = this.value.toLowerCase();

        if (query.trim() === "") {
          resultsList.style.display = "none";
          resultsList.innerHTML = ""; // Clear previous results
        } else {
          resultsList.style.display = "block";
          const results = data.filter((post) => {
            const title = post.title ? post.title.toLowerCase() : "";
            return title.includes(query);
          });

          if (results.length === 0) {
            resultsList.innerHTML = `<li>Nothing found for the request</li>`;
          } else {
            resultsList.innerHTML = results
              .map(
                (post) => `
                <li>
                  <a href="${post.url}">${post.title}</a>
                </li>`
              )
              .join("");
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching search.json:", error);
    });
});

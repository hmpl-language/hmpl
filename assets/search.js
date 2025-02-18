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
        } else {
          resultsList.style.display = "block";
          const results = data.filter((post) => {
            const title = post.title ? post.title.toLowerCase() : "";
            return title.includes(query);
          });

          // Display the filtered results
          resultsList.innerHTML = results
            .map(
              (post) => `
              <li>
                <a href="${post.url}">${post.title}</a>
              </li>`
            )
            .join("");
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching search.json:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const tagLinks = document.querySelectorAll(".tag-filter-link");

  tagLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const tag = this.dataset.tag;

      if (tag) {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/index.html"
        ) {
          document.dispatchEvent(
            new CustomEvent("applyTagFilter", { detail: { tag } })
          );
        } else {
          sessionStorage.setItem("selectedTag", tag);
          window.location.href = "/";
        }
      }
    });
  });
});

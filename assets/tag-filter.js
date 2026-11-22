document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("tag-search-input");
  const searchFilter = document.getElementById("tag-search-filter");
  const dropdown = document.getElementById("tag-dropdown");
  const tagOptions = document.getElementById("tag-options");
  const selectedTagsDisplay = document.getElementById("selected-tags-display");
  const paginatedPosts = document.querySelectorAll(
    ".post-list:not(.post-list-all) > li"
  );
  const allPostsList = document.querySelector(".post-list-all");
  const allPosts = allPostsList
    ? document.querySelectorAll(".post-list-all > li")
    : [];
  const pagerSection = document.querySelector(".pager");
  const paginatedList = document.querySelector(
    ".post-list:not(.post-list-all)"
  );

  if (!searchInput || !dropdown) {
    return;
  }

  let selectedTags = [];

  const storedTag = sessionStorage.getItem("selectedTag");
  if (storedTag) {
    sessionStorage.removeItem("selectedTag");
    selectedTags.push(storedTag);
    const checkbox = document.querySelector(
      `.tag-checkbox[value="${storedTag}"]`
    );
    if (checkbox) {
      checkbox.checked = true;
    }
    updateSelectedTagsDisplay();
    updateSearchInputText();
    filterPosts();
  }

  document.addEventListener("applyTagFilter", function (e) {
    const tag = e.detail.tag;
    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);
      const checkbox = document.querySelector(`.tag-checkbox[value="${tag}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
      updateSelectedTagsDisplay();
      updateSearchInputText();
      filterPosts();
    }
  });

  searchInput.addEventListener("click", function () {
    dropdown.classList.toggle("active");
    if (dropdown.classList.contains("active")) {
      searchFilter.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".tag-search-wrapper")) {
      dropdown.classList.remove("active");
    }
  });

  if (searchFilter) {
    searchFilter.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const options = tagOptions.querySelectorAll(".tag-option");

      options.forEach((option) => {
        const tagName = option
          .querySelector(".tag-name")
          .textContent.toLowerCase();
        if (tagName.includes(searchTerm)) {
          option.style.display = "";
        } else {
          option.style.display = "none";
        }
      });
    });
  }

  const checkboxes = document.querySelectorAll(".tag-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const tag = this.value;

      if (this.checked) {
        if (!selectedTags.includes(tag)) {
          selectedTags.push(tag);
        }
      } else {
        selectedTags = selectedTags.filter((t) => t !== tag);
      }

      updateSelectedTagsDisplay();
      updateSearchInputText();
      filterPosts();
    });
  });

  function updateSearchInputText() {
    if (selectedTags.length === 0) {
      searchInput.value = "";
      searchInput.placeholder = "Search tags...";
    } else {
      searchInput.value = selectedTags.join(", ");
    }
  }

  function updateSelectedTagsDisplay() {
    if (selectedTags.length === 0) {
      selectedTagsDisplay.innerHTML = "";
      return;
    }

    selectedTagsDisplay.innerHTML = "";

    selectedTags.forEach((tag) => {
      const tagPill = document.createElement("span");
      tagPill.className = "selected-tag-pill";
      tagPill.innerHTML = `
        ${tag}
        <button class="remove-tag" data-tag="${tag}" aria-label="Remove ${tag}">×</button>
      `;
      selectedTagsDisplay.appendChild(tagPill);
    });

    const removeButtons = selectedTagsDisplay.querySelectorAll(".remove-tag");
    removeButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const tag = this.dataset.tag;
        selectedTags = selectedTags.filter((t) => t !== tag);

        const checkbox = document.querySelector(
          `.tag-checkbox[value="${tag}"]`
        );
        if (checkbox) {
          checkbox.checked = false;
        }

        updateSelectedTagsDisplay();
        updateSearchInputText();
        filterPosts();
      });
    });
  }

  function filterPosts() {
    let visibleCount = 0;

    if (selectedTags.length === 0) {
      if (paginatedList) {
        paginatedList.style.display = "";
      }
      if (allPostsList) {
        allPostsList.style.display = "none";
      }
      if (pagerSection) {
        pagerSection.style.display = "";
      }

      const existingMsg = document.querySelector(".no-results-message");
      if (existingMsg) {
        existingMsg.remove();
      }
      return;
    }

    if (paginatedList) {
      paginatedList.style.display = "none";
    }
    if (allPostsList) {
      allPostsList.style.display = "";
    }
    if (pagerSection) {
      pagerSection.style.display = "none";
    }

    const postsToFilter = allPosts.length > 0 ? allPosts : paginatedPosts;

    postsToFilter.forEach((post) => {
      const postTags = post.dataset.tags
        ? post.dataset.tags.split(",").map((t) => t.trim())
        : [];

      const hasAllTags = selectedTags.every((tag) => postTags.includes(tag));

      if (hasAllTags) {
        post.style.display = "";
        visibleCount++;
      } else {
        post.style.display = "none";
      }
    });

    const existingMsg = document.querySelector(".no-results-message");
    if (existingMsg) {
      existingMsg.remove();
    }

    if (visibleCount === 0 && selectedTags.length > 0) {
      const msg = document.createElement("p");
      msg.className = "no-results-message";
      msg.textContent = `No posts found with selected tags`;
      msg.style.cssText =
        "text-align: center; color: #666; padding: 2rem; font-style: italic;";

      const targetList = allPostsList || paginatedList;
      if (targetList && targetList.parentNode) {
        targetList.parentNode.insertBefore(msg, targetList.nextSibling);
      }
    }
  }
});

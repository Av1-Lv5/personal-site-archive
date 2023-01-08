const tagFilters = document.querySelectorAll("#tags-container .tag");
const projects = document.querySelectorAll(".project-card");

tagFilters.forEach((filter) => {
    filter.addEventListener("click", filterProjects);
});

function filterProjects(e) {
    tagFilters.forEach((filter) => {
        filter.classList.remove("selected");
    });

    e.target.classList.add("selected");

    const selectedTag = e.target.innerText.toLowerCase();

    projects.forEach((project) => {
        const tags = project.attributes.tags.value.split(" ");

        if (tags.includes(selectedTag) || selectedTag === "all") {
            project.classList.remove("hide");
        } else {
            project.classList.add("hide");
        }
    });
}

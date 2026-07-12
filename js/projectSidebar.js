const projectSidebarItems = [
  {
    href: "myPortfolio.html",
    src: "../images/subPages/homeButton.png",
    alt: "Home",
  },
  {
    href: "project_RZ.html",
    src: "../images/RZ_jpg.jpg",
    alt: "Rainforcement : Zombies",
  },
  {
    href: "project_FOAS.html",
    src: "../images/FOAS_jpg.jpg",
    alt: "FOAS",
  },
  {
    href: "project_Astro.html",
    src: "../images/Astro_jpg.jpg",
    alt: "Astro",
  },
  {
    href: "project_SMWYCD.html",
    src: "../images/SMWYCD_jpg.jpg",
    alt: "SMWYCD",
  },
  {
    href: "project_Green.html",
    src: "../images/Green_jpg.jpg",
    alt: "Green",
  },
  {
    href: "project_John.html",
    src: "../images/John_jpg.jpg",
    alt: "John",
  },
  {
    href: "project_Gun.html",
    src: "../images/Gun_jpg.jpg",
    alt: "Gun",
  },
];

const sidebarRoot = document.getElementById("project-sidebar");

if (sidebarRoot) {
  const currentPage = window.location.pathname.split("/").pop();
  const listItems = projectSidebarItems
    .map(({ href, src, alt }) => {
      const isCurrentPage = href === currentPage;
      const currentAttributes = isCurrentPage
        ? ' class="active" aria-current="page"'
        : "";

      return `
        <li>
          <a href="${href}"${currentAttributes}>
            <img src="${src}" alt="${alt}">
          </a>
        </li>`;
    })
    .join("");

  sidebarRoot.outerHTML = `
    <div class="sidebar">
      <ul>${listItems}
      </ul>
    </div>`;
}

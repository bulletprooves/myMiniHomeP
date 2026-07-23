const sidebar = document.querySelector(".sidebar");

if (sidebar) {
  const toggleButton = document.createElement("button");
  const getSavedState = () => {
    try {
      return localStorage.getItem("sidebarCollapsed");
    } catch {
      return null;
    }
  };
  const saveState = (isCollapsed) => {
    try {
      localStorage.setItem("sidebarCollapsed", String(isCollapsed));
    } catch {
      return;
    }
  };
  const savedState = getSavedState();
  const isInitiallyCollapsed = savedState === "true";

  toggleButton.type = "button";
  toggleButton.className = "sidebar-toggle";
  toggleButton.setAttribute("aria-controls", "site-sidebar");

  sidebar.id = "site-sidebar";
  document.body.prepend(toggleButton);

  const setSidebarState = (isCollapsed) => {
    document.body.classList.toggle("sidebar-collapsed", isCollapsed);
    toggleButton.setAttribute("aria-expanded", String(!isCollapsed));
    toggleButton.setAttribute(
      "aria-label",
      isCollapsed ? "사이드바 열기" : "사이드바 닫기"
    );
    toggleButton.textContent = isCollapsed ? ">" : "<";
    saveState(isCollapsed);
  };

  setSidebarState(isInitiallyCollapsed);

  toggleButton.addEventListener("click", () => {
    setSidebarState(!document.body.classList.contains("sidebar-collapsed"));
  });
}

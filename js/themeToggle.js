(function () {
  "use strict";

  var storageKey = "colorTheme";
  var root = document.documentElement;

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
    } catch (error) {
      return "light";
    }
  }

  function setTheme(theme, shouldSave) {
    var nextTheme = theme === "dark" ? "dark" : "light";
    root.dataset.theme = nextTheme;

    if (shouldSave) {
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // 저장할 수 없는 환경에서도 현재 페이지의 테마 전환은 유지한다.
      }
    }

    return nextTheme;
  }

  function updateButton(button, theme) {
    var isDark = theme === "dark";
    button.textContent = isDark ? "☀" : "☾";
    button.setAttribute("aria-label", isDark ? "화이트 모드로 변경" : "다크 모드로 변경");
    button.setAttribute("title", isDark ? "화이트 모드" : "다크 모드");
    button.setAttribute("aria-pressed", String(isDark));
  }

  setTheme(getSavedTheme(), false);

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".nav");
    var button = document.createElement("button");

    button.type = "button";
    button.className = "theme-toggle" + (nav ? "" : " theme-toggle-floating");
    updateButton(button, root.dataset.theme);

    button.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      updateButton(button, setTheme(nextTheme, true));
    });

    (nav || document.body).appendChild(button);
  });
})();

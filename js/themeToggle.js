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

  function getWhiteIconSrc(src) {
    return src.replace(/(_white)?(\.[a-z0-9]+)$/i, "_white$2");
  }

  function getLightIconSrc(src) {
    return src.replace(/_white(\.[a-z0-9]+)$/i, "$1");
  }

  function updateIcons(theme) {
    var isDark = theme === "dark";
    var icons = document.querySelectorAll('img[src*="images/icons/"]');

    icons.forEach(function (icon) {
      var currentSrc = icon.getAttribute("src");
      var originalSrc = icon.dataset.lightIconSrc || getLightIconSrc(currentSrc);
      var nextSrc = isDark ? getWhiteIconSrc(originalSrc) : originalSrc;

      icon.dataset.lightIconSrc = originalSrc;
      icon.onerror = isDark
        ? function () {
            icon.onerror = null;
            icon.src = originalSrc;
          }
        : null;
      icon.src = nextSrc;
    });
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
    updateIcons(root.dataset.theme);

    button.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      var appliedTheme = setTheme(nextTheme, true);
      updateButton(button, appliedTheme);
      updateIcons(appliedTheme);
    });

    (nav || document.body).appendChild(button);
  });
})();

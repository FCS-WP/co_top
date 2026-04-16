(function () {
  var header =
    document.querySelector(".site-nav") ||
    document.querySelector(".wp-site-blocks > header.wp-block-group:first-of-type") ||
    document.querySelector(".wp-site-blocks > .wp-block-template-part > header.wp-block-group:first-of-type");

  if (!header) {
    return;
  }

  var body = document.body;

  function setHeaderHeightVar() {
    var height = header.offsetHeight || 0;
    body.style.setProperty("--cotop-header-height", height + "px");
  }

  function toggleStickyState() {
    var shouldStick = true;
    header.classList.toggle("is-stuck", shouldStick);
    body.classList.toggle("has-stuck-header", shouldStick);
  }

  function initMobileMenuPanel() {
    var nav =
      header.querySelector(".wp-block-navigation.nav-menu") ||
      header.querySelector(".nav-menu.wp-block-navigation");

    if (!nav) {
      return;
    }

    var openButton = nav.querySelector(".wp-block-navigation__responsive-container-open");
    var container = nav.querySelector(".wp-block-navigation__responsive-container");
    var closeButton = nav.querySelector(".wp-block-navigation__responsive-container-close");
    var dialog = nav.querySelector(".wp-block-navigation__responsive-dialog");

    if (!openButton || !container) {
      return;
    }

    function syncMobilePanelTopBrand() {
      if (!dialog) {
        return;
      }

      var panelTop = dialog.querySelector(".cotop-mobile-panel-top");
      var isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (!isMobile) {
        if (panelTop) {
          panelTop.remove();
        }
        return;
      }

      if (panelTop) {
        return;
      }

      var logoSource =
        header.querySelector(".nav-logo .custom-logo-link") ||
        header.querySelector(".nav-logo a");

      if (!logoSource) {
        return;
      }

      panelTop = document.createElement("div");
      panelTop.className = "cotop-mobile-panel-top";
      panelTop.appendChild(logoSource.cloneNode(true));
      dialog.insertBefore(panelTop, dialog.firstChild);
    }

    syncMobilePanelTopBrand();

    function setMenuState(isOpen) {
      container.classList.toggle("is-menu-open", isOpen);
      container.classList.toggle("cotop-menu-open", isOpen);

      if (isOpen) {
        container.removeAttribute("hidden");
      }

      container.setAttribute("aria-hidden", isOpen ? "false" : "true");
      openButton.setAttribute("aria-expanded", isOpen ? "true" : "false");

      document.body.classList.toggle("cotop-mobile-menu-open", isOpen);
      document.documentElement.classList.toggle("cotop-mobile-menu-open", isOpen);
    }

    openButton.addEventListener("click", function () {
      window.setTimeout(function () {
        setMenuState(true);
      }, 40);
    });

    if (closeButton) {
      closeButton.addEventListener("click", function () {
        window.setTimeout(function () {
          setMenuState(false);
        }, 0);
      });
    }

    container.addEventListener("click", function (event) {
      if (event.target === container) {
        setMenuState(false);
      }
    });

    container.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          setMenuState(false);
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && container.classList.contains("cotop-menu-open")) {
        setMenuState(false);
      }
    });

    window.addEventListener("resize", function () {
      syncMobilePanelTopBrand();
      if (!window.matchMedia("(max-width: 768px)").matches) {
        setMenuState(false);
      }
    });
  }

  initMobileMenuPanel();
  setHeaderHeightVar();
  toggleStickyState();

  window.addEventListener("scroll", toggleStickyState, { passive: true });
  window.addEventListener("resize", function () {
    setHeaderHeightVar();
    toggleStickyState();
  });
})();

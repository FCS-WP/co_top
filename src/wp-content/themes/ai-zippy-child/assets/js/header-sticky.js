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

      if (!isOpen) {
        container
          .querySelectorAll(".wp-block-navigation-item.has-child")
          .forEach(function (item) {
            setSubmenuOpen(item, false);
          });
        return;
      }

      syncAllSubmenuStates();
    }

    function isMobilePanelActive() {
      return (
        window.matchMedia("(max-width: 768px)").matches &&
        container.classList.contains("cotop-menu-open")
      );
    }

    function getDirectSubmenuToggle(menuItem) {
      if (!menuItem) {
        return null;
      }
      for (var i = 0; i < menuItem.children.length; i += 1) {
        var child = menuItem.children[i];
        if (child.classList && child.classList.contains("wp-block-navigation-submenu__toggle")) {
          return child;
        }
      }
      return null;
    }

    function getDirectSubmenuContainer(menuItem) {
      if (!menuItem) {
        return null;
      }
      for (var i = 0; i < menuItem.children.length; i += 1) {
        var child = menuItem.children[i];
        if (child.classList && child.classList.contains("wp-block-navigation__submenu-container")) {
          return child;
        }
      }
      return null;
    }

    function setSubmenuOpen(parentItem, shouldOpen) {
      if (!parentItem) {
        return;
      }

      var toggleButton = getDirectSubmenuToggle(parentItem);
      if (toggleButton) {
        toggleButton.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
      }

      parentItem.classList.toggle("is-menu-open", shouldOpen);
      parentItem.classList.toggle("is-open", shouldOpen);

      var submenu = getDirectSubmenuContainer(parentItem);
      if (submenu) {
        submenu.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
        if (shouldOpen) {
          submenu.removeAttribute("hidden");
          submenu.style.display = "block";
          submenu.style.visibility = "visible";
          submenu.style.opacity = "1";
          submenu.style.maxHeight = submenu.scrollHeight + 12 + "px";
        } else {
          submenu.setAttribute("hidden", "");
          submenu.style.maxHeight = "0px";
          submenu.style.opacity = "0";
          submenu.style.visibility = "hidden";
        }
      }
    }

    function syncAllSubmenuStates() {
      container
        .querySelectorAll(".wp-block-navigation-item.has-child > .wp-block-navigation-submenu__toggle")
        .forEach(function (toggle) {
          var parentItem = toggle.closest(".wp-block-navigation-item.has-child");
          var expanded = toggle.getAttribute("aria-expanded") === "true";
          setSubmenuOpen(parentItem, expanded);
        });
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
      var targetElement =
        event.target && event.target.nodeType === 1 ? event.target : event.target.parentElement;

      if (!targetElement) {
        return;
      }

      if (event.target === container) {
        setMenuState(false);
        return;
      }

      if (!isMobilePanelActive()) {
        return;
      }

      var toggleButton = targetElement.closest(".wp-block-navigation-submenu__toggle");
      if (toggleButton && container.contains(toggleButton)) {
        event.preventDefault();
        event.stopPropagation();

        var toggleItem = toggleButton.closest(".wp-block-navigation-item.has-child");
        var isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
        setSubmenuOpen(toggleItem, !isExpanded);
        return;
      }

      var parentLink = targetElement.closest(
        ".wp-block-navigation-item.has-child > .wp-block-navigation-item__content"
      );
      if (parentLink && container.contains(parentLink)) {
        var parentItem = parentLink.closest(".wp-block-navigation-item.has-child");
        var parentToggle = getDirectSubmenuToggle(parentItem);
        if (parentToggle) {
          event.preventDefault();
          event.stopPropagation();
          var isExpanded = parentToggle.getAttribute("aria-expanded") === "true";
          setSubmenuOpen(parentItem, !isExpanded);
          return;
        }
      }

      var clickedLink = targetElement.closest("a");
      if (clickedLink && container.contains(clickedLink)) {
        setMenuState(false);
      }
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
      } else if (container.classList.contains("cotop-menu-open")) {
        syncAllSubmenuStates();
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

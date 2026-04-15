document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".ctpf").forEach((filter) => {
		const buttons = Array.from(filter.querySelectorAll(".ctpf__btn"));
		const sections = Array.from(document.querySelectorAll(".ctprod-section"));
		const hashToTarget = {
			"#quartz-stone": "quartz",
			"#solid-surface": "solid",
			"#sintered-stone": "sintered",
			"#care-guides": "care",
			"#care": "care",
		};
		const targetToHash = {
			quartz: "#quartz-stone",
			solid: "#solid-surface",
			sintered: "#sintered-stone",
			care: "#care-guides",
		};

		if (!buttons.length || !sections.length) {
			return;
		}

		const resolveHashTarget = () => {
			const hash = (window.location.hash || "").toLowerCase();
			return hashToTarget[hash] || "";
		};

		const applyFilter = (rawTarget, options = {}) => {
			const target = rawTarget || "all";
			const shouldScroll = Boolean(options.scroll);
			const shouldUpdateHash = Boolean(options.updateHash);
			const targetButton =
				buttons.find((button) => (button.dataset.target || "all") === target) ||
				buttons.find((button) => (button.dataset.target || "all") === "all");
			const normalizedTarget = targetButton?.dataset.target || "all";

			buttons.forEach((button) => {
				const buttonTarget = button.dataset.target || "all";
				button.classList.toggle("is-active", buttonTarget === normalizedTarget);
			});

			sections.forEach((section) => {
				section.style.display = normalizedTarget === "all" || section.dataset.productSection === normalizedTarget ? "" : "none";
			});

			const targetSection =
				normalizedTarget === "all"
					? sections[0]
					: document.querySelector(`.ctprod-section[data-product-section="${normalizedTarget}"]`);

			if (shouldUpdateHash) {
				const hash = targetToHash[normalizedTarget] || "";
				const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
				window.history.replaceState({}, "", nextUrl);
			}

			if (shouldScroll && targetSection) {
				targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		};

		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				applyFilter(button.dataset.target || "all", { scroll: true, updateHash: true });
			});
		});

		const initialTarget = resolveHashTarget();
		if (initialTarget) {
			applyFilter(initialTarget);
		}

		window.addEventListener("hashchange", () => {
			const target = resolveHashTarget();
			if (target) {
				applyFilter(target);
			}
		});
	});
});

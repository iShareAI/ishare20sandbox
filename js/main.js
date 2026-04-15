(() => {
	const openBtn = document.getElementById("openFundingMattersModal");
	const modal = document.getElementById("fundingMattersModal");
	const backdrop = document.getElementById("fundingMattersBackdrop");
	const closeBtn = document.getElementById("closeFundingMattersModal");
	const frame = document.getElementById("fundingMattersFrame");

	if (!openBtn || !modal || !backdrop || !closeBtn || !frame) {
		return;
	}

	const openModal = () => {
		if (frame.dataset.src && frame.getAttribute("src") === "about:blank") {
			frame.setAttribute("src", frame.dataset.src);
		}

		modal.classList.add("show");
		backdrop.classList.add("show");
		modal.setAttribute("aria-hidden", "false");
		backdrop.setAttribute("aria-hidden", "false");
		document.body.classList.add("modal-open");
	};

	const closeModal = () => {
		modal.classList.remove("show");
		backdrop.classList.remove("show");
		modal.setAttribute("aria-hidden", "true");
		backdrop.setAttribute("aria-hidden", "true");
		document.body.classList.remove("modal-open");
	};

	openBtn.addEventListener("click", openModal);
	closeBtn.addEventListener("click", closeModal);
	backdrop.addEventListener("click", closeModal);

	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});
})();

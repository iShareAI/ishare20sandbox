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

(() => {
	const openBtn = document.getElementById("openAiLeadModal");
	const modal = document.getElementById("aiLeadModal");
	const closeBtn = document.getElementById("closeAiLeadModal");
	const form = document.getElementById("aiLeadForm");
	const submitBtn = document.getElementById("aiLeadSubmit");
	const status = document.getElementById("aiLeadStatus");
	const portalUrl = "https://ishare.ai/";

	if (!openBtn || !modal || !closeBtn || !form || !submitBtn || !status) {
		return;
	}

	const setStatus = (message, isError = false) => {
		status.textContent = message;
		status.classList.toggle("is-error", isError);
	};

	const openModal = () => {
		modal.classList.add("show");
		modal.setAttribute("aria-hidden", "false");
		document.body.classList.add("modal-open");
		setStatus("");
	};

	const closeModal = () => {
		modal.classList.remove("show");
		modal.setAttribute("aria-hidden", "true");
		document.body.classList.remove("modal-open");
	};

	openBtn.addEventListener("click", openModal);
	closeBtn.addEventListener("click", closeModal);

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

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		submitBtn.disabled = true;
		setStatus("Sending your request...");

		const formData = new FormData(form);

		try {
			const response = await fetch("https://formsubmit.co/ajax/wpetruck@ishare.ca", {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json"
				}
			});

			if (!response.ok) {
				throw new Error("Unable to submit form");
			}

			setStatus("Thank you. We have received your request. Opening iShare portal...");
			form.reset();

			setTimeout(() => {
				window.open(portalUrl, "_blank", "noopener");
				closeModal();
			}, 650);
		} catch (error) {
			setStatus("Submission failed. Please try again or email wpetruck@ishare.ca.", true);
		} finally {
			submitBtn.disabled = false;
		}
	});
})();

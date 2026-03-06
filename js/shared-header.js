(() => {
  const isHealthcareDetail = /\/healthcare\/[^/]+\.html$/i.test(window.location.pathname);

  const fixRelativePaths = (root, prefix) => {
    const skip = /^(?:[a-z]+:|#|\/\/)/i;
    root.querySelectorAll("[href], [src]").forEach((node) => {
      if (node.hasAttribute("href")) {
        const href = node.getAttribute("href");
        if (href && !skip.test(href)) {
          node.setAttribute("href", `${prefix}${href}`);
        }
      }
      if (node.hasAttribute("src")) {
        const src = node.getAttribute("src");
        if (src && !skip.test(src)) {
          node.setAttribute("src", `${prefix}${src}`);
        }
      }
    });
  };

  const sharedHeaderHtml = `<!-- =========================
     ISHARE HEADER MODULE
     Utility Bar + Topbar + Mobile Drawer
========================= -->

<!-- UTILITY BAR (Meta / Ecosystem links) -->
<div class="utility-bar" id="utilityBar" aria-label="Partner navigation">
  <div class="container">
    <nav class="utility-nav" aria-label="Partner links">

      <a class="utility-link" href="https://fundingmatters.com/" target="_blank" rel="noopener">
        <span class="utility-ico" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4 16.5v-13h-.25a.75.75 0 0 1 0-1.5h12.5a.75.75 0 0 1 0 1.5H16v13h.25a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5H4Z"/>
          </svg>
        </span>
        <span class="utility-text">FUNDING matters® Inc.</span>
      </a>

      <a class="utility-link" href="https://www.giftabulator.com/" target="_blank" rel="noopener">
        <span class="utility-ico" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z"/>
          </svg>
        </span>
        <span class="utility-text">GIFTABULATOR®</span>
      </a>

      <a class="utility-link" href="https://philanthropylab.ca/" target="_blank" rel="noopener">
        <span class="utility-ico" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5l4.091 4.091a2.25 2.25 0 0 0 1.591.659h2.636a2.25 2.25 0 0 0 1.591-.659L19.8 15.3l-4.891-4.891a2.25 2.25 0 0 1-.659-1.591V3.104"/>
          </svg>
        </span>
        <span class="utility-text">PhilanthropyLab®</span>
      </a>

      <a class="utility-link" href="https://ishare.ai/9HT0SLLTBN" target="_blank" rel="noopener noreferrer">
        <span class="utility-ico" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2l1.2 4.2L17.4 8 13.2 9.2 12 13.4 10.8 9.2 6.6 8l4.2-1.8L12 2z"/>
          </svg>
        </span>
        <span class="utility-text">BuilderBillAI<sup class="tm-mark">TM</sup></span>
      </a>

    </nav>
  </div>
</div>

<!-- TOPBAR (Site navigation) -->
<header class="topbar" id="topbar" aria-label="Site header">
  <div class="container topbar-inner">

    <a class="brand" href="index.html#hero" aria-label="iShare Home">
      <img src="img/lg2.png" alt="iShare" class="brand-logo" />
    </a>

    <nav class="nav-desktop" aria-label="Primary">
      <a href="index.html#hero">Home</a>
      <a href="index.html#about">About</a>

      <div class="nav-dropdown">
        <a href="index.html#directions" class="nav-parent" aria-haspopup="true" aria-expanded="false">
          Campaigns <span class="nav-arrow" aria-hidden="true">▾</span>
        </a>
        <div class="nav-menu" role="menu" aria-label="Campaigns submenu">
          <a role="menuitem" href="healthcare.html">Healthcare</a>
          <a role="menuitem" href="education.html">Education</a>
          <a role="menuitem" href="culture.html">Culture</a>
          <a role="menuitem" href="sporting-venues.html">Sporting Venues</a>
          <a role="menuitem" href="international-aid.html">International Aid</a>
          <a role="menuitem" href="social-services.html">Social Services</a>
          <a role="menuitem" href="tourism.html">Tourism</a>
        </div>
      </div>

      <a href="index.html#projects">Projects</a>

      <div class="nav-dropdown">
        <a href="index.html#pricing" class="nav-parent" aria-haspopup="true" aria-expanded="false">
          Packages <span class="nav-arrow" aria-hidden="true">▾</span>
        </a>
        <div class="nav-menu" role="menu" aria-label="Packages submenu">
          <a role="menuitem" href="index.html#pricing-basic">Basic</a>
          <a role="menuitem" href="index.html#pricing-pro">Pro</a>
          <a role="menuitem" href="index.html#pricing-enterprise">Enterprise</a>
        </div>
      </div>

      <a href="index.html#impact">Impact</a>
      <a href="index.html#contact">Contact</a>
    </nav>

    <div class="topbar-actions">
      <button class="btn btn-primary" type="button">Book a Demo</button>

      <button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
        <div class="burger-lines" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </button>
    </div>

  </div>
</header>

<!-- MOBILE DRAWER -->
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <div class="mobile-menu-inner">
    <div class="mobile-menu-head">
      <div class="mobile-menu-title">MENU</div>
      <button class="mobile-close" id="mobileClose" type="button" aria-label="Close menu">×</button>
    </div>

    <a href="index.html#hero" class="m-link">Home</a>
    <a href="index.html#about" class="m-link">About</a>
    <a href="index.html#directions" class="m-link">Campaigns</a>
    <a href="index.html#projects" class="m-link">Projects</a>
    <a href="index.html#pricing" class="m-link">Packages</a>
    <a href="index.html#impact" class="m-link">Impact</a>
    <a href="index.html#contact" class="m-link">Contact</a>
    <a href="https://ishare.ai/9HT0SLLTBN" class="m-link" target="_blank" rel="noopener noreferrer">Use our AI</a>

    <button class="btn btn-primary" type="button">Book a Demo</button>
  </div>
</div>

<div class="mobile-menu-backdrop" id="mobileBackdrop" aria-hidden="true"></div>`;

  const host = document.getElementById("site-header");
  if (!host) return;

  host.innerHTML = sharedHeaderHtml;
  if (isHealthcareDetail) {
    fixRelativePaths(host, "../");
  }
})();

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

  const sharedFooterHtml = `<footer class="site-footer" id="contact">

  <div class="container footer-inner">

    <div class="footer-contact">

      <div class="typo-ui footer-title">Contact Us</div>

      <div class="footer-block">
        <div class="typo-ui footer-subtitle">iShare® Headquarters</div>
        <div class="typo-body footer-text">
          333 Dundas Street East, Toronto, Ontario M5A 2A2, Canada
        </div>

        <div class="typo-body footer-text">
          <a class="footer-phone" href="tel:+1-416-249-0788">(o) 416-249-0788</a>&nbsp;&nbsp;&nbsp;
          <a class="footer-phone" href="tel:+1-416-579-0870">(c) 416-579-0870</a>
        </div>

        <a class="footer-link" href="mailto:wpetruck@ishare.ca">wpetruck@ishare.ca</a>
      </div>

      <div class="footer-block">
        <div class="typo-ui footer-subtitle">iShare® North Bay</div>
        <div class="typo-body footer-text">
          100 College Drive, North Bay, Ontario P1B 0A4, Canada
        </div>

        <div class="typo-body footer-text">
          <a class="footer-phone" href="tel:+1-416-249-0788">(o) 416-249-0788</a>
        </div>

        <a class="footer-link" href="mailto:wpetruck@ishare.ca">wpetruck@ishare.ca</a>
      </div>

    </div>

    <div class="footer-side">

      <div class="typo-body footer-quote">
        Step into the future and revolutionize the way you bring your designs to life with virtual reality.
      </div>

      <a class="footer-cta" href="#book-demo">Schedule a meeting</a>

      <div class="footer-find">
        <div class="typo-util">Find us on</div>

        <div class="footer-social">
          <a class="footer-social-link" href="#" aria-label="Facebook"><span>Facebook</span></a>
          <a class="footer-social-link" href="#" aria-label="LinkedIn"><span>LinkedIn</span></a>
          <a class="footer-social-link" href="#" aria-label="YouTube"><span>YouTube</span></a>
          <a class="footer-social-link" href="#" aria-label="Instagram"><span>Instagram</span></a>
        </div>
      </div>

      <a class="footer-top" href="#" aria-label="Back to top">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M7 14l5-5 5 5z"/>
        </svg>
      </a>
    </div>

  </div>

  <div class="footer-header-clone" aria-label="Footer navigation clone">
    <div class="topbar topbar--footer" aria-label="Site footer nav">
      <div class="container topbar-inner topbar-inner--footer">
        <div class="topbar-actions topbar-actions--footer">
          <button class="btn btn-primary" type="button">Book a Demo</button>
        </div>

        <nav class="nav-desktop nav-desktop--footer" aria-label="Footer primary">
          <a href="index.html#hero">Home</a>
          <a href="index.html#about">About</a>

          <div class="nav-dropdown">
            <a href="index.html#directions" class="nav-parent" aria-haspopup="true" aria-expanded="false">
              Campaigns <span class="nav-arrow" aria-hidden="true">▾</span>
            </a>
            <div class="nav-menu" role="menu" aria-label="Campaigns submenu (footer)">
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
            <div class="nav-menu" role="menu" aria-label="Packages submenu (footer)">
              <a role="menuitem" href="index.html#pricing-basic">Basic</a>
              <a role="menuitem" href="index.html#pricing-pro">Pro</a>
              <a role="menuitem" href="index.html#pricing-enterprise">Enterprise</a>
            </div>
          </div>

          <a href="index.html#impact">Impact</a>
          <a href="#contact">Contact</a>
        </nav>

        <a class="brand brand--footer" href="index.html#hero" aria-label="iShare Home (footer)">
          <img src="img/lg2.png" alt="iShare" class="brand-logo" />
        </a>
      </div>
    </div>

    <div class="utility-bar utility-bar--footer" aria-label="Partner navigation (footer)">
      <div class="container">
        <nav class="utility-nav" aria-label="Partner links (footer)">
          <a class="utility-link" href="https://fundingmatters.com/" target="_blank" rel="noopener"><span class="utility-text">FUNDING matters® Inc.</span></a>
          <a class="utility-link" href="https://www.giftabulator.com/" target="_blank" rel="noopener"><span class="utility-text">GIFTABULATOR®</span></a>
          <a class="utility-link" href="https://philanthropylab.ca/" target="_blank" rel="noopener"><span class="utility-text">PhilanthropyLab®</span></a>
          <a class="utility-link" href="https://ishare.ai/9HT0SLLTBN" target="_blank" rel="noopener noreferrer"><span class="utility-text">BuilderBillAI<sup class="tm-mark">TM</sup></span></a>
        </nav>
      </div>
    </div>
  </div>

  <div class="footer-copyright-line">
    <div class="container">
      <div class="typo-util">©2026 iShare® All rights reserved</div>
    </div>
  </div>

</footer>`;
  const host = document.getElementById("site-footer");
  if (!host) return;
  host.innerHTML = sharedFooterHtml;
  if (isHealthcareDetail) {
    fixRelativePaths(host, "../");
  }
})();
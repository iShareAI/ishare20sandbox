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
          <a class="footer-social-link" href="https://www.facebook.com/FUNDINGmattersInc" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg class="footer-social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M13.5 22v-8h2.7l.5-3h-3.2V9.2c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3V11H8v3h2.4v8h3.1z"/>
            </svg>
            <span>Facebook</span>
          </a>
          <a class="footer-social-link" href="https://linkedin.com/company/fundingmattersinc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg class="footer-social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M6.9 8.5a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM5.3 9.8h3.2V19H5.3V9.8zm5 0h3v1.3h.1c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8V19H17v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.1V19h-3.2V9.8z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
          <a class="footer-social-link" href="https://www.youtube.com/channel/UCzwWF6gotc6EvtsCdPwV4eg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg class="footer-social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.6 12 4.6 12 4.6s-7.6 0-9.4.5A3 3 0 0 0 .5 7.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-4.8zM9.6 15.3V8.7l6 3.3-6 3.3z"/>
            </svg>
            <span>YouTube</span>
          </a>
          <a class="footer-social-link" href="https://www.instagram.com/fundingmatters/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg class="footer-social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4z"/>
              <path fill="currentColor" d="M18.3 3.8H5.7A3.7 3.7 0 0 0 2 7.5v9A3.7 3.7 0 0 0 5.7 20h12.6a3.7 3.7 0 0 0 3.7-3.5v-9a3.7 3.7 0 0 0-3.7-3.7zm1.9 12.7c0 1-.8 1.8-1.9 1.8H5.7a1.8 1.8 0 0 1-1.9-1.8v-9c0-1 .8-1.9 1.9-1.9h12.6c1 0 1.9.9 1.9 1.9v9z"/>
              <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor"/>
            </svg>
            <span>Instagram</span>
          </a>
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

          <a href="business-case.html">Business Case</a>

          <div class="nav-dropdown">
            <a href="packages.html#pricing" class="nav-parent" aria-haspopup="true" aria-expanded="false">
              Packages <span class="nav-arrow" aria-hidden="true">▾</span>
            </a>
            <div class="nav-menu" role="menu" aria-label="Packages submenu (footer)">
              <a role="menuitem" href="packages.html#pricing-basic">Basic</a>
              <a role="menuitem" href="packages.html#pricing-pro">Pro</a>
              <a role="menuitem" href="packages.html#pricing-enterprise">Enterprise</a>
            </div>
          </div>

          <a href="impact.html">Impact</a>
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
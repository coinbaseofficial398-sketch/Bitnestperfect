export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "BitNest",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Whitepaper", href: "/whitepaper" },
        { name: "Roadmap", href: "/roadmap" },
      ]
    },
    {
      title: "Products",
      links: [
        { name: "BitNest Loop", href: "/loop" },
        { name: "Saving Box", href: "/saving-box" },
        { name: "BitNest Savings", href: "/savings" },
        { name: "BitNest DAO", href: "/dao" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Discord", href: "https://discord.gg/bitnest" },
        { name: "Telegram", href: "https://t.me/bitnest" },
        { name: "Twitter", href: "https://twitter.com/bitnest" },
        { name: "Reddit", href: "https://reddit.com/r/bitnest" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Contact", href: "/contact" },
        { name: "Bug Report", href: "/bugs" },
        { name: "Feature Request", href: "/features" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Disclaimer", href: "/disclaimer" },
      ]
    },
    {
      title: "Developers",
      links: [
        { name: "API Documentation", href: "/api-docs" },
        { name: "SDK", href: "/sdk" },
        { name: "GitHub", href: "https://github.com/bitnest" },
        { name: "Bug Bounty", href: "/bounty" },
      ]
    }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      // For internal navigation, could use wouter's useLocation
      console.log(`Navigating to: ${href}`);
    }
  };

  return (
    <footer className="bg-bitnest-darker border-t border-bitnest-green mt-12">
      <div className="px-4 py-8">
        {/* Logo and Main Description */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-bitnest-gradient rounded-lg flex items-center justify-center" data-testid="footer-logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" className="text-bitnest-dark"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-bitnest-gradient" data-testid="footer-bitnest-title">BITNEST</span>
          </div>
          <p className="text-bitnest-light-gray text-sm leading-relaxed" data-testid="footer-description">
            The ecosystem of the next generation cryptocurrency, known as 'Cryptocurrency Banking Smart Contract on Blockchain'
          </p>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-bitnest-green font-semibold mb-3 text-sm" data-testid={`footer-section-${section.title.toLowerCase()}`}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-bitnest-light-gray hover:text-bitnest-green transition-colors duration-300 text-xs block text-left"
                      data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-bitnest-gray pt-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-bitnest-light-gray" data-testid="footer-copyright">
                © {currentYear} BitNest. All rights reserved.
              </span>
              <span className="text-bitnest-light-gray" data-testid="footer-version">
                v2.1.0
              </span>
            </div>
            
            {/* Social Media Links */}
            <div className="flex justify-center space-x-4">
              {['Discord', 'Telegram', 'Twitter', 'GitHub'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => handleLinkClick(`https://${platform.toLowerCase()}.com/bitnest`)}
                  className="w-10 h-10 border border-bitnest-green rounded-lg flex items-center justify-center hover:bg-bitnest-gradient hover:text-bitnest-dark transition-all duration-300"
                  data-testid={`footer-social-${platform.toLowerCase()}`}
                >
                  <span className="text-xs font-bold">
                    {platform === 'Discord' ? 'D' : platform === 'Telegram' ? 'T' : platform === 'Twitter' ? 'X' : 'G'}
                  </span>
                </button>
              ))}
            </div>

            {/* Security and Audit Info */}
            <div className="text-center">
              <p className="text-bitnest-light-gray text-xs mb-2" data-testid="footer-security">
                🔒 Audited by CertiK • Smart Contracts Verified
              </p>
              <p className="text-bitnest-light-gray text-xs" data-testid="footer-blockchain">
                Built on Ethereum & Binance Smart Chain
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
// Simple script to validate JSON-LD structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://hmpl-lang.dev/#website",
      "url": "https://hmpl-lang.dev",
      "name": "HMPL.js - Lightweight Server-Oriented Template Language for JavaScript",
      "description": "HMPL.js is a lightweight server-oriented template language for JavaScript. Fetch HTML, render it safely, and keep apps dynamic, modern, and small. Alternative to HTMX and Alpine.js.",
      "publisher": {
        "@type": "Organization",
        "@id": "https://hmpl-lang.dev/#organization"
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://hmpl-lang.dev/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://hmpl-lang.dev/#organization",
      "name": "HMPL Language",
      "url": "https://hmpl-lang.dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hmpl-lang.dev/images/antWhite.png",
        "width": 460,
        "height": 460
      },
      "sameAs": [
        "https://github.com/hmpl-language/hmpl",
        "https://www.npmjs.com/package/hmpl-js",
        "https://x.com/hmpljs",
        "https://discord.com/invite/KFunMep36n"
      ],
      "description": "Organization behind HMPL.js - a lightweight server-oriented template language for JavaScript"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://hmpl-lang.dev/#softwareapplication",
      "name": "HMPL.js",
      "description": "HMPL.js is a lightweight server-oriented template language for JavaScript. Fetch HTML, render it safely, and keep apps dynamic, modern, and small. Alternative to HTMX and Alpine.js.",
      "url": "https://hmpl-lang.dev",
      "applicationCategory": "DeveloperApplication",
      "applicationSubCategory": "Template Engine",
      "operatingSystem": "Any",
      "programmingLanguage": "JavaScript",
      "downloadUrl": "https://www.npmjs.com/package/hmpl-js",
      "codeRepository": "https://github.com/hmpl-language/hmpl",
      "license": "https://opensource.org/licenses/MIT",
      "version": "3.0.5",
      "author": {
        "@type": "Person",
        "name": "Anton Maklakov"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://hmpl-lang.dev/#organization"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "screenshot": {
        "@type": "ImageObject",
        "url": "https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/new_banner.png",
        "caption": "HMPL.js Template Language Banner"
      },
      "softwareVersion": "3.0.5",
      "releaseNotes": "Latest version with enhanced features and bug fixes",
      "requirements": "Node.js >= 10.12.0",
      "fileSize": "5KB",
      "installUrl": "https://www.npmjs.com/package/hmpl-js",
      "softwareHelp": {
        "@type": "CreativeWork",
        "url": "https://hmpl-lang.dev/introduction"
      },
      "discussionUrl": "https://github.com/hmpl-language/hmpl/discussions",
      "issueTracker": "https://github.com/hmpl-language/hmpl/issues",
      "keywords": [
        "fetch",
        "html",
        "template-engine",
        "rest",
        "ajax",
        "hateoas",
        "hypermedia",
        "server",
        "templates",
        "templating",
        "template-language",
        "template-engines",
        "fetch-api",
        "server-side",
        "language",
        "template",
        "hmpl",
        "server",
        "javascript",
        "frontend",
        "web-development",
        "library"
      ],
      "featureList": [
        "Customizable fetch requests",
        "Memory preserving - reduced file sizes",
        "Based on modern Fetch API",
        "Server-oriented templating",
        "XSS protection with DOMPurify",
        "JSON5 integration",
        "Small bundle size",
        "Dynamic UI generation"
      ]
    }
  ]
};

try {
  JSON.stringify(structuredData);
  console.log("✅ Structured data is valid JSON");
  console.log("✅ Contains the following schema types:");
  structuredData["@graph"].forEach(item => {
    console.log(`   - ${item["@type"]} (${item["@id"] || item.name})`);
  });
} catch (error) {
  console.error("❌ Invalid JSON-LD:", error.message);
}

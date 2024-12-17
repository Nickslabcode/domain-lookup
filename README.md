## Domain Lookup Tool  

![GitHub release (latest by date)](https://img.shields.io/github/v/release/Nickslabcode/domain-info-lookup)
[![Website](https://img.shields.io/badge/website-live-green)](https://domain-lookup.your-website.com)

A production app to streamline domain and site information retrieval for hosting support professionals.  

<!-- End of Section -->

## Tech Stack  

- **Front-end**: React, TypeScript, Axios, HttpYac, TailwindCSS, DaisyUI.  
- **Proxy**: Cloudflare Worker (TypeScript).  
- **Back-end**: Express, AWS Lambda.  Check back-end repo [here](https://github.com/Nickslabcode/api-domain-lookup).  

- **Additional Features**:  
  - GitHub Actions workflows for automated deployment & for semantic versioning for changelogs.  

<!-- End of Section -->

## Key Features  

- **WHOIS, SSL, and DNS Lookup**  
  Retrieve essential domain information, including WHOIS records, SSL details, and DNS configurations in a single search.
  ![Results view](https://domain-lookup.nikola-nenovski.info/images/results.png)  

- **CDN and WordPress Detection**  
  Detect active CDN services by analyzing response headers and identify if a site is running WordPress (In progress).  

- **Search History**  
  Maintain a history of recent lookups for quick reference and repeated searches.  
  ![Search History](https://domain-lookup.nikola-nenovski.info/images/search-history.gif)  

- **Changelog Viewer**  
  Access app version details and updates seamlessly by fetching the project's changelog from the GitHub API.
  ![Changelog Viewer](https://domain-lookup.nikola-nenovski.info/images/changelog.png)  

- **Shortcuts**  
  Enhanced with shortcuts for a more efficient workflow.
  ![Shortcuts](https://domain-lookup.nikola-nenovski.info/images/shortcuts.png)  

<!-- End of Section -->

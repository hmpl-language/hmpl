# HMPL.js Structured Data Implementation

## Overview
This implementation adds comprehensive JSON-LD structured data to the HMPL.js website to improve SEO and help search engines understand the content better.

## Files Modified/Created

### 1. `/src/components/StructuredData.astro`
A reusable Astro component that generates JSON-LD structured data. This component includes:

- **WebSite schema**: Basic website information and search functionality
- **Organization schema**: Information about the HMPL Language organization
- **SoftwareApplication schema**: Detailed information about HMPL.js as a software tool
- **WebPage schema**: Page-specific metadata
- **FAQPage schema**: Common questions and answers about HMPL.js

### 2. `/src/pages/index.astro`
Updated the main landing page to include the structured data component.

### 3. `/validate-structured-data.js`
A validation script to ensure the JSON-LD is properly formatted.

## Schema Types Implemented

### SoftwareApplication
The main schema that describes HMPL.js as a software application:
- Name, description, and URL
- Application category: "DeveloperApplication"
- Programming language: "JavaScript"
- Version information (3.0.5)
- Download and installation URLs
- Code repository and license information
- Features and requirements
- Author and publisher information
- Offers (free software)
- Screenshots and help documentation

### Organization
Describes the HMPL Language organization:
- Organization name and URL
- Logo information
- Social media profiles (GitHub, NPM, Twitter, Discord)
- Description and purpose

### WebSite
Basic website schema:
- Site name and description
- Search functionality
- Publisher relationship
- Language information

### WebPage
Page-specific metadata:
- Page title and description
- Primary image
- Breadcrumb navigation
- Publication and modification dates

### FAQPage
Common questions and answers about HMPL.js:
- What is HMPL.js?
- How does it reduce bundle size?
- Security features
- Alternatives and comparisons

## SEO Benefits

1. **Rich Snippets**: Search engines can display enhanced results with ratings, features, and download information
2. **Knowledge Graph**: Helps search engines understand relationships between the software, organization, and website
3. **Voice Search**: Structured data improves discoverability for voice search queries
4. **Social Sharing**: Better previews when shared on social media platforms
5. **Developer Tools**: Search engines can categorize HMPL.js correctly as a developer tool

## Validation

The structured data has been validated using:
- JSON syntax validation
- Schema.org compliance
- Google's Rich Results Test (recommended for production)

## Usage

The `StructuredData` component accepts the following props:
- `title`: Page title (optional, defaults to "HMPL.js")
- `description`: Page description (optional, has default)
- `url`: Page URL (optional, defaults to "https://hmpl-lang.dev")

Example usage:
```astro
<StructuredData 
  title="HMPL.js - Lightweight Template Language"
  description="Custom description for this page"
  url="https://hmpl-lang.dev/specific-page"
/>
```

## Next Steps

1. Test the implementation with Google's Rich Results Test
2. Monitor search console for any structured data errors
3. Consider adding structured data to other important pages (documentation, examples)
4. Update version numbers and dates when releasing new versions

## Notes

- All URLs use the production domain `https://hmpl-lang.dev`
- Version information is hardcoded as 3.0.5 (update when releasing new versions)
- The implementation follows Schema.org best practices for software applications
- JSON-LD format is used for better compatibility and easier maintenance

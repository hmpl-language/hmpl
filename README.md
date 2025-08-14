# HMPL App Documentation

This is the official documentation for the **HMPL** project, built using Astro Starlight.

## Installation

Make sure you have **Node.js v18+** installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/hmpl-language/hmpl.git
   cd hmpl/www/app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Starts the local development server   |
| `npm run build`     | Builds the static site for production |
| `npm run preview`   | Previews the production build locally |
| `npm run astro ...` | Runs any Astro CLI command            |

### Start Development Server

```bash
npm run dev
```

The site will be available at: [http://localhost:4321](http://localhost:4321) (default Astro port)

### Build for Production

```bash
npm run build
```

The static site will be generated in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
new-app/
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── components/         # Vue & Astro components
│   ├── content/            # Markdown documentation files
│   ├── pages/              # Astro pages (routes)
│   ├── styles/             # CSS files
│   └── ...
├── package.json
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add: New section'`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request

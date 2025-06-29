# HMPL App Documentation

This is the official documentation for the **HMPL** app project, built using [VuePress 2](https://v2.vuepress.vuejs.org/).

## Installation

Make sure you have **Node.js v16+** installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/hmpl-language/hmpl.git
   cd hmpl-docs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

| Script                  | Description                                       |
|------------------------|---------------------------------------------------|
| `npm run start`        | Starts the local development server               |
| `npm run build`        | Builds the static site for production             |
| `npm run clean-dev`    | Clears cache and starts the dev server cleanly    |
| `npm run update-package` | Updates VuePress-related dependencies via `vp-update` |

### Start Development Server

```bash
npm run start
```

The site will be available at: [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The static site will be generated in the `docs/.vuepress/dist/` folder.

## Project Structure

```
hmpl-docs/
├── docs/                  # All markdown documentation files
│   ├── .vuepress/         # VuePress config and customization
│   │   ├── config.js      # Main VuePress config
│   │   └── ...            # Plugins, theme options, styles, etc.
│   └── index.md           # Homepage of the docs
├── package.json
└── README.md              # This file
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add: New section'`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request

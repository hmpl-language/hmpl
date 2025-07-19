# HMPL Specification Documentation

This is the official specification documentation for the **HMPL** language.

## Installation

Make sure you have **Node.js** installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/hmpl-language/hmpl.git
   cd spec
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

| Script          | Description                                    |
|----------------|------------------------------------------------|
| `npm run build` | Builds the specification using ecmarkup        |
| `npm run start` | Builds and starts the development server       |
| `npm run dev`   | Alias for `npm start`                          |

### Build Specification

```bash
npm run build
```

The specification will be generated in the `build/index.html` file.

### Start Development Server

```bash
npm run start
```

This will build the specification and start a local development server.

## Project Structure

```
spec/
├── src/               # Source specification files
│   └── index.html     # Main specification file
├── server/            # Development server files
│   └── main.js        # Server implementation
├── package.json
└── README.md          # This file
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add: New section'`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request 
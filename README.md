# HMPL Blog

This is the official blog for the **HMPL** language, built using Jekyll.

## Installation

Make sure you have **Ruby** and **Bundler** installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/hmpl-language/hmpl.git
   cd hmpl/www/blog
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

## Available Commands

| Command                | Description                                    |
|-----------------------|------------------------------------------------|
| `bundle exec jekyll serve` | Starts the local development server        |
| `bundle exec jekyll build` | Builds the static site for production      |

### Start Development Server

```bash
bundle exec jekyll serve
```

The site will be available at: [http://localhost:4000](http://localhost:4000)

### Build for Production

```bash
bundle exec jekyll build
```

The static site will be generated in the `_site` directory.

## Project Structure

```
blog/
├── _posts/             # Blog posts in markdown format
├── _layouts/           # HTML layouts for different page types
├── _includes/          # Reusable HTML components
├── assets/            # Static assets (JS, CSS, etc.)
├── css/               # Stylesheets
├── images/            # Image files
├── _config.yml        # Jekyll configuration
├── Gemfile           # Ruby dependencies
└── README.md         # This file
```

## Writing Posts

1. Create a new markdown file in the `_posts` directory
2. Name the file using the format: `YYYY-MM-DD-title.md`
3. Add the following front matter at the top of your post:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: YYYY-MM-DD HH:MM:SS +0000
   categories: [category1, category2]
   ---
   ```
4. Write your post content in markdown format

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add: New post'`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request 
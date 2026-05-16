# api-forgex

[![NPM Version](https://img.shields.io/npm/v/api-forgex.svg)](https://www.npmjs.com/package/api-forgex)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black.svg?logo=github)](https://github.com/nnxi/api-forgex)

A CLI tool for scaffolding scalable and modular Express.js backend infrastructure. 
`api-forgex` helps you quickly bootstrap a Node.js server with interactive prompts, offering out-of-the-box support for Databases, JWT authentication, and automatic API documentation.

## Features

* **Interactive Setup:** Configure your project easily through intuitive CLI prompts.
* **Modular Architecture:** Choose only the addons you need (Database, JWT, Users Domain).
* **Docker Ready:** Automatically generates `docker-compose.yml` for database containers if selected.
* **API Documentation:** Seamless integration with `nodejs-api-docgen` for instant documentation.
* **Zero Configuration:** Automatically installs all required dependencies based on your choices.

## Quick Start

You don't need to install this package globally. Just use `npx` to generate your new project directly.

```bash
# Generate a new project in current directory
npx api-forgex
```

## Available Scripts

Once your project is generated, navigate to your project folder and run the following commands:

```bash
cd my-project

# Start the database container (Requires Docker to be running)
docker compose up -d

# Start the application
npm start

# Start in watch mode
npm run dev
```

*Note: If you selected API documentation, npm start will automatically generate documentation.*

## License

[MIT](LICENSE)
<p align="center">
  <a href="https://github.com/pluginizelab/dev-toolkits">
    <img src="https://raw.githubusercontent.com/pluginizelab/dev-toolkits/main/public/dev-suite-logo.png" alt="DevSuite logo" width="120">
  </a>
  <a href="https://github.com/pluginizelab/dev-toolkits"><strong>pluginizelab/dev-toolkits</strong></a>
</p>

<p align="center">
  Fast, open source, ad-free tools.
</p>

<p align="center">
  <a href="https://github.com/pluginizelab/dev-toolkits#getting-started"><strong>Getting started</strong></a> ·
  <a href="https://github.com/pluginizelab/dev-toolkits/blob/main/CONTRIBUTING.md"><strong>Contribution guide</strong></a> ·
  <a href="https://aiarnob.com"><strong>aiarnob.com</strong></a>
</p>
<br/>

---

### DevSuite Utilities

Open-source data conversion utils for devs who don't like ads. Simple, lightweight and client-side so your data stays on-device. Plus, cmd+k search.

### Attribution

- Initially cloned from [jamdotdev/jam-dev-utilities](https://github.com/jamdotdev/jam-dev-utilities).
- The original project is licensed under GPL-3.0.
- This codebase is now customized and maintained by us.

Here is the list of all utilities:

- [CSV to JSON](https://devsuite.plugizelab.com/csv-to-json)
- [TSV to JSON](https://devsuite.plugizelab.com/tsv-to-json)
- [Base64 Encode/Decode](https://devsuite.plugizelab.com/base-64-encoder)
- [JSON Formatter](https://devsuite.plugizelab.com/json-formatter)
- [YAML to JSON](https://devsuite.plugizelab.com/yaml-to-json)
- [URL Encode/Decode](https://devsuite.plugizelab.com/url-encoder)
- [Timestamp to Date Converter](https://devsuite.plugizelab.com/timestamp-to-date)
- [Query Parameters to JSON](https://devsuite.plugizelab.com/query-params-to-json)
- [HEX to RGB Converter](https://devsuite.plugizelab.com/hex-to-rgb)
- [Convert .env to netlify.toml](https://devsuite.plugizelab.com/env-to-netlify-toml)
- [Image to Base64 Converter](https://devsuite.plugizelab.com/image-to-base64)
- [Base64 to Image Converter](https://devsuite.plugizelab.com/base64-to-image)
- [JSON to CSV](https://devsuite.plugizelab.com/json-to-csv)
- [JSON to TSV](https://devsuite.plugizelab.com/json-to-tsv)
- [HAR file viewer](https://devsuite.plugizelab.com/har-file-viewer)
- [JSON to YAML](https://devsuite.plugizelab.com/json-to-yaml)
- [Number Base Changer](https://devsuite.plugizelab.com/number-base-changer)
- [CSS Inliner for Email](https://devsuite.plugizelab.com/css-inliner-for-email)
- [Regex Tester](https://devsuite.plugizelab.com/regex-tester)
- [Image Resizer](https://devsuite.plugizelab.com/image-resizer)
- [CSS Units Converter](https://devsuite.plugizelab.com/css-units-converter)
- [JWT Parser](https://devsuite.plugizelab.com/jwt-parser)
- [Hash Generator](https://devsuite.plugizelab.com/hash-generator)
- [UUID Generator](https://devsuite.plugizelab.com/uuid-generator)
- [SVG Viewer](https://devsuite.plugizelab.com/svg-viewer)
- [Lorem Ipsum Generator](https://devsuite.plugizelab.com/lorem-ipsum-generator)
- [WebP Converter](https://devsuite.plugizelab.com/webp-converter)
- [SQL Minifer](https://devsuite.plugizelab.com/sql-minifier)
- [Internet Speed Test](https://devsuite.plugizelab.com/internet-speed-test)
- [Random String Generator](https://devsuite.plugizelab.com/random-string-generator)
- [CSV file viewer](https://devsuite.plugizelab.com/csv-file-viewer)
- [JSONL Validator](https://devsuite.plugizelab.com/jsonl-validator)

### Built With

- [Next.js](https://nextjs.org)
- [React.js](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com/)
- [cmdk](https://cmdk.paco.me/)

### Shoutout to these awesome Node.js packages

- [Papa Parse](https://www.papaparse.com/)
- [js-yaml](https://github.com/nodeca/js-yaml)
- [curlconverter](https://github.com/curlconverter/curlconverter)

## Getting Started

Follow these steps to set up your local development environment:

1. Ensure you have Node.js 20.9.0 installed.
2. That's it, you're ready to go!

## Running the Development Server

To start the development server, follow these steps:

Clone the repository:

```bash
git clone https://github.com/pluginizelab/dev-toolkits.git
```

Navigate to the project directory:

```bash
cd dev-toolkits
```

For macOS users with ARM architecture (M series processors), it's crucial to install these dependencies using `brew` to ensure full compatibility with the `node-canvas` library. This step is essential to prevent potential failures during the `npm install` process.

If you don't have Homebrew installed, you can find it at [brew.sh](https://brew.sh/)

```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman python-setuptools
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Reporting Issues

If you encounter any issues, you can open a ticket in this repo's [issue tracker](https://github.com/pluginizelab/dev-toolkits/issues).

We appreciate your feedback and will do our best to address the issues promptly!

## Running with Docker

You can also run the application using Docker:

### Using Docker Compose (recommended)

```bash
# Build and start the container
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using Docker directly

```bash
# Build the Docker image
docker build -t dev-toolkits .

# Run the container
docker run -p 3000:3000 dev-toolkits
```

## Contributing

We welcome and appreciate any contributions!

Check out the [contribution guide](https://github.com/pluginizelab/dev-toolkits/blob/main/CONTRIBUTING.md).

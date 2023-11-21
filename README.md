# table-nft-renderer

[![License](https://img.shields.io/github/license/tablelandnetwork/table-nft-renderer.svg)](./LICENSE)
[![Version](https://img.shields.io/github/package-json/v/tablelandnetwork/table-nft-renderer.svg)](./package.json)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

> Renders the Table NFT as an SVG or an interactive table editor.

# Table of Contents

- [table-nft-renderer](#table-nft-renderer)
- [Table of Contents](#table-of-contents)
- [Background](#background)
- [Developement](#developement)
  - [Install](#install)
  - [Build](#build)
  - [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

# Background

Tableland tables are NFTs. The NFT metadata is served by Tableland. This metadata includes `image` and `animation_url` properties that point to this app. For example, https://tables.tableland.xyz/1/7.svg renders the image and https://tables.tableland.xyz/1/7.html render the interactive editor for table 7 on Ethereum mainnet.

# Developement

## Install

```console
git clone https://github.com/tablelandnetwork/table-nft-renderer.git
cd table-nft-renderer
npm install
```

## Build

```console
npm run build
npm start
```

Use `npm run build:watch` for active developement on port `3000`.

## Testing

```console
npm test
```

# Contributing

PRs accepted.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

# License

MIT AND Apache-2.0, © 2021-2024 Tableland Network Contributors

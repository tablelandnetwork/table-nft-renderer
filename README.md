# @tablelandnetwork/table-nft-renderer

[![License](https://img.shields.io/github/license/tablelandnetwork/table-nft-renderer.svg)](./LICENSE)
[![Version](https://img.shields.io/github/package-json/v/tablelandnetwork/table-nft-renderer.svg)](./package.json)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

The Table NFT Renderer is an application for rendering the Tableland Table NFT.

# Table of Contents

- [@tablelandnetwork/table-nft-renderer](#tablelandnetworktable-nft-renderer)
- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Usage](#usage)
  - [Start server](#start-server)
  - [Build renderer application](#build-renderer-application)
- [Developement](#developement)
- [Contributing](#contributing)
- [License](#license)

# Install

```console
git clone https://github.com/tablelandnetwork/table-nft-renderer.git
cd table-nft-renderer
npm install
```

# Usage

## Start server

The server is primary used for rendering the SVG application. This is the SVG which is created for the `image` property of the ERC721's metadata.

The svg can be found by visiting `localhost:8080/${chainId}/${tableTokenId}`. For example, `localhost:8080/5/2` will render the #2 on the Goerli (chain id `5`) network.

During developement, the server can also be used to serve the NFT application. In these cases, the NFT application is rendering at `localhost:8080/anim/`.

## Build renderer application

The NFT application renders the table NFT `animation_url` component of Tableland NFTs.

To build the application

This public folder is the root folder of the IPFS application.

# Developement

To get started, open your console and run these commands:

```console
npx mix     // Bundles the application
npm start   // Stats that server
```

Use `npm mix watch` for active developement.

By default, the Tableland NFT renderer will appear at port 8080

# Contributing

PRs accepted.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

# License

MIT AND Apache-2.0, © 2021-2022 Tableland Network Contributors

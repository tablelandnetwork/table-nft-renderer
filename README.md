# Table NFT Renderer

The Table NFT Renderer is an application for rendering the Tableland Table NFT.

# To get started

```
npm install
```
# Start server

The server is primary used for rendering the SVG application. This is the SVG which is created at the `image` property of the ERC721's metadata. 

The svg can be found by visiting `localhost:8080/${chainId}/${tableTokenId}`. For example, `localhost:8080/5/2` will render the #2 on the Goerli (chain id `5`) network. 

During developement, the server can also be used to serve the NFT application. In these cases, the NFT application is rendering at `localhost:8080/anim/`. 

# Build NFT application

The NFT application renders the table NFT `animation_url` component of Tableland NFTs.

This public folder is the root folder of the IPFS application.

```npx mix```

Use `npm mix watch` for active developement.

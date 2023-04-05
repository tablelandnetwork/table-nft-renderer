const chains = {
  // Mainnets
  1:        {name: "Ethereum Mainnet",        slug: "homestead", mainnet: true},
  42161:    {name: "Arbitrum",                slug: "arbitrum", mainnet: true },
  137:      {name: "Polygon Mainnet",         slug: "matic", mainnet: true},
  42170:    {name: "Arbitrum Nova",           slug: "arbitrum-nova", mainnet: true },
  10:       {name: "Optimism",                slug: "optimism", mainnet: true},  
  314:      {name: "Filecoin Mainnet",        slug: "filecoin", mainnet: true}, // Filecoin support in validator expected Q2, 2023

  // Testnets
  5:        {name: "Ethereum Goerli",         slug: "goerli"},
  421613:   {name: "Arbitrum Goerli",         slug: "arbitrum-goerli" },
  420:      {name: "Optimism Goerli",         slug: "optimism-goerli"},
  80001:    {name: "Polygon Mumbai",          slug: "maticmum" },  
  11155111: {name: "Ethereum Sepolia",        slug: "ethereum-sepolia"}, // Sepolia support in validator expected Q2, 2023
  3141:     {name: "Filecoin Hyperspace",     slug: "filecoin-hyperspace"},  // Filecoin Hyperspace support in validator expected Q2, 2023
};

export default chains;

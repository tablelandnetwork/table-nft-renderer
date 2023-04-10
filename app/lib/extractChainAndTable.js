export default function getChainAndTableIdFromUrl(path) {
  const regex = /(\d+)/g;
  const matches = path.match(regex);

  if (matches) {
    return matches;
  } else {
    return [];
  }
}

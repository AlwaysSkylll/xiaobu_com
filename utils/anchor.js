export const scrollToAnchor = (anchorName) => {
  if (!anchorName) return
  let anchorElement = document.getElementById(anchorName);
  if (anchorElement) { anchorElement.scrollIntoView(); }
}

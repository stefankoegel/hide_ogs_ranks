
// We hide most of the ratings via CSS.
// This also includes the rating table and graph on the user pages.
const cssStyle = `
  span.Player-rank { display: none }
  span.rating      { display: none }
  span.rank        { display: none }
  div.ratings-container       { filter: blur(20px) }
  div.ratings-graph           { filter: blur(20px) }
  .avatar-container span.Player-rank { filter: blur(10px); display: inline }`

const styleElement = document.createElement("style")
styleElement.type = "text/css"
styleElement.appendChild(document.createTextNode(cssStyle));
document.head.append(styleElement);

// This function removes ranks from user names via regular expressions.
function hideRanks(node) {
  const names = node.querySelectorAll("span.player-name");
  for(const name of names) {
    const text = name.textContent;
    if(text.match(/\[.*\]$/)) {
      name.textContent = text.replace(/\[.*\]$/, "");
    }
  }
}

// Hide ranks in user names that are on the website when the extension is executed
hideRanks(document.body);

// We use a mutation observer to listen for the addition of new user names after the website has loaded
const config = { childList: true, subtree: true, characterData: false, attributes: false };
const spanObserver = new MutationObserver(hideRanksOnMutation);
spanObserver.observe(document.body, config);

function hideRanksOnMutation(mutations) {
  for(let mutation of mutations) {
    for(let added of mutation.addedNodes) {
      hideRanks(added.parentNode);
    }
  }
}

// Try to add a click listener to the blurred graph and table on the user page.
// If a click is registered, remove the blur.
function addUnhideRatingsListener() {
  const tableContainer = document.querySelector("div.ratings-container");
  const graphContainer = document.querySelector("div.ratings-graph");
  const playerRank = document.querySelector(".avatar-container span.Player-rank");

  if(tableContainer && graphContainer && playerRank) {
    tableContainer.onclick = cleanUp;
    graphContainer.onclick = cleanUp;

    function cleanUp(event) {
      tableContainer.style.setProperty("filter", "none");
      graphContainer.style.setProperty("filter", "none");
      playerRank.style.setProperty("filter", "none");

      event.stopPropagation();
      tableContainer.onclick = null;
      graphContainer.onclick = null;
      window.setTimeout(addUnhideRatingsListener, 1000);
    }
  } else {
      window.setTimeout(addUnhideRatingsListener, 1000);
  }
}
window.setTimeout(addUnhideRatingsListener, 1000);

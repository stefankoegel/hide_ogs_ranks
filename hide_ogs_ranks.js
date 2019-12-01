
// We hide most of the ratings via CSS.
// This also includes the rating table and graph on the player pages.
// Some ratings are added later on to the web page or are contained in player names.
// We have to handle these differently.
const cssStyle = `span.Player-rank { display: none }
                  span.rating      { display: none }
                  span.rank        { display: none }
                
                  div.ratings-row > div { visibility: hidden }
                
                  div.ratings-container > div { visibility: hidden }`;

const styleElement = document.createElement("style");
styleElement.type = "text/css";
styleElement.appendChild(document.createTextNode(cssStyle));
document.head.append(styleElement);

// Hide ranks in player names that are on the website when the extension is executed.
hideRanks(document.body);

function hideRanks(node) {
  const names = node.querySelectorAll("span.player-name");
  for(const name of names) {
    const text = name.textContent;
    if(text.match(/\[.*\]$/)) {
      name.textContent = text.replace(/\[.*\]$/, "");
    }
  }
}

// We use a mutation observer to listen for the addition of new player names after the website has loaded.
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

// Every second: try to add a click listener to the hidden graph and table on the player page.
// If a click is registered, make them visible.
// We add the 'Card' class to the containers of the hidden elements so that they look nicer.
// We also use this class as a marker that we have already added a click listener.
window.setInterval(addUnhideRatingsListener, 1000);

function addUnhideRatingsListener() {
  const tableContainer = document.querySelector("div.ratings-container");
  const graphContainer = document.querySelector("div.ratings-row");

  if(tableContainer && !tableContainer.classList.contains("Card")) {
    tableContainer.onmousedown = cleanUp;
    tableContainer.classList.add("Card");
    graphContainer.onmousedown = cleanUp;
    graphContainer.classList.add("Card");

    function cleanUp(event) {
      const table = document.querySelector("div.ratings-container > div");
      const graph = document.querySelector("div.ratings-row > div");
      const rank = document.querySelector(".avatar-container .Player-rank");
      table.style.setProperty("visibility", "visible");
      graph.style.setProperty("visibility", "visible");
      rank.style.setProperty("display", "inline");

      event.stopPropagation();
    }
  }
}


const rankRegex = /\[.*\]$/;
const nameClass = "player-name";
const rankClass = "Player-rank";
const spanSelector = `span.${nameClass}, span.${rankClass}`;

function hideRankInChildren(node) {
  const spans = Array.from(node.querySelectorAll(spanSelector));
  spans.forEach(hideRankInSpan);
}

function hideRankInSpan(span) {
  if(span.textContent.match(rankRegex)) {
    span.textContent = span.textContent.replace(rankRegex, "");
  }
}

// Hide ranks that are in the document when the extension is executed
hideRankInChildren(document.body);

function hideRanksOnMutation(mutations) {
  for(let mutation of mutations) {
    const target = mutation.target
    if(target.tagName == "SPAN") {
      const classList = target.classList;
      if(classList.contains(nameClass) || classList.contains(rankClass)) {
        hideRankInSpan(target);
      }
    } else {
      hideRankInChildren(target);
    }
  }
}

const observer = new MutationObserver(hideRanksOnMutation);

const config = { childList: true, subtree: true, characterData: false, attributes: false };

// Hide ranks that are added later on via Web API
observer.observe(document.body, config);

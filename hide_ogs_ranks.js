// MIT License

// Copyright (c) 2019 Stefan Koegel

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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

function hideRanksOnMutation(mutations, _) {
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

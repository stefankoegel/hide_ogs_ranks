# Hide OGS ranks

This is a [Firefox Add-On](https://addons.mozilla.org/en-US/firefox/addon/hide-ogs-ranks/) that hides all ranks and ratings on [online-go.com](https://online-go.com/).
It also hides the rating graphs and charts on profile pages,
but you can unhide them by clicking on the spot where they should be.
Some players might find it relaxing to not know their opponent’s and their own rank at all times.

All the interesting code is in `hide_ogs_ranks.js`.
Most of the ranks and ratings are hidden via CSS.
The rest is removed by using a regular expression and a mutation observer.
The observer is necessary because the ranks are added asynchronously.

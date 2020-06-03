/*global browser*/
browser.runtime.onMessage.addListener((request) => {
  if (request === "disable") {
    // Get the current page scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = () => {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }
  if (request === "enable") {
    window.onscroll = () => {};
  }
});

window.onload = function() {
  loadTwikoo()
  loadHighlight()
}

/**
 * 加载 twikoo
 */
function loadTwikoo() {
  const path = window.location.pathname
  twikoo.init({
    envId: "https://ymoment.netlify.app/.netlify/functions/twikoo",
    el: '#tcomment',
    path,
  });
}

/**
 * 加载 highlight
 */
function loadHighlight() {
  if (hljs) {
    hljs.highlightAll();
  }
}

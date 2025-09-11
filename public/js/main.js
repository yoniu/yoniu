window.onload = function() {
  loadTwikoo()
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

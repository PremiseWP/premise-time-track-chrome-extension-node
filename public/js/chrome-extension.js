if (document.cookie.indexOf("_ptt=") < 0 ) {

  chrome.tabs.getCurrent(function(tab) {
    if (tab) {
      return;
    }
    // Move authorization process to new tab!
    chrome.tabs.create({url: document.URL});
  });
}

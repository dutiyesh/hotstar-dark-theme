chrome.runtime.sendMessage({ type: 'REQUEST_THEME' });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RECEIVE_THEME' || message.type === 'NOTIFY_THEME_CHANGE') {
    const { theme } = message.payload;

    if (theme === 'DARK') {
      document.body.classList.add('htstr');
    } else {
      document.body.classList.remove('htstr');
    }
  }

  sendResponse({});
  return true;
});

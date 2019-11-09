chrome.runtime.sendMessage({ type: 'REQUEST_MODE' });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RECEIVE_MODE' || message.type === 'NOTIFY_MODE_CHANGE') {
    const { mode } = message.payload;

    if (mode === 'DARK') {
      document.body.classList.add('htstr');
    } else {
      document.body.classList.remove('htstr');
    }
  }

  sendResponse({});
  return true;
});

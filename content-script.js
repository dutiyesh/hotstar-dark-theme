chrome.runtime.sendMessage({ type: 'REQUEST_MODE' });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RECEIVE_MODE') {
    const { mode } = message.payload;

    if (mode === 'DARK') {
      document.body.classList.add('htstr');
    }
  }

  sendResponse({});
  return true;
});

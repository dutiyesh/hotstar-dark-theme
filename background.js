chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ hotstar_mode: 'DARK' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'REQUEST_MODE') {
    chrome.storage.sync.get(['hotstar_mode'], result => {
      const mode = result.hotstar_mode;

      const notifyMessage = {
        type: 'RECEIVE_MODE',
        payload: {
          mode
        }
      };

      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];

        if (tab) {
          chrome.tabs.sendMessage(tab.id, notifyMessage);
        }
      });
    });

    sendResponse({});
    return true;
  }

  if (message.type === 'UPDATE_MODE') {
    const { mode } = message.payload;

    chrome.storage.sync.set({ hotstar_mode: mode }, () => {
      const notifyMessage = {
        type: 'NOTIFY_MODE_CHANGE',
        payload: {
          mode
        }
      };

      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];

        if (tab) {
          chrome.tabs.sendMessage(tab.id, notifyMessage);
        }
      });
    });

    sendResponse({});
    return true;
  }
});

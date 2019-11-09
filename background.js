chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ hotstar_theme: 'DARK' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'REQUEST_THEME') {
    chrome.storage.sync.get(['hotstar_theme'], result => {
      const theme = result.hotstar_theme;

      const notifyMessage = {
        type: 'RECEIVE_THEME',
        payload: {
          theme
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

  if (message.type === 'UPDATE_THEME') {
    const { theme } = message.payload;

    chrome.storage.sync.set({ hotstar_theme: theme }, () => {
      const notifyMessage = {
        type: 'NOTIFY_THEME_CHANGE',
        payload: {
          theme
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

const app = document.getElementById('app');
const switchButton = document.getElementById('switch');

(() => {
  chrome.storage.sync.get(['hotstar_mode'], result => {
    const isDarkMode = result.hotstar_mode === 'DARK';

    switchButton.checked = isDarkMode;

    if (isDarkMode) {
      app.classList.add('is-dark-mode');
    } else {
      app.classList.remove('is-dark-mode');
    }
  })
})();

switchButton.addEventListener('change', event => {
  const mode = event.target.checked ? 'DARK' : 'LIGHT';

  const updateMessage = {
    type: 'UPDATE_MODE',
    payload: {
      mode
    }
  }

  if (mode === 'DARK') {
    app.classList.add('is-dark-mode');
  } else {
    app.classList.remove('is-dark-mode');
  }

  chrome.runtime.sendMessage(updateMessage);
});

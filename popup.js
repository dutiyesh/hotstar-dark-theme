const app = document.getElementById('app');
const switchButton = document.getElementById('switch');

(() => {
  chrome.storage.sync.get(['hotstar_theme'], result => {
    const isDarkTheme = result.hotstar_theme === 'DARK';

    switchButton.checked = isDarkTheme;

    if (isDarkTheme) {
      app.classList.add('is-dark-theme');
    } else {
      app.classList.remove('is-dark-theme');
    }
  })
})();

switchButton.addEventListener('change', event => {
  const theme = event.target.checked ? 'DARK' : 'LIGHT';

  const updateMessage = {
    type: 'UPDATE_THEME',
    payload: {
      theme
    }
  }

  if (theme === 'DARK') {
    app.classList.add('is-dark-theme');
  } else {
    app.classList.remove('is-dark-theme');
  }

  chrome.runtime.sendMessage(updateMessage);
});

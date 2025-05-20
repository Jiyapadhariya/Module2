function getUser() {
  const username = document.getElementById('username').value.trim();
  const userInfo = document.getElementById('user-info');
  const errorDiv = document.getElementById('error');

  userInfo.innerHTML = '';
  errorDiv.textContent = '';

  if (!username) {
    errorDiv.textContent = 'Please enter a GitHub username.';
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then(data => {
      userInfo.innerHTML = `
        <img src="${data.avatar_url}" alt="${data.login}'s avatar">
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || 'No bio available.'}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Following:</strong> ${data.following}</p>
      `;
    })
    .catch(error => {
      errorDiv.textContent = error.message;
    });
}

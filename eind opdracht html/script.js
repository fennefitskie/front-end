const games = [
  { "title": "Counter-Strike: Global Offensive", "price": 0.00, "genre": "FPS", "rating": 4 },
  { "title": "Dota 2", "price": 0.00, "genre": "MOBA", "rating": 3 },
  { "title": "Goose Goose Duck", "price": 4.99, "genre": "Action", "rating": 2 },
  { "title": "Apex Legends", "price": 0.00, "genre": "FPS", "rating": 4 },
  { "title": "PUBG: BATTLEGROUNDS", "price": 29.99, "genre": "FPS", "rating": 5 },
  { "title": "Lost Ark", "price": 49.99, "genre": "Action", "rating": 1 },
  { "title": "Grand Theft Auto V", "price": 29.99, "genre": "FPS", "rating": 3 },
  { "title": "Call of Duty®: Modern Warfare® II | Warzone™ 2.0", "price": 19.99, "genre": "FPS", "rating": 3 },
  { "title": "Team Fortress 2", "price": 0.00, "genre": "FPS", "rating": 5 },
  { "title": "Rust", "price": 39.99, "genre": "Action", "rating": 5 },
  { "title": "Unturned", "price": 0.00, "genre": "RPG", "rating": 1 },
  { "title": "ELDEN RING", "price": 59.99, "genre": "RPG", "rating": 5 },
  { "title": "ARK: Survival Evolved", "price": 10.00, "genre": "RPG", "rating": 1 },
  { "title": "War Thunder", "price": 0.00, "genre": "Simulation", "rating": 2 },
  { "title": "Sid Meier's Civilization VI", "price": 29.99, "genre": "Simulation", "rating": 3 },
  { "title": "Football Manager 2023", "price": 59.99, "genre": "Simulation", "rating": 3 },
  { "title": "Warframe", "price": 0.00, "genre": "Looter-shooter", "rating": 3 },
  { "title": "EA SPORTS™ FIFA 23", "price": 59.99, "genre": "Sport", "rating": 1 },
  { "title": "Destiny 2", "price": 0.00, "genre": "FPS", "rating": 5 },
  { "title": "Red Dead Redemption 2", "price": 59.99, "genre": "RPG", "rating": 4 },
  { "title": "Tom Clancy's Rainbow Six Siege", "price": 19.99, "genre": "Simulation", "rating": 3 },
  { "title": "The Witcher 3: Wild Hunt", "price": 39.99, "genre": "RPG", "rating": 4 },
  { "title": "Terraria", "price": 9.99, "genre": "Sandbox", "rating": 2 },
  { "title": "Stardew Valley", "price": 14.99, "genre": "Sandbox", "rating": 1 },
  { "title": "Left 4 Dead 2", "price": 9.99, "genre": "FPS", "rating": 4 },
  { "title": "Don't Starve Together", "price": 5.09, "genre": "RPG", "rating": 3 },
  { "title": "MIR4", "price": 19.99, "genre": "RPG", "rating": 3 },
  { "title": "PAYDAY 2", "price": 9.99, "genre": "Action", "rating": 2 },
  { "title": "Path of Exile", "price": 0.00, "genre": "RPG", "rating": 4 },
  { "title": "Project Zomboid", "price": 14.99, "genre": "Simulation", "rating": 4 },
  { "title": "Valheim", "price": 19.99, "genre": "Sandbox", "rating": 5 },
  { "title": "DayZ", "price": 44.99, "genre": "Simulation", "rating": 3 }
];

let selectedGames = [];

document.addEventListener('DOMContentLoaded', () => {
  populateGenreDropdown();
  renderGames(games);
});

function populateGenreDropdown() {
  const genreSelect = document.getElementById('genreFilter');
  const genres = [...new Set(games.map(g => g.genre))];
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

function renderGames(gameList) {
  const gamesList = document.getElementById('gamesList');
  gamesList.innerHTML = '';

  gameList.forEach(game => {
    const gameDiv = document.createElement('div');
    gameDiv.classList.add('game-item');
    gameDiv.innerHTML = `
      <label>
        <input type="checkbox" onchange="toggleCart('${game.title}')"
          ${selectedGames.some(g => g.title === game.title) ? 'checked' : ''}>
      </label>
      <div style="flex-grow: 1; padding-left: 10px;">
        <strong>${game.title}</strong><br>
        Genre: ${game.genre}<br>
        Rating: ${game.rating}/5
      </div>
      <div><strong>€${game.price === 0 ? 'FREE' : game.price.toFixed(2)}</strong></div>
    `;
    gamesList.appendChild(gameDiv);
  });
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

window.toggleCart = function (title) {
  const game = games.find(g => g.title === title);
  const index = selectedGames.findIndex(g => g.title === title);
  if (index === -1) {
    selectedGames.push(game);
    showNotification(`${game.title} toegevoegd aan winkelmandje.`);
  } else {
    selectedGames.splice(index, 1);
    showNotification(`${game.title} verwijderd uit winkelmandje.`);
  }
};

function applyFilters() {
  const maxPrice = parseFloat(document.getElementById('priceFilter').value) || Infinity;
  const genre = document.getElementById('genreFilter').value;
  const minRating = parseInt(document.getElementById('ratingFilter').value) || 0;

  const filteredGames = games.filter(game =>
    game.price <= maxPrice &&
    (genre === '' || game.genre === genre) &&
    game.rating >= minRating
  );

  renderGames(filteredGames);
}

function showCart() {
  document.getElementById('overview').style.display = 'none';
  document.getElementById('cart').style.display = 'block';

  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  selectedGames.forEach(game => {
    const item = document.createElement('div');
    item.classList.add('cart-item');
    item.innerHTML = `
      <label>
        <input type="checkbox" onchange="removeFromCart('${game.title}')" checked>
      </label>
      <div style="flex-grow: 1; padding-left: 10px;">
        ${game.title}
      </div>
      <div><strong>€${game.price === 0 ? 'FREE' : game.price.toFixed(2)}</strong></div>
    `;
    cartItems.appendChild(item);
  });

  updateTotal();
}

window.removeFromCart = function (title) {
  const index = selectedGames.findIndex(g => g.title === title);
  if (index !== -1) {
    selectedGames.splice(index, 1);
    showCart(); // herbouw winkelmandje
    showNotification(`${title} verwijderd uit winkelmandje.`);
  }
};

function updateTotal() {
  const total = selectedGames.reduce((sum, game) => sum + game.price, 0);
  document.getElementById('totalPrice').textContent = total.toFixed(2);
}
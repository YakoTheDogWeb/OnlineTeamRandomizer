const roles = ["Tanque", "Daño", "Daño", "Apoyo", "Apoyo"];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateTeams() {
  const input = document.getElementById("players").value;
  const assignRoles = document.getElementById("assignRoles").checked;
  const result = document.getElementById("result");

  let players = input
    .split("\n")
    .map(name => name.trim())
    .filter(name => name !== "");

  if (players.length < 2) {
    result.innerHTML = "<p>Introduce al menos 2 jugadores.</p>";
    return;
  }

  players = shuffle(players);

  const middle = Math.ceil(players.length / 2);
  const team1 = players.slice(0, middle);
  const team2 = players.slice(middle);

  result.innerHTML = `
    ${renderTeam("Equipo 1", team1, assignRoles)}
    ${renderTeam("Equipo 2", team2, assignRoles)}
  `;
}

function renderTeam(title, players, assignRoles) {
  let shuffledRoles = shuffle([...roles]);

  const list = players.map((player, index) => {
    const role = assignRoles && index < shuffledRoles.length
      ? ` - ${shuffledRoles[index]}`
      : "";

    return `<li>${player}${role}</li>`;
  }).join("");

  return `
    <div class="team">
      <h2>${title}</h2>
      <ul>${list}</ul>
    </div>
  `;
}
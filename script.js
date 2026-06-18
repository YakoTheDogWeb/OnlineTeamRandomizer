let lastTeamsText = "";
const roles = ["Tanque", "Daño", "Daño", "Apoyo", "Apoyo"];
const emojis = ["🐸", "🦆", "🐙", "🦖", "🐧", "🦝", "🦄", "🐢", "🦊", "🐼", "💩", "🦉", "🦈", "🦔", "🐲", "🍕", "🌮", "🚀", "👾", "🤖", "🧃"];

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
  lastTeamsText = createTeamsText(team1, team2, assignRoles);

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

    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    return `<li><span class="emoji">${emoji}</span> ${player}${role}</li>`;
  }).join("");

  return `
    <div class="team">
      <h2>${title}</h2>
      <ul>${list}</ul>
    </div>
  `;
}

function createTeamsText(team1, team2, assignRoles) {
  const formatTeam = (title, players) => {
    let shuffledRoles = shuffle([...roles]);

    const lines = players.map((player, index) => {
      const role = assignRoles && index < shuffledRoles.length
        ? ` - ${shuffledRoles[index]}`
        : "";

      return `${player}${role}`;
    });

    return `${title}\n${lines.join("\n")}`;
  };

  return `${formatTeam("Equipo 1", team1)}\n\n${formatTeam("Equipo 2", team2)}`;
}

function copyTeams() {
  if (!lastTeamsText) {
    alert("Primero crea los equipos.");
    return;
  }

  navigator.clipboard.writeText(lastTeamsText)
    .then(() => alert("Equipos copiados al portapapeles."))
    .catch(() => alert("No se ha podido copiar el texto."));
}

function shareWhatsApp() {
  if (!lastTeamsText) {
    alert("Primero crea los equipos.");
    return;
  }

  const text = encodeURIComponent(lastTeamsText);
  window.open(`https://wa.me/?text=${text}`, "_blank");
}


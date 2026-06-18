const roles = ["Tanque", "Daño", "Daño", "Apoyo", "Apoyo"];

const emojis = ["🐸", "🦆", "🐙", "🦖", "🐧", "🦝", "🦄", "🐢", "🦊", "🐼", "🦉", "🦈", "🦔", "🐲", "🍕", "🌮", "🚀", "👾", "🤖", "🧃"];

let lastTeamsText = "";

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
    lastTeamsText = "";
    return;
  }

  players = shuffle(players);

  const middle = Math.ceil(players.length / 2);
  const team1 = buildTeam(players.slice(0, middle), assignRoles);
  const team2 = buildTeam(players.slice(middle), assignRoles);

  result.innerHTML = `
    ${renderTeam("Equipo 1", team1)}
    ${renderTeam("Equipo 2", team2)}
  `;

  lastTeamsText = createTeamsText(team1, team2);
}

function buildTeam(players, assignRoles) {
  let shuffledRoles = shuffle([...roles]);

  return players.map((player, index) => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const role = assignRoles && index < shuffledRoles.length
      ? shuffledRoles[index]
      : "";

    return {
      name: player,
      emoji: emoji,
      role: role
    };
  });
}

function renderTeam(title, team) {
  const list = team.map(player => {
    const roleText = player.role ? ` - ${player.role}` : "";
    return `<li><span class="emoji">${player.emoji}</span> ${player.name}${roleText}</li>`;
  }).join("");

  return `
    <div class="team">
      <h2>${title}</h2>
      <ul>${list}</ul>
    </div>
  `;
}

function createTeamsText(team1, team2) {
  const formatTeam = (title, team) => {
    const lines = team.map(player => {
      const roleText = player.role ? ` - ${player.role}` : "";
      return `${player.emoji} ${player.name}${roleText}`;
    });

    return `${title}\n${lines.join("\n")}`;
  };

  return `${formatTeam("Equipo 1", team1)}\n\n${formatTeam("Equipo 2", team2)}`;
}

async function copyTeams() {
  if (!lastTeamsText) {
    alert("Primero crea los equipos.");
    return;
  }

  try {
    await navigator.clipboard.writeText(lastTeamsText);
    alert("Equipos copiados al portapapeles.");
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = lastTeamsText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    alert("Equipos copiados al portapapeles.");
  }
}

function shareWhatsApp() {
  if (!lastTeamsText) {
    alert("Primero crea los equipos.");
    return;
  }

  const text = encodeURIComponent(lastTeamsText);
  window.location.href = `https://wa.me/?text=${text}`;
}

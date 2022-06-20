
const startGameButton = document.getElementById("start");
const joinGameButton = document.getElementById("join");
const leaveGameButton = document.getElementById("leave");

const socket = io('http://localhost:3000/game', {
  auth: {
    token: 'abc'
  }
});

const gameName = 'GameOne'


socket.on('connect', function () {
  console.log('Connected');
});

socket.on('exception', function (data) {
  console.log('event', data);
});
socket.on('disconnect', function () {
  console.log('Disconnected');
});

// game events
// socket.on("start-game", (data) => {
//   console.log(data);
// });

socket.on('game-started', function (data) {
  console.log(data);
  console.log(11111)
});
voluen = 25f61f392d8f89c71978f483fc0bf0cde8bb6296b695f1c9bb213a4b27f7e5a1

// event listeners
startGameButton.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("start-game", { room: 'gameName' });
});


joinGameButton.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("join-room", { room: 'gameName' });
});


leaveGameButton.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("leave-room", { room: 'gameName' });
});



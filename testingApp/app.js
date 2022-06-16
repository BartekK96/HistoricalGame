
const startGameButton = document.getElementById("start");

// startGameButton.addEventListener("click", (e) => {
//     console.log(12333)
//     console.log(socket)
//     e.preventDefault();
//     socket.emit("start-game");
// });



const socket = io('http://localhost:3000/game', {
  auth: {
    token: 'abc'
  }
});


socket.on('connect', function () {
  console.log('Connected');
});

socket.on('events', function (data) {
  console.log('event', data);
});
socket.on('exception', function (data) {
  console.log('event', data);
});
socket.on('disconnect', function () {
  console.log('Disconnected');
});

// game events
socket.on("game-started", (data) => {
  console.log(data);
});

startGameButton.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("start-game");
});

// Server Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    //Configuraciones de sockets
    this.io = socketio(this.server, {
      /* 'configs'*/
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configuracionSockets() {
    new Sockets(this.io);
  }

  execute() {
    //inicializar middleware
    this.middlewares();

    //inicializar sockets
    this.configuracionSockets();

    //inicializar servers
    this.server.listen(this.port, () => {
      console.log(`server en puert ${this.port}`);
    });
  }
}

module.exports = Server;

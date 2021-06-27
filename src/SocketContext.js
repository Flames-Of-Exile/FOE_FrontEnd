import io from "socket.io-client";
import { createContext } from "react";

export class Socket {
  connect() {
    this.socket = io.connect(`${window.location.hostname}`, {
      reconnection: true,
    });
  }

  disconnect() {
    this.socket.close();
  }

  send(event) {
    this.socket.emit(event);
  }

  registerListener(name, callback) {
    this.socket.on(name, callback);
  }

  removeListener(name) {
    this.socket.removeListener(name);
  }
}

const socket = new Socket();

export default createContext(socket);

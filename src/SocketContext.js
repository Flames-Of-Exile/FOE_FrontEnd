import io from "socket.io-client";
import { createContext } from "react";

export class Socket {
  connect() {
    this.connection = io.connect(`${window.location.hostname}`, {
      reconnection: true,
    });
  }

  disconnect() {
    this.connection.close();
  }

  send(event) {
    this.connection.emit(event);
  }

  registerListener(name, callback) {
    this.connection.on(name, callback);
  }

  removeListener(name) {
    this.connection.removeListener(name);
  }
}

const socket = new Socket();

export default createContext({socket});

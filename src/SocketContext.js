import io from "socket.io-client";
import React, { createContext, useCallback, useContext, useState } from "react";

export class Socket {
  connect() {
    this.connection = io.connect(`${window.location.hostname}`, {
      reconnection: true,
    });
  }

  disconnect() {
    this.connection.close();
  }

  send(e) {
    this.connection.emit(e);
  }

  registerListener(name, callback) {
    this.connection.on(name, callback);
  }

  removeListener(name) {
    this.connection.removeListener(name);
  }
}

const SocketContext = createContext();

export const SocketContextProvider = (props) => {
  const [socket] = useState(new Socket());
  const connect = useCallback(() => socket.connect(), [socket]);
  const send = useCallback((e) => socket.send(e), [socket]);
  const disconnect = useCallback(() => socket.disconnect(), [socket]);
  const registerListener = useCallback(
    (name, callback) => socket.registerListener(name, callback),
    [socket]
  );
  const removeListener = useCallback(
    (name) => socket.removeListener(name),
    [socket]
  );

  return (
    <SocketContext.Provider
      value={{ connect, send, disconnect, registerListener, removeListener }}
      {...props}
    />
  );
};

export default function useSocketContext() {
  const { connect, send, disconnect, registerListener, removeListener } =
    useContext(SocketContext);
  return { connect, send, disconnect, registerListener, removeListener };
}

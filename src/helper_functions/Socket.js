import io from 'socket.io-client';

class Socket {
    connect() {
        this.socket = io.connect(`${window.location.hostname}`, {reconnection: true});
        this.socket.on("response", message => console.log(message));
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
}

export default Socket;
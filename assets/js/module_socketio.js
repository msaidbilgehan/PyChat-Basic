// API Endpoint
let api_endpoint_chat = "api_endpoint_chat";

// Element IDs
let element_id_chat = "chat";

// SocketIO Connection
console.log("SocketIO Connection to ", location.protocol + '//' + document.domain + ':' + location.port, " is established.");
let socket = io.connect(
    location.protocol + '//' + document.domain + ':' + location.port,
    { rememberTransport: false, transports: ['websocket'], upgrade: false }
);

// Initialize
document.addEventListener('DOMContentLoaded', (event) => {
    element_chat = document.getElementById(element_id_chat);

    // Server Listener
    console.log("Opening socket on: ", api_endpoint_chat);
    socket.on(api_endpoint_chat, function (data) {
        // Check if data is undefined
        if (data === undefined) {
            console.log("Received undefined frame from server socket on: ", api_endpoint_chat);
            element_chat.innerHTML = "Data NOT Received";
        } else {

            if (data.message !== undefined) {
                element_chat.innerHTML = data.message;
            }
        }
    });
});
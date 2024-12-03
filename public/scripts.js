async function setUpSignalR() {
    const response = await fetch('https://helenas-cosmos-function.azurewebsites.net/api/httptriggernegotiatesignalr');
    const connectionInfo = await response.json();
    
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(connectionInfo.url, {
            accessTokenFactory: async () => {
                return connectionInfo.accessToken;
            }
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on('newMessage', (message) => { 
        console.log(`message: ${message}`); 
        document.getElementById("modalMessage").innerHTML = message; $('#myModal').modal('show');
        });
    
    connection.start()
        .catch(console.error);
}

setUpSignalR();

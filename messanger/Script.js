
document.addEventListener("DOMContentLoaded", function() {

  const ws = new WebSocket("ws://localhost:8082");

  var sendButton = document.getElementById("send-button");
  var inputBar = document.getElementById("input-message");
  var messageSpace = document.getElementById("input-chat");
  var nomeUtente = document.getElementById("nomeUtente");
  var chatSpace = document.getElementById("chat-space");

  var username = prompt("Inserisci il tuo nome: ");
  do{
    if(username.length<10){
      nomeUtente.textContent = username;
    }else{
      alert("Nome troppo grande");
      username = prompt("Inserisci un nome valido");
    }
  }while(nomeUtente.textContent == "");
  
  ws.addEventListener("open", () => {

    console.log("We are connected!");
  });

  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);

      var messageComponent = document.createElement("div"); //div principale

      var textName = document.createElement("div");
      textName.textContent = data.username;
      textName.style.textAlign = "start";
      textName.style.fontSize = "12px";
      messageComponent.appendChild(textName);

      var textTop = document.createElement("div");  //div testo del messaggio
      textTop.textContent = data.message;
      textTop.style.textAlign = "start";
      messageComponent.appendChild(textTop);

      var textBottom = document.createElement("div"); //div data di invio
      textBottom.textContent = data.timeStamp;
      textBottom.style.textAlign = "right";
      textBottom.style.fontSize = "10px";
      messageComponent.appendChild(textBottom);

      messageComponent.style.borderRadius = "10px";
      messageComponent.style.display = "inline-block";
      messageComponent.style.padding = "5px 20px"; 
      messageComponent.style.margin = "5px";
      messageComponent.style.marginLeft = "10%";
      messageComponent.style.backgroundColor = "red";

      var container = document.createElement("div");
      container.style.display = "block";
      container.style.textAlign = "start";

      container.appendChild(messageComponent);
      messageSpace.appendChild(container);

  };


  sendButton.addEventListener("click", function() {
    if(inputBar.value != ""){
      
      var currentDate = new Date();
      var currentDateHours = currentDate.getHours().toString().padStart(2, '0');
      var currentDateMinutes = currentDate.getMinutes().toString().padStart(2, '0');
      var StringCurrentDate = currentDateHours + ":" + currentDateMinutes;

      let messaggio = {"username": nomeUtente.textContent, "message": inputBar.value, "timeStamp": StringCurrentDate }
      ws.send(JSON.stringify(messaggio));

      var messageComponent = document.createElement("div"); //div principale

      var textTop = document.createElement("div");  //div testo del messaggio
      textTop.textContent = inputBar.value;
      textTop.style.textAlign = "left";
      messageComponent.appendChild(textTop);

      var textBottom = document.createElement("div"); //div data di invio
      textBottom.textContent = StringCurrentDate;
      textBottom.style.textAlign = "right";
      textBottom.style.fontSize = "10px";
      messageComponent.appendChild(textBottom);

      messageComponent.style.borderRadius = "10px";
      messageComponent.style.display = "inline-block";
      messageComponent.style.padding = "5px 10px";
      messageComponent.style.margin = "5px";
      messageComponent.style.marginRight = "10%";
      messageComponent.style.backgroundColor = "lightblue";

      var container = document.createElement("div");
      container.style.display = "block";

      container.appendChild(messageComponent);
      messageSpace.appendChild(container);

      messageSpace.scrollTop = messageSpace.scrollHeight;

      inputBar.value = "";
    }
  });

});
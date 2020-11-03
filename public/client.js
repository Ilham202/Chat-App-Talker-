const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');  

do{
   name = prompt('Enter you name : ');
}while(!name)

textarea.addEventListener('keyup',(e)=>{
  if(e.key === 'Enter')
  {
      sendMessage(e.target.value);
  }
});
function sendMessage(message)
{
    let msg = {
    user:name,
    message: message.trim()
}
   appendMessage(msg,'outgoing');

   socket.emit('message',msg);
}
 
function appendMessage(msg,type)
{
   let main = document.createElement('div');
   let classtype = type;
   main.classList.add(classtype,'message');

   let markup = `
   <h3>${msg.user}</h3>
   <p>${msg.message}</p>`;

   main.innerHTML = markup;
   messageArea.appendChild(main);
}

socket.on('message',(msg)=>
{
   appendMessage(msg,'incoming');
});
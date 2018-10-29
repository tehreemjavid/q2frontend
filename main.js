var pin = null;
var clickedImg = '';

document.addEventListener('DOMContentLoaded',() => {
    getUserBoards(1)
    let cardContainer = document.querySelector('#card-container')
    axios.get('http://localhost:3000/pins').then(result=>{
        let data = result.data
        data.forEach(element=>{
            console.log(element)
            clickedImg = element.url;
            let div = document.createElement('div')
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${element.url}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text">${element.description}</p>
              <a href="#" onclick="getUserBoards(${element.id})"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Pin it!</a>
            </div>
            </div>`
            cardContainer.appendChild(div)
        })
    })
});

const getUserBoards = (pinId) => {
    pin = pinId;
    axios.get('http://localhost:3000/user/2/boards').then(result=>{
        const boardsList = document.querySelector('#boardlist');
        const viewBoards = document.querySelector('#view-boards');
        let boards = result.data;
        boards.forEach(board => {
            boardsList.innerHTML += renderBoardListItem(board);
            viewBoards.innerHTML += renderViewBoard(board);
        })
        console.log(boards)

    })
}

const renderBoardListItem = (board) => (`
    <option value="${board.id}">${board.name} - ${board.description}</option>
`)

const renderViewBoard = (board) => (`
    <li id="${board.id}">${board.name} - ${board.description}</li>
`)

const savePinToBoard = () => {
    let boardId = document.getElementById('boardlist').value;
    console.log('****', boardId);
    axios.post('http://localhost:3000/pins/addpin', {
        pinId: pin,
        boardId
    }).then( result => {
        console.log("I added a pin", result);
        console.log(clickedImg);
    })
    .catch(error => {
        console.log("I have failed", error);
    })
    console.log(pin);
    console.log(boardId);
}


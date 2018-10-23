document.addEventListener('DOMContentLoaded',() => {
    let cardContainer = document.querySelector('#card-container')
    axios.get('http://localhost:3000/pins').then(result=>{
       

        let data = result.data
       
        
        data.forEach(element=>{
            console.log(element.name)
            let div = document.createElement('div')
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${element.url}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text">${element.description}</p>
              <a href="#" class="btn btn-primary">Pin it!</a>
            </div>
            </div>`

            cardContainer.appendChild(div)

        
        })


    })




})
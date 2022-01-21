let cards= document.getElementById('cards')
let select= document.getElementById('select')
let open = document.querySelector('.select')
let result = document.querySelector('.cart__container')
let summa = 0
let food= []

const show=(data)=>{
    cards.innerHTML=''
    data.forEach(el => {
        cards.innerHTML+= `
        <div class="card" onclick="clicked(${el.id})">
            <div class="first">
                <img src="./img/lavash.png" alt="">
            </div>
            <div class="second">
                <h2>${el.title}</h2>
                <div class="panel">
                    <button class="big">Big</button>
                    <button class="mini">Mini</button>
                </div>
                <div class="cost">
                    <p>${el.cost}</p>
                </div>
            </div>
        </div>
        `
    });
}

const plus=()=>{
    let cost = document.getElementById('cost')
    let one = document.querySelector('.counted')
    count++
    one.innerHTML = count
    cost.innerHTML = count*summa

}

const minus = () => {
    let cost = document.getElementById('cost')
    let one = document.querySelector('.counted')
    if(count<2)  return false
    count--
    one.innerHTML = count
    cost.innerHTML = count*summa
}


let count=1
const clicked = (id)=>{
    
    sort = food.filter((el)=>el.id == id)
    console.log(food);
    sort.forEach(el=>{
        select.innerHTML =`
        <div class="select__card">
            <div class="add">
            <button onclick="add(${el.id})">Добавить</button>
            <button class="close" onclick="closed()"><img src="./img/close.svg" alt="">
            </button>
            </div> 
            <div class="image">
                <img src="./img/doner.png" alt="">
            </div>
            <div class="info">
                <h1>${el.title}</h1>
                <div class="info__panel">
                    <button class="big">Big</button>
                    <button class="mini">Mini</button>
                </div>
                <div class="info__click">
                    <div class="cost">
                        <p id="cost">${el.cost}</p>
                    </div>
                    <div class="counter">
                        <button class="minus" onclick="minus()"><img src="./img/minus.png" alt=""></button>
                        <p class="counted">${count}</p>
                        <button class="plus" onclick="plus()"><img src="./img/plus.png" alt=""></button>
                        
                    </div>
                </div>
            </div>
        </div>
        `
        summa = el.cost
        console.log(el.cost);
        

    })


    document.getElementById("select").classList.add("show");
}

const closed=()=>{
    document.getElementById("select").classList.remove("show");
    count = 1
}

let data = []
let common = []


const add=(id)=> {
    fetch('http://localhost:3005/food')
.then(response=>response.json())
.then(data=>{
    food = data
})

    temp=food.findIndex((el)=>el.id == id)
    data.push(food[temp])
    data[data.length-1].count = count
    data[data.length-1].cost = summa*count
    renders(data)

  count=1
  summa = 0
  document.getElementById("select").classList.remove("show");

}

const delet=(id)=>{
     let fsumma = document.querySelector('.fsumma')
    data.splice(id,1)
    console.log(data);
    if(data.length >0){
        renders(data)
    } else {
        result.innerHTML = `
        <h1>Корзина</h1>
        <div class="cart__container--img">
            <img src="./img/karzinka.svg">
            <h2>Корзинка пусто</h2>
        </div>
    `
      fsumma.innerHTML = 0
      console.log(data);
      
    }
    
}


fetch('http://localhost:3005/food')
.then(response=>response.json())
.then(data=>{
    food = data
    show(food)
})



const renders=(info)=>{
    result.innerHTML = '<h1>Корзина</h1>'
    info.forEach((el,index)=>{
        result.innerHTML += ` 
              <div class="cart__container--info">
                  <div class="items">
                      <div><img src="./img/lavash.png" alt=""></div>
                      <div class="items__text">
                          <h2>${el.title}</h2>
                          <div class="card"><p>${el.cost}</p></div>
                      </div>
                  </div>
                  <div class="buttons">
                      <div class="buttons__delete">
                          <button class="del" onclick="delet(${index})"><img src="./img/del.png" alt=""></button>
                      </div>
                      <div>
                      </div>
                  </div>
              </div>
        `
    })
   
  let fsumma = document.querySelector('.fsumma')
  let summa = 0
  for(i=0;i<info.length;i++){
      summa+=info[i].cost
  }
  fsumma.innerHTML = summa
  result.innerHTML +=`<button class="order__btn">
  <p>Оформить заказ</p>
  <p>${summa}</p>
    </button>`

}


const korzinka=()=>{
    document.querySelector(".cart").classList.add("shows");
}

window.addEventListener('click',(e)=>{
    console.log(e.target);
    
    if(e.target == (document.querySelector('.cart'))){
        if(e.target!==(document.querySelector('.cart__container'))){
        document.querySelector(".cart").classList.remove("shows");
        }
    }
})





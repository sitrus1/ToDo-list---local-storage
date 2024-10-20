let form = document.querySelector(".add-new__form")
let title = form.querySelector(".add-new__title")
let desc = form.querySelector(".add-new__desc")

let main = document.querySelector(".main")

let list = JSON.parse(localStorage.getItem('list')) || []

form.addEventListener("submit",(e) => {
    e.preventDefault()
    
    list.push({title: title.value, desc: desc.value, checked: false, id: Date.now()})
    render()

    title.value = ''
    desc.value = ''
})

let render = ()=>{
    main.innerHTML = ''
    
    for (let i of list) {
        let box = document.createElement("div")
        box.className = "box"
    
        box.innerHTML = `
                <h3 class="title">${i.title}</h3>
                <p class="desc">
                    ${i.desc}
                </p>
                <div class="btns">
                    <button onclick="idelete(${i.id})" class="delete">delete</button>
                    <button onclick="iedit(${i.id})" class="edit">edit</button>
                    <button onclick="icheck(${i.id})" class="check">check</button>
                </div>
        `

        if (i.checked){
            let title = box.querySelector(".title")
            let desc = box.querySelector(".desc")
            title.classList.add("checked")
            desc.classList.add("checked")
        }
    
        main.append(box)

        localStorage.setItem('list', JSON.stringify(list))
    }
}

let idelete = (id)=>{
    let newarr = list.filter(item =>{
        if (item.id == id){
            return false
        }
        return true
    })
    list = newarr
    localStorage.setItem('list', JSON.stringify(list))
    render()
}

let iedit = (id)=>{
    list.map(item => {
        if (item.id == id){
            item.title = prompt("Enter new Title",item.title)
            item.desc = prompt("Enter new Description", item.desc)
        }
    })
    render()
}

let icheck = (id)=>{
    list.map(item => {
        if (item.id == id) {
            item.checked = true
        }
    })
    render()
}

render()
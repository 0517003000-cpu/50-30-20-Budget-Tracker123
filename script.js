let currentMonth = ""

function getNumber(text){
return Number(text.replace(/[^0-9]/g,'')) || 0
}

document.addEventListener("input", ()=>{
calculate()
saveData()
})

function calculate(){

let essentialBudget =
getNumber(document.getElementById("essentialBudget").innerText)

let nonBudget =
getNumber(document.getElementById("nonBudget").innerText)

let saveBudget =
getNumber(document.getElementById("saveBudget").innerText)

let essentialTotal=0
document.querySelectorAll(".essential").forEach(c=>{
essentialTotal+=getNumber(c.innerText)
})

let nonTotal=0
document.querySelectorAll(".non").forEach(c=>{
nonTotal+=getNumber(c.innerText)
})

let saveTotal=0
document.querySelectorAll(".save").forEach(c=>{
saveTotal+=getNumber(c.innerText)
})

document.getElementById("essentialTotal").innerText=
essentialTotal.toLocaleString("id-ID")

document.getElementById("nonTotal").innerText=
nonTotal.toLocaleString("id-ID")

document.getElementById("saveTotal").innerText=
saveTotal.toLocaleString("id-ID")

updateStatus("essential",essentialTotal,essentialBudget)
updateStatus("non",nonTotal,nonBudget)
updateStatus("save",saveTotal,saveBudget)

}

function updateStatus(type,total,budget){

let status=document.getElementById(type+"Status")

if(total>budget){
status.innerText="Over Budget"
status.style.color="red"
}else{
status.innerText="Under Budget"
status.style.color="green"
}

}


function newMonth(){

let name = prompt("Enter month (example: March 2026)")
if(!name) return

currentMonth = name

localStorage.setItem("month_"+name,"")

loadMonthList()
clearData()

}


function openMonth(month){

currentMonth = month

let data = JSON.parse(localStorage.getItem("month_"+month))

if(!data) return

document.querySelectorAll('[contenteditable="true"]').forEach((cell,i)=>{
cell.innerText = data[i] || ""
})

calculate()

}



function saveData(){

if(!currentMonth) return

let data=[]

document.querySelectorAll('[contenteditable="true"]').forEach(cell=>{
data.push(cell.innerText)
})

localStorage.setItem("month_"+currentMonth,JSON.stringify(data))

}



function clearData(){
document.querySelectorAll('[contenteditable="true"]').forEach(cell=>{
cell.innerText=""
})
calculate()
}



function loadMonthList(){

let container = document.getElementById("months")

container.innerHTML=""

for(let key in localStorage){

if(key.startsWith("month_")){

let month = key.replace("month_","")

let btn = document.createElement("button")
btn.innerText = month

btn.onclick = ()=> openMonth(month)

container.appendChild(btn)

}

}

}

window.onload = loadMonthList

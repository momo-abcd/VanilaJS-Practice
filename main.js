const timer = document.querySelector(".timer");
const puzzleImg = document.querySelector(".puzzle-img");
const button = document.querySelector(".btn-area button");
const gameText = document.querySelector(".wrap-all p");

const tileCount = 16;
let timerSec = 1;
let array = [];
let timeID = null;
const dragged = {
    el:null,
    class:null,
    index:null
};

button.addEventListener("click",gameStart);


// shuffle(arrayBack()).forEach((li) => {
//     puzzleImg.appendChild(li);
// })
arrayBack().forEach((li) => {
    puzzleImg.appendChild(li);
})

function arrayBack(){
    Array(tileCount).fill().forEach((_,i)=>{
        const li = document.createElement('li');
        li.setAttribute("data-index",i);
        li.setAttribute("draggable",true);
        li.classList.add(`list${i}`);
        imgMake(li);
        array.push(li);
    });
    return array;
}
puzzleImg.addEventListener("dragstart",dragstartEventHandler);
puzzleImg.addEventListener("dragover",dragoverEventHandler);
puzzleImg.addEventListener("drop",dragdropEventHandler);

function dragstartEventHandler(event){
    const obj = event.target;
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj);
}
function dragoverEventHandler(event){
    event.preventDefault();
}
function dragdropEventHandler(event){
    const obj = event.target;

    let originPlace;
    let isLast = false;

    if(dragged.class !== obj.className){
        if(dragged.el.nextSibling){ originPlace = dragged.el.nextSibling; }
        else{ originPlace = dragged.el.previousSibling; isLast = true; }

        const droppedIndex = [...obj.parentNode.children].indexOf(obj);
        dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el);
        isLast ? originPlace.after(obj) : originPlace.before(obj);
    }
    checkStatus([...obj.parentNode.children]);
}

function checkStatus(array) {
    let index = 0;
    array.forEach((i) => {
        let a = i.getAttribute('data-index');
        if(a == index) index++;
    })
    if ((index-1) === 15) { gameSuccess();}
}
function gameSuccess() {
    clearInterval(timeID);
    button.innerHTML="Start";
    gameText.style.display = "block"
    console.log( 'GOOD !');
}

function shuffle(array){
    let index = array.length-1; 
    while(index > 0){
        let randomIndex = Math.floor(Math.random()*10+6);
        [array[index], array[randomIndex]] = [array[randomIndex],array[index]];
        index--;
    }

    return array;
}
function gameStart() {
    if(button.innerHTML === 'Start'){
    timeID = setInterval(timerStart,1000);
    gameText.style.display="none"
    timer.innerHTML=0;
    button.innerHTML="Pause";
    }else {
        clearInterval(timeID);
        button.innerHTML="Start";
    }
}
function timerStart() {
    timer.innerHTML=timerSec++;
}

function imgMake(li){
    let x,y;
    const dataIndex = li.getAttribute("data-index");

    if(dataIndex < 4) y=0;
    else if(dataIndex < 8) y=1;
    else if(dataIndex <12) y=2;
    else y=3;

    if(dataIndex % 4 == 0) x=0;
    else if (dataIndex % 4 == 1) x=1;
    else if (dataIndex % 4 ==2 ) x=2;
    else x=3;

    li.style.backgroundPositionX=`-${100*x}px`;
    li.style.backgroundPositionY=`-${100*y}px`;
}
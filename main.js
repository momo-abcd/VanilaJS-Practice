const timer = document.querySelector(".timer");
const puzzleImg = document.querySelector(".puzzle-img");
const btnArea = document.querySelector("btn-area");

const tiles = 16;
// console.log(Array(tiles).fill(foreach(tiles,i)));
// console.log(Array.from({length:tiles},i => i));
// const a = (Array.from({length:tiles},(undefined,i) => i++));
// console.log(a);
console.log(Array(tiles).fill().forEach((_,i)=>console.log(i)));
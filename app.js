let keyboard= document.querySelector('.keyboard');
let gameContainer= document.querySelector('.gameContainer');
let keys = document.getElementsByClassName("keys");
let gameTitle= document.querySelector('.change');
let currentRow=0;
let currentTile=0;

let wordArr=['WATER','CHANT','PHONE','PRONE','DECRY','PANIC','VENOM','SMILE','POUND','GRASS','MANGO','CHUNK','SPASM','CLOTH','BOXES','INDEX','ABOUT','ABUSE','ACTOR','ACUTE','ADMIT','ADOPT','DRIVE','EMPTY','EARTH','IDEAL','MINOR','SCOPE','SERVE','THANK','TODAY','TOUCH','UPPER','USAGE','VALUE','VISIT','YOUTH','WRONG','WOUND','WORLD','BROAD','BROKE','CABLE','CROWN','EIGHT','ELITE','FINAL','FLASH','GROWN','LOCAL','LOGIC','MONEY','NORTH','OFFER','PROOF','SPEND','STATE','THINK','THREE','YIELD'];

let word= wordArr[Math.floor((Math.random() * 59))];
console.log(word+"\n");

let formedWord='';

const gameRows=[
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','','']
];

gameRows.forEach((rowEle,rowIndex)=>{
let gameRow= document.createElement('div');
gameRow.setAttribute('id','row-'+rowIndex);
gameRow.setAttribute('class',"gameRow");
rowEle.forEach((rowElement,rowEleIndex)=>{
    let rowTile= document.createElement('div');
    rowTile.setAttribute('id','row-'+rowIndex+'-'+'tile-'+rowEleIndex);
    rowTile.setAttribute('class',"rowTiles");
    gameRow.append(rowTile);
});
gameContainer.append(gameRow);
})

const handleClick = letter =>{
if(letter=="DEL"){
    document.getElementById(`row-${currentRow}-tile-${currentTile-1}`).innerText="";
}

if(letter=="ENTER" && currentTile!=5)
return;

if(letter=="ENTER" && currentTile==5){
    for(let i=0;i<5;i++){
        formedWord+=document.getElementById(`row-${currentRow}-tile-${i}`).innerText;
    }
    Array.from(formedWord).forEach((wordLetter,index)=>{
        if(word[index]==wordLetter){
            document.getElementById(`row-${currentRow}-tile-${index}`).style.backgroundColor="green";
            document.getElementById(`${formedWord[index]}`).style.backgroundColor="green";
        }
        if(word.includes(wordLetter) && word[index]!=wordLetter){
            if(letterCounter(word,wordLetter)<letterCounter(formedWord,wordLetter))
            repeatedColor(formedWord,wordLetter);
            else{
            document.getElementById(`row-${currentRow}-tile-${index}`).style.backgroundColor="orange";
            document.getElementById(`${formedWord[index]}`).style.backgroundColor="orange";
            }
        }
        if(!word.includes(wordLetter)){
            document.getElementById(`row-${currentRow}-tile-${index}`).style.backgroundColor="grey";
            document.getElementById(`${formedWord[index]}`).style.backgroundColor="black";
        }
    })
    if(currentRow==5){
        gameTitle.innerText+=`--${word}`;
    }
    currentRow+=1;
    currentTile=0;
    document.getElementById(`row-${currentRow}-tile-0`).innerText="";
}
else if(letter=="DEL"){
    gameRows[currentRow][currentTile]="";
    document.getElementById(`row-${currentRow}-tile-${currentTile-1}`).innerText="";
    currentTile--;
}
else{
gameRows[currentRow][currentTile]=letter;
document.getElementById(`row-${currentRow}-tile-${currentTile}`).innerText=letter;
currentTile++;
formedWord="";
}

}

const letterCounter = (word,letter)=>{
let c=0;
for(let i=0;i<5;i++){
    if(word[i]==letter)
    c++;
}
return c;
}

const repeatedColor = (formedWord,letter) =>{
let c=letterCounter(formedWord,letter)-letterCounter(word,letter);
let a =letterCounter(word,letter);
let b=0;
for(let i=0;i<5;i++){
    if(formedWord[i]==letter && word[i]==letter){
        b++;
        document.getElementById(`row-${currentRow}-tile-${i}`).style.backgroundColor="green";
        document.getElementById(`${letter}`).style.backgroundColor="green";
    }

    else if(formedWord[i]==letter && b!=a && c!=0){ 
        document.getElementById(`row-${currentRow}-tile-${i}`).style.backgroundColor="grey";
        c--;
        b++;
    }

    else if(formedWord[i]==letter && c!=0 && b!=a){
        document.getElementById(`row-${currentRow}-tile-${i}`).style.backgroundColor="orange";
        document.getElementById(`${letter}`).style.backgroundColor="orange";
        c--;
        b++;
    }
}
}

Array.from(keys).forEach(element=>{
element.addEventListener('click',()=>handleClick(element.innerHTML));
});
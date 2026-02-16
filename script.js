
let selected=null;
let positions={cat:0,dog:0,unicorn:0};

const questions=[
{q:"Quanto é 2 + 2?",a:["3","4"],c:1},
{q:"Quanto é 3 + 1?",a:["4","5"],c:0},
{q:"Qual é a cor do céu?",a:["Azul","Verde"],c:0},
{q:"Quanto é 5 - 3?",a:["2","3"],c:0},
{q:"Quantas patas tem um cachorro?",a:["4","2"],c:0}
];

function irParaJogo(){
document.getElementById("conviteScreen").classList.add("hidden");
document.getElementById("gameScreen").classList.remove("hidden");
}

function choose(p){
selected=p;
document.getElementById("select").style.display="none";
document.getElementById("quiz").style.display="block";
ask();
}

function ask(){
let q=questions[Math.floor(Math.random()*questions.length)];
document.getElementById("question").innerText=q.q;
let div=document.getElementById("answers");
div.innerHTML="";
q.a.forEach((ans,i)=>{
let b=document.createElement("button");
b.innerText=ans;
b.onclick=()=>check(i===q.c);
div.appendChild(b);
});
}

function check(correct){
if(correct){
document.getElementById("correctSound").play();
positions[selected]+=60;
moveOthers(20);
document.getElementById("message").innerText="Muito bem! 🚀";
}else{
document.getElementById("wrongSound").play();
moveOthers(35);
document.getElementById("message").innerText="Oh não! 😮";
}
update();
checkWin();
}

function moveOthers(s){
for(let k in positions){
if(k!==selected) positions[k]+=s;
}
}

function update(){
for(let k in positions){
document.getElementById(k).style.left=positions[k]+"px";
}
}

function checkWin(){
for(let k in positions){
if(positions[k]>=800){
endGame(k);
return;
}
}
ask();
}

function endGame(winner){
let finish=document.getElementById("finishLine");
finish.style.left=positions[winner]+"px";
finish.classList.remove("hidden");

if(winner===selected){
document.getElementById("winSound").play();
document.getElementById("message").innerText="🎉 Você ganhou!";
showConfirmButton();
}else{
document.getElementById("message").innerText="Outro jogador ganhou!";
}
}

function showConfirmButton(){
let container=document.getElementById("confirmContainer");
container.innerHTML="";
let btn=document.createElement("button");
btn.innerText="Confirmar presença no casamento 💍";
btn.onclick=function(){
let msg=encodeURIComponent("Tia, confirmo minha presença no casamento.");
window.open("https://wa.me/34610990777?text="+msg,"_blank");
};
container.appendChild(btn);
}

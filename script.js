const motEl = document.getElementById('mot');
const mauvaisesLettres = document.getElementById('mauvaises-lettres');
const rejouerBtn = document.getElementById('play-bouton');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-contenaire');
const messageFinal = document.getElementById('message-final');

const figurePartie = document.querySelectorAll(".corps");


const mots = ["visages", "tornade", "rubrique", "voitures",
    "enveloppe", "internet", "attitude", "flottant", "baignoire", "paiement", "anticonstitutionnellement"
];

// selectionner un mot pour jouer // 

let motSelection = mots[Math.floor(Math.random() * mots.length)];

console.log(motSelection);

const bonneLettreArr = [];
const mauvaisesLettreArr = [];

// Afficher le mot caché //

function afficherMot() {

    motEl.innerHTML = `

${motSelection

    .split('')

    // permet de séparer les lettres de chaque mot et de garder afficher les bonnes lettres frappé//

    .map(
        lettre => `
        <span class="lettre">

           ${bonneLettreArr.includes(lettre) ? lettre : ''} 

        </span>

        `
    )
    .join('')

}
`;


   // Permet d'enlever les espaces //

   const motIntern = motEl.innerText.replace(/\n/g, '');

    // Permet de savoir si le mot et conplet et d'indiquer la victoire //

   if(motIntern === motSelection){

    messageFinal.innerText = "Bravo tu as Gagné !"
    popup.style.display = 'flex';

   }



}

// Mauvaises lettres // 

function updateMauvaisesLettresEl(){

// 1 : affiche les mauvaises lettre 

mauvaisesLettres.innerHTML=`

${mauvaisesLettreArr.map (lettre => `<span> ${lettre}</span> `) }

`

// 2 : affiche le pendu 

figurePartie.forEach((partie, index) => {
    const error = mauvaisesLettreArr.length;

if(index < error){
    partie.style.display='block';
}else {
    partie.style.display ="none"
}

})


// 3 : déclare la défaite 

if( mauvaisesLettreArr.length === figurePartie.length){

    messageFinal.innerText = "Tu as Perdu !!! :("
    popup.style.display ="flex"
}



}



//Afficher la notification //


function afficherNotification(){

notification.classList.add('afficher')
setTimeout(() => {
    notification.classList.remove('afficher')
},1000);

}



//EVENT LISTENER "e = evenement " //

window.addEventListener('keydown', e => {

//console.log(e.keyCode)

// Permet de jouer les lettres en A et Z //

if(e.keyCode >= 65 && e.keyCode <= 90){

const lettre = e.key;
// console.log(lettre);


// Permet d'afficher la lettre jouer ou d'indiquer que la lettre a déjà etait joué //

if(motSelection.includes(lettre)){

    if(!bonneLettreArr.includes(lettre)){

    bonneLettreArr.push(lettre)
    afficherMot()

    }else{

afficherNotification();

    }
}else{


 // Permet d'afficher la mauvaise lettre jouer ou d'indiquer que la lettre a déjà etait joué //

if(!mauvaisesLettreArr.includes(lettre)){
    
    mauvaisesLettreArr.push(lettre);

    updateMauvaisesLettresEl();

}else{

    afficherNotification();

}

}

}

});

// Rejouer et redémarrer // 



rejouerBtn.addEventListener("click", () => {

// remettre a Zero le tableau //

bonneLettreArr.splice(0);
mauvaisesLettreArr.splice(0);

motSelection = mots[Math.floor(Math.random() * mots.length)];

afficherMot();

updateMauvaisesLettresEl();

popup.style.display ="none";

})


afficherMot();
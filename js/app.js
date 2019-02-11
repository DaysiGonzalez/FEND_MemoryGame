/*
 * Create a list that holds all of your cards
 */
let openCards = [];
let moves = 0;
let starts = 3;

initializeCards();

document.getElementsByClassName('deck')[0].addEventListener('click', cardClick);

function showWinDialog(){
  $('#exampleModalCenter').modal('show');
}

function cardClick(e){

  if (!IsMatched(e) && !IsOpen(e) && openCards.length < 2){
    openCard(e.target);
  }
}

function openCard (e){

  e.classList.add('open');
  e.classList.add('show');

  openCards.push(e);

  if (openCards.length === 2){
      compareOpenCards();
  }

}

function compareOpenCards(){
  if (compareClasses(openCards[0],openCards[1])) {
    matchOpenCards();
  }else {
    closeOpenCards();
  }

}

function animateWrong(){
  for (card of openCards){
    card.classList.toggle('wobble-hor-bottom');
  }

}

function matchOpenCards(){
  for (card of openCards){
    card.classList.toggle('jello-vertical');
    card.classList.toggle('match');
    card.classList.toggle('open');
  }
  openCards = [];

  if (document.getElementsByClassName('match').length === 16) {
    showWinDialog()
  }

}


function closeOpenCards(){

   animateWrong();

   setTimeout(function(){

     for (card of openCards){
       card.classList.remove('open');
       card.classList.remove('show');
       card.classList.remove('wobble-hor-bottom');
     }
     openCards = [];
   },900);
}

function compareClasses(a,b){
  for (const item of a.classList){
    if (!b.classList.contains(item)){
      return false;
    }
  }
  return true;
}

function IsMatched (e) {
  return e.target.classList.contains('match')
}

function IsOpen (e) {
  return e.target.classList.contains('open')
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initializeCards(){
	const fragment = document.createDocumentFragment();

	let cardClasses = ['fa-anchor', 'fa-anchor', 'fa-diamond', 'fa-diamond', 'fa-paper-plane-o','fa-paper-plane-o', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
	cardClasses = shuffle(cardClasses);


	for (const classCard of cardClasses){
		let card = document.createElement('div');
		card.classList.add('card', 'fa', classCard);

		fragment.appendChild(card);
  }

  document.getElementsByClassName('deck')[0].appendChild(fragment);

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

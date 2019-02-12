/*
 * Create a list that holds all of your cards
 */
let openCards = [];
let moves = 0;
let stars = 3;
let t = null;

initializeGame();

document.getElementsByClassName('deck')[0].addEventListener('click', cardClick);

document.getElementsByClassName('playAgain')[0].addEventListener('click', initializeGame);

document.getElementsByClassName('restart')[0].addEventListener('click', initializeGame);

function showWinDialog(){
  $('#exampleModalCenter').modal('show');
}

function cardClick(e){

  if (e.target.classList.contains('card') && !IsMatched(e) && !IsOpen(e) && openCards.length < 2){
    moves++;
    refreshMoves();
    openCard(e.target);
  }
}

function refreshMoves(){
  let containers = document.getElementsByClassName('moves');
  for (container of containers){
    container.innerText = moves;
  }

  if (moves === 21 || moves === 41 || moves === 61){
    let star = document.getElementsByClassName('fa-star')[0];
    star.classList.remove('fa-star');
    star.classList.add('fa-star-o');
    stars--;
  }

  containers = document.getElementsByClassName('starsCount');
  for (container of containers){
    container.innerText = stars;
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
    clearTimeout(t);
    t = 500;
    showWinDialog();
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

function restartStars(){
  stars = 3;
  let whiteStars = document.getElementsByClassName('fa-star-o');
  while (document.getElementsByClassName('fa-star-o').length > 0){
    let whiteStar = document.getElementsByClassName('fa-star-o')[0];
    whiteStar.classList.remove('fa-star-o');
    whiteStar.classList.add('fa-star');
  }
}

function initializeTimer(){
  clearInterval(t);
  t = setInterval((function(){
    var start = Date.now();
    return function(){
      containers = document.getElementsByClassName('time');
      for (container of containers){
        container.innerText = Math.floor((Date.now()-start)/1000);
      }
    };
  }()), 1000);
}

function initializeGame(){
  moves = 0;
  restartStars();
  refreshMoves();
  initializeTimer();

  $('.card').remove();

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

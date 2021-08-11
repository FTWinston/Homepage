import './style.scss';

const body = document.querySelector('body');
const header = document.querySelector('.header');
const letters = document.getElementsByClassName('header__letter');
const letterF = letters[0];
const letterT1 = letters[1];
const letterW = letters[2];
const letterI = letters[3];
const letterN1 = letters[4];
const letterS = letters[5];
const letterT2 = letters[6];
const letterO = letters[7];
const letterN2 = letters[8];

for (const letter of letters) {
    letter.addEventListener('click', e => e.target.classList.toggle('header__letter--active'));
}

letterI.addEventListener('click', () => body.classList.toggle('inverted'));

/*

Different letters to each toggle different behaviours.

* switch font (animate in/out)
* toggle light/dark colors mode
* "follow the cursor" somehow ... flip when hovered?
* O becomes a face




*/
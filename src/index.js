import './style.scss';

const body = document.querySelector('body');
const header = document.querySelector('.header');
const text = document.querySelector('.header__text');
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

text.addEventListener('animationend', () => text.classList.remove('header__text--animateIn'));

for (const letter of letters) {
    letter.addEventListener('click', e => e.target.classList.toggle('header__letter--active'));
}

letterF.addEventListener('click', () => header.classList.toggle('header--font'));
letterT1.addEventListener('click', () => header.classList.toggle('header--background'));
letterW.addEventListener('click', () => text.classList.toggle('header__text--animateLetters'));
letterI.addEventListener('click', () => body.classList.toggle('inverted'));
letterT2.addEventListener('click', () => text.classList.toggle('header__text--animate'));

// TODO: O face could be animated, rather than just text.

// TODO: per-character animation/cursor following of some sort.
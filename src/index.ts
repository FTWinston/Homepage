import './style.scss';

const body = document.querySelector('body');
const header = document.querySelector('.header');
const wrapper = document.querySelector('.header__wrapper');
const text = document.querySelector('.header__text');

const [
    letterF,
    letterT1,
    letterW,
    letterI,
    letterN1,
    letterS,
    letterT2,
    letterO,
    letterN2,
] = document.getElementsByClassName('header__letter');

function toggleActive(e: Event) {
    return (e.target as Element).classList.toggle('header__letter--active');
}

text.addEventListener('animationend', () => text.classList.remove('header__text--animateIn'));

letterF.addEventListener('click', e => {
    const active = toggleActive(e);
    header.classList.toggle('header--font', active);
});

letterT1.addEventListener('click', e => {
    const active = toggleActive(e);
    header.classList.toggle('header--background', active);
});

letterW.addEventListener('click', e => {
    const active = toggleActive(e);
    text.classList.toggle('header__text--animateLetters', active)
});

letterI.addEventListener('click', e => {
    const active = toggleActive(e);
    body.classList.toggle('inverted', active);
});

letterN1.addEventListener('click', e => {
    const active = toggleActive(e);
    wrapper.classList.toggle('header__wrapper--animate', active);
});

letterS.addEventListener('click', e => {
    const active = toggleActive(e);
    header.classList.toggle('header--colors', active);
});

letterT2.addEventListener('click', e => {
    const active = toggleActive(e);
    text.classList.toggle('header__text--animate', active);
});

letterO.addEventListener('click', e => {
    const active = toggleActive(e);
    
    if (active) {
        const wrapper = document.createElement('div'); 
        wrapper.className = 'eye';
        letterO.appendChild(wrapper);
        const pupil = document.createElement('div');
        pupil.className = 'pupil';
        wrapper.appendChild(pupil);
    } else {
        letterO.lastChild.remove();
    }
});

letterN2.addEventListener('click', e => {
    const active = toggleActive(e);
    // TODO: something
})

// TODO: combo effect, TWIST
// TODO: combo effect, TWIT
// TODO: combo effect, TWINS / TWO / TWIN
// TODO: combo effect, FIST
// TODO: combo effect, FTW / WIN / WINS
// TODO: combo effect, WINSTON sound

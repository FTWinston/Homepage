import { lifeCellsHigh, lifeCellsWide } from './constants';
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

let lifeWorker: Worker | undefined;
let lifeObserver: ResizeObserver | undefined;

letterN2.addEventListener('click', e => {
    const active = toggleActive(e);

    if (active) {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', header.clientWidth.toString());
        canvas.setAttribute('height', header.clientHeight.toString());
        canvas.className = 'header__overlay';
        header.appendChild(canvas);
        const context = canvas.getContext('2d');

        lifeObserver = new ResizeObserver(() => {
            canvas.width = Math.round(canvas.parentElement.clientWidth);
            canvas.height = Math.round(canvas.parentElement.clientHeight);
        });
        lifeObserver.observe(header);

        lifeWorker = new Worker(new URL('./lifeWorker.ts', import.meta.url));
        lifeWorker.onmessage = e => {
            const { w, h, d } = e.data
            drawLife(context, w, h, d);
        };

        // On click, send the clicked cell so it can be set as "alive" in the simulation.
        canvas.addEventListener('click', e => {
            const cellWidth = canvas.width / lifeCellsWide;
            const cellHeight = canvas.height / lifeCellsHigh;
            const cellSize = Math.max(cellWidth, cellHeight);

            lifeWorker.postMessage({
                x: Math.round(e.clientX / cellSize - 0.5),
                y: Math.round(e.clientY / cellSize - 0.5),
            });

            const behind = document.elementsFromPoint(e.clientX, e.clientY)[1];

            if (behind) {
                behind.dispatchEvent(new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true,
                    'screenX': e.screenX,
                    'screenY': e.screenY
                }));
            }
        });
    }
    else {
        lifeObserver.disconnect();
        header.lastChild.remove();
        lifeWorker.terminate();
    }
});

let testX = 0;

function drawLife(
    ctx: CanvasRenderingContext2D,
    dataCols: number,
    dataRows: number,
    dataVals: Uint8Array
) {
    const cellWidth = ctx.canvas.width / dataCols;
    const cellHeight = ctx.canvas.height / dataRows;
    const cellSize = Math.max(cellWidth, cellHeight);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = window.getComputedStyle(ctx.canvas, null).getPropertyValue('color');

    for (let x = 0; x < dataCols; x++) {
        for (let y = 0; y < dataRows; y++) {
            if (dataVals[x + y * dataCols] === 1) {
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

// TODO: combo effect, TWIST
// TODO: combo effect, TWIT
// TODO: combo effect, TWINS / TWO / TWIN
// TODO: combo effect, FIST
// TODO: combo effect, FTW / WIN / WINS
// TODO: combo effect, WINSTON sound

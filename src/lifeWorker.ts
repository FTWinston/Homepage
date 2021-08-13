import { lifeCellsHigh, lifeCellsWide } from './constants';

function randomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const width = lifeCellsWide;
const height = lifeCellsHigh;

const worker = self as any;

let stateArray = new Uint8Array(width * height);

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        const value = randomInt(4) === 0 ? 1 : 0;
        stateArray[x + y * width] = value;
    }
}

function isAlive(stateArray: Uint8Array, x: number, y: number) {
    if (x < 0 || y < 0 || x >= width || y >= height) {
        return 0;
    }

    return stateArray[x + y * width];
}

function getNumSurrounding(stateArray: Uint8Array, x: number, y: number) {
    return isAlive(stateArray, x, y - 1) + isAlive(stateArray, x, y + 1)
        + isAlive(stateArray, x - 1, y) + isAlive(stateArray, x - 1, y - 1) + isAlive(stateArray, x - 1, y + 1)
        + isAlive(stateArray, x + 1, y) + isAlive(stateArray, x + 1, y - 1) + isAlive(stateArray, x + 1, y + 1);
}

function getNextState(stateArray: Uint8Array, x: number, y: number) {
    const numSurrounding = getNumSurrounding(stateArray, x, y);
    
    if (isAlive(stateArray, x, y)) {
        return numSurrounding === 2 || numSurrounding === 3 ? 1 : 0;
    }
    else {
        return numSurrounding === 3 ? 1 : 0;
    }
}

setInterval(() => {
    const outputArray = new Uint8Array(width * height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            outputArray[x + y * width] = getNextState(stateArray, x, y);
        }
    }

    stateArray = outputArray.slice();

    worker.postMessage({
        w: width,
        h: height,
        d: outputArray
    }, [outputArray.buffer]);
}, 200);

onmessage = e => {
    const { x, y } = e.data;

    stateArray[x + width * y] = 1;
    stateArray[x + width * y - 1] = 1;
    stateArray[x + width * y + 1] = 1;
}
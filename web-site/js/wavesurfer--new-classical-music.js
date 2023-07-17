import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
import EnvelopePlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/envelope.esm.js'
import * as colors from './colors.js';
import * as consts from './constants.js';

const canvas2D__TheDedication = document.createElement(`canvas`).getContext(`2d`),
    gradient__TheDedication = canvas2D__TheDedication.createLinearGradient(0, 0, 0, 100),
    loaders = document.querySelectorAll(`.loader`);

for (let i = 0; i < loaders.length; i++) {
    loaders[i].textContent = "Loading audio. Please wait…"
}

const compositionTitles = [`the-dedication`];

gradient__TheDedication.addColorStop(0, colors.BLACK);
gradient__TheDedication.addColorStop(.65, colors.WHITE);

const PATH_TO_THE_DEDICATION = `media/audio/the-dedication.mp3`;

const theDedicationWaveSurferPlayer = WaveSurfer.create({
    container: `#the-dedication-waveform`,
    waveColor: gradient__TheDedication,
    barWidth: consts.UNIVERSAL_BAR_WIDTH,
    barGap: consts.UNIVERSAL_BAR_GAP,
    autoplay: consts.UNIVERSAL_AUTO_PLAY,
    cursorWidth: consts.UNIVERSAL_CURSOR_WIDTH,
    height: consts.UNIVERSAL_WAVEFORM_HEIGHT,
    barRadius: consts.UNIVERSAL_BAR_RADIUS,
    progressColor: colors.GRAYISH,
    url: PATH_TO_THE_DEDICATION
});

const theDedicationEnvelope = theDedicationWaveSurferPlayer.registerPlugin(
    EnvelopePlugin.create({
        fadeInEnd: consts.UNIVERSAL_ENVELOPE_FADE_IN_END,
        fadeOutStart: 204,
        volume: consts.UNIVERSAL_ENVELOPE_INITIAL_VOLUME,
        lineColor: consts.UNIVERSAL_ENVELOPE_LINE_COLOR,
        lineWidth: consts.UNIVERSAL_ENVELOPE_LINE_WIDTH,
        dragPointSize: consts.UNIVERSAL_ENVELOPE_DRAG_POINT_SIZE,
        dragPointStroke: colors.BLACK
    })
);

const waveformPlayer = document.getElementsByClassName(`composition__waveform`);
const playButton = new Array(waveformPlayer.length);

for(let i = 0; i < waveformPlayer.length; i++) {
    playButton[i] = document.createElement(`button`);
    playButton[i].textContent = `Play`;
    playButton[i].setAttribute(`class`, `composition__waveform--play-pause-button`);
    playButton[i].setAttribute(`id`, `${compositionTitles[i]}__waveform--play-pause-button`);
    waveformPlayer[i].appendChild(playButton[i]);
}

theDedicationWaveSurferPlayer.on(`play`, () => {
    playButton[0].textContent = `Pause`;
});

theDedicationWaveSurferPlayer.on(`pause`, () => {
    playButton[0].textContent = `Play`;
});

theDedicationWaveSurferPlayer.on(`ready`, () => {
    loaders[0].removeAttribute(`class`);
    loaders[0].setAttribute(`class`, `disappear`);

    playButton[0].addEventListener(`click`, () => {
        if (theDedicationWaveSurferPlayer.isPlaying()) {
            theDedicationWaveSurferPlayer.pause();
        } else {
            theDedicationWaveSurferPlayer.play();
        }
    });
});

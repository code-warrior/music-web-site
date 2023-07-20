import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7.0.3/dist/wavesurfer.esm.js'
import EnvelopePlugin from 'https://unpkg.com/wavesurfer.js@7.0.3/dist/plugins/envelope.esm.js'
import * as colors from './colors.js';
import * as consts from './constants.js';

const canvas2D__TheDedication = document.createElement(`canvas`).getContext(`2d`),
    gradient__TheDedication = canvas2D__TheDedication.createLinearGradient(0, 0, 0, 100),
    canvas2D__Tinistrind = document.createElement(`canvas`).getContext(`2d`),
    gradient__Tinistrind = canvas2D__Tinistrind.createLinearGradient(0, 0, 0, 100),
    canvas2D__WindQuintetMiniature = document.createElement(`canvas`).getContext(`2d`),
    gradient__WindQuintetMiniature = canvas2D__WindQuintetMiniature.createLinearGradient(0, 0, 0, 100),
    loaders = document.querySelectorAll(`.loader`);

for (let i = 0; i < loaders.length; i++) {
    loaders[i].textContent = "Loading audio. Please wait…"
}

gradient__TheDedication.addColorStop(0, colors.BLACK);
gradient__TheDedication.addColorStop(.65, colors.WHITE);

gradient__Tinistrind.addColorStop(0, colors.BLACK);
gradient__Tinistrind.addColorStop(.65, colors.WHITE);

gradient__WindQuintetMiniature.addColorStop(0, colors.BLACK);
gradient__WindQuintetMiniature.addColorStop(.65, colors.WHITE);

const PATH_TO_THE_DEDICATION = `media/audio/the-dedication.mp3`;
const PATH_TO_TINISTRIND = `media/audio/tinistrind.mp3`;
const PATH_TO_WIND_QUINTET_MINIATURE = `media/audio/wind-quintet-miniature.mp3`;

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
        fadeOutStart: 209,
        volume: consts.UNIVERSAL_ENVELOPE_INITIAL_VOLUME,
        lineColor: consts.UNIVERSAL_ENVELOPE_LINE_COLOR,
        lineWidth: consts.UNIVERSAL_ENVELOPE_LINE_WIDTH,
        dragPointSize: consts.UNIVERSAL_ENVELOPE_DRAG_POINT_SIZE,
        dragPointStroke: colors.BLACK
    })
);

const tinistrindWaveSurferPlayer = WaveSurfer.create({
    container: `#tinistrind-waveform`,
    waveColor: gradient__Tinistrind,
    barWidth: consts.UNIVERSAL_BAR_WIDTH,
    barGap: consts.UNIVERSAL_BAR_GAP,
    autoplay: consts.UNIVERSAL_AUTO_PLAY,
    cursorWidth: consts.UNIVERSAL_CURSOR_WIDTH,
    height: consts.UNIVERSAL_WAVEFORM_HEIGHT,
    barRadius: consts.UNIVERSAL_BAR_RADIUS,
    progressColor: colors.OTHER_BLUEISH,
    url: PATH_TO_TINISTRIND
});

const tinistrindEnvelope = tinistrindWaveSurferPlayer.registerPlugin(
    EnvelopePlugin.create({
        fadeInEnd: consts.UNIVERSAL_ENVELOPE_FADE_IN_END,
        fadeOutStart: 200,
        volume: consts.UNIVERSAL_ENVELOPE_INITIAL_VOLUME,
        lineColor: consts.UNIVERSAL_ENVELOPE_LINE_COLOR,
        lineWidth: consts.UNIVERSAL_ENVELOPE_LINE_WIDTH,
        dragPointSize: consts.UNIVERSAL_ENVELOPE_DRAG_POINT_SIZE,
        dragPointStroke: colors.BLACK
    })
);

const windQuintetMiniatureWaveSurferPlayer = WaveSurfer.create({
    container: `#wind-quintet-miniature-waveform`,
    waveColor: gradient__TheDedication,
    barWidth: consts.UNIVERSAL_BAR_WIDTH,
    barGap: consts.UNIVERSAL_BAR_GAP,
    autoplay: consts.UNIVERSAL_AUTO_PLAY,
    cursorWidth: consts.UNIVERSAL_CURSOR_WIDTH,
    height: consts.UNIVERSAL_WAVEFORM_HEIGHT,
    barRadius: consts.UNIVERSAL_BAR_RADIUS,
    progressColor: colors.GRAYISH,
    url: PATH_TO_WIND_QUINTET_MINIATURE
});

const windQuintetMiniatureEnvelope = windQuintetMiniatureWaveSurferPlayer.registerPlugin(
    EnvelopePlugin.create({
        fadeInEnd: consts.UNIVERSAL_ENVELOPE_FADE_IN_END,
        fadeOutStart: 68,
        volume: consts.UNIVERSAL_ENVELOPE_INITIAL_VOLUME,
        lineColor: consts.UNIVERSAL_ENVELOPE_LINE_COLOR,
        lineWidth: consts.UNIVERSAL_ENVELOPE_LINE_WIDTH,
        dragPointSize: consts.UNIVERSAL_ENVELOPE_DRAG_POINT_SIZE,
        dragPointStroke: colors.BLACK
    })
);


const compositionTitles = [`the-dedication`, `tinistrind`, `wind-quintet-miniature`];
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

tinistrindWaveSurferPlayer.on(`play`, () => {
    playButton[1].textContent = `Pause`;
});

tinistrindWaveSurferPlayer.on(`pause`, () => {
    playButton[1].textContent = `Play`;
});

tinistrindWaveSurferPlayer.on(`ready`, () => {
    loaders[1].removeAttribute(`class`);
    loaders[1].setAttribute(`class`, `disappear`);

    playButton[1].addEventListener(`click`, () => {
        if (tinistrindWaveSurferPlayer.isPlaying()) {
            tinistrindWaveSurferPlayer.pause();
        } else {
            tinistrindWaveSurferPlayer.play();
        }
    });
});

windQuintetMiniatureWaveSurferPlayer.on(`play`, () => {
    playButton[2].textContent = `Pause`;
});

windQuintetMiniatureWaveSurferPlayer.on(`pause`, () => {
    playButton[2].textContent = `Play`;
});

windQuintetMiniatureWaveSurferPlayer.on(`ready`, () => {
    loaders[2].removeAttribute(`class`);
    loaders[2].setAttribute(`class`, `disappear`);

    playButton[2].addEventListener(`click`, () => {
        if (windQuintetMiniatureWaveSurferPlayer.isPlaying()) {
            windQuintetMiniatureWaveSurferPlayer.pause();
        } else {
            windQuintetMiniatureWaveSurferPlayer.play();
        }
    });
});

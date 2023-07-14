import WaveSurfer from 'https://unpkg.com/wavesurfer.js@beta';
import EnvelopePlugin from 'https://unpkg.com/wavesurfer.js@7.0.0-beta.10/dist/plugins/envelope.js';
import * as colors from './colors.js';
import * as consts from './constants.js';

/*
https://unpkg.com/wavesurfer.js@beta/dist/plugins/envelope.js redirects to
https://unpkg.com/wavesurfer.js@7.0.0-beta.10/dist/plugins/envelope.js
*/

const canvas2D__Heat = document.createElement(`canvas`).getContext(`2d`),
    gradient__Heat = canvas2D__Heat.createLinearGradient(0, 0, 0, 100),
    canvas2D__x0x0x0 = document.createElement(`canvas`).getContext(`2d`),
    gradient__x0x0x0 = canvas2D__x0x0x0.createLinearGradient(0, 0, 0, 100),
    loaders = document.querySelectorAll(`.loader`);

for (let i = 0; i < loaders.length; i++) {
    loaders[i].textContent = "Loading audio. Please wait…"
}

const compositionTitles = [`heat`, `x0x0x0`];

gradient__Heat.addColorStop(0, colors.RED);
gradient__Heat.addColorStop(1, colors.WHITE);

gradient__x0x0x0.addColorStop(0, colors.BLACK);
gradient__x0x0x0.addColorStop(.75, colors.GRAY);
gradient__x0x0x0.addColorStop(1, colors.BLUE);

const PATH_TO_HEAT = `media/audio/heat--the-hyper-stereo-drum-mix.mp3`;
const PATH_TO_X0X0X0 = `media/audio/x0x0x0.mp3`;

const heatWaveSurferPlayer = WaveSurfer.create({
    container: `#heat-waveform`,
    waveColor: gradient__Heat,
    barWidth: consts.UNIVERSAL_BAR_WIDTH,
    barGap: consts.UNIVERSAL_BAR_GAP,
    autoplay: consts.UNIVERSAL_AUTO_PLAY,
    cursorWidth: consts.UNIVERSAL_CURSOR_WIDTH,
    height: consts.UNIVERSAL_WAVEFORM_HEIGHT,
    barRadius: consts.UNIVERSAL_BAR_RADIUS,
    progressColor: colors.RED,
    url: PATH_TO_HEAT
});

const heatEnvelope = heatWaveSurferPlayer.registerPlugin(
    EnvelopePlugin.create({
        fadeInEnd: consts.UNIVERSAL_ENVELOPE_FADE_IN_END,
        fadeOutStart: 244,
        volume: consts.UNIVERSAL_ENVELOPE_INITIAL_VOLUME,
        lineColor: consts.UNIVERSAL_ENVELOPE_LINE_COLOR,
        lineWidth: consts.UNIVERSAL_ENVELOPE_LINE_WIDTH,
        dragPointSize: consts.UNIVERSAL_ENVELOPE_DRAG_POINT_SIZE,
        dragPointStroke: colors.BLACK
    })
);

const x0x0x0WaveSurferPlayer = WaveSurfer.create({
    container: `#x0x0x0-waveform`,
    waveColor: gradient__x0x0x0,
    barWidth: consts.UNIVERSAL_BAR_WIDTH,
    barGap: consts.UNIVERSAL_BAR_GAP,
    autoplay: consts.UNIVERSAL_AUTO_PLAY,
    cursorWidth: consts.UNIVERSAL_CURSOR_WIDTH,
    height: consts.UNIVERSAL_WAVEFORM_HEIGHT,
    barRadius: consts.UNIVERSAL_BAR_RADIUS,
    progressColor: colors.GRAY,
    url: PATH_TO_X0X0X0
});

const x0x0x0Envelope = x0x0x0WaveSurferPlayer.registerPlugin(
    EnvelopePlugin.create({
        fadeInEnd: consts.UNIVERSAL_ENVELOPE_FADE_IN_END,
        fadeOutStart: 276,
        volume: consts.UNIVERSAL_ENVELOPE_INITIAL_VOLUME,
        lineColor: consts.UNIVERSAL_ENVELOPE_LINE_COLOR,
        lineWidth: consts.UNIVERSAL_ENVELOPE_LINE_WIDTH,
        dragPointSize: consts.UNIVERSAL_ENVELOPE_DRAG_POINT_SIZE,
        dragPointStroke: colors.BLACK
    })
);

// A node list of waveform players
const waveformPlayer = document.getElementsByClassName(`composition__waveform`);
const playButton = new Array(waveformPlayer.length);

for(let i = 0; i < waveformPlayer.length; i++) {
    playButton[i] = document.createElement(`button`);
    playButton[i].textContent = `Play`;
    playButton[i].setAttribute(`class`, `composition__waveform--play-pause-button`);
    playButton[i].setAttribute(`id`, `${compositionTitles[i]}__waveform--play-pause-button`);
    waveformPlayer[i].appendChild(playButton[i]);
}

heatWaveSurferPlayer.on(`play`, () => {
    playButton[0].textContent = `Pause`;
});

heatWaveSurferPlayer.on(`pause`, () => {
    playButton[0].textContent = `Play`;
});

heatWaveSurferPlayer.on(`ready`, () => {
    loaders[0].removeAttribute(`class`);
    loaders[0].setAttribute(`class`, `disappear`);

    playButton[0].addEventListener(`click`, () => {
        if (heatWaveSurferPlayer.isPlaying()) {
            heatWaveSurferPlayer.pause();
        } else {
            heatWaveSurferPlayer.play();
        }
    });
});

x0x0x0WaveSurferPlayer.on(`play`, () => {
    playButton[1].textContent = `Pause`;
});

x0x0x0WaveSurferPlayer.on(`pause`, () => {
    playButton[1].textContent = `Play`;
});

x0x0x0WaveSurferPlayer.on(`ready`, () => {
    loaders[1].removeAttribute(`class`);
    loaders[1].setAttribute(`class`, `disappear`);

    playButton[1].addEventListener(`click`, () => {
        if (x0x0x0WaveSurferPlayer.isPlaying()) {
            x0x0x0WaveSurferPlayer.pause();
        } else {
            x0x0x0WaveSurferPlayer.play();
        }
    });
});

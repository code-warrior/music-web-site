import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7.0.3/dist/wavesurfer.esm.js'
import EnvelopePlugin from 'https://unpkg.com/wavesurfer.js@7.0.3/dist/plugins/envelope.esm.js'
import * as colors from './colors.js';
import * as consts from './constants.js';

const canvas2D__Nude__Piano_Version = document.createElement(`canvas`).getContext(`2d`),
    gradient__Nude__Piano_Version = canvas2D__Nude__Piano_Version.createLinearGradient(0, 0, 0, 100),
    loaders = document.querySelectorAll(`.loader`);

for (let i = 0; i < loaders.length; i++) {
    loaders[i].textContent = "Loading audio. Please wait…"
}

const compositionTitles = [`nude--the-noise-floor-music-rebuild--piano-version`];

gradient__Nude__Piano_Version.addColorStop(0, colors.NUDE_PIANO_BG_COLOR);
gradient__Nude__Piano_Version.addColorStop(1, colors.WHITE);

const nudePianoVersionWaveSurferPlayer = WaveSurfer.create({
    container: `#nude--the-noise-floor-music-rebuild--piano-version-waveform`,
    waveColor: gradient__Nude__Piano_Version,
    barWidth: consts.UNIVERSAL_BAR_WIDTH,
    barGap: consts.UNIVERSAL_BAR_GAP,
    autoplay: consts.UNIVERSAL_AUTO_PLAY,
    cursorWidth: consts.UNIVERSAL_CURSOR_WIDTH,
    height: consts.UNIVERSAL_WAVEFORM_HEIGHT,
    barRadius: consts.UNIVERSAL_BAR_RADIUS,
    progressColor: colors.NUDE_PIANO_BG_COLOR,
    url: `media/audio/nude--the-noise-floor-music-rebuild--piano-version.mp3`
});

const nudePianoVersionEnvelope = nudePianoVersionWaveSurferPlayer.registerPlugin(
    EnvelopePlugin.create({
        fadeInEnd: consts.UNIVERSAL_ENVELOPE_FADE_IN_END,
        fadeOutStart: 245,
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

nudePianoVersionWaveSurferPlayer.on(`play`, () => {
    playButton[0].textContent = `Pause`;
});

nudePianoVersionWaveSurferPlayer.on(`pause`, () => {
    playButton[0].textContent = `Play`;
});

nudePianoVersionWaveSurferPlayer.on(`ready`, () => {
    loaders[0].removeAttribute(`class`);
    loaders[0].setAttribute(`class`, `disappear`);

    playButton[0].addEventListener(`click`, () => {
        if (nudePianoVersionWaveSurferPlayer.isPlaying()) {
            nudePianoVersionWaveSurferPlayer.pause();
        } else {
            nudePianoVersionWaveSurferPlayer.play();
        }
    });
});

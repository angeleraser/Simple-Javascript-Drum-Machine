import { bank } from "../fixtures/fixtures.js";
const padBank = document.querySelector("#pad-bank"),
  display = document.querySelector("#display "),
  keyCodes = bank.map(({ keyCode }) => keyCode),
  audioNames = bank.map(({ id }) => id),
  drumPads = Array.from(padBank.querySelectorAll(".drum-pad")).map(
    (el, index) => ({
      el,
      keyCode: keyCodes[index],
      audioName: audioNames[index],
    })
  );
export const DrumMachine = {
  bankSource: bank,
  padBank,
  pads: drumPads,
  display,
  onPadEventListener() {
    this.initializePadElements();
    this.onClick();
    this.onKeyUp();
    this.onKeydown();
  },
  initializePadElements() {
    this.bankSource.forEach((source, sIndex) => {
      const pad = this.pads[sIndex].el,
        audioEl = pad.querySelector("audio");
      pad.id = source.id;
      audioEl.src = source.url;
      audioEl.id = source.keyTrigger;
    });
  },
  onKeydown() {
    document.addEventListener("keydown", ({ keyCode }) => {
      if (keyCodes.some((kc) => kc === keyCode)) {
        const { el: pad, audioName } = this.pads.find(
          (pad) => pad.keyCode === keyCode
        );
        pad.classList.add("active");
        this.changeDisplayText(audioName);
      }
    });
  },
  onKeyUp() {
    document.addEventListener("keyup", ({ keyCode }) => {
      if (keyCodes.some((kc) => kc === keyCode)) {
        const { el: pad } = this.pads.find((pad) => pad.keyCode === keyCode),
          audio = pad.querySelector("audio");
        pad.classList.remove("active");
        this.playAudio(audio);
      }
    });
  },
  onClick() {
    this.padBank.addEventListener("click", ({ target }) => {
      const audio = target.querySelector("audio");
      this.changeDisplayText(target.id)
      this.playAudio(audio);
    });
  },
  playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
  },
  changeDisplayText(value) {
    this.display.textContent = value;
  },
};
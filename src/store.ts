import { makeAutoObservable } from "mobx";

class Config {
  inputValue: string = "";
  isPlaying: boolean = false;
  isShowBanner: boolean = false;
  isShowContent: boolean = false;
  currentFocusedKey: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  play(): void {
    this.isPlaying = true;
  }

  pause(): void {
    this.isPlaying = false;
  }

  showBanner(): void {
    this.isShowBanner = true;
  }

  showContent(): void {
    this.isShowContent = true;
    this.isShowBanner = false;
  }

  hideContent(): void {
    this.isShowContent = false;
    this.isShowBanner = false;
  }

  addDigit(digit: number): void {
    if (this.inputValue.length < 10) {
      this.inputValue += digit;
    }
  }

  deleteDigit(): void {
    this.inputValue = this.inputValue.slice(0, -1);
  }

  deleteDigits(): void {
    this.inputValue = "";
  }

  setCurrentFocusedKey(index: number | null): void {
    this.currentFocusedKey = index;
  }
}

export default new Config();

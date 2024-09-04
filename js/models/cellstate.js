export default class CellState {
  constructor() {
    this.value = 0;
    this.isFlag = false;
    this.isOpen = false;
  }

  set value(val) {
    this._value = val;
  }

  set isFlag(_) {
    this._isFlag = !this.isFlag;
  }

  get isFlag() {
    return this._isFlag;
  }

  get value() {
    return this._value;
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(_) {
    this._isOpen = true;
  }

  incrementCellValue() {
    this._value++;
  }
}

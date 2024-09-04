export default class CellState {
  constructor() {
    this._value = 0;
    this._isFlag = false;
    this._isOpen = false;
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._value;
  }

  set isFlag(_) {
    this._isFlag = !this._isFlag;
  }

  get isFlag() {
    return this._isFlag;
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

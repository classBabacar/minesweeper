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

  set isFlag(val) {
    this._isFlag = val;
  }

  get isFlag() {
    return this._isFlag;
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(val) {
    this._isOpen = val;
  }

  incrementCellValue() {
    this._value++;
  }
}

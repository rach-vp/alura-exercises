export class Trade {
  constructor (
    private _date: Date,
    private _amount: number,
    private _value: number,
  ) {}

  get date(): Date {
    const dateCopy = new Date(this._date.getTime())
    return dateCopy;
  }

  get amount(): number {
    return this._amount;
  }
  get value(): number {
    return this._value;
  }

  get volume(): number {
    return this._amount * this._value;
  }
}

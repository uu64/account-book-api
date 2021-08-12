import IRecord from "./IRecord";
import BaseError from "./BaseError";

export class InvalidRecordFormatError extends BaseError {}

export default class RecordFactory {
  static create(v: any[]): IRecord {
    try {
      return {
        month: v[0] ? v[0] : "",
        housing: v[1] ? parseInt(v[1]) : 0,
        electric: v[2] ? parseInt(v[2]) : 0,
        gas: v[3] ? parseInt(v[3]) : 0,
        hydro: v[4] ? parseInt(v[4]) : 0,
        grocery: v[5] ? parseInt(v[5]) : 0,
        others: v[6] ? parseInt(v[6]) : 0,
        settled: v[7] ? true : false,
        comment: v[8] ? v[8] : "",
      };
    } catch (e) {
      throw new InvalidRecordFormatError();
    }
  }
}

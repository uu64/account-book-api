import IRecord from "./IRecord";
import BaseError from "./BaseError";

export class InvalidRecordFormatError extends BaseError {}

export default class RecordFactory {
    static create(v: any[]): IRecord {
        // The number of columns is 9
        if (v.length < 9) {
            throw new InvalidRecordFormatError();
        }

        return {
            month: v[0] ? v[0] : "",
            housing: v[1] ? parseInt(v[1]) : 0,
            electricity: v[2] ? parseInt(v[2]) : 0,
            gas: v[3] ? parseInt(v[3]) : 0,
            water: v[4] ? parseInt(v[4]) : 0,
            food: v[5] ? parseInt(v[5]) : 0,
            others: v[6] ? parseInt(v[6]) : 0,
            isSettled: v[7] ? true : false,
            comment: v[8] ? v[8] : "",
        };
    }
}

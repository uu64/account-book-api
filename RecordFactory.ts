import IRecord from "./IRecord";

class RecordFactory {
    static create(v: any[]): IRecord {
        // The number of columns is 8
        if (v.length < 8) {
            throw new Error("value is not valid");
        }

        return {
            month: v[0] ? v[0] : "",
            housing: parseInt(v[1]) ? v[1] : 0,
            electricity: parseInt(v[2]) ? v[2] : 0,
            gas: parseInt(v[3]) ? v[3] : 0,
            water: parseInt(v[4]) ? v[4] : 0,
            food: parseInt(v[5]) ? v[5] : 0,
            others: parseInt(v[6]) ? v[6] : 0,
            comment: v[7] ? v[7] : "",
        };
    }
}

export default RecordFactory;
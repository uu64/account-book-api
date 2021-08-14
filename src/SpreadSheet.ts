import BaseError from "./BaseError";

interface IRecord {
  month: string;
  housing: number | null;
  electric: number | null;
  gas: number | null;
  hydro: number | null;
  grocery: number | null;
  misc: number | null;
  others: number | null;
  sum: number | null;
  comment: string;
}

export class InvalidRecordFormatError extends BaseError {}

export default class SpreadSheet {
  private ss: GoogleAppsScript.Spreadsheet.Spreadsheet;

  constructor(id: string) {
    this.ss = SpreadsheetApp.openById(id);
  }

  getRecords(sheetId: number, months: string[]): IRecord[] {
    const sheet = this.ss.getSheets().find((s) => s.getSheetId() === sheetId);
    const values = sheet.getDataRange().getValues();
    const records: IRecord[] = [];
    for (const v of values) {
      records.push(this.createRecord(v));
    }

    return records.filter((r) => months.includes(r.month));
  }

  private createRecord(v: any[]): IRecord {
    try {
      return {
        month: v[0] ? v[0] : "",
        housing: v[1] ? parseInt(v[1]) : null,
        electric: v[2] ? parseInt(v[2]) : null,
        gas: v[3] ? parseInt(v[3]) : null,
        hydro: v[4] ? parseInt(v[4]) : null,
        grocery: v[5] ? parseInt(v[5]) : null,
        misc: v[6] ? parseInt(v[6]) : null,
        others: v[7] ? parseInt(v[7]) : null,
        sum: v[8] ? parseInt(v[8]) : null,
        comment: v[9] ? v[9] : "",
      };
    } catch (e) {
      throw new InvalidRecordFormatError();
    }
  }
}

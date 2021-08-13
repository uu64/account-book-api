import RecordFactory from "./RecordFactory";
import IRecord from "./IRecord";

class SpreadSheet {
  private ss: GoogleAppsScript.Spreadsheet.Spreadsheet;

  constructor(id: string) {
    this.ss = SpreadsheetApp.openById(id);
  }

  getRecords(sheetId: number, months: string[]): IRecord[] {
    const sheet = this.ss
      .getSheets()
      .find((s) => s.getSheetId() === sheetId);

    const values = sheet.getDataRange().getValues();
    const records: IRecord[] = [];
    for (const v of values) {
      records.push(RecordFactory.create(v));
    }

    return records.filter((r) => months.includes(r.month));
  }
}

export default SpreadSheet;

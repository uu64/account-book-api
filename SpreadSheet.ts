class SpreadSheet {
    private sheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

    constructor(id: string) {
        this.sheet = SpreadsheetApp.openById(id);
    }

    getName(): string {
        return this.sheet.getName();
    }
}

export default SpreadSheet;
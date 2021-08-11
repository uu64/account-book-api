import SpreadSheet from "./SpreadSheet";

interface IParameter {
  id: string,
  sheetId: number,
  months: string[],
}

function parse(e): IParameter {
  if (e.parameter
      && e.parameter["id"]
      && e.parameter["sheet_id"]
      && e.parameter["month"]) {
    return {
      id: e.parameter["id"],
      sheetId: parseInt(e.parameter["sheet_id"]),
      months: e.parameters["month"],
    };
  }
  throw new Error("parameter is not valid");
}

function createErrorResponse(message: string) {
  const res = {
    "message": message
  };
  return ContentService
    .createTextOutput(JSON.stringify(res))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  console.log(e);
  try {
    const param = parse(e);
    const ss = new SpreadSheet(param.id);
    const records = ss.getRecords(param.sheetId, param.months);

    return ContentService
      .createTextOutput(JSON.stringify(records))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return createErrorResponse(error.message);
  }
}


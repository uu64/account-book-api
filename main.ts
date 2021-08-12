import SpreadSheet from "./SpreadSheet";
import BaseError from "./BaseError";
import { InvalidRecordFormatError } from "./RecordFactory";

interface IParameter {
  id: string;
  sheetId: number;
  months: string[];
}

class InvalidParameterError extends BaseError {}

function parse(e): IParameter {
  if (
    e.parameter &&
    e.parameter["id"] &&
    e.parameter["sheet_id"] &&
    e.parameter["month"]
  ) {
    return {
      id: e.parameter["id"],
      sheetId: parseInt(e.parameter["sheet_id"]),
      months: e.parameters["month"],
    };
  }
  throw new InvalidParameterError();
}

function createErrorResponse(message: string) {
  const res = {
    message: message,
  };
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet(e) {
  console.info(e);
  try {
    const param = parse(e);
    const ss = new SpreadSheet(param.id);
    const records = ss.getRecords(param.sheetId, param.months);

    return ContentService.createTextOutput(JSON.stringify(records)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    console.error(error.stack);
    if (error instanceof InvalidParameterError) {
      return createErrorResponse("parameter is invalid");
    } else if (error instanceof InvalidRecordFormatError) {
      return createErrorResponse("value in spreadsheet is invalid");
    } else {
      return createErrorResponse("internal server error");
    }
  }
}

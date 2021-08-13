import SpreadSheet, { InvalidRecordFormatError } from "./SpreadSheet";
import BaseError from "./BaseError";

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

function createResponse(data: any, isSuccess: boolean, message: string) {
  const res = {
    data: data,
    isSuccess: isSuccess,
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

    return createResponse(
      {
        records: records,
      },
      true,
      ""
    );
  } catch (error) {
    console.error(error.stack);
    if (error instanceof InvalidParameterError) {
      return createResponse({}, false, "parameter is invalid");
    } else if (error instanceof InvalidRecordFormatError) {
      return createResponse({}, false, "value in spreadsheet is invalid");
    } else {
      return createResponse({}, false, "internal server error");
    }
  }
}

import SpreadSheet from "./SpreadSheet";

function doGet(e) {
  let id = "";
  if (e.parameter && e.parameter["id"]) {
    id = e.parameter["id"];
  }

  const sheet = new SpreadSheet(id);

  var res = {
    "name": sheet.getName()
  };

  return HtmlService.createHtmlOutput(JSON.stringify(res));
}


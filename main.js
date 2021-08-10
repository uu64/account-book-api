function doGet(e) {
  var message = "";
  if (e.parameter && e.parameter["message"]) {
    message = e.parameter["message"];
  }

  var res = {
    "message": message
  };

  return HtmlService.createHtmlOutput(JSON.stringify(res));
}


# account-book-api

This is a Web API for getting data of my household account book from a Google Sheets.

The data in each row should have the following values.

- month (string): YYYY-MM format string
- housing (number|null): housing costs
- electric (number|null): electric costs
- gas (number|null): gas costs
- hydro (number|null): hydro costs
- grocery (number|null): grocery costs
- misc (number|null): misc costs
- others (number|null): other costs
- sum (number|null): sum of all items
- comment (string): comment

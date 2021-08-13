# housekeeping-book-api

This is a Web API for getting data from a Google Sheets
that follows the format below.

The data in each row should have the following values.

- month (string): YYYY-MM format string
- housing (number|null): housing cost
- electric (number|null): electric cost
- gas (number|null): gas cost
- hydro (number|null): hydro cost
- grocery (number|null): grocery cost
- others (number|null): other fees
- settled (bool): whether it is settled ot not
- comment (string): comment

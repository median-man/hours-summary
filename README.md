# Hours Summary

I built this tool to get a bit of practice with the Google Sheets API and try out a boilerplate for Webpack and jQuery for those
projects that just don't have much going on.

I will probably re-do this in React as it grows.

## What Does It Do?

This project will link up to a Google Sheet for tracking
hours worked. After logging in with a Google account,
the app may be linked to a Google Sheet which meets the
required format. Then a summary of the total hours worked for
the week and day are displayed. (Permission to read from Google Drive and Google Sheets is required. All data is stored in local storage. For now.)

### Google Sheets Format

The sheet linked to this app must have the following columns (order matters) starting from column A. The first row must be empty or contain headings. The app does not use the first row.

**Hours Sheet Schema:**

| Column Letter | Data                                | Type | Example             |
| ------------- | ----------------------------------- | ---- | ------------------- |
| A             | Timestamp (date/time row was added) | Date | `9/7/2019 15:32:26` |
| B             | Date (day hours were worked)        | Date | `9/7/2019`          |
| C             | Start Time (start of time block)    | Date | `2:06:00 PM`          |
| D             | End Time (end of time block)        | Date | `3:11:00 PM`        |
| E             | Notes (not used yet)                | Text | `Worked on...`      |

### So Why Not Use Google Sheets for the Totals?

I intend to add some additional functionality and a better UI
when I have the time. And, because this is app is for trying
out feature of the Google APIs as well as the boilerplate.

## Built Using Bootstrap + Webpack + JQuery Boilerplate

This project was built using [Bootstrap + Webpack + jQuery Boilerplate](https://github.com/xxhomey19/bootstrap-webpack-jquery-boilerplate).

## Development

Run development page on **localhost:8080**

```
$ npm run dev
```

## Build

Build for production.

```
$ npm run build
```

## Deploy

Deploy to `gh-pages` branch on GitHub.

**[DEMO](https://xxhomey19.github.io/bootstrap-webpack-jquery-boilerplate/)**

```
$ npm run deploy
```

## License

MIT © [xxhomey19](https://github.com/xxhomey19)

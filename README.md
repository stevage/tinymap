# Community map template

This is a simple template for a pin-based map that draws its content from a public Google Sheets worksheet.

## Project setup

1. `yarn install`
2. Change the project name in package.json
3. Get an account on Mapbox, and replace the public token in Map.vue with your public token

## Using a Google Sheet for data

This project starts using data in https://docs.google.com/spreadsheets/d/1DFXQYOh2CRZbFtMAFNbVJwpWQxx_SUhPr56OYaDLWS0/edit?usp=sharing

1. Duplicate this Google Sheet and use it as a template. 
2. Under File, "Publish to the web", as CSV.
3. Put the CSV link in Map.vue.

### Special columns

The template recognises certain column names by default. Obviously you can change these in the code.

* `Longitude`, `Latitude`
* `Name`: title of feature info panel
* `Description`: smaller text in feature info panel
* `Image_Url`: 


## Running locally
```
npm run serve
```

## Publishing to Github
1. Set up a Github repo (or fork the original source)
2. Push an initial commit
3. Run `yarn run deploy`
4. Now configure Github Pages to use `docs` directory

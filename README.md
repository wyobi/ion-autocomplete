ion-autocomplete
================

Configurable Ionic directive for an autocomplete dropdown.

![Animated demo](https://github.com/guylabs/ion-autocomplete/raw/master/demo.gif)

This is a simple directive for an autocomplete overlay location field built for Ionic Framework.

#Installation

1. Use bower to install the new module:
```bash
bower install ion-autocomplete
```
2. Import the `ion-autocomplete` javascript and css file into your HTML file:
```html
<script src="bower_components/ion-autocomplete/dist/ion-autocomplete.js"></script>
<link href="bower_components/ion-autocomplete/dist/ion-autocomplete.css" rel="stylesheet">
```
3. Add `ion-autocomplete` as a dependency on your Ionic app:
```javascript
angular.module('myApp', [
  'ionic',
  'ion-autocomplete'
]);
```
#Usage

To use the `ion-autocomplete` directive you need to add the following snippet:
`<ion-autocomplete ng-model="model" placeholder="Enter the query to search for ..." />`

## Acknowledgements

When I first searched for an Ionic autocomplete component I just found the project of Danny. So please have a look at
his [ion-google-place](https://github.com/israelidanny/ion-google-place) project as this project here is a fork of it.
At this point I want to thank him for his nice work.

## License

This Ionic autocomplete directive is available under the MIT license.

(c) Danny Povolotski
(c) Modifications by Guy Brand

# Changelog

## 2.2.1 (2024-12-16)

- Fix loading multiple nodes from server

## 2.2.0 (2024-12-04)

- Integration with [JSON5](https://www.npmjs.com/package/json5). Now, objects can be written in HTML just like in vanilla js
- A bug with additional nodes has been fixed when you do not specify the request object in the element
- The `.runtime` file has been updated
- Comments have been added to the file hmpl.js

## 2.1.8 (2024-11-18)

- Update package data
- Fixing error

## 2.1.7 (2024-11-10)

- Update package data

## 2.1.6 (2024-10-27)

- Standardization of errors
- Fixing a headers error in RequestInit

## 2.1.4 (2024-10-14)

- Adding auto generation for `body` in `HMPLRequestInit`
- String parsing has been reworked
- Adding context

## 2.1.3 (2024-09-29)

- Adding memoization functionality
- Replacing `isRepeatable` with `repeat`
- Bug fix. Replacing a reply to a `Comment` when the default response is not fullfilled (200-299)
- Adding an options object to the `compile` function

---
title: Changelog
description: Version history and updates for HMPL
---

## 3.0.5 (2025-10-03)

- Updating README.md
- Updating package.json

## 3.0.4 (2025-07-23)

- Updating README.md

## 3.0.3 (2025-05-20)

- Adding `{{#indicators}}` block
- Changing the error text

## 3.0.2 (2025-05-12)

- Updating README.md
- Adding support for HTTP methods `OPTIONS` and `TRACE`

## 3.0.1 (2025-04-27)

- Updating README.md

## 3.0.0 (2025-04-20)

- Changed syntax to `{{#request}}`
- Added interval for sending requests
- Changed error handling
- Bug fixes

## 2.2.6 (2025-03-09)

- Updating README.md

## 2.2.5 (2025-03-08)

- Integration with [DOMPurify](https://npmjs.com/package/dompurify), which will increase the security of using the module by preventing XSS attacks. To enable, the `sanitize` property was added
- Adding the `disallowedTags` property
- Correction of text errors

## 2.2.4 (2025-02-25)

- Updating README.md
- Updating package.json

## 2.2.3 (2025-01-16)

- Major rework of error handling in the code
- Bug fixes
- Returning a comment when a request fails

## 2.2.2 (2025-01-08)

- Adding the `allowedContentTypes` property
- Fixing `rejected` status
- Improving security
- Adding more error messages, reworking old ones
- Bug fix

## 2.2.1 (2024-12-16)

- Fix loading multiple nodes from server

## 2.2.0 (2024-12-04)

- Integration with [JSON5](https://npmjs.com/package/json5). Now, objects can be written in HTML just like in vanilla js
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

- Added memoization functionality.
- Replaced `isRepeatable` with `repeat`.
- Fixed bug: replaced a reply to a `Comment` when the default response is not fulfilled (200-299).
- Added an options object to the `compile` function.

## 2.1.2 (2024-09-29)

- Replaced `mode` with boolean variable `isRepeatable`.
- Updated mode handling in the request:
  - Introduced validation for `req.mode` to allow only "one" or "all" values.
  - Added a check to ensure `req.isRepeatable` is defined and is a boolean value.
  - Defaulted `req.isRepeatable` to `true` if not specified, with `modeAttr` set to "all" for repeatable requests and "one" otherwise.
- Clarified `MODE` error message regarding `AFTER`.

## 2.1.1 (2024-08-05)

- Updated version from `2.1.0` to `2.1.1`.
- Updated URL from `https://github.com/hmpljs/hmpl` to `https://github.com/hmpl-lang/hmpl`.

## 2.1.0 (2024-08-05)

- Removed the period from the `hmpl` header description.

## 2.0.2 (2024-07-22)

- Updated `Readme.md` file.

## 2.0.1 (2024-07-15)

- Updated `hmpl-js` script tag to specify version `2.0.0`.

## 2.0.0 (2024-07-12)

- Updated `Readme.md` file.

## 1.0.9 (2024-06-17)

- Changed `after` attribute in `<request>` from `click:.getHTML` to `click:.getTitle`.
- Modified `templateFn` usage to directly append `elementObj.response` to `bodyEl`.

## 1.0.8 (2024-06-12)

- Changed from `HMPLResponse` to `HMPLInstance`.
- Changed from `HMPLResponse` to `HMPLInstance` in `templateObject`.

## 1.0.7 (2024-06-12)

- Changed from `HMPLResponse` to `HMPLTemplateObject`.

## 1.0.6 (2024-06-12)

- Updated version from `1.0.5` to `1.0.6`.

## 1.0.5 (2024-06-10)

- Updated version from `1.0.4` to `1.0.5`.

## 1.0.4 (2024-06-10)

- Updated `Readme.md` file.

## 1.0.3 (2024-06-03)

- Updated `hmpl-js` script tag version from `1.0.2` to `1.0.3`.
- Changed `wrapper.appendChild(value)` to `wrapper.appendChild(value.content.firstElementChild)`.
- Updated installation instructions to reference `hmpl-js` version `1.0.3`.
- Updated version from `1.0.2` to `1.0.3`.

## 1.0.2 (2024-06-03)

- Updated `hmpl-js` script tag version from `1.0.1` to `1.0.2`.
- Updated installation instructions to reference `hmpl-js` version `1.0.2`.
- Changed condition from checking `if (!optionsId)` to `if (optionsId)`.

## 1.0.1 (2024-06-03)

- Updated installation instructions to reference `hmpl-js` version `1.0.1`.
- Updated version from `1.0.0` to `1.0.1`.

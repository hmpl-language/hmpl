import {
  AUTO_BODY,
  COMPILE_ERROR,
  FORM_DATA,
  ID,
  INDICATORS,
  MEMO,
  MODE,
  ALLOWED_CONTENT_TYPES,
  PARSE_ERROR,
  RENDER_ERROR,
  REQUEST_OBJECT_ERROR,
  COMPILE_OPTIONS_ERROR,
  SOURCE,
  AFTER,
  DISALLOWED_TAGS,
  SANITIZE
} from "../config/config";

import { checkFunction } from "../shared/utils";
import { compile } from "../../src/main";
import { e, eq, createTestObj1, createTestObj2 } from "./functions";

/**
 * Function "compile"
 */

describe("compile function", () => {
  e(
    "throws an error if the TEMPLATE is not a stringthrows an error if the TEMPLATE is not a string",
    () => compile(123 as any),
    `${COMPILE_ERROR}: Template was not found or the type of the passed value is not string`
  );

  e(
    "throws an error if the TEMPLATE is an empty string",
    () => compile(""),
    `${COMPILE_ERROR}: Template must not be a falsey value`
  );

  e(
    "only accepts COMPILES OPTIONS as an object",
    () => compile("some template", "some text" as any),
    `${COMPILE_OPTIONS_ERROR}: Options must be an object`
  );
  e(
    `only accepts the '${MEMO}' property in the COMPILE OPTIONS as a boolean`,
    () => compile("some template", { memo: 123 as unknown as boolean }),
    `${COMPILE_OPTIONS_ERROR}: The value of the property ${MEMO} must be a boolean`
  );

  e(
    "throws an error if the TEMPLATE string doesn't contain a request object",
    () => compile("<div></div>"),
    `${PARSE_ERROR}: Request object not found`
  );

  e(
    "",
    () => compile(`<div>#r{src:"123"}<!--hmpl1--></div>`),
    `${PARSE_ERROR}: Request object with id "1" not found`
  );

  e(
    "",
    () =>
      compile(`<div>Hello #r{{ "foo": "bar" } some broken stuff here</div>`),
    `${PARSE_ERROR}: Unpaired curly braces in fetch block`
  );

  e(
    "",
    () => compile(`#r{"text": "escaped quote here: \\" still in string"}`),
    `${REQUEST_OBJECT_ERROR}: Property "text" is not processed`
  );

  e(
    "",
    () => compile(`#r{<!-- some comment -->"key": "value"}`),
    `JSON5: invalid character '<' at 1:2`
  );

  e(
    "",
    () =>
      compile(
        `Some text before #r{<!-- comment starts and never ends "key": "value"}}`
      ),
    `${PARSE_ERROR}: Unpaired curly braces in fetch block`
  );

  e(
    "",
    () =>
      compile(
        `#r{
          "a": "b",
          "nested": #request{ "error": "nested" }
        }`
      ),
    `${PARSE_ERROR}: Nesting of request objects is not supported`
  );

  e(
    `throws an error if the REQUEST OBJECT doesn't contain the '${SOURCE}' property`,
    () => compile(createTestObj2(`#r{ "repeat":true }`)),
    `${REQUEST_OBJECT_ERROR}: The "${SOURCE}" property are not found or empty`
  );

  e(
    "throws an error if the REQUEST OBJECT contains invalid properties",
    () => compile(createTestObj1({ a: "" })),
    `${REQUEST_OBJECT_ERROR}: Property "a" is not processed`
  );

  e(
    `only accepts the '${INDICATORS}' property in the REQUEST OBJECT as an array`,
    () => compile(createTestObj1({ [INDICATORS]: "" })),
    `${REQUEST_OBJECT_ERROR}: The value of the property "${INDICATORS}" must be an array`
  );

  e(
    `only accepts the '${ID}' property in the REQUEST OBJECT as a string`,
    () => compile(createTestObj1({ [ID]: [] })),
    `${REQUEST_OBJECT_ERROR}: The value of the property "${ID}" must be a string`
  );

  e(
    `only accepts the '${MEMO}' property in the REQUEST OBJECT as a boolean`,
    () => compile(createTestObj1({ [MEMO]: [] })),
    `${REQUEST_OBJECT_ERROR}: The value of the property "${MEMO}" must be a boolean value`
  );

  e(
    `only accepts the '${MODE}' property in the REQUEST OBJECT as a boolean`,
    () => compile(createTestObj1({ [MODE]: [] })),
    `${REQUEST_OBJECT_ERROR}: The value of the property "${MODE}" must be a boolean value`
  );

  e(
    `only accepts the '${AUTO_BODY}' property in the REQUEST OBJECT as a boolean or an object`,
    () => compile(createTestObj1({ [AUTO_BODY]: [] })),
    `${REQUEST_OBJECT_ERROR}: Expected a boolean or object, but got neither`
  );

  e(
    `throws an error if the '${AUTO_BODY}' property in the REQUEST OBJECT contains invalid properties`,
    () => compile(createTestObj1({ [AUTO_BODY]: { a: "" } })),
    `${REQUEST_OBJECT_ERROR}: Unexpected property "a"`
  );

  e(
    `only accepts the '${AUTO_BODY}.${FORM_DATA}' property in the REQUEST OBJECT as a boolean`,
    () => compile(createTestObj1({ [AUTO_BODY]: { [FORM_DATA]: "" } })),
    `${REQUEST_OBJECT_ERROR}: The "${FORM_DATA}" property should be a boolean`
  );

  e(
    `only accepts the '${ALLOWED_CONTENT_TYPES}' property in the REQUEST OBJECT as a "*" or an array of strings`,
    () => compile(createTestObj1({ [ALLOWED_CONTENT_TYPES]: {} })),
    `${REQUEST_OBJECT_ERROR}: Expected "*" or string array, but got neither`
  );

  e(
    `throws an error if the '${ALLOWED_CONTENT_TYPES}' property in the REQUEST OBJECT contains non-string element at index 0 of the array`,
    () => compile(createTestObj1({ [ALLOWED_CONTENT_TYPES]: [1] })),
    `${REQUEST_OBJECT_ERROR}: In the array, the element with index 0 is not a string`
  );

  e(
    "only accepts the 'allowedContentTypes' property in the COMPILE OPTIONS as a '*' or an array of strings",
    () =>
      compile(createTestObj2(`#r{ "src":"/api/test" }`), {
        allowedContentTypes: {} as any
      }),
    `${COMPILE_OPTIONS_ERROR}: Expected "*" or string array, but got neither`
  );

  e(
    "throws an error if the 'allowedContentTypes' property in the COMPILE OPTIONS contains non-string element at index 0 of the array",
    () =>
      compile(createTestObj2(`#r{ "src":"/api/test" }`), {
        allowedContentTypes: [1] as any
      }),
    `${COMPILE_OPTIONS_ERROR}: In the array, the element with index 0 is not a string`
  );
  e(
    ``,
    () =>
      compile(createTestObj2(`#r{ "src":"/api/test" }`), {
        disallowedTags: true as any
      }),
    `${COMPILE_OPTIONS_ERROR}: The value of the property "${DISALLOWED_TAGS}" must be an array`
  );
  e(
    ``,
    () =>
      compile(createTestObj2(`#r{ "src":"/api/test" }`), {
        disallowedTags: ["div" as any]
      }),
    `${COMPILE_OPTIONS_ERROR}: The value "div" is not processed`
  );
  e(
    ``,
    () =>
      compile(createTestObj2(`#r{ "src":"/api/test" }`), {
        sanitize: ["div"] as any
      }),
    `${COMPILE_OPTIONS_ERROR}: The value of the property "${SANITIZE}" must be a boolean`
  );
  e(
    `throws an error if the '${SOURCE}' property in the REQUEST OBJECT is an array instead of a string`,
    () => compile(createTestObj1({ [SOURCE]: [] })),
    `${REQUEST_OBJECT_ERROR}: The value of the property "${SOURCE}" must be a string`
  );
  e(
    "",
    () => compile(createTestObj1({ [SOURCE]: [] })),
    `${REQUEST_OBJECT_ERROR}: The value of the property "${SOURCE}" must be a string`
  );

  e(
    "throws an error if the REQUEST OBJECT contains invalid property",
    () =>
      compile(
        createTestObj2(`<div>
  <form onsubmit="function prevent(e){e.preventDefault();};return prevent(event);" id="form">
    <div class="form-example">
      <label for="login">Login: </label>
      <input type="login" name="login" id="login" required />
    </div>
    <div class="form-example">
      <input type="submit" value="Register!" />
    </div>
  </form>
  <p>
    #r{src:"", c:{a:{d:{}}}, indicators:[{ a:{}, b:{} }] }
  </p>
</div>`)
      ),
    `${REQUEST_OBJECT_ERROR}: Property "c" is not processed`
  );

  e(
    `throws an error if the REQUEST OBJECT doesn't have the ${SOURCE} property is an empty string`,
    () =>
      compile(
        createTestObj2(`<div>
  <form onsubmit="function prevent(e){e.preventDefault();};return prevent(event);" id="form">
    <div class="form-example">
      <label for="login">Login: </label>
      <input type="login" name="login" id="login" required />
    </div>
    <div class="form-example">
      <input type="submit" value="Register!" />
    </div>
  </form>
  <p>
    #r{src:"", indicators:{a:{d:{}}}, indicators:[{ a:{}, b:{} }] }
  </p>
</div>`)
      ),
    `${REQUEST_OBJECT_ERROR}: The "${SOURCE}" property are not found or empty`
  );

  e(
    "throw an error if the TEMPLATE includes more than one top-level node",
    () => compile(`${createTestObj2(`#r{ "src":"/api/test" }`)}<div></div>`),
    `${RENDER_ERROR}: Template includes only one node of the Element type or one response object`
  );
  e(
    `throws an error if the '${AUTO_BODY}' property in the REQUEST OBJECT is true without the '${AFTER}' property`,
    () => compile(createTestObj2(`#r{ "src":"/api/test", "autoBody": true }`)),
    `${REQUEST_OBJECT_ERROR}: The "${AUTO_BODY}" property does not work without the "${AFTER}" property`
  );
  e(
    `throws an error if the event target is not provided for '${AFTER}' property in the REQUEST OBJECT`,
    () =>
      compile(
        createTestObj2(
          `<form id="form"></form>#r{ "src":"/api/test", "after":"submit" }`
        )
      ),
    `${REQUEST_OBJECT_ERROR}: The "${AFTER}" property doesn't work without EventTargets`
  );
  e(
    `throws an error if the '${MODE}' property in the REQUEST OBJECT is true without the '${AFTER}' property`,
    () =>
      compile(
        createTestObj2(
          `<form id="form"></form>#r{ "src":"/api/test", "repeat":true }`
        )
      ),
    `${REQUEST_OBJECT_ERROR}: The "${MODE}" property doesn't work without "${AFTER}" property`
  );
  e(
    ``,
    () =>
      compile(createTestObj2(`#r{ "src":"/api/test", "disallowedTags":true }`)),
    `${REQUEST_OBJECT_ERROR}: The value of the property "${DISALLOWED_TAGS}" must be an array`
  );
  e(
    ``,
    () =>
      compile(
        createTestObj2(`#r{ "src":"/api/test", disallowedTags: ["div"] }`)
      ),
    `${REQUEST_OBJECT_ERROR}: The value "div" is not processed`
  );
  e(
    ``,
    () => compile(createTestObj2(`#r{ "src":"/api/test", sanitize: ["div"] }`)),
    `${REQUEST_OBJECT_ERROR}: The value of the property "${SANITIZE}" must be a boolean`
  );
  eq(
    `returns a template function when provided a TEMPLATE with just ${SOURCE} property`,
    checkFunction(compile(createTestObj2(`#r{ "src":"/api/test" }`))),
    true
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "autoBody": false }`
      ),
      {
        autoBody: true
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "autoBody": true }`
      ),
      {
        autoBody: false
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form" }`
      ),
      {
        autoBody: false
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form" }`
      ),
      {
        autoBody: true
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form" }`
      ),
      {
        autoBody: {
          formData: false
        }
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form" }`
      ),
      {
        autoBody: {
          formData: true
        }
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "autoBody": { "formData": true }  }`
      ),
      {
        autoBody: false
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "autoBody": { "formData": true }  }`
      ),
      {
        autoBody: true
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "autoBody": { "formData": true } }`
      )
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "autoBody": { "formData": false } }`
      )
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "autoBody": { "formData": false } }`
      )
    )(() => ({})).response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "autoBody": { "formData": false }, "initId":"1" }`
      )
    )([
      {
        id: "1",
        value: {}
      }
    ]).response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "",
    compile(
      createTestObj2(
        `<form id="form"></form>#r{ "src":"/api/test", "after":"submit:#form", "initId":"1" } #r{ "src":"/api/test", "after":"submit:#form", "initId":"2" }`
      )
    )([
      {
        id: "1",
        value: {}
      },
      {
        id: "2",
        value: {}
      }
    ]).response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--><!--hmpl1--></div>'
  );
});

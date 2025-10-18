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
  REQUEST_COMPONENT_ERROR,
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
    "throws an error if the TEMPLATE string doesn't contain a block helper",
    () => compile("<div></div>"),
    `${PARSE_ERROR}: Block helper not found`
  );
  e(
    "Should throw parse error for unclosed block with no ending '}}'",
    () => compile("<div>{{#request src='test'</div>"),
    `${PARSE_ERROR}: Unclosed block (no ending '}}') for {{#request`
  );
  e(
    "Should throw parse error for missing closing {{/request}} block",
    () => compile("<div>{{#request src='test'}}Some content</div>"),
    `${PARSE_ERROR}: No closing '{{/request}}' found for {{#request}}`
  );
  e(
    "Should throw parse error when indicator blocks are nested inside each other",
    () =>
      compile(`<div><button id="increment">Click</button>{{#r src="/api/test" after="click:#increment"}}
    {{#indicator trigger="pending"}}
      <p>Loading...</p>
      {{#indicator trigger="error"}}
        Error
      {{/indicator}}
    {{/indicator}}
    {{/r}}</div>`),
    `${PARSE_ERROR}: Nested {{#indicator}} blocks are not supported`
  );
  e(
    "Should throw parse error for unsupported nested {{#request}} blocks",
    () =>
      compile(
        "<div>{{#request src='test'}}{{#request src='inner'}}{{/request}}{{/request}}</div>"
      ),
    `${PARSE_ERROR}: Nested {{#request}} blocks are not supported`
  );
  e(
    "Should throw request component error when autoBody is used without after",
    () =>
      compile(
        "<div>{{#request src='test', autoBody=true, }}</div>{{/request}}"
      ),
    `${REQUEST_COMPONENT_ERROR}: The "${AUTO_BODY}" property does not work without the "${AFTER}" property`
  );
  e(
    "Should throw parse error when block helper with specified id is not found",
    () => compile(`<div>{{#r src="123"}}{{/r}}<!--hmpl1--></div>`),
    `${PARSE_ERROR}: Block helper with id "1" not found`
  );
  e(
    `throws an error if the REQUEST COMPONENT doesn't contain the '${SOURCE}' property`,
    () => compile(createTestObj2(`{{#r repeat=true}}{{/r}}`)),
    `${REQUEST_COMPONENT_ERROR}: The "${SOURCE}" property are not found or empty`
  );
  e(
    "throws an error if the REQUEST COMPONENT contains invalid properties",
    () => compile(createTestObj1({ a: "" })),
    `${REQUEST_COMPONENT_ERROR}: Property "a" is not processed`
  );
  e(
    `only accepts the '${INDICATORS}' property in the REQUEST COMPONENT as an array`,
    () => compile(createTestObj1({ [INDICATORS]: "" })),
    `${REQUEST_COMPONENT_ERROR}: The value of the property "${INDICATORS}" must be an array`
  );
  e(
    `only accepts the '${ID}' property in the REQUEST COMPONENT as a string`,
    () => compile(createTestObj1({ [ID]: [] })),
    `${REQUEST_COMPONENT_ERROR}: The value of the property "${ID}" must be a string`
  );
  e(
    `only accepts the '${MEMO}' property in the REQUEST COMPONENT as a boolean`,
    () => compile(createTestObj1({ [MEMO]: [] })),
    `${REQUEST_COMPONENT_ERROR}: The value of the property "${MEMO}" must be a boolean value`
  );
  e(
    `only accepts the '${MODE}' property in the REQUEST COMPONENT as a boolean`,
    () => compile(createTestObj1({ [MODE]: [] })),
    `${REQUEST_COMPONENT_ERROR}: The value of the property "${MODE}" must be a boolean value`
  );
  e(
    `only accepts the '${AUTO_BODY}' property in the REQUEST COMPONENT as a boolean or an object`,
    () => compile(createTestObj1({ [AUTO_BODY]: [] })),
    `${REQUEST_COMPONENT_ERROR}: Expected a boolean or object, but got neither`
  );
  e(
    `throws an error if the '${AUTO_BODY}' property in the REQUEST COMPONENT contains invalid properties`,
    () => compile(createTestObj1({ [AUTO_BODY]: { a: "" } })),
    `${REQUEST_COMPONENT_ERROR}: Unexpected property "a"`
  );
  e(
    `only accepts the '${AUTO_BODY}.${FORM_DATA}' property in the REQUEST COMPONENT as a boolean`,
    () => compile(createTestObj1({ [AUTO_BODY]: { [FORM_DATA]: "" } })),
    `${REQUEST_COMPONENT_ERROR}: The "${FORM_DATA}" property should be a boolean`
  );
  e(
    `only accepts the '${ALLOWED_CONTENT_TYPES}' property in the REQUEST COMPONENT as a "*" or an array of strings`,
    () => compile(createTestObj1({ [ALLOWED_CONTENT_TYPES]: {} })),
    `${REQUEST_COMPONENT_ERROR}: Expected "*" or string array, but got neither`
  );
  e(
    `throws an error if the '${ALLOWED_CONTENT_TYPES}' property in the REQUEST COMPONENT contains non-string element at index 0 of the array`,
    () => compile(createTestObj1({ [ALLOWED_CONTENT_TYPES]: [1] })),
    `${REQUEST_COMPONENT_ERROR}: In the array, the element with index 0 is not a string`
  );
  e(
    "only accepts the 'allowedContentTypes' property in the COMPILE OPTIONS as a '*' or an array of strings",
    () =>
      compile(createTestObj2(`{{#r src="/api/test"}}{{/r}}`), {
        allowedContentTypes: {} as any
      }),
    `${COMPILE_OPTIONS_ERROR}: Expected "*" or string array, but got neither`
  );
  e(
    "throws an error if the 'allowedContentTypes' property in the COMPILE OPTIONS contains non-string element at index 0 of the array",
    () =>
      compile(createTestObj2(`{{#r src="/api/test"}}{{/r}}`), {
        allowedContentTypes: [1] as any
      }),
    `${COMPILE_OPTIONS_ERROR}: In the array, the element with index 0 is not a string`
  );
  e(
    `throws an error if the 'disallowedTags' property in the COMPILE OPTIONS is not an array`,
    () =>
      compile(createTestObj2(`{{#r src="/api/test"}}{{/r}}`), {
        disallowedTags: true as any
      }),
    `${COMPILE_OPTIONS_ERROR}: The value of the property "${DISALLOWED_TAGS}" must be an array`
  );
  e(
    `throws an error if the 'disallowedTags' array contains an unprocessable value`,
    () =>
      compile(createTestObj2(`{{#r src="/api/test"}}{{/r}}`), {
        disallowedTags: ["div" as any]
      }),
    `${COMPILE_OPTIONS_ERROR}: The value "div" is not processed`
  );
  e(
    `throws an error if the 'sanitize' property in the COMPILE OPTIONS is not a boolean`,
    () =>
      compile(createTestObj2(`{{#r src="/api/test"}}{{/r}}`), {
        sanitize: ["div"] as any
      }),
    `${COMPILE_OPTIONS_ERROR}: The value of the property "${SANITIZE}" must be a boolean`
  );
  e(
    `throws an error if the '${SOURCE}' property in the REQUEST COMPONENT is an array instead of a string`,
    () => compile(createTestObj1({ [SOURCE]: [] })),
    `${REQUEST_COMPONENT_ERROR}: The value of the property "${SOURCE}" must be a string`
  );
  e(
    "Should throw request component error when the 'src' property is not a string",
    () => compile(createTestObj1({ [SOURCE]: [] })),
    `${REQUEST_COMPONENT_ERROR}: The value of the property "${SOURCE}" must be a string`
  );
  e(
    "throws an error if the REQUEST COMPONENT contains invalid property",
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
      {{#r src="" c="d" indicators=[{ a:{}, b:{} }] }}{{/r}}
    </p>
  </div>`)
      ),
    `${REQUEST_COMPONENT_ERROR}: Property "c" is not processed`
  );
  e(
    `throws an error if the REQUEST COMPONENT doesn't have the ${SOURCE} property is an empty string`,
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
      {{#r src="" indicators={a:{d:{}}}, indicators=[{ a:{}, b:{} }] }}{{/r}}
    </p>
  </div>`)
      ),
    `${REQUEST_COMPONENT_ERROR}: The "${SOURCE}" property are not found or empty`
  );
  e(
    "throw an error if the TEMPLATE includes more than one top-level node",
    () =>
      compile(`${createTestObj2(`{{#r src="/api/test"}}{{/r}}`)}<div></div>`),
    `${RENDER_ERROR}: Template includes only one node of the Element type or one response object`
  );
  e(
    `throws an error if the '${AUTO_BODY}' property in the REQUEST COMPONENT is true without the '${AFTER}' property`,
    () => compile(createTestObj2(`{{#r src="/api/test" autoBody=true}}{{/r}}`)),
    `${REQUEST_COMPONENT_ERROR}: The "${AUTO_BODY}" property does not work without the "${AFTER}" property`
  );
  e(
    `throws an error if the event target is not provided for '${AFTER}' property in the REQUEST COMPONENT`,
    () =>
      compile(
        createTestObj2(
          `<form id="form"></form>{{#r src="/api/test" after="submit"}}{{/r}}`
        )
      ),
    `${REQUEST_COMPONENT_ERROR}: The "${AFTER}" property doesn't work without EventTargets`
  );
  e(
    `throws an error if the '${MODE}' property in the REQUEST COMPONENT is true without the '${AFTER}' property`,
    () =>
      compile(
        createTestObj2(
          `<form id="form"></form>{{#r src="/api/test" repeat=true}}{{/r}}`
        )
      ),
    `${REQUEST_COMPONENT_ERROR}: The "${MODE}" property doesn't work without "${AFTER}" property`
  );
  e(
    `throws an error if the 'disallowedTags' property in the REQUEST COMPONENT is not an array`,
    () =>
      compile(
        createTestObj2(`{{#r src="/api/test" disallowedTags=true}}{{/r}}`)
      ),
    `${REQUEST_COMPONENT_ERROR}: The value of the property "${DISALLOWED_TAGS}" must be an array`
  );
  e(
    `throws an error if the 'disallowedTags' property in the REQUEST COMPONENT contains an unprocessable value`,
    () =>
      compile(
        createTestObj2(`{{#r src="/api/test" disallowedTags=["div"]}}{{/r}}`)
      ),
    `${REQUEST_COMPONENT_ERROR}: The value "div" is not processed`
  );
  e(
    `throws an error if the 'sanitize' property in the REQUEST COMPONENT is not a boolean`,
    () =>
      compile(createTestObj2(`{{#r src="/api/test" sanitize=["div"]}}{{/r}}`)),
    `${REQUEST_COMPONENT_ERROR}: The value of the property "${SANITIZE}" must be a boolean`
  );
  eq(
    `returns a template function when provided a TEMPLATE with just ${SOURCE} property`,
    checkFunction(compile(createTestObj2(`{{#r src="/api/test"}}{{/r}}`))),
    true
  );
  eq(
    "should override global autoBody = true when inline autoBody = false",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" autoBody=false}}{{/r}}`
      ),
      {
        autoBody: true
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should override global autoBody = false when inline autoBody = true",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" autoBody=true}}{{/r}}`
      ),
      {
        autoBody: false
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should apply global autoBody = false when inline autoBody is not specified",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form"}}{{/r}}`
      ),
      {
        autoBody: false
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should apply global autoBody = true when inline autoBody is not specified",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form"}}{{/r}}`
      ),
      {
        autoBody: true
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should apply global autoBody.formData = false when inline autoBody is not specified",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form"}}{{/r}}`
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
    "should apply global autoBody.formData = true when inline autoBody is not specified",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form"}}{{/r}}`
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
    "should override global autoBody = false with inline autoBody = { formData:true }",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" autoBody={ formData:true } }}{{/r}}`
      ),
      {
        autoBody: false
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should override global autoBody = true with inline autoBody = { formData:true }",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" autoBody={ formData:true } }}{{/r}}`
      ),
      {
        autoBody: true
      }
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should apply inline autoBody = { formData:true } when no global autoBody is specified",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" autoBody={ formData:true } }}{{/r}}`
      )
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should apply inline autoBody = { formData:false } when no global autoBody is specified",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" autoBody={ formData:false } }}{{/r}}`
      )
    )().response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should apply inline autoBody = { formData:false } with functional RequestInit",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" autoBody={ formData:false } }}{{/r}}`
      )
    )(() => ({})).response?.outerHTML,
    '<div><form id="form"></form><!--hmpl0--></div>'
  );
  eq(
    "should apply inline autoBody = { formData:false } and initID-based RequestInit",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" autoBody={ formData:false } initId="1" }}{{/r}}`
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
    "should render multiple request blocks using distinct initID-based RequestInit configurations",
    compile(
      createTestObj2(
        `<form id="form"></form>{{#r src="/api/test" after="submit:#form" initId="1" }}{{/r}} {{#r src="/api/test" after="submit:#form" initId="2" }}{{/r}}`
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

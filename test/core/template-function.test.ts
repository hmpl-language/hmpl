import nock from "nock";
import {
  RENDER_ERROR,
  REQUEST_COMPONENT_ERROR,
  METHOD,
  BASE_URL,
  RESPONSE_ERROR,
  DEFAULT_ALLOWED_CONTENT_TYPES,
  REQUEST_INIT_ERROR,
  REQUEST_INIT_GET,
  INTERVAL
} from "../config/config";
import { compile, stringify } from "../../src/main";
import {
  waeq,
  e,
  eq,
  eaeq,
  aeq,
  aeqe,
  createTestObj2,
  createTestObj3,
  createTestObj4
} from "./functions";
import sinon from "sinon";

/**
 * Template function
 */
const eq0 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      trigger: "pending",
      content: "<p>Loading...</p>"
    },
    {
      trigger: "pending",
      content: "<p>Loading...</p>"
    }
  ]
});

const eq1 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      trigger: 123 as any,
      content: "<p>Loading...</p>"
    }
  ]
});

const eq2 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      content: "<p>Loading...</p>"
    } as any
  ]
});

const eq3 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      trigger: 100 as any
    } as any
  ]
});

const eaeq1 = stringify({
  src: `${BASE_URL}/api/test`,
  initId: "1"
});

const aeq0 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      trigger: "pending",
      content: "<p>Loading...</p>"
    }
  ]
});

const aeq1 = stringify({
  src: `${BASE_URL}/api/test`,
  after: "click:#click"
});

const aeq2 = stringify({
  src: `${BASE_URL}/api/test`,
  after: "click:#click",
  indicators: [
    {
      trigger: "pending",
      content: "<p>Loading...</p>"
    }
  ]
});

const aeq3 = stringify({
  src: `${BASE_URL}/api/getFormComponent`,
  after: "submit:#form",
  method: "post"
});

const aeq4 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      trigger: 405,
      content: "<p>405</p>"
    }
  ]
});

const aeq5 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      trigger: "error",
      content: "<p>Error</p>"
    }
  ]
});

const aeq6 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      trigger: "rejected",
      content: "<p>Rejected</p>"
    }
  ]
});

const aeq7 = stringify({
  src: `${BASE_URL}/api/test`,
  indicators: [
    {
      trigger: 100,
      content: "<p>100</p>"
    }
  ]
});

const aeq8 = stringify({
  src: `${BASE_URL}/api/test`,
  after: "click:#click",
  repeat: false
});

const aeqe0 = stringify({
  src: `${BASE_URL}/api/test`,
  after: "click:#click",
  initId: "1"
});

const contentType1 = "application/octet-stream";

describe("template function", () => {
  e(
    `only accepts the '${METHOD}' property in the REQUEST COMPONENT as GET, POST, PUT, PATCH, TRACE, OPTIONS or DELETE`,
    () =>
      compile(
        createTestObj2(
          `<button>Click</button>{{#r src="/api/test" method="test" after="click:#increment"}}{{/r}}`
        )
      )(),
    `${REQUEST_COMPONENT_ERROR}: The "${METHOD}" property has only GET, POST, PUT, PATCH, TRACE, OPTIONS or DELETE values`
  );
  e(
    "throws an error if the EVENT TARGET doesn't exist",
    () => compile(`{{#r src="/api/test" after="click:#increment"}}{{/r}}`)(),
    `${RENDER_ERROR}: EventTarget is undefined`
  );
  e(
    "throws an error if Memoization enabled without the Repetition mode enabled",
    () => compile(`{{#r src="/api/test" memo=true}}{{/r}}`)(),
    `${REQUEST_COMPONENT_ERROR}: Memoization works in the enabled repetition mode`
  );
  e(
    `throws an error if the '${REQUEST_INIT_GET}' property in the RequestInit object is a function`,
    () => compile(createTestObj2(`{{#r src="123"}}{{/r}}`))({ get: "" as any }),
    `${REQUEST_INIT_ERROR}: The "${REQUEST_INIT_GET}" property has a function value`
  );
  e(
    "throws an error if the value being passed is a number for RequestInit",
    () =>
      compile(createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`))(
        123 as any
      ),
    `${REQUEST_INIT_ERROR}: The type of the value being passed does not match the supported types for RequestInit`
  );
  e(
    "throws an error if passed duplicate IDs for the RequestInit objects",
    () =>
      compile(createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`))([
        { id: "1", value: {} },
        { id: "1", value: {} }
      ]),
    `${REQUEST_INIT_ERROR}: ID with value "1" already exists`
  );
  e(
    "throws an error if passed duplicate numeric IDs for the RequestInit objects",
    () =>
      compile(createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`))([
        { id: 1, value: {} },
        { id: 1, value: {} }
      ]),
    `${REQUEST_INIT_ERROR}: ID with value 1 already exists`
  );
  e(
    "throws an error if the ID is not a string or a number",
    () =>
      compile(createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`))([
        { id: [] as any, value: {} },
        { id: 1, value: {} }
      ]),
    `${REQUEST_INIT_ERROR}: ID must be a string or a number`
  );
  e(
    "throws an error if the value is not an object for RequestInit object",
    () =>
      compile(createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`))([
        "123" as any,
        { id: 1, value: {} }
      ]),
    `${REQUEST_INIT_ERROR}: IdentificationRequestInit is of type object`
  );
  e(
    "throws an error if the ID or value is not present for RequestInit object",
    () =>
      compile(createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`))([
        {} as any,
        { id: 1, value: {} }
      ]),
    `${REQUEST_INIT_ERROR}: Missing "id" or "value" property`
  );
  e(
    "throws an error if Memoization enabled without the Repetition mode enabled",
    () =>
      compile(
        createTestObj2(
          `<button>Click</button>{{#r src="/api/test" after="click:#increment" memo=true repeat=false}}{{/r}}`
        )
      )(),
    `${REQUEST_COMPONENT_ERROR}: Memoization works in the enabled repetition mode`
  );
  e(
    "throws an error if the selector nodes are not found",
    () =>
      compile(
        createTestObj2(
          `<button>Click</button>{{#r src="/api/test" after="click:#increment"}}{{/r}}`
        )
      )(),
    `${RENDER_ERROR}: Selectors nodes not found`
  );
  eq(
    "renders event-bound template with memoization correctly",
    compile(
      createTestObj2(
        `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment"}}{{/r}}`
      ),
      { memo: true }
    )().response?.outerHTML,
    '<div><button id="increment">Click</button><!--hmpl0--></div>'
  );
  eq(
    "renders event-bound template with memoization and disabled repetition correctly",
    compile(
      createTestObj2(
        `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment" repeat=false}}{{/r}}`
      ),
      { memo: true }
    )().response?.outerHTML,
    '<div><button id="increment">Click</button><!--hmpl0--></div>'
  );
  e(
    "throws an error if passed duplicate indicator triggers",
    () => compile(createTestObj2(`${eq0}`))(),
    `${REQUEST_COMPONENT_ERROR}: Indicator trigger must be unique`
  );
  e(
    "throws an error if provided an invalid indicator trigger",
    () => compile(createTestObj2(`${eq1}`))(),
    `${REQUEST_COMPONENT_ERROR}: Failed to activate or detect the indicator`
  );
  e(
    "throws an error if trigger is not provided to the indicators",
    () => compile(createTestObj2(`${eq2}`))(),
    `${REQUEST_COMPONENT_ERROR}: Failed to activate or detect the indicator`
  );
  e(
    "throws an error if trigger is a number and the value is not provided to the indicators",
    () => compile(createTestObj2(`${eq3}`))(),
    `${REQUEST_COMPONENT_ERROR}: Failed to activate or detect the indicator`
  );
  e(
    "throws an error if interval is used with memoized request",
    () =>
      compile(
        createTestObj2(
          `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment" memo=true interval=1000}}{{/r}}`
        )
      )(),
    `${REQUEST_COMPONENT_ERROR}: The "${INTERVAL}" property does not work with repetiton mode yet`
  );
  e(
    "throws an error if interval is passed as a string instead of a number",
    () =>
      compile(
        createTestObj2(
          `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment" memo=true interval="1000"}}{{/r}}`
        )
      )(),
    `${REQUEST_COMPONENT_ERROR}: The "${INTERVAL}" value must be number`
  );
  eq(
    "Should render memoized request after click with global memo disabled",
    compile(
      createTestObj2(
        `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment" memo=true}}{{/r}}`
      ),
      { memo: false }
    )().response?.outerHTML,
    '<div><button id="increment">Click</button><!--hmpl0--></div>'
  );
  eq(
    "Should render memoized request after click with global memo disabled",
    compile(
      createTestObj2(
        `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment" memo=true}}{{/r}}`
      ),
      { memo: false }
    )().response?.outerHTML,
    '<div><button id="increment">Click</button><!--hmpl0--></div>'
  );
  eq(
    "Should not memoize when memo=false is set inline, even if global memo is enabled",
    compile(
      createTestObj2(
        `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment" memo=false}}{{/r}}`
      ),
      { memo: true }
    )().response?.outerHTML,
    '<div><button id="increment">Click</button><!--hmpl0--></div>'
  );
  eq(
    "Should render static request block with only a src and no after",
    compile(createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`))()
      .response?.outerHTML,
    "<div><!--hmpl0--></div>"
  );
  eq(
    "Should render dynamic request block after click without memo flag",
    compile(
      createTestObj2(
        `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment"}}{{/r}}`
      )
    )().response?.outerHTML,
    '<div><button id="increment">Click</button><!--hmpl0--></div>'
  );
  eq(
    "Should render request block with indicators and placeholder on initial load",
    compile(
      createTestObj2(
        `<button id="increment">Click</button>{{#r src="/api/test" after="click:#increment"}}
    {{#indicator trigger="pending"}}
      <p>Loading...</p>
    {{/indicator}}
    {{#indicator trigger="rejected"}}
      <p>Error</p><button>Retry</button>
    {{/indicator}}{{/r}}`
      )
    )().response?.outerHTML,
    '<div><button id="increment">Click</button><!--hmpl0--></div>'
  );
  eaeq(
    "throws an error if content type is not allowed",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    `${RESPONSE_ERROR}: Expected ${DEFAULT_ALLOWED_CONTENT_TYPES.map(
      (type) => `"${type}"`
    ).join(", ")}, but received "${contentType1}"`,
    () => ({}) as any,
    {},
    {
      template: Buffer.from("<div>123</div>", "utf-8"),
      headers: {
        "Content-Type": contentType1
      }
    }
  );
  eaeq(
    "throws an error if content type is empty",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    `${RESPONSE_ERROR}: Expected ${DEFAULT_ALLOWED_CONTENT_TYPES.map(
      (type) => `"${type}"`
    ).join(", ")}, but received ""`,
    () => ({}) as any,
    {},
    {
      template: Buffer.from("<div>123</div>", "utf-8"),
      headers: {
        "Content-Type": ""
      }
    }
  );
  eaeq(
    "throws an error if a header value is not a string",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    `${REQUEST_INIT_ERROR}: Expected type string, but received type object`,
    () => ({}) as any,
    {
      headers: {
        a: {}
      }
    },
    {}
  );
  eaeq(
    "throws an error if initialization options are not an object",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    `${REQUEST_INIT_ERROR}: Expected an object with initialization options`,
    () => ({}) as any,
    () => () => 1 as any,
    {}
  );
  eaeq(
    "throws an error if initialization options are not an object",
    createTestObj2(
      `{{#r src="${BASE_URL}/api/test"}}{{/r}}{{#r src="${BASE_URL}/api/test"}}{{/r}}`
    ),
    `${REQUEST_INIT_ERROR}: Expected an object with initialization options`,
    () => ({}) as any,
    () => () => 1 as any,
    {}
  );
  eaeq(
    "throws an error if 'headers' property is not a value object",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    `${REQUEST_INIT_ERROR}: The "headers" property must contain a value object`,
    () => ({}) as any,
    {
      headers: []
    },
    {}
  );
  eaeq(
    "throws an error if referenced request ID is not found",
    createTestObj2(`${eaeq1}`),
    `${REQUEST_COMPONENT_ERROR}: ID referenced by request not found`,
    () => ({}) as any,
    (res: any) => [
      {
        id: "2",
        value: {}
      }
    ],
    {}
  );
  eaeq(
    "throws an error if referenced request ID is not found",
    createTestObj2(`${eaeq1}`),
    `${REQUEST_COMPONENT_ERROR}: ID referenced by request not found`,
    () => ({}) as any,
    (res: any) => [
      {
        id: "2",
        value: {}
      }
    ],
    {}
  );
  eaeq(
    "throws an error if initialization data is not an array and request ID is not found",
    createTestObj2(`${eaeq1}`),
    `${REQUEST_COMPONENT_ERROR}: ID referenced by request not found`,
    () => ({}) as any,
    (res: any) => ({}),
    {}
  );
  aeq(
    "throws an error if the referenced request ID is empty or not found",
    createTestObj2(`{{#r src="${BASE_URL}/api/test" initId=""}}{{/r}}`),
    () => ({}),
    (res: any) => [
      {
        id: "2",
        value: {}
      }
    ],
    undefined,
    undefined,
    true
  );
  aeq(
    "renders template content inside a template element",
    `{{#r src="${BASE_URL}/api/test"}}{{/r}}`,
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<template><div>123</div></template>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {}
  );
  aeq(
    "renders template content inside a template element and clear interval",
    `{{#r src="${BASE_URL}/api/test" interval=100}}{{/r}}`,
    (res, prop, value, context) => {
      context.request.clearInterval();
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<template><div>123</div></template>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {}
  );
  aeq(
    "renders error template when request is rejected",
    createTestObj2(`${aeq5}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><p>Error</p></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      isRejected: true
    }
  );
  aeq(
    "returns the status as 'rejected' when request is rejected",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "status":
          if (value === "rejected") {
            res(true);
          }
          break;
      }
    },
    {},
    {
      isRejected: true
    }
  );
  aeq(
    "returns status 'rejected' when request is rejected",
    createTestObj2(`${aeq7}`),
    (res, prop, value) => {
      switch (prop) {
        case "status":
          if (value === "rejected") {
            res(true);
          }
          break;
      }
    },
    {},
    {
      isRejected: true
    }
  );
  aeq(
    "returns status 100 when indicators array is empty",
    createTestObj2(`{{#r src="${BASE_URL}/api/test" indicators=[]}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "status":
          if (value === 100) {
            res(true);
          }
          break;
      }
    },
    {},
    {
      code: 100
    }
  );
  aeq(
    "renders 'Rejected' indicator when rejection is triggered",
    createTestObj2(`${aeq6}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><p>Rejected</p></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      isRejected: true
    }
  );
  aeq(
    "renders the '100' indicator when response status is 100",
    createTestObj2(`${aeq7}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><p>100</p></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      code: 100
    }
  );
  waeq(
    "throws REQUEST_INIT_ERROR when 'signal' overrides AbortSignal from 'timeout'",
  `{{#r src="${BASE_URL}/api/test"}}{{/r}}`,
    `${REQUEST_INIT_ERROR}: The "signal" property overwrote the AbortSignal from "timeout"`,
    () => ({}) as any,
    {
      timeout: 1000,
      signal: new AbortController().signal
    },
    {}
  );
  waeq(
    "throws REQUEST_INIT_ERROR when 'keepalive' property is used but not supported",
    `{{#r src="${BASE_URL}/api/test"}}{{/r}}`,
    `${REQUEST_INIT_ERROR}: The "keepalive" property is not yet supported`,
    () => ({}) as any,
    {
      keepalive: true
    },
    {}
  );
  aeq(
    "renders correctly when 'script' tag is disallowed and stripped",
    createTestObj2(
      `{{#r src="${BASE_URL}/api/test" disallowedTags=["script"]}}{{/r}}`
    ),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: "<div>123</div><script></script>"
    }
  );
  aeq(
    "renders correctly when 'script' tag is stripped despite 'style' being disallowed in config",
    createTestObj2(
      `{{#r src="${BASE_URL}/api/test" disallowedTags=["script"]}}{{/r}}`
    ),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: "<div>123</div><script></script>"
    },
    {
      disallowedTags: ["style"]
    }
  );

  aeq(
    "renders correctly and clears interval when 'script' tag is disallowed",
    createTestObj2(
      `{{#r src="${BASE_URL}/api/test" disallowedTags=["script"] interval=100}}{{/r}}`
    ),
    (res, prop, value, context) => {
      context.request.clearInterval();
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: "<div>123</div><script></script>"
    },
    {
      disallowedTags: ["style"]
    }
  );

  aeq(
    "renders correctly when 'sanitize' is enabled and 'script' tag is stripped",
    createTestObj2(`{{#r src="${BASE_URL}/api/test" sanitize=true}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: "<div>123</div><script></script>"
    },
    {}
  );
  aeq(
    "renders correctly  when template sanitization is enabled but runtime config disables it",
    createTestObj2(`{{#r src="${BASE_URL}/api/test" sanitize=true}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: "<div>123</div><script></script>"
    },
    {
      sanitize: false
    }
  );
  aeq(
    "renders correctly when memoization is enabled",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {},
    {
      memo: true
    }
  );
  aeq(
    "renders correctly with default configuration",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    }
  );
  aeq(
    "renders '<p>Loading...</p>' when 'pending' indicator is triggered",
    createTestObj2(
      `{{#r src="${BASE_URL}/api/test" indicators=[{trigger:"pending", content:"<p>Loading...</p>"}]}}{{/r}}`
    ),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><p>Loading...</p></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    }
  );
  aeq(
    "renders correctly with Buffer template and single allowed content type",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: Buffer.from("<div>123</div>", "utf-8"),
      headers: {
        "Content-Type": "application/octet-stream"
      }
    },
    {
      allowedContentTypes: ["application/octet-stream"]
    }
  );

  aeq(
    "renders correctly with Buffer template when content type is included in allowed list",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: Buffer.from("<div>123</div>", "utf-8"),
      headers: {
        "Content-Type": "application/octet-stream"
      }
    },
    {
      allowedContentTypes: ["text/html", "application/octet-stream"]
    }
  );

  aeq(
    "renders correctly when content type is 'application/octet-stream' and no types are allowed",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: Buffer.from("<div>123</div>", "utf-8"),
      headers: {
        "Content-Type": "application/octet-stream"
      }
    },
    {
      allowedContentTypes: []
    }
  );

  aeq(
    "renders correctly when multiple identical templates are composed",
    createTestObj2(
      `{{#r src="${BASE_URL}/api/test"}}{{/r}}{{#r src="${BASE_URL}/api/test"}}{{/r}}`
    ),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div><div>123</div></div>`) {
            res(true);
          }
          break;
      }
    },
    {}
  );

  aeq(
    "renders correctly when content type is 'application/octet-stream' and all types are allowed",
    createTestObj2(`{{#r src="${BASE_URL}/api/test"}}{{/r}}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: Buffer.from("<div>123</div>", "utf-8"),
      headers: {
        "Content-Type": "application/octet-stream"
      }
    },
    {
      allowedContentTypes: "*"
    }
  );

  aeq(
    "renders correctly when template config matches but runtime config mismatches",
    createTestObj2(
      `{{#r src="${BASE_URL}/api/test" allowedContentTypes=["application/octet-stream"]}}{{/r}}`
    ),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {
      template: Buffer.from("<div>123</div>", "utf-8"),
      headers: {
        "Content-Type": "application/octet-stream"
      }
    },
    {
      allowedContentTypes: ["text/html"]
    }
  );

  aeq(
    "renders correctly with Buffer template under timeout constraint",
    createTestObj2(
      `{{#r src="${BASE_URL}/api/test" allowedContentTypes=["application/octet-stream"]}}{{/r}}`
    ),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><div>123</div></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {
      timeout: 1000
    },
    {
      template: Buffer.from("<div>123</div>", "utf-8"),
      headers: {
        "Content-Type": "application/octet-stream"
      }
    }
  );
  aeq(
    "renders '<p>Loading...</p>' when 'pending' indicator is triggered",
    createTestObj2(`${aeq0}`), (res, prop, value) => {
    switch (prop) {
      case "response":
        if (value?.outerHTML === `<div><p>Loading...</p></div>`) {
          res(true);
        } else {
          res(false);
        }
        break;
    }
  });
  aeq(
    "renders correctly when output is wrapped in a <template> tag",
    `${aeq0}`, (res, prop, value) => {
    switch (prop) {
      case "response":
        if (value?.outerHTML === `<template><div>123</div></template>`) {
          res(true);
        }
        break;
    }
  });
  aeq(
    "renders a 405 error wrapped in a <template> tag",
    `${aeq4}`,
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<template><p>405</p></template>`) {
            res(true);
          }
          break;
      }
    },
    {},
    {
      code: 405
    }
  );
  aeq(
    "renders the error template when response code is 405",
    `${aeq5}`,
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<template><p>Error</p></template>`) {
            res(true);
          }
          break;
      }
    },
    {},
    {
      code: 405
    }
  );
  aeq(
    "renders '<p>Loading...</p>' with advanced fetch options",
    createTestObj2(`${aeq0}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value?.outerHTML === `<div><p>Loading...</p></div>`) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {
      mode: "cors",
      cache: "no-cache",
      integrity: "sha256",
      referrer: "about:client",
      credentials: "same-origin",
      redirect: "follow",
      window: "",
      referrerPolicy: "no-referrer",
      headers: {
        "Cache-Control": "no-cache"
      }
    }
  );
  aeqe(
    "renders '<div>123</div>' inside <pre> alongside button",
    `<pre><button id="click">click</button>${aeq1}</pre>`,
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<pre><button id="click">click</button><div>123</div></pre>`
          ) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    }
  );
  aeqe(
    "renders '<div>123</div>' alongside button",
    createTestObj3(`${aeq1}`),
    () => ({}),
    {},
    (res: any) => () => {
      return {
        get: (prop: any, value: any) => {
          switch (prop) {
            case "response":
              if (
                value?.outerHTML ===
                `<div><button id="click">click</button><div>123</div></div>`
              ) {
                res(true);
              } else {
                res(false);
              }
              break;
          }
        }
      };
    }
  );
  aeqe(
    "renders '<div>123</div>' using array response handler",
    createTestObj3(`${aeqe0}`),
    () => ({}),
    {},
    (res: any) => [
      {
        id: "1",
        value: {
          get: (prop: any, value: any) => {
            switch (prop) {
              case "response":
                if (
                  value?.outerHTML ===
                  `<div><button id="click">click</button><div>123</div></div>`
                ) {
                  res(true);
                }
                break;
            }
          }
        }
      }
    ]
  );
  aeqe(
    "renders duplicated '<div>123</div>' blocks",
    createTestObj3(`${aeq1}${aeq1}`), (res, prop, value) => {
    switch (prop) {
      case "response":
        if (
          value?.outerHTML ===
          `<div><button id="click">click</button><div>123</div><div>123</div></div>`
        ) {
          res(true);
        }
        break;
    }
  });
  let memoItem: Element | undefined = undefined;
  aeqe(
    "memoizes the inner '<div>123</div>' element",
    createTestObj3(`${aeq1}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>123</div></div>`
          ) {
            if (!memoItem) {
              memoItem = value;
            } else {
              res(memoItem.childNodes[1] === value.childNodes[1]);
            }
          } else {
            res(false);
          }
          break;
      }
    },
    {
      memo: true
    },
    {},
    {},
    2
  );

  aeqe(
    "renders two duplicated '<div>123</div>' blocks",
    createTestObj3(`${aeq8}${aeq8}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>123</div><div>123</div></div>`
          ) {
            res(true);
          }
          break;
      }
    },
    {},
    {},
    {},
    1
  );

  aeqe(
    "renders nested '<pre><pre>123</pre></pre>'",
    createTestObj3(`<pre>${aeq8}</pre>`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><pre><pre>123</pre></pre></div>`
          ) {
            res(true);
          }
          break;
      }
    },
    {},
    {},
    {
      template: "<pre>123</pre>"
    },
    1
  );

  let memoItem1: Element | undefined = undefined;
  aeqe(
    "renders distinct nodes for repeated renders when memoization is disabled",
    createTestObj3(`${aeq1}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>123</div></div>`
          ) {
            if (!memoItem1) {
              memoItem1 = value;
            } else {
              // this is false
              res(memoItem1.childNodes[1] === value.childNodes[1]);
            }
          } else {
            res(false);
          }
          break;
      }
    },
    {},
    {},
    {},
    2
  );
  let memoItem2: Element | undefined = undefined;
  aeqe(
    "memoizes the inner '<div>123</div>' element",
    createTestObj3(`${aeq2}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>123</div></div>`
          ) {
            if (!memoItem2) {
              memoItem2 = value;
            } else {
              res(memoItem2.childNodes[1] === value.childNodes[1]);
            }
          }
          break;
      }
    },
    {},
    {},
    {},
    2
  );
  let count = 0;
  aeqe(
    "renders '<div>123</div>' consistently across 3 renders",
    createTestObj3(`${aeq1}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>123</div></div>`
          ) {
            if (!memoItem2) {
              if (!count) {
                count++;
              } else {
                memoItem2 = value;
              }
            } else {
              res(true);
            }
          }
          break;
      }
    },
    {},
    {},
    {},
    3
  );
  aeqe(
    "does not memoize '<div>123</div>' across repeated renders",
    createTestObj3(`${aeq2}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>123</div></div>`
          ) {
            if (!memoItem2) {
              memoItem2 = value;
            } else {
              res(memoItem2.childNodes[1] !== value.childNodes[1]);
            }
          }
          break;
      }
    },
    {
      memo: true
    },
    {},
    {},
    2
  );
  // status templateObject check
  aeqe(
    "renders '<!--hmpl0-->' placeholder after a 200 response",
    createTestObj3(`${aeq1}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><!--hmpl0--></div>`
          ) {
            res(true);
          }
          break;
      }
    },
    {
      memo: true
    },
    {},
    {
      isAfter: true,
      afterCode: 200,
      afterHeaders: {
        "Content-Type": contentType1
      },
      times: 1
    },
    2,
    undefined,
    undefined,
    {
      timeout: 300
    }
  );
  aeqe(
    "fails to memoize the inner '<div>123</div>' element",
    createTestObj3(`${aeq2}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>123</div></div>`
          ) {
            if (!memoItem2) {
              memoItem2 = value;
            } else {
              res(memoItem2.childNodes[1] !== value.childNodes[1]);
            }
          }
          break;
      }
    },
    {
      memo: true
    },
    {},
    {},
    2
  );

  aeqe(
    "fails to memoize with createTestObj4 and autoBody: true",
    createTestObj4(`${aeq3}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><form onsubmit="function prevent(e){e.preventDefault();};return prevent(event);" id="form"></form><div>123</div></div>`
          ) {
            res(true);
          } else {
            res(false);
          }
          break;
      }
    },
    {
      autoBody: true
    },
    {},
    {
      route: "/api/getFormComponent",
      method: "post"
    },
    1,
    (el) => {
      return el?.getElementsByTagName("form")?.[0];
    },
    "submit"
  );

  aeqe(
    "renders undefined response when status code is 405",
    `${aeq0}`,
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value === undefined) {
            res(true);
          }
          break;
      }
    },
    {},
    {},
    {
      code: 405
    }
  );

  aeqe(
    "renders two status placeholders after a 405 response,
    createTestObj3(`${aeq0}${aeq0}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><!--hmpl0--><!--hmpl1--></div>`
          ) {
            res(true);
          }
          break;
      }
    },
    {},
    {},
    {
      code: 405,
      times: 1,
      isAfter: true
    },
    2
  );

  aeqe(
    "renders updated content after a 200 response",
    createTestObj3(`${aeq1}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>567</div></div>`
          ) {
            res(true);
          }
          break;
      }
    },
    {
      memo: true
    },
    {},
    {
      afterCode: 200,
      afterTemplate: "<div>567</div>",
      times: 1,
      isAfter: true
    },
    2
  );

  let memoItem3: Element | undefined;

  aeqe(
    "memoizes inner '<div>123</div>' element",
    createTestObj3(`${aeq2}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><div>123</div></div>`
          ) {
            if (!memoItem3) {
              memoItem3 = value;
            } else {
              res(memoItem3.childNodes[1] === value.childNodes[1]);
            }
          }
          break;
      }
    },
    {
      memo: true
    },
    {},
    {},
    2,
    undefined,
    undefined,
    {
      timeout: 300
    }
  );

  aeqe(
    "renders status placeholder '<!--hmpl0-->' after a 405 response"
    createTestObj3(`${aeq2}`),
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (
            value?.outerHTML ===
            `<div><button id="click">click</button><!--hmpl0--></div>`
          ) {
            res(true);
          }
          break;
      }
    },
    {
      memo: true
    },
    {},
    {
      afterCode: 405,
      times: 1,
      isAfter: true
    },
    2
  );

  aeqe(
    "renders undefined response when status code is 405",
    `${aeq0}`,
    (res, prop, value) => {
      switch (prop) {
        case "response":
          if (value === undefined) {
            res(true);
          }
          break;
      }
    },
    {},
    {},
    {
      code: 405
    }
  );
  afterEach(() => {
    sinon.restore();
    nock.cleanAll();
  });
});

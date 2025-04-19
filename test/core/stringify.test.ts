import { stringify } from "../../src/main";
import { eq } from "./functions";

/**
 * Function "stringify"
 */

describe("stringify function — HMPLRequestInfo attributes", () => {
  eq(
    "src (string)",
    stringify({ src: "/api/test" }),
    '{{#request src="/api/test"}}{{/request}}'
  );

  eq(
    "src (string)",
    stringify({ src: "/api/test", indicators: [] }),
    '{{#request src="/api/test" indicators=[]}}{{/request}}'
  );

  eq(
    "method (string)",
    stringify({ src: "/api/test", method: "POST" }),
    '{{#request src="/api/test" method="POST"}}{{/request}}'
  );

  eq(
    "initId (string | number)",
    stringify({ src: "/api/test", initId: "abc123" }),
    '{{#request src="/api/test" initId="abc123"}}{{/request}}'
  );

  eq(
    "initId (number)",
    stringify({ src: "/api/test", initId: 42 }),
    '{{#request src="/api/test" initId=42}}{{/request}}'
  );

  eq(
    "after (string)",
    stringify({ src: "/api/test", after: "someAction" }),
    '{{#request src="/api/test" after="someAction"}}{{/request}}'
  );

  eq(
    "repeat (boolean)",
    stringify({ src: "/api/test", repeat: true }),
    '{{#request src="/api/test" repeat=true}}{{/request}}'
  );

  eq(
    "memo (boolean)",
    stringify({ src: "/api/test", memo: false }),
    '{{#request src="/api/test" memo=false}}{{/request}}'
  );

  eq(
    "interval (number)",
    stringify({ src: "/api/test", interval: 5000 }),
    '{{#request src="/api/test" interval=5000}}{{/request}}'
  );

  eq(
    "allowedContentTypes (string | array)",
    stringify({ src: "/api/test", allowedContentTypes: ["application/json"] }),
    '{{#request src="/api/test" allowedContentTypes=["application/json"]}}{{/request}}'
  );

  eq(
    "allowedContentTypes (array)",
    stringify({
      src: "/api/test",
      allowedContentTypes: ["application/json", "text/html"]
    }),
    '{{#request src="/api/test" allowedContentTypes=["application/json","text/html"]}}{{/request}}'
  );

  eq(
    "allowedContentTypes (string | array) — строка",
    stringify({ a: Symbol("a") } as any),
    "{{#request a=}}{{/request}}"
  );
});

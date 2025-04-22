import { stringify } from "../../src/main";
import { eq } from "./functions";

/**
 * Function "stringify"
 */

describe("stringify function — HMPLRequestInfo attributes", () => {
  eq(
    "should format a basic request with src attribute",
    stringify({ src: "/api/test" }),
    '{{#request src="/api/test"}}{{/request}}'
  );

  eq(
    "should format a request with src and empty indicators array",
    stringify({ src: "/api/test", indicators: [] }),
    '{{#request src="/api/test" indicators=[]}}{{/request}}'
  );

  eq(
    "should format a request with src and HTTP method",
    stringify({ src: "/api/test", method: "POST" }),
    '{{#request src="/api/test" method="POST"}}{{/request}}'
  );

  eq(
    "should format a request with string initId attribute",
    stringify({ src: "/api/test", initId: "abc123" }),
    '{{#request src="/api/test" initId="abc123"}}{{/request}}'
  );

  eq(
    "should format a request with numeric initId attribute",
    stringify({ src: "/api/test", initId: 42 }),
    '{{#request src="/api/test" initId=42}}{{/request}}'
  );

  eq(
    "should format a request with after attribute",
    stringify({ src: "/api/test", after: "someAction" }),
    '{{#request src="/api/test" after="someAction"}}{{/request}}'
  );

  eq(
    "should format a request with repeat boolean flag",
    stringify({ src: "/api/test", repeat: true }),
    '{{#request src="/api/test" repeat=true}}{{/request}}'
  );

  eq(
    "should format a request with memo boolean flag",
    stringify({ src: "/api/test", memo: false }),
    '{{#request src="/api/test" memo=false}}{{/request}}'
  );

  eq(
    "should format a request with numeric interval parameter",
    stringify({ src: "/api/test", interval: 5000 }),
    '{{#request src="/api/test" interval=5000}}{{/request}}'
  );

  eq(
    "should format a request with single allowedContentType",
    stringify({ src: "/api/test", allowedContentTypes: ["application/json"] }),
    '{{#request src="/api/test" allowedContentTypes=["application/json"]}}{{/request}}'
  );

  eq(
    "should format a request with multiple allowedContentTypes",
    stringify({
      src: "/api/test",
      allowedContentTypes: ["application/json", "text/html"]
    }),
    '{{#request src="/api/test" allowedContentTypes=["application/json","text/html"]}}{{/request}}'
  );

  eq(
    "should handle Symbol values by outputting empty attribute value",
    stringify({ a: Symbol("a") } as any),
    "{{#request a=}}{{/request}}"
  );
});
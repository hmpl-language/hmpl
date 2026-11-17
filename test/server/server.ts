import nock from "nock";
import { BASE_URL } from "../config/config";
import { strict as assert } from "assert";
import sinon from "sinon";
import type { ScopeOptions } from "../core/functions.types";

let fetchCalled = false;
const fetchStubs: sinon.SinonStub[] = [];

const createScope = ({
  code = 200,
  afterCode = 405,
  template = "<div>123</div>",
  route = "/api/test",
  method = "get",
  times = 999,
  isAfter = false,
  isRejected = false,
  afterTemplate = "",
  headers = {
    "Content-Type": "text/html"
  },
  afterHeaders = {
    "Content-Type": "text/html"
  }
}: ScopeOptions) => {
  let callCount = 0;

  // The native Response (and nock on top of it) can't produce 1xx statuses, so fetch is stubbed.
  if (code < 200 && !isAfter) {
    const fetchStub = sinon.stub(global, "fetch").callsFake(async () => {
      fetchCalled = true;
      return {
        status: code,
        ok: false,
        headers: new Headers(headers),
        text: async () => String(template)
      } as unknown as Response;
    });
    fetchStubs.push(fetchStub);
  }

  return nock(BASE_URL)
    .persist()
    [method](route)
    .reply(() => {
      if (isRejected) {
        return new Error("Network error occurred");
      }

      if (isAfter) {
        callCount++;
        if (callCount <= times) {
          return [code, template, headers];
        } else {
          return [afterCode, afterTemplate, afterHeaders];
        }
      } else {
        return [code, template, headers];
      }
    });
};

const clearScope = async (scope: nock.Scope) => {
  const isDone = () => scope.isDone() || (fetchStubs.length > 0 && fetchCalled);
  for (let i = 0; i < 50 && !isDone(); i++) {
    await new Promise((res) => setTimeout(res, 10));
  }
  assert.strictEqual(isDone(), true, "Not all requests were completed");
  nock.cleanAll();
  fetchStubs.splice(0).forEach((stub) => stub.restore());
  fetchCalled = false;
};

export { createScope, clearScope };

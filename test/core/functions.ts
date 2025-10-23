import "../setup/setup";
import "../setup/server.setup";
import { strict as assert } from "assert";
import { HMPLRequestInfo, HMPLRequestGetParams } from "../../src/types";
import { createScope, clearScope } from "../server/server";
import { compile, stringify } from "../../src/main";
import { checkFunction } from "../shared/utils";
import type { EventOptions, ScopeOptions } from "./functions.types";
import sinon from "sinon";
import * as MainModule from "../../src/main";

const e = (text: string, block: () => unknown, message: string) => {
  it(text, () => {
    assert.throws(block, {
      message
    });
  });
};

const eaeq = (
  text: string,
  template: string,
  message: string,
  get: (...args: any[]) => void,
  options: any = {},
  scopeOptions: ScopeOptions = {},
  compileOptions: any = {}
) => {
  it(text, async () => {
    const scope = createScope({ ...scopeOptions });
    const createErrorStub = sinon.stub(MainModule, "createError");
    const compile = MainModule.compile;

    await new Promise((res) => {
      const currentOptions = checkFunction(options)
        ? options(res)
        : {
            get: (params: HMPLRequestGetParams) => get(params, res),
            ...options
          };
      compile(template, compileOptions)(currentOptions);
      setTimeout(() => {
        res(true);
      }, 200);
    });
    sinon.assert.calledWith(createErrorStub, message);
    createErrorStub.restore();
    clearScope(scope);
    sinon.restore();
  });
};

const waeq = (
  text: string,
  template: string,
  warningMessage: string,
  get: (params: HMPLRequestGetParams) => void,
  options: any = {},
  scopeOptions: ScopeOptions = {},
  compileOptions: any = {}
) => {
  it(text, async () => {
    const scope = createScope({ ...scopeOptions });
    const createWarningStub = sinon.stub(MainModule, "createWarning");
    const compile = MainModule.compile;

    await new Promise((res) => {
      compile(
        template,
        compileOptions
      )({
        get: (params: HMPLRequestGetParams) => get(params),
        ...options
      });
      setTimeout(() => {
        res(true);
      }, 300);
    });
    sinon.assert.calledWith(createWarningStub, warningMessage);
    createWarningStub.restore();
    clearScope(scope);
    sinon.restore();
  });
};

const eq = (text: string, block: unknown, equality: any) => {
  it(text, () => {
    assert.strictEqual(block, equality);
  });
};

const aeq = (
  text: string,
  template: string,
  get: (...args: any[]) => void,
  options: any = {},
  scopeOptions: ScopeOptions = {},
  compileOptions: any = {},
  isDeepEqual = false
) => {
  it(text, async () => {
    const scope = createScope({ ...scopeOptions });
    const req = await new Promise((res) => {
      const currentOptions = checkFunction(options)
        ? options(res)
        : {
            get: (params: HMPLRequestGetParams) => get(params, res),
            ...options
          };
      compile(template, compileOptions)(currentOptions);
      if (isDeepEqual) {
        setTimeout(() => {
          res(true);
        }, 100);
      }
    });
    assert.deepEqual(isDeepEqual ? true : req, true);
    clearScope(scope);
  });
};

const aeqError = (
  template: string,
  get: (params: HMPLRequestGetParams) => void,
  options: any = {},
  scopeOptions: ScopeOptions = {}
) => {
  it("should handle template errors correctly", async () => {
    const scope = createScope({ ...scopeOptions });

    try {
      const req = await new Promise<string>((resolve) => {
        compile(template)({
          get: (params: HMPLRequestGetParams) => get(params),
          ...options
        });
      });
      assert.deepEqual(req, "true");
    } catch (e) {
      console.error("Error occurred during test:", e);
      throw e;
    } finally {
      clearScope(scope);
    }
  });
};
const defaultGetEl: (el: Element | null | undefined) => Element | undefined = (
  el
) => el?.getElementsByTagName("button")?.[0];

// async equal event
const aeqe = (
  text: string,
  template: string,
  get: (...args: any[]) => void,
  compileOptions: any = {},
  options: any = {},
  scopeOptions: ScopeOptions = {},
  quantity = 1,
  getEl = defaultGetEl,
  event: string = "click",
  eventOptions: EventOptions = {},
  eventInit: EventInit = {
    bubbles: true,
    cancelable: true
  }
) => {
  it(text, async () => {
    const scope = createScope({ ...scopeOptions });
    const req = await new Promise((res) => {
      const currentOptions = checkFunction(options)
        ? options(res)
        : {
            get: (params: HMPLRequestGetParams) => get(params, res),
            ...options
          };
      const instance = compile(template, compileOptions)(currentOptions);
      const el = instance.response;
      const currentEl = getEl(el);
      if (currentEl) {
        for (let i = 0; i < quantity; i++) {
          if (currentEl) {
            const dispatchCustomEvent = () => {
              const clickEvent = new window.Event(event, eventInit);
              currentEl.dispatchEvent(clickEvent);
            };
            if (eventOptions.timeout) {
              setTimeout(
                () => {
                  dispatchCustomEvent();
                },
                eventOptions.timeout + i * 100
              );
            } else {
              dispatchCustomEvent();
            }
          }
        }
      }
    });
    assert.deepEqual(req, true);
    clearScope(scope);
  });
};

const createTestObj1 = (obj: Record<string, any>) => {
  return `<div>${stringify(obj as HMPLRequestInfo)}</div>`;
};

const createTestObj2 = (text: string) => {
  return `<div>${text}</div>`;
};
const createTestObj3 = (text: string) => {
  return `<div><button id="click">click</button>${text}</div>`;
};

const createTestObj4 = (text: string) => {
  return `<div><form onsubmit="function prevent(e){e.preventDefault();};return prevent(event);" id="form"></form>${text}</div>`;
};

export {
  waeq,
  e,
  eaeq,
  eq,
  aeq,
  aeqe,
  aeqError,
  createTestObj1,
  createTestObj2,
  createTestObj3,
  createTestObj4
};

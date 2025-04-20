"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  compile: () => compile,
  stringify: () => stringify
});
module.exports = __toCommonJS(main_exports);
var import_json5 = __toESM(require("json5"));
var import_dompurify = __toESM(require("dompurify"));
var checkObject = (val) => {
  return typeof val === "object" && !Array.isArray(val) && val !== null;
};
var checkIsStringArray = (arr, currentError) => {
  if (!Array.isArray(arr)) return false;
  let isArrString = true;
  for (let i = 0; i < arr.length; i++) {
    const arrItem = arr[i];
    if (typeof arrItem !== "string") {
      createError(
        `${currentError}: In the array, the element with index ${i} is not a string`
      );
      isArrString = false;
      break;
    }
  }
  return isArrString;
};
var checkFunction = (val) => {
  return Object.prototype.toString.call(val) === "[object Function]";
};
var createError = (text) => {
  throw new Error(text);
};
var createWarning = (text) => {
  console.warn(text);
};
var getIsMethodValid = (method) => {
  return method !== "get" && method !== "post" && method !== "put" && method !== "delete" && method !== "patch";
};
var SOURCE = `src`;
var METHOD = `method`;
var ID = `initId`;
var AFTER = `after`;
var REPEAT = `repeat`;
var MEMO = `memo`;
var INDICATORS = `indicators`;
var AUTO_BODY = `autoBody`;
var COMMENT = `hmpl`;
var FORM_DATA = `formData`;
var DISALLOWED_TAGS = `disallowedTags`;
var SANITIZE = `sanitize`;
var ALLOWED_CONTENT_TYPES = "allowedContentTypes";
var REQUEST_INIT_GET = `get`;
var INTERVAL = `interval`;
var RESPONSE_ERROR = `BadResponseError`;
var REQUEST_INIT_ERROR = `RequestInitError`;
var RENDER_ERROR = `RenderError`;
var REQUEST_COMPONENT_ERROR = `RequestComponentError`;
var COMPILE_OPTIONS_ERROR = `CompileOptionsError`;
var PARSE_ERROR = `ParseError`;
var COMPILE_ERROR = `CompileError`;
var DEFAULT_AUTO_BODY = {
  formData: true
};
var DEFAULT_FALSE_AUTO_BODY = {
  formData: false
};
var REQUEST_OPTIONS = [
  SOURCE,
  METHOD,
  ID,
  AFTER,
  REPEAT,
  INDICATORS,
  MEMO,
  AUTO_BODY,
  ALLOWED_CONTENT_TYPES,
  DISALLOWED_TAGS,
  SANITIZE,
  INTERVAL
];
var CODES = [
  100,
  101,
  102,
  103,
  300,
  301,
  302,
  303,
  304,
  305,
  306,
  307,
  308,
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  408,
  409,
  410,
  411,
  412,
  413,
  414,
  415,
  416,
  417,
  418,
  421,
  422,
  423,
  424,
  425,
  426,
  428,
  429,
  431,
  451,
  500,
  501,
  502,
  503,
  504,
  505,
  506,
  507,
  508,
  510,
  511
];
var DISALLOWED_TAGS_VALUES = ["script", "style", "iframe"];
var DEFAULT_SANITIZE = false;
var DEFAULT_ALLOWED_CONTENT_TYPES = ["text/html"];
var DEFAULT_DISALLOWED_TAGS = [];
var getTemplateWrapper = (str, sanitize = false) => {
  let sanitizedStr = str;
  if (sanitize) {
    sanitizedStr = import_dompurify.default.sanitize(str);
  }
  const elementDocument = new DOMParser().parseFromString(
    `<template>${sanitizedStr}</template>`,
    "text/html"
  );
  const elWrapper = elementDocument.childNodes[0].childNodes[0].firstChild;
  return elWrapper;
};
var getResponseElements = (response, disallowedTags = [], sanitize) => {
  const elWrapper = getTemplateWrapper(response, sanitize);
  const elContent = elWrapper["content"];
  for (let i = 0; i < disallowedTags.length; i++) {
    const tag = disallowedTags[i];
    const elements = elContent.querySelectorAll(tag);
    for (let j = 0; j < elements.length; j++) {
      elContent.removeChild(elements[j]);
    }
  }
  return elWrapper;
};
var getIsNotAllowedContentType = (contentType, allowedContentTypes) => {
  if (!contentType) return true;
  let isContain = false;
  for (let i = 0; i < allowedContentTypes.length; i++) {
    const allowedContentType = allowedContentTypes[i];
    if (contentType.includes(allowedContentType)) {
      isContain = true;
      break;
    }
  }
  return !isContain;
};
var makeRequest = (el, mainEl, dataObj, method, source, isRequest, isRequests, isMemo, options = {}, templateObject, allowedContentTypes, disallowedTags, sanitize, reqObject, indicators, currentClearInterval) => {
  const {
    mode,
    cache,
    redirect,
    get,
    referrerPolicy,
    signal,
    credentials,
    timeout,
    referrer,
    headers,
    body,
    window: windowOption,
    integrity
  } = options;
  const initRequest = {
    method: method.toUpperCase()
  };
  if (credentials !== void 0) {
    initRequest.credentials = credentials;
  }
  if (body !== void 0) {
    initRequest.body = body;
  }
  if (mode !== void 0) {
    initRequest.mode = mode;
  }
  if (cache !== void 0) {
    initRequest.cache = cache;
  }
  if (redirect !== void 0) {
    initRequest.redirect = redirect;
  }
  if (referrerPolicy !== void 0) {
    initRequest.referrerPolicy = referrerPolicy;
  }
  if (integrity !== void 0) {
    initRequest.integrity = integrity;
  }
  if (referrer !== void 0) {
    initRequest.referrer = referrer;
  }
  const isHaveSignal = signal !== void 0;
  if (isHaveSignal) {
    initRequest.signal = signal;
  }
  if (windowOption !== void 0) {
    initRequest.window = windowOption;
  }
  if (options.keepalive !== void 0) {
    createWarning(
      `${REQUEST_INIT_ERROR}: The "keepalive" property is not yet supported`
    );
  }
  if (headers) {
    if (checkObject(headers)) {
      const newHeaders = new Headers();
      for (const key in headers) {
        const value = headers[key];
        const valueType = typeof value;
        if (valueType === "string") {
          newHeaders.set(key, value);
        } else {
          createError(
            `${REQUEST_INIT_ERROR}: Expected type string, but received type ${valueType}`
          );
        }
      }
      initRequest.headers = newHeaders;
    } else {
      createError(
        `${REQUEST_INIT_ERROR}: The "headers" property must contain a value object`
      );
    }
  }
  if (timeout) {
    if (!isHaveSignal) {
      initRequest.signal = AbortSignal.timeout(timeout);
    } else {
      createWarning(
        `${REQUEST_INIT_ERROR}: The "signal" property overwrote the AbortSignal from "timeout"`
      );
    }
  }
  const isRequestMemo = isMemo && !isRequest && dataObj?.memo;
  const getIsNotFullfilledStatus = (status) => status === "rejected" || typeof status === "number" && (status < 200 || status > 299);
  const requestContext = getInstanceContext(
    void 0,
    currentClearInterval
  );
  const callGetResponse = (reqResponse) => {
    if (isRequests) {
      reqObject.response = reqResponse;
      get?.("response", reqResponse, requestContext, reqObject);
    }
    get?.("response", mainEl, requestContext);
  };
  const updateNodes = (content, isClone = true, isNodes = false) => {
    if (isRequest) {
      templateObject.response = content.cloneNode(true);
      get?.("response", content, requestContext);
    } else {
      let reqResponse = [];
      const newContent = isClone ? content.cloneNode(true) : content;
      const nodes = [...newContent.content.childNodes];
      if (dataObj.nodes) {
        const parentNode = dataObj.parentNode;
        const newNodes = [];
        const nodesLength = dataObj.nodes.length;
        for (let i = 0; i < nodesLength; i++) {
          const node = dataObj.nodes[i];
          if (i === nodesLength - 1) {
            for (let j = 0; j < nodes.length; j++) {
              const reqNode = nodes[j];
              const newNode = parentNode.insertBefore(reqNode, node);
              newNodes.push(newNode);
            }
          }
          parentNode.removeChild(node);
        }
        reqResponse = newNodes.slice();
        dataObj.nodes = newNodes;
      } else {
        const parentNode = el.parentNode;
        const newNodes = [];
        const nodesLength = nodes.length;
        for (let i = 0; i < nodesLength; i++) {
          const node = nodes[i];
          const newNode = parentNode.insertBefore(node, el);
          newNodes.push(newNode);
        }
        parentNode.removeChild(el);
        reqResponse = newNodes.slice();
        dataObj.nodes = newNodes;
        dataObj.parentNode = parentNode;
      }
      if (isRequestMemo && isNodes) {
        dataObj.memo.nodes = dataObj.nodes;
        if (dataObj.memo.isPending) dataObj.memo.isPending = false;
      }
      callGetResponse(reqResponse);
    }
  };
  let isNotHTMLResponse = false;
  const setComment = () => {
    if (isRequest) {
      templateObject.response = void 0;
      get?.("response", void 0, requestContext);
    } else {
      if (dataObj?.nodes) {
        const parentNode = dataObj.parentNode;
        const nodesLength = dataObj.nodes.length;
        for (let i = 0; i < nodesLength; i++) {
          const node = dataObj.nodes[i];
          if (i === nodesLength - 1) {
            parentNode.insertBefore(dataObj.comment, node);
          }
          parentNode.removeChild(node);
        }
        dataObj.nodes = null;
        dataObj.parentNode = null;
        if (isRequests) {
          reqObject.response = void 0;
          get?.("response", void 0, requestContext, reqObject);
        }
        get?.("response", mainEl, requestContext);
      }
    }
    if (isRequestMemo) {
      if (dataObj.memo.response !== null) {
        dataObj.memo.response = null;
        delete dataObj.memo.isPending;
        delete dataObj.memo.nodes;
      }
    }
  };
  const updateIndicator = (status) => {
    if (indicators) {
      if (isRequestMemo && status !== "pending" && getIsNotFullfilledStatus(status)) {
        if (dataObj.memo.isPending) dataObj.memo.isPending = false;
      }
      if (status === "pending") {
        const content = indicators["pending"];
        if (content !== void 0) {
          if (isRequestMemo) {
            dataObj.memo.isPending = true;
          }
          updateNodes(content);
        }
      } else if (status === "rejected") {
        const content = indicators["rejected"];
        if (content !== void 0) {
          updateNodes(content);
        } else {
          const errorContent = indicators["error"];
          if (errorContent !== void 0) {
            updateNodes(errorContent);
          } else {
            setComment();
          }
        }
      } else {
        const content = indicators[`${status}`];
        if (status > 399) {
          if (content !== void 0) {
            updateNodes(content);
          } else {
            const errorContent = indicators["error"];
            if (errorContent !== void 0) {
              updateNodes(errorContent);
            } else {
              setComment();
            }
          }
        } else {
          if (status < 200 || status > 299) {
            isNotHTMLResponse = true;
            if (content !== void 0) {
              updateNodes(content);
            } else {
              setComment();
            }
          }
        }
      }
    }
  };
  const updateStatusDepenencies = (status) => {
    if (isRequests) {
      if (reqObject.status !== status) {
        reqObject.status = status;
        get?.("status", status, requestContext, reqObject);
      }
    } else {
      if (templateObject.status !== status) {
        templateObject.status = status;
        get?.("status", status, requestContext);
      }
    }
    if (isRequestMemo && getIsNotFullfilledStatus(status)) {
      dataObj.memo.response = null;
      delete dataObj.memo.nodes;
    }
    updateIndicator(status);
  };
  const takeNodesFromCache = () => {
    if (dataObj.memo.isPending) {
      const parentNode = dataObj.parentNode;
      const memoNodes = dataObj.memo.nodes;
      const currentNodes = dataObj.nodes;
      const nodesLength = currentNodes.length;
      const newNodes = [];
      for (let i = 0; i < nodesLength; i++) {
        const node = currentNodes[i];
        if (i === nodesLength - 1) {
          for (let j = 0; j < memoNodes.length; j++) {
            const reqNode = memoNodes[j];
            const newNode = parentNode.insertBefore(reqNode, node);
            newNodes.push(newNode);
          }
        }
        parentNode.removeChild(node);
      }
      dataObj.nodes = newNodes.slice();
      dataObj.memo.isPending = false;
      dataObj.memo.nodes = newNodes.slice();
    }
    const reqResponse = dataObj.nodes.slice();
    callGetResponse(reqResponse);
  };
  let requestStatus = 200;
  updateStatusDepenencies("pending");
  let isRejectedError = true;
  let isError = true;
  fetch(source, initRequest).then((response) => {
    isRejectedError = false;
    requestStatus = response.status;
    updateStatusDepenencies(requestStatus);
    if (!response.ok) {
      if (indicators) isError = false;
      createError(
        `${RESPONSE_ERROR}: Response with status code ${requestStatus}`
      );
    }
    if (Array.isArray(allowedContentTypes) && allowedContentTypes.length !== 0) {
      const contentType = response.headers.get("Content-Type");
      if (getIsNotAllowedContentType(contentType, allowedContentTypes)) {
        createError(
          `${RESPONSE_ERROR}: Expected ${allowedContentTypes.map((type) => `"${type}"`).join(", ")}, but received "${contentType}"`
        );
      }
    }
    return response.text();
  }).then((data) => {
    if (!isNotHTMLResponse) {
      if (isRequestMemo) {
        const { response } = dataObj.memo;
        if (response === null) {
          dataObj.memo.response = data;
        } else {
          if (response === data) {
            takeNodesFromCache();
            return;
          } else {
            dataObj.memo.response = data;
            delete dataObj.memo.nodes;
          }
        }
      }
      const templateWrapper = getResponseElements(
        data,
        disallowedTags,
        sanitize
      );
      if (isRequest) {
        templateObject.response = templateWrapper;
        get?.("response", templateWrapper, requestContext);
      } else {
        const reqResponse = [];
        const nodes = [
          ...templateWrapper.content.childNodes
        ];
        if (dataObj) {
          updateNodes(templateWrapper, false, true);
        } else {
          const parentNode = el.parentNode;
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const reqNode = parentNode.insertBefore(node, el);
            if (isRequests) {
              reqResponse.push(reqNode);
            }
          }
          parentNode.removeChild(el);
          if (isRequests) {
            reqObject.response = reqResponse;
            get?.("response", reqResponse, requestContext, reqObject);
          }
          get?.("response", mainEl, requestContext);
        }
      }
    }
  }).catch((error) => {
    if (isRejectedError) {
      updateStatusDepenencies("rejected");
      if (!indicators) {
        setComment();
      }
    } else {
      if (isError) {
        setComment();
      }
    }
    throw error;
  });
};
var getInstanceContext = (event, currentClearInterval) => {
  const request = {};
  if (event !== void 0) {
    request.event = event;
  }
  if (currentClearInterval) {
    request.clearInterval = currentClearInterval;
  }
  return {
    request
  };
};
var getRequestInitFromFn = (fn, event, currentClearInterval) => {
  const context = getInstanceContext(
    event,
    currentClearInterval
  );
  const result = fn(context);
  return result;
};
var renderTemplate = (currentEl, fn, requests, compileOptions, isMemoUndefined, isAutoBodyUndefined, isAllowedContentTypesUndefined, isDisallowedTagsUndefined, isSanitizeUndefined, isRequest = false) => {
  const renderRequest = (req, mainEl) => {
    const source = req[SOURCE];
    if (source) {
      const method = (req[METHOD] || "GET").toLowerCase();
      if (getIsMethodValid(method)) {
        createError(
          `${REQUEST_COMPONENT_ERROR}: The "${METHOD}" property has only GET, POST, PUT, PATCH or DELETE values`
        );
      } else {
        const after = req[AFTER];
        if (after && isRequest)
          createError(`${RENDER_ERROR}: EventTarget is undefined`);
        const isModeUndefined = !req.hasOwnProperty(REPEAT);
        const oldMode = isModeUndefined ? true : req[REPEAT];
        const modeAttr = oldMode ? "all" : "one";
        const isAll = modeAttr === "all";
        const interval = req[INTERVAL];
        const isReqMemoUndefined = !req.hasOwnProperty(MEMO);
        const isReqIntervalUndefined = !req.hasOwnProperty(INTERVAL);
        let isMemo = isMemoUndefined ? false : compileOptions[MEMO];
        if (!isReqMemoUndefined) {
          if (after) {
            if (req[MEMO]) {
              if (!isAll) {
                createError(
                  `${REQUEST_COMPONENT_ERROR}: Memoization works in the enabled repetition mode`
                );
              } else {
                isMemo = true;
              }
            } else {
              isMemo = false;
            }
          } else {
            createError(
              `${REQUEST_COMPONENT_ERROR}: Memoization works in the enabled repetition mode`
            );
          }
        } else {
          if (isMemo) {
            if (after) {
              if (!isAll) {
                isMemo = false;
              }
            } else {
              isMemo = false;
            }
          }
        }
        if (!isReqIntervalUndefined) {
          if (isAll && after) {
            createError(
              `${REQUEST_COMPONENT_ERROR}: The "${INTERVAL}" property does not work with repetiton mode yet`
            );
          }
        }
        const isReqAutoBodyUndefined = !req.hasOwnProperty(AUTO_BODY);
        let autoBody = isAutoBodyUndefined ? false : compileOptions[AUTO_BODY];
        if (!isReqAutoBodyUndefined) {
          if (after) {
            let reqAutoBody = req[AUTO_BODY];
            validateAutoBody(reqAutoBody);
            if (autoBody === true) {
              autoBody = DEFAULT_AUTO_BODY;
            }
            if (reqAutoBody === true) {
              reqAutoBody = DEFAULT_AUTO_BODY;
            }
            if (reqAutoBody === false) {
              autoBody = false;
            } else {
              const newAutoBody = {
                ...autoBody === false ? DEFAULT_FALSE_AUTO_BODY : autoBody,
                ...reqAutoBody
              };
              autoBody = newAutoBody;
            }
          } else {
            autoBody = false;
            createError(
              `${REQUEST_COMPONENT_ERROR}: The "${AUTO_BODY}" property does not work without the "${AFTER}" property`
            );
          }
        } else {
          if (autoBody === true) {
            autoBody = DEFAULT_AUTO_BODY;
          }
          if (!after) {
            autoBody = false;
          }
        }
        const isReqAllowedContentTypesUndefined = !req.hasOwnProperty(
          ALLOWED_CONTENT_TYPES
        );
        let allowedContentTypes = isAllowedContentTypesUndefined ? DEFAULT_ALLOWED_CONTENT_TYPES : compileOptions[ALLOWED_CONTENT_TYPES];
        if (!isReqAllowedContentTypesUndefined) {
          const currentAllowedContentTypes = req[ALLOWED_CONTENT_TYPES];
          validateAllowedContentTypes(currentAllowedContentTypes);
          allowedContentTypes = currentAllowedContentTypes;
        }
        const isReqDisallowedTagsUndefined = !req.hasOwnProperty(DISALLOWED_TAGS);
        let disallowedTags = isDisallowedTagsUndefined ? DEFAULT_DISALLOWED_TAGS : compileOptions[DISALLOWED_TAGS];
        if (!isReqDisallowedTagsUndefined) {
          const currentDisallowedTags = req[DISALLOWED_TAGS];
          validateDisallowedTags(currentDisallowedTags);
          disallowedTags = currentDisallowedTags;
        }
        const isReqSanitizeUndefined = !req.hasOwnProperty(SANITIZE);
        let sanitize = isSanitizeUndefined ? DEFAULT_SANITIZE : compileOptions[SANITIZE];
        if (!isReqSanitizeUndefined) {
          const currentSanitize = req[SANITIZE];
          validateSanitize(currentSanitize);
          sanitize = currentSanitize;
        }
        const initId = req[ID];
        const nodeId = req.nodeId;
        let indicators = req.indicators;
        if (indicators) {
          const parseIndicator = (val) => {
            const { trigger, content } = val;
            if (!trigger)
              createError(
                `${REQUEST_COMPONENT_ERROR}: Failed to activate or detect the indicator`
              );
            if (!content)
              createError(
                `${REQUEST_COMPONENT_ERROR}: Failed to activate or detect the indicator`
              );
            if (CODES.indexOf(trigger) === -1 && trigger !== "pending" && trigger !== "rejected" && trigger !== "error") {
              createError(
                `${REQUEST_COMPONENT_ERROR}: Failed to activate or detect the indicator`
              );
            }
            const elWrapper = getTemplateWrapper(
              content
            );
            return {
              ...val,
              content: elWrapper
            };
          };
          const newOn = {};
          const uniqueTriggers = [];
          for (let i = 0; i < indicators.length; i++) {
            const currentIndicator = parseIndicator(indicators[i]);
            const { trigger } = currentIndicator;
            if (uniqueTriggers.indexOf(trigger) === -1) {
              uniqueTriggers.push(trigger);
            } else {
              createError(
                `${REQUEST_COMPONENT_ERROR}: Indicator trigger must be unique`
              );
            }
            newOn[`${trigger}`] = currentIndicator.content;
          }
          indicators = newOn;
        }
        const getOptions = (options, isArray = false) => {
          if (isArray) {
            if (initId) {
              let result;
              for (let i = 0; i < options.length; i++) {
                const currentOptions = options[i];
                if (currentOptions.id === initId) {
                  result = currentOptions.value;
                  break;
                }
              }
              if (!result) {
                createError(
                  `${REQUEST_COMPONENT_ERROR}: ID referenced by request not found`
                );
              }
              return result;
            } else {
              return {};
            }
          } else {
            if (initId)
              createError(
                `${REQUEST_COMPONENT_ERROR}: ID referenced by request not found`
              );
            return options;
          }
        };
        const isInterval = interval !== void 0;
        const isDataObj = isAll && after || isInterval;
        const reqFunction = (reqEl, options, templateObject, data, reqMainEl, isArray = false, reqObject, isRequests = false, currentHMPLElement, event, currentInterval) => {
          const id = data.currentId;
          if (isRequest) {
            if (!reqEl) reqEl = mainEl;
          } else {
            if (!reqEl) {
              let currentEl2;
              const { els } = data;
              for (let i = 0; i < els.length; i++) {
                const e = els[i];
                if (e.id === nodeId) {
                  currentHMPLElement = e;
                  currentEl2 = e.el;
                  break;
                }
              }
              reqEl = currentEl2;
            }
          }
          let dataObj = void 0;
          if (!isRequest) {
            if (isDataObj || indicators) {
              dataObj = currentHMPLElement.objNode;
              if (!dataObj) {
                dataObj = {
                  id,
                  nodes: null,
                  parentNode: null,
                  comment: reqEl
                };
                if (isMemo) {
                  dataObj.memo = {
                    response: null
                  };
                  if (indicators) {
                    dataObj.memo.isPending = false;
                  }
                }
                if (isInterval) {
                  if (currentInterval) {
                    dataObj.interval = {
                      value: currentInterval,
                      clearInterval: () => clearInterval(currentInterval)
                    };
                  }
                }
                currentHMPLElement.objNode = dataObj;
                data.dataObjects.push(dataObj);
                data.currentId++;
              }
            }
          }
          let currentOptions = getOptions(options, isArray);
          const isOptionsFunction = checkFunction(currentOptions);
          if (!isOptionsFunction && currentOptions)
            currentOptions = { ...currentOptions };
          if (autoBody && autoBody.formData && event && !isOptionsFunction) {
            const { type, target } = event;
            if (type === "submit" && target && target instanceof HTMLFormElement && target.nodeName === "FORM") {
              currentOptions.body = new FormData(
                target,
                event.submitter
              );
            }
          }
          let currentClearInterval = currentInterval ? () => clearInterval(currentInterval) : void 0;
          currentClearInterval = isRequest ? currentClearInterval : dataObj?.interval?.clearInterval;
          const requestInit = isOptionsFunction ? getRequestInitFromFn(
            currentOptions,
            event,
            currentClearInterval
          ) : currentOptions;
          if (!checkObject(requestInit) && requestInit !== void 0)
            createError(
              `${REQUEST_INIT_ERROR}: Expected an object with initialization options`
            );
          makeRequest(
            reqEl,
            reqMainEl,
            dataObj,
            method,
            source,
            isRequest,
            isRequests,
            isMemo,
            requestInit,
            templateObject,
            allowedContentTypes,
            disallowedTags,
            sanitize,
            reqObject,
            indicators,
            currentClearInterval
          );
        };
        let currentReqFunction = reqFunction;
        if (interval) {
          validateInterval(interval);
          const time = Number(interval);
          currentReqFunction = (reqEl, options, templateObject, data, reqMainEl, isArray = false, reqObject, isRequests = false, currentHMPLElement, event) => {
            let interval2 = null;
            interval2 = setInterval(() => {
              reqFunction(
                reqEl,
                options,
                templateObject,
                data,
                reqMainEl,
                isArray,
                reqObject,
                isRequests,
                currentHMPLElement,
                event,
                interval2
              );
            }, time);
          };
        }
        let requestFunction = currentReqFunction;
        if (after) {
          const setEvents = (reqEl, event, selector, options, templateObject, data, isArray, isRequests, reqMainEl, reqObject, currentHMPLElement) => {
            const els = reqMainEl.querySelectorAll(selector);
            if (els.length === 0) {
              createError(`${RENDER_ERROR}: Selectors nodes not found`);
            }
            const afterFn = isAll ? (evt) => {
              currentReqFunction(
                reqEl,
                options,
                templateObject,
                data,
                reqMainEl,
                isArray,
                reqObject,
                isRequests,
                currentHMPLElement,
                evt
              );
            } : (evt) => {
              currentReqFunction(
                reqEl,
                options,
                templateObject,
                data,
                reqMainEl,
                isArray,
                reqObject,
                isRequests,
                currentHMPLElement,
                evt
              );
              for (let j = 0; j < els.length; j++) {
                const currentAfterEl = els[j];
                currentAfterEl.removeEventListener(event, afterFn);
              }
            };
            for (let i = 0; i < els.length; i++) {
              const afterEl = els[i];
              afterEl.addEventListener(event, afterFn);
            }
          };
          if (after.indexOf(":") > 0) {
            const afterArr = after.split(":");
            const event = afterArr[0];
            const selector = afterArr.slice(1).join(":");
            requestFunction = (reqEl, options, templateObject, data, reqMainEl, isArray = false, reqObject, isRequests = false, currentHMPLElement) => {
              setEvents(
                reqEl,
                event,
                selector,
                options,
                templateObject,
                data,
                isArray,
                isRequests,
                reqMainEl,
                reqObject,
                currentHMPLElement
              );
            };
          } else {
            createError(
              `${REQUEST_COMPONENT_ERROR}: The "${AFTER}" property doesn't work without EventTargets`
            );
          }
        } else {
          if (!isModeUndefined) {
            createError(
              `${REQUEST_COMPONENT_ERROR}: The "${REPEAT}" property doesn't work without "${AFTER}" property`
            );
          }
        }
        return requestFunction;
      }
    } else {
      createError(
        `${REQUEST_COMPONENT_ERROR}: The "${SOURCE}" property are not found or empty`
      );
    }
  };
  let reqFn;
  if (isRequest) {
    requests[0].el = currentEl;
    reqFn = renderRequest(requests[0]);
  } else {
    let id = -2;
    const getRequests = (currrentElement) => {
      id++;
      if (currrentElement.nodeType == 8) {
        let value = currrentElement.nodeValue;
        if (value && value.startsWith(COMMENT)) {
          value = value.slice(4);
          const currentIndex = Number(value);
          const currentRequest = requests[currentIndex];
          if (Number.isNaN(currentIndex) || currentRequest === void 0) {
            createError(
              `${PARSE_ERROR}: Request object with id "${currentIndex}" not found`
            );
          }
          currentRequest.el = currrentElement;
          currentRequest.nodeId = id;
        }
      }
      if (currrentElement.hasChildNodes()) {
        const chNodes = currrentElement.childNodes;
        for (let i = 0; i < chNodes.length; i++) {
          getRequests(chNodes[i]);
        }
      }
    };
    getRequests(currentEl);
    if (requests.length > 1) {
      const algorithm = [];
      for (let i = 0; i < requests.length; i++) {
        const currentRequest = requests[i];
        algorithm.push(renderRequest(currentRequest, currentEl));
      }
      reqFn = (reqEl, options, templateObject, data, mainEl, isArray = false) => {
        if (!reqEl) {
          reqEl = mainEl;
        }
        const requests2 = [];
        const els = data.els;
        for (let i = 0; i < els.length; i++) {
          const hmplElement = els[i];
          const currentReqEl = hmplElement.el;
          const currentReqFn = algorithm[i];
          const currentReq = {
            response: void 0
          };
          currentReqFn(
            currentReqEl,
            options,
            templateObject,
            data,
            reqEl,
            isArray,
            currentReq,
            true,
            hmplElement
          );
          requests2.push(currentReq);
        }
        templateObject.requests = requests2;
      };
    } else {
      const currentRequest = requests[0];
      reqFn = renderRequest(currentRequest, currentEl);
    }
  }
  return fn(reqFn);
};
var validateOptions = (currentOptions) => {
  const isObject = checkObject(currentOptions);
  if (isObject && currentOptions.hasOwnProperty(`${REQUEST_INIT_GET}`)) {
    if (!checkFunction(currentOptions[REQUEST_INIT_GET])) {
      createError(
        `${REQUEST_INIT_ERROR}: The "${REQUEST_INIT_GET}" property has a function value`
      );
    }
  }
};
var validateAllowedContentTypes = (allowedContentTypes, isCompile = false) => {
  const currentError = isCompile ? COMPILE_OPTIONS_ERROR : REQUEST_COMPONENT_ERROR;
  if (allowedContentTypes !== "*" && !checkIsStringArray(allowedContentTypes, currentError)) {
    createError(
      `${currentError}: Expected "*" or string array, but got neither`
    );
  }
};
var validateAutoBody = (autoBody, isCompile = false) => {
  const isObject = checkObject(autoBody);
  const currentError = isCompile ? COMPILE_OPTIONS_ERROR : REQUEST_COMPONENT_ERROR;
  if (typeof autoBody !== "boolean" && !isObject)
    createError(
      `${currentError}: Expected a boolean or object, but got neither`
    );
  if (isObject) {
    for (const key in autoBody) {
      switch (key) {
        case FORM_DATA:
          if (typeof autoBody[FORM_DATA] !== "boolean")
            createError(
              `${currentError}: The "${FORM_DATA}" property should be a boolean`
            );
          break;
        default:
          createError(`${currentError}: Unexpected property "${key}"`);
          break;
      }
    }
  }
};
var validateDisallowedTags = (disallowedTags, isCompile = false) => {
  const currentError = isCompile ? COMPILE_OPTIONS_ERROR : REQUEST_COMPONENT_ERROR;
  const isArray = Array.isArray(disallowedTags);
  if (!isArray)
    createError(
      `${currentError}: The value of the property "${DISALLOWED_TAGS}" must be an array`
    );
  for (let i = 0; i < disallowedTags.length; i++) {
    const disallowedTag = disallowedTags[i];
    if (!DISALLOWED_TAGS_VALUES.includes(disallowedTag)) {
      createError(
        `${currentError}: The value "${disallowedTag}" is not processed`
      );
    }
  }
};
var validateSanitize = (sanitize, isCompile = false) => {
  const currentError = isCompile ? COMPILE_OPTIONS_ERROR : REQUEST_COMPONENT_ERROR;
  if (typeof sanitize !== "boolean") {
    createError(
      `${currentError}: The value of the property "${SANITIZE}" must be a boolean`
    );
  }
};
var validateIdOptions = (currentOptions) => {
  if (!currentOptions.hasOwnProperty("id") || !currentOptions.hasOwnProperty("value")) {
    createError(`${REQUEST_INIT_ERROR}: Missing "id" or "value" property`);
  }
};
var validateIdentificationOptionsArray = (currentOptions) => {
  const ids = [];
  for (let i = 0; i < currentOptions.length; i++) {
    const idOptions = currentOptions[i];
    if (!checkObject(idOptions))
      createError(
        `${REQUEST_INIT_ERROR}: IdentificationRequestInit is of type object`
      );
    validateIdOptions(idOptions);
    const { id } = idOptions;
    const isIdString = typeof idOptions.id === "string";
    if (!isIdString && typeof idOptions.id !== "number")
      createError(`${REQUEST_INIT_ERROR}: ID must be a string or a number`);
    if (ids.indexOf(id) > -1) {
      createError(
        `${REQUEST_INIT_ERROR}: ID with value ${isIdString ? `"${id}"` : id} already exists`
      );
    } else {
      ids.push(id);
    }
  }
};
var validateInterval = (time) => {
  if (typeof time !== "number") {
    createError(
      `${REQUEST_COMPONENT_ERROR}: The "${INTERVAL}" value must be number`
    );
  }
};
var stringify = (info) => {
  const formatValue = (value) => {
    if (typeof value === "string") {
      return `"${value}"`;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return `${value}`;
    }
    if (Array.isArray(value)) {
      return `[${value.map((item) => formatValue(item)).join(",")}]`;
    }
    if (typeof value === "object" && value !== null) {
      return `{${Object.entries(value).map(([k, v]) => `${k}:${formatValue(v)}`).join(",")}}`;
    }
    return "";
  };
  let body = Object.entries(info).map(([key, value]) => `${key}=${formatValue(value)}`).join(" ");
  if (body.endsWith("}")) {
    body += " ";
  }
  return `{{#request ${body}}}{{/request}}`;
};
var compile = (template, options = {}) => {
  if (typeof template !== "string")
    createError(
      `${COMPILE_ERROR}: Template was not found or the type of the passed value is not string`
    );
  if (!template)
    createError(`${COMPILE_ERROR}: Template must not be a falsey value`);
  if (!checkObject(options))
    createError(`${COMPILE_OPTIONS_ERROR}: Options must be an object`);
  const isMemoUndefined = !options.hasOwnProperty(MEMO);
  if (!isMemoUndefined && typeof options[MEMO] !== "boolean")
    createError(
      `${COMPILE_OPTIONS_ERROR}: The value of the property ${MEMO} must be a boolean`
    );
  const isAutoBodyUndefined = !options.hasOwnProperty(AUTO_BODY);
  if (!isAutoBodyUndefined) validateAutoBody(options[AUTO_BODY], true);
  const isAllowedContentTypesUndefined = !options.hasOwnProperty(
    ALLOWED_CONTENT_TYPES
  );
  if (!isAllowedContentTypesUndefined)
    validateAllowedContentTypes(options[ALLOWED_CONTENT_TYPES], true);
  const isDisallowedTagsUndefined = !options.hasOwnProperty(DISALLOWED_TAGS);
  if (!isDisallowedTagsUndefined)
    validateDisallowedTags(options[DISALLOWED_TAGS], true);
  const isSanitizeUndefined = !options.hasOwnProperty(SANITIZE);
  if (!isSanitizeUndefined) validateSanitize(options[SANITIZE], true);
  const requests = [];
  const requestsIndexes = [];
  const parseTemplate = (str) => {
    const parts = [];
    let pos = 0;
    const openTags = [
      { open: "{{#request", close: "{{/request}}" },
      { open: "{{#r", close: "{{/r}}" }
    ];
    while (pos < str.length) {
      const openIndexes = openTags.map((tag) => ({ ...tag, index: str.indexOf(tag.open, pos) })).filter((item) => item.index !== -1);
      if (openIndexes.length === 0) {
        parts.push(str.slice(pos));
        break;
      }
      const nextOpen = openIndexes.sort((a, b) => a.index - b.index)[0];
      parts.push(str.slice(pos, nextOpen.index));
      const attrStart = nextOpen.index + nextOpen.open.length;
      const attrEnd = str.indexOf("}}", attrStart);
      if (attrEnd === -1) {
        createError(
          `${PARSE_ERROR}: Unclosed block (no ending '}}') for ${nextOpen.open}`
        );
      }
      const rawAttrs = str.slice(attrStart, attrEnd).trim();
      const blockEnd = str.indexOf(nextOpen.close, attrEnd);
      if (blockEnd === -1) {
        createError(
          `${PARSE_ERROR}: No closing '${nextOpen.close}' found for ${nextOpen.open}`
        );
      }
      const innerContent = str.slice(attrEnd + 2, blockEnd);
      if (innerContent.includes(nextOpen.open)) {
        createError(
          `${PARSE_ERROR}: Nested ${nextOpen.open}}} blocks are not supported`
        );
      }
      const transformedAttrs = safeReplaceEquals(rawAttrs);
      parts.push(`{${transformedAttrs}}`);
      requestsIndexes.push(parts.length - 1);
      pos = blockEnd + nextOpen.close.length;
    }
    return parts;
  };
  const safeReplaceEquals = (input) => {
    let result = "";
    const regex = /\s*([a-zA-Z0-9_-]+)\s*=\s*(("[^"]*"|'[^']*'|`[^`]*`|\[[^\]]*\]|\{[^}]*\}|true|false|\d+)(?=\s|,|$))\s*/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();
      result += `${key}:${value},`;
    }
    return result.replace(/,$/, "").trim();
  };
  const templateArr = parseTemplate(template);
  if (requestsIndexes.length === 0)
    createError(`${PARSE_ERROR}: Request object not found`);
  const setRequest = (text) => {
    const parsedData = import_json5.default.parse(text);
    for (const key in parsedData) {
      const value = parsedData[key];
      if (!REQUEST_OPTIONS.includes(key))
        createError(
          `${REQUEST_COMPONENT_ERROR}: Property "${key}" is not processed`
        );
      switch (key) {
        case INDICATORS:
          if (!Array.isArray(value)) {
            createError(
              `${REQUEST_COMPONENT_ERROR}: The value of the property "${key}" must be an array`
            );
          }
          break;
        case ID:
          if (typeof value !== "string" && typeof value !== "number") {
            createError(
              `${REQUEST_COMPONENT_ERROR}: The value of the property "${key}" must be a string`
            );
          }
          break;
        case MEMO:
        case REPEAT:
          if (typeof value !== "boolean") {
            createError(
              `${REQUEST_COMPONENT_ERROR}: The value of the property "${key}" must be a boolean value`
            );
          }
          break;
        case AUTO_BODY:
          validateAutoBody(value);
          break;
        case ALLOWED_CONTENT_TYPES:
          validateAllowedContentTypes(value);
          break;
        case DISALLOWED_TAGS:
          validateDisallowedTags(value);
          break;
        case SANITIZE:
          validateSanitize(value);
          break;
        case INTERVAL:
          validateInterval(value);
          break;
        default:
          if (typeof value !== "string") {
            createError(
              `${REQUEST_COMPONENT_ERROR}: The value of the property "${key}" must be a string`
            );
          }
          break;
      }
    }
    const requestObject = {
      ...parsedData
    };
    requests.push(requestObject);
  };
  for (let i = 0; i < requestsIndexes.length; i++) {
    const reqId = requestsIndexes[i];
    const reqVal = templateArr[reqId];
    setRequest(reqVal);
    const comment = `<!--hmpl${i}-->`;
    templateArr[reqId] = comment;
  }
  template = templateArr.join("");
  let isRequest = false;
  const getElement = (template2) => {
    const elWrapper = getTemplateWrapper(
      template2.trim()
    );
    if (elWrapper.content.childNodes.length > 1 || elWrapper.content.children.length !== 1 && elWrapper.content.childNodes[0].nodeType !== 8) {
      createError(
        `${RENDER_ERROR}: Template includes only one node of the Element type or one response object`
      );
    }
    const prepareNode = (node) => {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          if (node.tagName === "PRE") return;
          break;
        case Node.TEXT_NODE:
          if (!/\S/.test(node.textContent)) {
            node.remove();
            return;
          }
          break;
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        prepareNode(node.childNodes.item(i));
      }
    };
    prepareNode(elWrapper.content.childNodes[0]);
    let currentEl = elWrapper.content.firstElementChild;
    if (!currentEl) {
      const comment = elWrapper.content.firstChild;
      const isComment = comment?.nodeType === 8;
      if (isComment) {
        isRequest = true;
        currentEl = comment;
      }
    }
    return currentEl;
  };
  const templateEl = getElement(template);
  const renderFn = (requestFunction) => {
    const templateFunction = (options2 = {}) => {
      const el = templateEl.cloneNode(true);
      const templateObject = {
        response: isRequest ? void 0 : el
      };
      const data = {
        dataObjects: [],
        els: [],
        currentId: 0
      };
      if (!isRequest) {
        let id = -2;
        const getRequests = (currrentElement) => {
          id++;
          if (currrentElement.nodeType == 8) {
            const value = currrentElement.nodeValue;
            if (value && value.startsWith(COMMENT)) {
              const elObj = {
                el: currrentElement,
                id
              };
              data.els.push(elObj);
            }
          }
          if (currrentElement.hasChildNodes()) {
            const chNodes = currrentElement.childNodes;
            for (let i = 0; i < chNodes.length; i++) {
              getRequests(chNodes[i]);
            }
          }
        };
        getRequests(el);
      }
      if (checkObject(options2) || checkFunction(options2)) {
        validateOptions(options2);
        requestFunction(
          void 0,
          options2,
          templateObject,
          data,
          el
        );
      } else if (Array.isArray(options2)) {
        validateIdentificationOptionsArray(
          options2
        );
        requestFunction(
          void 0,
          options2,
          templateObject,
          data,
          el,
          true
        );
      } else {
        createError(
          `${REQUEST_INIT_ERROR}: The type of the value being passed does not match the supported types for RequestInit`
        );
      }
      return templateObject;
    };
    return templateFunction;
  };
  return renderTemplate(
    templateEl,
    renderFn,
    requests,
    options,
    isMemoUndefined,
    isAutoBodyUndefined,
    isAllowedContentTypesUndefined,
    isDisallowedTagsUndefined,
    isSanitizeUndefined,
    isRequest
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compile,
  stringify
});

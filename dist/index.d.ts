import { compile, stringify } from "../build/main";

import {
  HMPLRequestInit,
  HMPLInstanceContext,
  HMPLRequestContext,
  HMPLRequestInitFunction,
  HMPLInstance,
  HMPLRequest,
  HMPLRequestGet,
  HMPLRequestGetParams,
  HMPLHeadersInit,
  HMPLIdentificationRequestInit,
  HMPLCompile,
  HMPLTemplateFunction,
  HMPLRequestInfo,
  HMPLIndicator,
  HMPLContentTypes,
  HMPLIndicatorTrigger,
  HMPLRequestStatus,
  HMPLCompileOptions,
  HMPLAutoBodyOptions,
  HMPLDisallowedTag,
  HMPLDisallowedTags,
  HMPLSanitize,
  HMPLClearInterval,
  HMPLBindOptions,
  HMPLTemplateFunctionOptions
} from "../build/types";

const hmpl = {
  compile,
  stringify
};

export { compile, stringify };

export default hmpl;

export type {
  HMPLRequestInit,
  HMPLInstanceContext,
  HMPLRequestContext,
  HMPLRequestInitFunction,
  HMPLInstance,
  HMPLRequest,
  HMPLRequestGet,
  HMPLRequestGetParams,
  HMPLHeadersInit,
  HMPLIdentificationRequestInit,
  HMPLCompile,
  HMPLTemplateFunction,
  HMPLRequestInfo,
  HMPLIndicator,
  HMPLContentTypes,
  HMPLIndicatorTrigger,
  HMPLRequestStatus,
  HMPLCompileOptions,
  HMPLAutoBodyOptions,
  HMPLDisallowedTag,
  HMPLDisallowedTags,
  HMPLSanitize,
  HMPLClearInterval,
  HMPLBindOptions,
  HMPLTemplateFunctionOptions
};

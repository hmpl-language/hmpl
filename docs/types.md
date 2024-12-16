# Types

## HMPLRequestInit

A set of parameters that apply to fetch. Based almost entirely on [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit).

```typescript
interface HMPLRequestOptions {
  mode?: RequestMode;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
  referrer?: string;
  get?: HMPLRequestGet;
  body?: BodyInit | null;
  signal?: AbortSignal | null;
  window?: any;
  credentials?: RequestCredentials;
  headers?: HMPLHeadersInit;
  timeout?: number;
}
```

## HMPLInstance

Return object of template function

```typescript
interface HMPLInstance {
  response: undefined | Element | null;
  status?: HMPLRequestStatus;
  requests?: HMPLRequest[];
}
```

## HMPLInstanceContext

The [HMPLInstance](#hmplinstance) context contains information about requests sent to the server.

```typescript
interface HMPLInstanceContext {
  request: HMPLRequestContext;
}
```

## HMPLRequest

Object in the `requests` property

```typescript
interface HMPLRequest {
  response: undefined | Element | null | ChildNode[];
  status: number;
  id?: string;
}
```

## HMPLRequestContext

The context of the current request sent to the [HMPLInstance](#hmplinstance).

```typescript
interface HMPLRequestContext {
  event?: Event;
}
```

## HMPLRequestGet

`get` function in options object

```typescript
type HMPLRequestGet = (prop: string, value: any, request?: HMPLRequest) => void;
```

## HMPLRequestInfo

An object that defines the properties of a request.

```typescript
interface HMPLRequestInfo {
  src: string;
  method: string;
  initId?: string | number;
  after?: string;
  repeat?: boolean;
  memo?: boolean;
  autoBody?: boolean | HMPLAutoBodyOptions;
  indicators?: HMPLIndicator[];
}
```

## HMPLCompile

Creates a template function

```typescript
type HMPLCompile = (
  template: string,
  options?: HMPLCompileOptions
) => HMPLTemplateFunction;
```

## HMPLCompileOptions

Sets options for the `compile` function.

```typescript
interface HMPLCompileOptions {
  memo?: boolean;
  autoBody?: boolean | HMPLAutoBodyOptions;
}
```

## HMPLTemplateFunction

The function returned in response to the `compile` function. Creates template instances.

```typescript
type HMPLTemplateFunction = (
  options?:
    | HMPLIdentificationRequestInit[]
    | HMPLRequestInit
    | HMPLRequestInitFunction
) => HMPLInstance;
```

## HMPLAutoBodyOptions

List of options for the [autoBody](/request.md#autobody) property.

```typescript
interface HMPLAutoBodyOptions {
  formData?: boolean;
}
```

## HMPLInitalStatus

Statuses based on the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) state, as well as those based on http codes without success.

```typescript
type HMPLInitalStatus =
  | "pending"
  | "rejected"
  | 100
  | 101
  | 102
  | 103
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;
```

## HMPLIndicatorTrigger

Sets which trigger the indicator will be shown on

```typescript
type HMPLIndicatorTrigger = HMPLInitalStatus | "error";
```

## HMPLRequestStatus

Type for the full list of http codes, as well as for [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) states without `fulfilled`. Used in the [HMPLRequest](#hmplrequest) object to indicate the status of the request.

```typescript
type HMPLRequestStatus =
  | HMPLInitalStatus
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226;
```

## HMPLIndicator

Inrerface for indicator object

```typescript
interface HMPLIndicator {
  trigger: HMPLIndicatorTrigger;
  content: string;
}
```

## HMPLHeadersInit

headers object in options object

```typescript
interface HMPLHeadersInit {
  [key: string]: string;
}
```

## HMPLIdentificationRequestInit

Initializes a reference to a specific [HMPLRequestInit](#hmplrequestinit) dictionary using `id`.

```typescript
interface HMPLIdentificationRequestInit {
  value: HMPLRequestInit | HMPLRequestInitFunction;
  id: string | number;
}
```

## HMPLRequestInitFunction

[HMPLRequestInit](#hmplrequestinit) generation function. Needed to work with [context](/hmpl.md#concept-of-context).

```typescript
type HMPLRequestInitFunction = (
  context: HMPLInstanceContext
) => HMPLRequestInit;
```

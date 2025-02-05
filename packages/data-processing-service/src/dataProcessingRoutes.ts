// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpRequestContext,
	INoContentResponse,
	IRestRoute,
	ITag
} from "@twin.org/api-models";
import { CoerceType, ComponentFactory, Converter, Guards } from "@twin.org/core";
import type {
	IDataProcessingComponent,
	IDataProcessingConvertRequest,
	IDataProcessingConvertResponse,
	IDataProcessingExtractRequest,
	IDataProcessingExtractResponse,
	IDataProcessingRuleGroupGetRequest,
	IDataProcessingRuleGroupGetResponse,
	IDataProcessingRuleGroupRemoveRequest,
	IDataProcessingRuleGroupSetRequest,
	IRule
} from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";
import { HttpStatusCode } from "@twin.org/web";

/**
 * The source used when communicating about these routes.
 */
const ROUTES_SOURCE = "dataProcessingRoutes";

/**
 * The tag to associate with the routes.
 */
export const tagsDataProcessing: ITag[] = [
	{
		name: "Data Processing",
		description: "Endpoints which are modelled to access a data processing contract."
	}
];

/**
 * The REST routes for data processing.
 * @param baseRouteName Prefix to prepend to the paths.
 * @param componentName The name of the component to use in the routes stored in the ComponentFactory.
 * @returns The generated routes.
 */
export function generateRestRoutesDataProcessing(
	baseRouteName: string,
	componentName: string
): IRestRoute[] {
	const setRuleGroupRoute: IRestRoute<IDataProcessingRuleGroupSetRequest, INoContentResponse> = {
		operationId: "dataProcessingSetRuleGroup",
		summary: "Store a rule group for extraction.",
		tag: tagsDataProcessing[0].name,
		method: "PUT",
		path: `${baseRouteName}/rule-group/:id`,
		handler: async (httpRequestContext, request) =>
			dataProcessingSetRuleGroup(httpRequestContext, componentName, request),
		requestType: {
			type: nameof<IDataProcessingRuleGroupSetRequest>(),
			examples: [
				{
					id: "dataProcessingRuleGroupSetRequestExample",
					request: {
						pathParams: {
							id: "my-rule-group"
						},
						body: {
							label: "My Rule Group",
							rules: [
								{
									source: "$.foo",
									target: "goo",
									coerce: CoerceType.BigInt
								}
							]
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<INoContentResponse>(),
				examples: [
					{
						id: "dataProcessingRuleGroupSetResponseExample",
						response: {
							statusCode: HttpStatusCode.noContent
						}
					}
				]
			}
		]
	};

	const getRuleGroupRoute: IRestRoute<
		IDataProcessingRuleGroupGetRequest,
		IDataProcessingRuleGroupGetResponse
	> = {
		operationId: "dataProcessingGetRuleGroup",
		summary: "Get a rule group for extraction.",
		tag: tagsDataProcessing[0].name,
		method: "GET",
		path: `${baseRouteName}/rule-group/:id`,
		handler: async (httpRequestContext, request) =>
			dataProcessingGetRuleGroup(httpRequestContext, componentName, request),
		requestType: {
			type: nameof<IDataProcessingRuleGroupGetRequest>(),
			examples: [
				{
					id: "dataProcessingRuleGroupGetRequestExample",
					request: {
						pathParams: {
							id: "my-rule-group"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IDataProcessingRuleGroupGetResponse>(),
				examples: [
					{
						id: "dataProcessingRuleGroupSetResponseExample",
						response: {
							body: {
								id: "my-rule-group",
								label: "My Rule Group",
								rules: [
									{
										source: "$.foo",
										target: "goo",
										coerce: CoerceType.BigInt
									}
								]
							}
						}
					}
				]
			}
		]
	};

	const removeRuleGroupRoute: IRestRoute<
		IDataProcessingRuleGroupRemoveRequest,
		INoContentResponse
	> = {
		operationId: "dataProcessingRemoveRuleGroup",
		summary: "Remove an extraction rule group.",
		tag: tagsDataProcessing[0].name,
		method: "DELETE",
		path: `${baseRouteName}/rule-group/:id`,
		handler: async (httpRequestContext, request) =>
			dataProcessingRemoveRuleGroup(httpRequestContext, componentName, request),
		requestType: {
			type: nameof<IDataProcessingRuleGroupRemoveRequest>(),
			examples: [
				{
					id: "dataProcessingRuleGroupRemoveRequestExample",
					request: {
						pathParams: {
							id: "my-rule-group"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<INoContentResponse>(),
				examples: [
					{
						id: "dataProcessingRuleGroupRemoveResponseExample",
						response: {
							statusCode: HttpStatusCode.noContent
						}
					}
				]
			}
		]
	};

	const extractRoute: IRestRoute<IDataProcessingExtractRequest, IDataProcessingExtractResponse> = {
		operationId: "dataProcessingExtract",
		summary: "Extract data from a binary source using the specified rule group.",
		tag: tagsDataProcessing[0].name,
		method: "POST",
		path: `${baseRouteName}/extract`,
		handler: async (httpRequestContext, request) =>
			dataProcessingExtract(httpRequestContext, componentName, request),
		requestType: {
			type: nameof<IDataProcessingExtractRequest>(),
			examples: [
				{
					id: "dataProcessingExtractRequestExample",
					request: {
						body: {
							ruleGroupId: "my-rule-group",
							data: "eyJmb28iOiAiYmFyIn0="
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IDataProcessingExtractResponse>(),
				examples: [
					{
						id: "dataProcessingExtractResponseExample",
						response: {
							body: { foo: "bar" }
						}
					}
				]
			}
		]
	};

	const convertRoute: IRestRoute<IDataProcessingConvertRequest, IDataProcessingConvertResponse> = {
		operationId: "dataProcessingConvert",
		summary: "Convert data from a binary source and return structured object.",
		tag: tagsDataProcessing[0].name,
		method: "POST",
		path: `${baseRouteName}/convert`,
		handler: async (httpRequestContext, request) =>
			dataProcessingConvert(httpRequestContext, componentName, request),
		requestType: {
			type: nameof<IDataProcessingConvertRequest>(),
			examples: [
				{
					id: "dataProcessingConvertRequestExample",
					request: {
						body: {
							data: "eyJmb28iOiAiYmFyIn0="
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IDataProcessingConvertResponse>(),
				examples: [
					{
						id: "dataProcessingConvertResponseExample",
						response: {
							body: { foo: "bar" }
						}
					}
				]
			}
		]
	};

	return [setRuleGroupRoute, getRuleGroupRoute, removeRuleGroupRoute, extractRoute, convertRoute];
}

/**
 * Store an extraction rule group.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataProcessingSetRuleGroup(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: IDataProcessingRuleGroupSetRequest
): Promise<INoContentResponse> {
	Guards.object<IDataProcessingRuleGroupSetRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.object<IDataProcessingRuleGroupSetRequest["pathParams"]>(
		ROUTES_SOURCE,
		nameof(request.pathParams),
		request.pathParams
	);
	Guards.object<IDataProcessingRuleGroupSetRequest["body"]>(
		ROUTES_SOURCE,
		nameof(request.body),
		request.body
	);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.pathParams.id), request.pathParams.id);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body.label), request.body.label);
	Guards.array<IRule>(ROUTES_SOURCE, nameof(request.body.rules), request.body.rules);

	const component = ComponentFactory.get<IDataProcessingComponent>(componentName);
	await component.ruleGroupSet({
		id: request.pathParams.id,
		label: request.body.label,
		rules: request.body.rules
	});
	return {
		statusCode: HttpStatusCode.noContent
	};
}

/**
 * Get an extraction rule group.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataProcessingGetRuleGroup(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: IDataProcessingRuleGroupGetRequest
): Promise<IDataProcessingRuleGroupGetResponse> {
	Guards.object<IDataProcessingRuleGroupGetRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.object<IDataProcessingRuleGroupGetRequest["pathParams"]>(
		ROUTES_SOURCE,
		nameof(request.pathParams),
		request.pathParams
	);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.pathParams.id), request.pathParams.id);

	const component = ComponentFactory.get<IDataProcessingComponent>(componentName);
	const result = await component.ruleGroupGet(request.pathParams.id);

	return {
		body: result
	};
}

/**
 * Remove an extraction rule group.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataProcessingRemoveRuleGroup(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: IDataProcessingRuleGroupRemoveRequest
): Promise<INoContentResponse> {
	Guards.object<IDataProcessingRuleGroupGetRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.object<IDataProcessingRuleGroupGetRequest["pathParams"]>(
		ROUTES_SOURCE,
		nameof(request.pathParams),
		request.pathParams
	);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.pathParams.id), request.pathParams.id);

	const component = ComponentFactory.get<IDataProcessingComponent>(componentName);
	await component.ruleGroupRemove(request.pathParams.id);

	return {
		statusCode: HttpStatusCode.noContent
	};
}

/**
 * Extract data using the specified rule group.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataProcessingExtract(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: IDataProcessingExtractRequest
): Promise<IDataProcessingExtractResponse> {
	Guards.object<IDataProcessingExtractRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.object<IDataProcessingExtractRequest["body"]>(
		ROUTES_SOURCE,
		nameof(request.body),
		request.body
	);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body.ruleGroupId), request.body.ruleGroupId);
	Guards.stringBase64(ROUTES_SOURCE, nameof(request.body.data), request.body.data);

	const component = ComponentFactory.get<IDataProcessingComponent>(componentName);
	const result = await component.extract(
		request.body.ruleGroupId,
		Converter.base64ToBytes(request.body.data),
		request.body.overrideExtractorType
	);

	return {
		body: result
	};
}

/**
 * Convert data using the specified rule group.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataProcessingConvert(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: IDataProcessingConvertRequest
): Promise<IDataProcessingConvertResponse> {
	Guards.object<IDataProcessingConvertRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.object<IDataProcessingConvertRequest["body"]>(
		ROUTES_SOURCE,
		nameof(request.body),
		request.body
	);
	Guards.stringBase64(ROUTES_SOURCE, nameof(request.body.data), request.body.data);

	const component = ComponentFactory.get<IDataProcessingComponent>(componentName);
	const result = await component.convert(
		Converter.base64ToBytes(request.body.data),
		request.body.overrideMimeType
	);

	return {
		body: result
	};
}

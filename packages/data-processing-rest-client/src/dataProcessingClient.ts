// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseRestClient } from "@twin.org/api-core";
import type { IBaseRestClientConfig, INoContentResponse } from "@twin.org/api-models";
import { Converter, Guards, ObjectHelper } from "@twin.org/core";
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
	IRule,
	IRuleGroup
} from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";

/**
 * Client for performing data processing through to REST endpoints.
 */
export class DataProcessingClient extends BaseRestClient implements IDataProcessingComponent {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<DataProcessingClient>();

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = DataProcessingClient._CLASS_NAME;

	/**
	 * Create a new instance of DataProcessingClient.
	 * @param config The configuration for the client.
	 */
	constructor(config: IBaseRestClientConfig) {
		super(DataProcessingClient._CLASS_NAME, config, "data-processing");
	}

	/**
	 * Set an extraction rule group.
	 * @param ruleGroup The rule group to store.
	 * @returns Nothing.
	 */
	public async ruleGroupSet(ruleGroup: IRuleGroup): Promise<void> {
		Guards.object<IRuleGroup>(this.CLASS_NAME, nameof(ruleGroup), ruleGroup);
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroup.id), ruleGroup.id);
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroup.label), ruleGroup.label);
		Guards.array<IRule>(this.CLASS_NAME, nameof(ruleGroup.rules), ruleGroup.rules);

		await this.fetch<IDataProcessingRuleGroupSetRequest, INoContentResponse>(
			"/rule-group/:id",
			"POST",
			{
				pathParams: {
					id: ruleGroup.id
				},
				body: {
					label: ruleGroup.label,
					rules: ruleGroup.rules
				}
			}
		);
	}

	/**
	 * Get a rule group for extraction.
	 * @param ruleGroupId The id of the rule group to get.
	 * @returns The rule group.
	 */
	public async ruleGroupGet(ruleGroupId: string): Promise<IRuleGroup> {
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);

		const response = await this.fetch<
			IDataProcessingRuleGroupGetRequest,
			IDataProcessingRuleGroupGetResponse
		>("/rule-group/:id", "GET", {
			pathParams: {
				id: ruleGroupId
			}
		});

		return response.body;
	}

	/**
	 * Remove a rule group.
	 * @param ruleGroupId The id of the rule group to remove.
	 * @returns Nothing.
	 */
	public async ruleGroupRemove(ruleGroupId: string): Promise<void> {
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);

		await this.fetch<IDataProcessingRuleGroupRemoveRequest, INoContentResponse>(
			"/rule-group/:id",
			"DELETE",
			{
				pathParams: {
					id: ruleGroupId
				}
			}
		);
	}

	/**
	 * Extracts data from the provided input.
	 * @param ruleGroupId The id of the rule group to use to extract data.
	 * @param data The data to extract from.
	 * @param overrideExtractorType An optional override for the extractor type.
	 * @returns The extracted data.
	 */
	public async extract(
		ruleGroupId: string,
		data: Uint8Array,
		overrideExtractorType?: string
	): Promise<unknown> {
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);
		Guards.uint8Array(this.CLASS_NAME, nameof(data), data);

		const result = await this.fetch<IDataProcessingExtractRequest, IDataProcessingExtractResponse>(
			"/rule-group/extract",
			"POST",
			{
				body: {
					ruleGroupId,
					data: Converter.bytesToBase64(data),
					overrideExtractorType
				}
			}
		);

		return ObjectHelper.fromExtended(result.body);
	}

	/**
	 * Converts data from the provided input to a structured JSON document.
	 * @param data The data to convert.
	 * @param overrideMimeType An optional override for the mime type, will auto detect if empty.
	 * @returns The converted data.
	 */
	public async convert(data: Uint8Array, overrideMimeType?: string): Promise<unknown> {
		Guards.uint8Array(this.CLASS_NAME, nameof(data), data);

		const result = await this.fetch<IDataProcessingConvertRequest, IDataProcessingConvertResponse>(
			"/rule-group/convert",
			"POST",
			{
				body: {
					data: Converter.bytesToBase64(data),
					overrideMimeType
				}
			}
		);

		return ObjectHelper.fromExtended(result.body);
	}
}

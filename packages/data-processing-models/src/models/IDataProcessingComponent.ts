// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IRuleGroup } from "./IRuleGroup";

/**
 * Interface describing a component for processing data.
 */
export interface IDataProcessingComponent extends IComponent {
	/**
	 * Set an extraction rule group.
	 * @param ruleGroup The rule group to store.
	 * @returns Nothing.
	 */
	ruleGroupSet(ruleGroup: IRuleGroup): Promise<void>;

	/**
	 * Get a rule group for extraction.
	 * @param ruleGroupId The id of the rule group to get.
	 * @returns The rule group.
	 */
	ruleGroupGet(ruleGroupId: string): Promise<IRuleGroup>;

	/**
	 * Remove a rule group.
	 * @param ruleGroupId The id of the rule group to remove.
	 * @returns Nothing.
	 */
	ruleGroupRemove(ruleGroupId: string): Promise<void>;

	/**
	 * Extracts data from the provided input.
	 * @param ruleGroupId The id of the rule group to use to extract data.
	 * @param data The data to extract from.
	 * @param overrideExtractorType An optional override for the extractor type.
	 * @returns The extracted data.
	 */
	extract(ruleGroupId: string, data: Uint8Array, overrideExtractorType?: string): Promise<unknown>;

	/**
	 * Converts data from the provided input to a structured JSON document.
	 * @param data The data to convert.
	 * @param overrideMimeType An optional override for the mime type, will auto detect if empty.
	 * @returns The converted data.
	 */
	convert(data: Uint8Array, overrideMimeType?: string): Promise<unknown>;
}

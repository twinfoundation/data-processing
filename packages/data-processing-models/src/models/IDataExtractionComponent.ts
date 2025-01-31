// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRuleGroup } from "./IRuleGroup";

/**
 * Interface describing a component for extracting data.
 */
export interface IDataExtractionComponent {
	/**
	 * Store an extraction rule group.
	 * @param ruleGroup The rule group to store.
	 * @returns Nothing.
	 */
	ruleGroupStore(ruleGroup: IRuleGroup): Promise<void>;

	/**
	 * Retrieve a rule group for extraction.
	 * @param ruleGroupId The id of the rule group to retrieve.
	 * @returns The rule group.
	 */
	ruleGroupRetrieve(ruleGroupId: string): Promise<IRuleGroup>;

	/**
	 * Remove a rule group.
	 * @param ruleGroupId The id of the rule group to remove.
	 * @returns Nothing.
	 */
	ruleGroupRemove(ruleGroupId: string): Promise<void>;

	/**
	 * Extracts data from the from the provided input.
	 * @param ruleGroupId The id of the rule group to use to extract data.
	 * @param data The data to extract from.
	 * @param overrideExtractorType An optional override for the extractor type.
	 * @returns The extracted data.
	 */
	extract(
		ruleGroupId: string,
		data: Uint8Array,
		overrideExtractorType?: string
	): Promise<Uint8Array>;
}

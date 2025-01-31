// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRule } from "./IRule";

/**
 * Group of rules for extraction.
 */
export interface IRuleGroup {
	/**
	 * The id for the rule group.
	 */
	id: string;

	/**
	 * The label for the rule group.
	 */
	label: string;

	/**
	 * The rules.
	 */
	rules: IRule[];
}

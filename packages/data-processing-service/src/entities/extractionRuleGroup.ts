// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property } from "@twin.org/entity";
import type { ExtractionRule } from "./extractionRule";

/**
 * Class defining an extraction rule group.
 */
@entity()
export class ExtractionRuleGroup {
	/**
	 * The id.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The label.
	 */
	@property({ type: "string" })
	public label!: string;

	/**
	 * The rules.
	 */
	@property({ type: "array", itemTypeRef: "ExtractionRule", itemType: "object" })
	public rules!: ExtractionRule[];
}

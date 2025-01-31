// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EntitySchemaFactory, EntitySchemaHelper } from "@twin.org/entity";
import { nameof } from "@twin.org/nameof";
import { ExtractionRule } from "./entities/extractionRule";
import { ExtractionRuleGroup } from "./entities/extractionRuleGroup";

/**
 * Initialize the schema for the data extraction connector entity storage.
 */
export function initSchema(): void {
	EntitySchemaFactory.register(nameof<ExtractionRuleGroup>(), () =>
		EntitySchemaHelper.getSchema(ExtractionRuleGroup)
	);
	EntitySchemaFactory.register(nameof<ExtractionRule>(), () =>
		EntitySchemaHelper.getSchema(ExtractionRule)
	);
}

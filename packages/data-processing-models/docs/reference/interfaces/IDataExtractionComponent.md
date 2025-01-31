# Interface: IDataExtractionComponent

Interface describing a component for extracting data.

## Methods

### ruleGroupStore()

> **ruleGroupStore**(`ruleGroup`): `Promise`\<`void`\>

Store an extraction rule group.

#### Parameters

##### ruleGroup

[`IRuleGroup`](IRuleGroup.md)

The rule group to store.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### ruleGroupRetrieve()

> **ruleGroupRetrieve**(`ruleGroupId`): `Promise`\<[`IRuleGroup`](IRuleGroup.md)\>

Retrieve a rule group for extraction.

#### Parameters

##### ruleGroupId

`string`

The id of the rule group to retrieve.

#### Returns

`Promise`\<[`IRuleGroup`](IRuleGroup.md)\>

The rule group.

***

### ruleGroupRemove()

> **ruleGroupRemove**(`ruleGroupId`): `Promise`\<`void`\>

Remove a rule group.

#### Parameters

##### ruleGroupId

`string`

The id of the rule group to remove.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### extract()

> **extract**(`ruleGroupId`, `data`, `overrideExtractorType`?): `Promise`\<`Uint8Array`\>

Extracts data from the from the provided input.

#### Parameters

##### ruleGroupId

`string`

The id of the rule group to use to extract data.

##### data

`Uint8Array`

The data to extract from.

##### overrideExtractorType?

`string`

An optional override for the extractor type.

#### Returns

`Promise`\<`Uint8Array`\>

The extracted data.

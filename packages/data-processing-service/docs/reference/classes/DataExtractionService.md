# Class: DataExtractionService

Class for extracting data from a source.

## Implements

- `IDataExtractionComponent`

## Constructors

### new DataExtractionService()

> **new DataExtractionService**(`options`?): [`DataExtractionService`](DataExtractionService.md)

Create a new instance of DataExtractionService.

#### Parameters

##### options?

[`IDataExtractionServiceConstructorOptions`](../interfaces/IDataExtractionServiceConstructorOptions.md)

The options for the connector.

#### Returns

[`DataExtractionService`](DataExtractionService.md)

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"data-extraction"`

The namespace supported by the data extraction service.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### ruleGroupStore()

> **ruleGroupStore**(`ruleGroup`): `Promise`\<`void`\>

Store an extraction rule group.

#### Parameters

##### ruleGroup

`IRuleGroup`

The rule group to store.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IDataExtractionComponent.ruleGroupStore`

***

### ruleGroupRetrieve()

> **ruleGroupRetrieve**(`ruleGroupId`): `Promise`\<`IRuleGroup`\>

Retrieve a rule group for extraction.

#### Parameters

##### ruleGroupId

`string`

The id of the rule group to retrieve.

#### Returns

`Promise`\<`IRuleGroup`\>

The rule group.

#### Implementation of

`IDataExtractionComponent.ruleGroupRetrieve`

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

#### Implementation of

`IDataExtractionComponent.ruleGroupRemove`

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

#### Implementation of

`IDataExtractionComponent.extract`

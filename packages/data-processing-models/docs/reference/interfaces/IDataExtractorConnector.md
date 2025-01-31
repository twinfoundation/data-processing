# Interface: IDataExtractorConnector

Interface describing a connector for extracting data.

## Methods

### extract()

> **extract**(`structuredData`, `extractRules`): `Promise`\<[`IStructuredData`](IStructuredData.md)\>

Extracts data from the from the provided input.

#### Parameters

##### structuredData

[`IStructuredData`](IStructuredData.md)

The object to extract from.

##### extractRules

[`IExtractRule`](IExtractRule.md)[]

The rules to use to extract the data.

#### Returns

`Promise`\<[`IStructuredData`](IStructuredData.md)\>

The extracted data.

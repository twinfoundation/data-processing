# Class: JsonPathExtractorConnector

Class for extracting data from a JSON source.

## Implements

- `IDataExtractorConnector`

## Constructors

### new JsonPathExtractorConnector()

> **new JsonPathExtractorConnector**(): [`JsonPathExtractorConnector`](JsonPathExtractorConnector.md)

#### Returns

[`JsonPathExtractorConnector`](JsonPathExtractorConnector.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### extract()

> **extract**(`structuredData`, `extractRules`): `Promise`\<`IStructuredData`\>

Extracts data from the from the provided input.

#### Parameters

##### structuredData

`IStructuredData`

The object to extract from.

##### extractRules

`IExtractRule`[]

The rules to use to extract the data.

#### Returns

`Promise`\<`IStructuredData`\>

The extracted data.

#### Implementation of

`IDataExtractorConnector.extract`

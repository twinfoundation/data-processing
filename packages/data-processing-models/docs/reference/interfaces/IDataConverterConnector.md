# Interface: IDataConverterConnector

Interface describing a connector for extracting data.

## Methods

### mimeTypes()

> **mimeTypes**(): `string`[]

The MIME types that the converter can convert.

#### Returns

`string`[]

The MIME types.

***

### convert()

> **convert**(`data`): `Promise`\<[`IStructuredData`](IStructuredData.md)\>

Converts the data to a structured object.

#### Parameters

##### data

`Uint8Array`

The data to extract from.

#### Returns

`Promise`\<[`IStructuredData`](IStructuredData.md)\>

The extracted data.

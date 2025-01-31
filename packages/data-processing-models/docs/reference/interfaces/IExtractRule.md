# Interface: IExtractRule

Definition for the data to extract.

## Properties

### source

> **source**: `string`

The path to the data in the document to extract.
should be in JSONPath format https://www.rfc-editor.org/rfc/rfc9535.html.

***

### target

> **target**: `string`

The target path of where to store the extracted data.
Supports simple dotted path notation, and numeric index notation.

#### Example

```ts
"path.to.data" or "path.to.data.0"
```

***

### maintainNestingDepth?

> `optional` **maintainNestingDepth**: `number`

When extracting objects, should the path be maintained in the target object.

***

### coerce?

> `optional` **coerce**: `CoerceType`

Should the data be coerced to a specific type.

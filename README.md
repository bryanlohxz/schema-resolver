# Optical Schema Resolving Tool

I am honestly so annoyed at the constant need to resolve directus schemas.

## Schema Definition

```typescript
{
  "version": 1;
  "directus": string; // Currently on version 11.2.1
  "vendor": "postgres";
  "collections": object[];
  "fields": object[];
  "relations": object[];
}
```

## Resolution Logic

### Collections

```typescript
{
  "collection": string;
  "meta": object;
}
```

- If equal, take any.
- If unequal and different `collection`, take the one that comes first in alphabetical order.
- Else, open resolution editor.

### Fields

```typescript
{
  "collection": string;
  "field": string;
  "type": string;
  "meta": object;
}
```

- If equal, take any.
- If unequal and different `collection`, take the one that comes first in alphabetical order.
- If unequal and different `field`, take the one that comes first in alphabetical order.
- If unequal and different `type`, take the one that comes first in alphabetical order.
- Else, open resolution editor.

### Relations

```typescript
{
  "collection": string;
  "field": string;
  "related_collection": string;
  "meta": object;
}
```

- If equal, take any.
- If unequal and different `collection`, take the one that comes first in alphabetical order.
- If unequal and different `field`, take the one that comes first in alphabetical order.
- If unequal and different `related_collection`, take the one that comes first in alphabetical order.
- Else, open resolution editor.

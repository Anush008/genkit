<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@genkit-ai/ai](./ai.md) &gt; [Candidate](./ai.candidate.md) &gt; [hasValidOutput](./ai.candidate.hasvalidoutput.md)

## Candidate.hasValidOutput() method

Determine whether this candidate has output that conforms to a provided schema.

**Signature:**

```typescript
hasValidOutput(request?: GenerateRequest): boolean;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

request


</td><td>

GenerateRequest


</td><td>

_(Optional)_ A request containing output schema to validate against. If not provided, uses request embedded in candidate.


</td></tr>
</tbody></table>
**Returns:**

boolean

True if output matches request schema or if no request schema is provided.

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@genkit-ai/ai](./ai.md) &gt; [Candidate](./ai.candidate.md) &gt; [output](./ai.candidate.output.md)

## Candidate.output() method

If a candidate's message contains a `data` part, it is returned. Otherwise, the `output()` method extracts the first valid JSON object or array from the text contained in the candidate's message and returns it.

**Signature:**

```typescript
output(): O | null;
```
**Returns:**

O \| null

The structured output contained in the candidate.

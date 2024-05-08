<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@genkit-ai/ai](./ai.md) &gt; [Message](./ai.message.md) &gt; [output](./ai.message.output.md)

## Message.output() method

If a message contains a `data` part, it is returned. Otherwise, the `output()` method extracts the first valid JSON object or array from the text contained in the message and returns it.

**Signature:**

```typescript
output(): T | null;
```
**Returns:**

T \| null

The structured output contained in the message.

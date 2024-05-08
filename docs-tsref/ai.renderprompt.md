<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@genkit-ai/ai](./ai.md) &gt; [renderPrompt](./ai.renderprompt.md)

## renderPrompt() function

**Signature:**

```typescript
declare function renderPrompt<I extends z__default.ZodTypeAny = z__default.ZodTypeAny, CustomOptions extends z__default.ZodTypeAny = z__default.ZodTypeAny>(params: {
    prompt: PromptArgument<I>;
    input: z__default.infer<I>;
    model: ModelArgument<CustomOptions>;
    config?: z__default.infer<CustomOptions>;
}): Promise<GenerateOptions>;
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

params


</td><td>

{ prompt: PromptArgument&lt;I&gt;; input: z\_\_default.infer&lt;I&gt;; model: ModelArgument&lt;CustomOptions&gt;; config?: z\_\_default.infer&lt;CustomOptions&gt;; }


</td><td>


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;[GenerateOptions](./ai.generateoptions.md)<!-- -->&gt;

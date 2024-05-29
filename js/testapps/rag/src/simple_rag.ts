/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Document, index, retrieve } from '@genkit-ai/ai/retriever';
import {
  devLocalIndexerRef,
  devLocalRetrieverRef,
} from '@genkit-ai/dev-local-vectorstore';
import { defineFlow } from '@genkit-ai/flow';
import { chromaIndexerRef, chromaRetrieverRef } from 'genkitx-chromadb';
import { pineconeIndexerRef, pineconeRetrieverRef } from 'genkitx-pinecone';
import { qdrantIndexerRef, qdrantRetrieverRef } from 'genkitx-qdrant';
import * as z from 'zod';
import { augmentedPrompt } from './prompt.js';

// Setup the models, embedders and "vector store"
export const catFactsRetriever = pineconeRetrieverRef({
  indexId: 'cat-facts',
  displayName: 'Cat facts retriever',
});

export const catFactsIndexer = pineconeIndexerRef({
  indexId: 'cat-facts',
  displayName: 'Cat facts indexer',
});

export const dogFactsRetriever = chromaRetrieverRef({
  collectionName: 'dogfacts_collection',
  displayName: 'Dog facts retriever',
});

export const dogFactsIndexer = chromaIndexerRef({
  collectionName: 'dogfacts_collection',
  displayName: 'Dog facts indexer',
});

// Simple aliases for readability
export const nfsDogFactsRetriever = devLocalRetrieverRef('dog-facts');
export const nfsDogFactsIndexer = devLocalIndexerRef('dog-facts');

export const knowHowsRetriever = qdrantRetrieverRef({
  collectionName: 'know-hows',
  displayName: 'Knowhows retriever',
});

export const knowHowsIndexer = qdrantIndexerRef({
  collectionName: 'know-hows',
  displayName: 'Knowhows indexer',
});

// Define a simple RAG flow, we will evaluate this flow
export const askQuestionsAboutCatsFlow = defineFlow(
  {
    name: 'askQuestionsAboutCats',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const docs = await retrieve({
      retriever: catFactsRetriever,
      query,
      options: { k: 3 },
    });
    return augmentedPrompt
      .generate({
        input: {
          question: query,
          context: docs.map((d) => d.text()),
        },
      })
      .then((r) => r.text());
  }
);

// Define a simple RAG flow, we will evaluate this flow
// genkit flow:run askQuestionsAboutDogs '"How many dog breeds are there?"'
export const askQuestionsAboutDogsFlow = defineFlow(
  {
    name: 'askQuestionsAboutDogs',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const docs = await retrieve({
      retriever: nfsDogFactsRetriever,
      query,
      options: { k: 3 },
    });
    return augmentedPrompt
      .generate({
        input: {
          question: query,
          context: docs.map((d) => d.text()),
        },
      })
      .then((r) => r.text());
  }
);

// Define a simple RAG flow, we will evaluate this flow
// $ genkit flow:run askQuestionsAboutKnowHows '"What does a cake need?"'
export const askQuestionsAboutKnowHowsFlow = defineFlow(
  {
    name: 'askQuestionsAboutKnowHows',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const docs = await retrieve({
      retriever: knowHowsRetriever,
      query,
      options: { k: 3 },
    });
    return augmentedPrompt
      .generate({
        input: {
          question: query,
          context: docs.map((d) => d.text()),
        },
      })
      .then((r) => r.text());
  }
);

// Define a simple RAG flow, we will evaluate this flow
export const indexCatFactsDocumentsFlow = defineFlow(
  {
    name: 'indexCatFactsDocuments',
    inputSchema: z.array(z.string()),
    outputSchema: z.void(),
  },
  async (docs) => {
    const documents = docs.map((text) => {
      return Document.fromText(text, { type: 'animal' });
    });
    await index({
      indexer: catFactsIndexer,
      documents,
    });
  }
);

// Define a flow to index documents into the "vector store"
// $ genkit flow:run indexDogFacts '["There are over 400 distinct dog breeds."]'
export const indexDogFactsDocumentsFlow = defineFlow(
  {
    name: 'indexDogFactsDocuments',
    inputSchema: z.array(z.string()),
    outputSchema: z.void(),
  },
  async (docs) => {
    const documents = docs.map((text) => {
      return Document.fromText(text, { type: 'animal' });
    });
    await index({
      indexer: nfsDogFactsIndexer,
      documents,
    });
  }
);

// Define a flow to index documents into the "vector store"
// $ genkit flow:run indexKnowHowsDocuments '["To make a cake, you need flour, sugar, and eggs."]'
export const indexKnowHowsDocumentsFlow = defineFlow(
  {
    name: 'indexKnowHowsDocuments',
    inputSchema: z.array(z.string()),
    outputSchema: z.void(),
  },
  async (docs) => {
    const documents = docs.map((text) => {
      return Document.fromText(text, { type: 'description' });
    });
    await index({
      indexer: knowHowsIndexer,
      documents,
    });
  }
);

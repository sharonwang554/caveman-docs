# Architecture and Benchmarks

Caveman shrinks what the agent **says**, not what it knows.

## Before / After Example

| 🗣️ Normal agent — 69 tokens | 🪨 Caveman agent — 19 tokens |
|---|---|
| The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I'd recommend using useMemo to memoize the object. | New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`. |

Same fix. Third of the words. Nothing technical lost.

## Token Savings

- **Output tokens saved:** 65% (on prose)
- **Input tokens saved:** 0%
- **Technical accuracy:** 100%
- **Vibes:** OOG

That 65% is the prose number. On a full agentic coding run, where most of the output is code and tool calls, it's about 8.5%.

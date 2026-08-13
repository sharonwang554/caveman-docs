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

## Wrap Benchmark (CaveBench)

In a pinned 54-run Claude Code benchmark, Caveman-wrapped Claude Code used **33.2% fewer provider-reported input tokens** than direct Claude Code: **591,673 vs 885,793 tokens** across 18 paired runs. Caveman passed all **18/18 exact-answer checks**.

| Arm | Exact quality | Provider input on held pairs | Reduction vs direct |
|---|---:|---:|---:|
| Direct Claude Code | 18/18 | 885,793 | baseline |
| Caveman wrap + skill | 18/18 | 591,673 | **33.2%** |

### Per-case results

| Case | Shape | Direct input | Caveman input | Reduction | Quality |
|---|---|---:|---:|---:|---:|
| `sre-log-needle` | log | 148,807 | 74,068 | 50.2% | 3/3 |
| `deployment-json-drift` | JSON | 147,975 | 108,939 | 26.4% | 3/3 |
| `fraud-csv-outlier` | CSV | 165,823 | 74,484 | 55.1% | 3/3 |
| `test-output-failure` | test output | 150,377 | 108,514 | 27.8% | 3/3 |
| `config-yaml-drift` | YAML | 132,124 | 71,027 | 46.2% | 3/3 |
| `dashboard-html-alert` | HTML | 140,687 | 154,641 | **-9.9%** | 3/3 |

HTML regressed because no compression transform applied while full Caveman skill overhead remained counted. Unsupported and no-op inputs stay in the aggregate.

Claim basis: `benchmark_counterfactual`. This is controlled benchmark evidence, not production traffic or verified savings. Full method: [WRAP-BENCHMARK.md](https://github.com/JuliusBrussee/caveman/blob/main/docs/WRAP-BENCHMARK.md).

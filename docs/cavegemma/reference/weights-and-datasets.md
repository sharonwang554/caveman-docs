---
id: weights
title: Weights & Datasets
sidebar_position: 1
---

## Shipped weights

Two flavors. Pick by VRAM.

| Repo | Format | Size | What it is |
|---|---|---|---|
| [`JBrussee/gemma-4-31B-caveman`](https://huggingface.co/JBrussee/gemma-4-31B-caveman) | bf16 merged | 62.5 GB | Full Gemma 4 31B, caveman baked in. Drop-in. |
| [`JBrussee/gemma-4-31B-caveman-lora`](https://huggingface.co/JBrussee/gemma-4-31B-caveman-lora) | LoRA adapter | 534 MB | Stack on `google/gemma-4-31B-it`. Light download. |

No GGUF or AWQ build yet. Quantize one, open a PR, and it goes in the table with your name on it.

## Repo layout

```
cavegemma/
├── data/
│   ├── seeds/                 caveman repo snapshots (SKILL.md, eval prompts)
│   ├── sources/               per-source HuggingFace loaders
│   ├── build_corpus.py        orchestrator (6 sources → corpus_raw.jsonl)
│   ├── synthesize.py          claude/codex CLI driver, two-step rewrite, resumable
│   ├── filter.py              fence-integrity + dedup + compression band
│   ├── split.py               90/10 split with seed-pair pinning
│   └── prompts/, out/         (out gitignored)
├── training/
│   ├── train_unsloth.py       Unsloth + TRL SFT trainer, resume from checkpoint
│   ├── runpod_bootstrap.sh    pip + auth bootstrap for fresh pod
│   └── config.toml            single source of truth for hyperparams
├── eval/
│   ├── metrics.py             compression / article-drop / code-fence / semantic_sim
│   ├── run_eval.py            score adapter on holdout + workflow prompts
│   ├── judge.py               LLM-judge via claude CLI on 20 holdouts
│   └── workflow_prompts.jsonl 10 hand-curated workflow eval prompts
├── scripts/
│   ├── infer.py               smoke-test against caveman eval prompts
│   └── push_to_hub.py         publish adapter + model card
└── artifacts/                 (gitignored)
```

Every stage saves as it goes and resumes by key-hash. Kill any step, rerun it, it picks up where it stopped. This isn't politeness. The synthesis step burns CLI quota and you *will* get rate-limited somewhere inside a 3000-row run.

## Datasets

All permissively licensed. Six sources in, 1750 train + 193 eval out.

| Source | License | Pulled | Used for |
|---|---|---:|---|
| [`OpenAssistant/oasst2`](https://huggingface.co/datasets/OpenAssistant/oasst2) | Apache 2.0 | 400 | Multi-turn dialogue |
| [`princeton-nlp/SWE-bench_Verified`](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified) | research-permissive | 400 | Debug-session narratives |
| [`ronantakizawa/github-codereview`](https://huggingface.co/datasets/ronantakizawa/github-codereview) | permissive subset | 400 | Code review |
| [`bigcode/commitpackft`](https://huggingface.co/datasets/bigcode/commitpackft) | MIT/Apache subset | 300 | Refactor walkthroughs |
| [`theblackcat102/evol-codealpaca-v1`](https://huggingface.co/datasets/theblackcat102/evol-codealpaca-v1) | Apache 2.0 | 1200 | Short technical Q&A |
| [`HuggingFaceH4/ultrachat_200k`](https://huggingface.co/datasets/HuggingFaceH4/ultrachat_200k) | MIT | 300 | Short Q&A overflow |
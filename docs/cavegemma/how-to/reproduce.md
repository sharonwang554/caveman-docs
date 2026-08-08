---
id: reproduce
title: Reproduce
sidebar_position: 1
---

## Reproduce

Six to eight hours wall clock, most of it synthesis. Four or five dollars of GPU.

```bash
# 1. Local setup
uv sync
uv run python data/extract_seeds.py            # 20 gold seed pairs
uv run python data/build_corpus.py             # 3000 rows from 6 HF sources

# 2. Synthesis (Claude Code or Codex CLI required)
uv run python data/synthesize.py --backend claude --workers 3      # or
uv run python data/synthesize.py --backend codex --workers 3

# 3. Filter + split
uv run python data/filter.py --in data/out/raw_pairs.jsonl --out data/out/clean_pairs.jsonl
uv run python data/split.py --in data/out/clean_pairs.jsonl

# 4. RunPod H100 / RTX PRO 6000 — rsync, ssh, bootstrap, train
rsync -avz --exclude='.git' --exclude='.venv' -e "ssh -p <port> -i ~/.ssh/id_ed25519" ./ root@<pod>:/workspace/cavegemma/
ssh -i ~/.ssh/id_ed25519 -p <port> root@<pod> "
  export HF_TOKEN=...
  export WANDB_API_KEY=...
  cd /workspace/cavegemma
  bash training/runpod_bootstrap.sh
  python training/train_unsloth.py --config training/config.toml
"

# 5. Eval + ship
python eval/run_eval.py --adapter artifacts/adapter --eval data/out/eval.jsonl --workflow eval/workflow_prompts.jsonl --out artifacts/eval_predictions.jsonl
python scripts/push_to_hub.py --adapter artifacts/adapter --repo <hf-user>/gemma-4-31B-caveman-lora
```

Stick to `--workers 3`. Eight concurrent workers burned a Claude Max budget in ten minutes, since each invocation drags ~24k tokens of session bootstrap behind it.
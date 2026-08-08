---
id: quick-start
title: Quick Start
sidebar_position: 1
---

## Quick start

### Merged model, no extra setup

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

tok = AutoTokenizer.from_pretrained("JBrussee/gemma-4-31B-caveman")
model = AutoModelForCausalLM.from_pretrained(
    "JBrussee/gemma-4-31B-caveman",
    torch_dtype=torch.bfloat16,
    device_map="auto",
)

msgs = [{"role": "user", "content": "Why does my React component re-render every time the parent updates?"}]
inputs = tok.apply_chat_template(msgs, return_tensors="pt", add_generation_prompt=True).to(model.device)
out = model.generate(inputs, max_new_tokens=300, do_sample=False)
print(tok.decode(out[0, inputs.shape[1]:], skip_special_tokens=True))
```

### LoRA adapter on base, lighter download

```python
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

base = AutoModelForCausalLM.from_pretrained(
    "google/gemma-4-31B-it",
    torch_dtype=torch.bfloat16,
    device_map="auto",
)
tok = AutoTokenizer.from_pretrained("google/gemma-4-31B-it")
model = PeftModel.from_pretrained(base, "JBrussee/gemma-4-31B-caveman-lora")
```

There is no step three. Ask question, model talk caveman.

Gemma 4 hands you a `Gemma4Processor` rather than a tokenizer, so if you wander off the beaten path, unwrap it first: `tokenizer = getattr(tokenizer, "tokenizer", tokenizer)`. Eleven more traps like that one are written down in `AGENTS.md`, each of which cost real hours.
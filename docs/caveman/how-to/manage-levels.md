# How to Manage Caveman Levels

Caveman provides multiple levels of verbosity. You can switch anytime using the `/caveman <level>` command. The level sticks until you change it or the session ends.

## Available Levels

| Level | Same sentence, shrunk |
|---|---|
| *normal agent* | You should wrap the object in `useMemo`, since a new reference is created on every render. |
| `lite` | Wrap object in `useMemo`. New ref created every render. |
| `full` *(default)* | New ref each render. Wrap object in `useMemo`. |
| `ultra` | New ref/render. `useMemo` it. |
| `wenyan-lite` | Classical Chinese, light compression. |
| `wenyan-full` | Classical Chinese, full compression. |
| `wenyan-ultra` | Classical Chinese, maximum compression. |
| `off` | Disable caveman compression entirely. |

> **Speak your tongue.** Caveman keeps your language. Write Portuguese, caveman grunt Portuguese. Spanish, French, same. It compresses the *style*, never translates. `wenyan` modes are the exception on purpose: classical Chinese packs the most meaning per token.

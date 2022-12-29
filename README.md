# setup-haskell

[![build](https://github.com/hspec/setup-haskell/actions/workflows/build.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/build.yml)
[![selftest.ubuntu-18.04](https://github.com/hspec/setup-haskell/actions/workflows/selftest.ubuntu-18.04.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/selftest.ubuntu-18.04.yml)
[![selftest.ubuntu-20.04](https://github.com/hspec/setup-haskell/actions/workflows/selftest.ubuntu-20.04.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/selftest.ubuntu-20.04.yml)
[![selftest.ubuntu-22.04](https://github.com/hspec/setup-haskell/actions/workflows/selftest.ubuntu-22.04.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/selftest.ubuntu-22.04.yml)
[![selftest.macos-10.15](https://github.com/hspec/setup-haskell/actions/workflows/selftest.macos-10.15.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/selftest.macos-10.15.yml)
[![selftest.macos-11](https://github.com/hspec/setup-haskell/actions/workflows/selftest.macos-11.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/selftest.macos-11.yml)
[![selftest.macos-12](https://github.com/hspec/setup-haskell/actions/workflows/selftest.macos-12.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/selftest.macos-12.yml)
[![selftest.windows-2019](https://github.com/hspec/setup-haskell/actions/workflows/selftest.windows-2019.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/selftest.windows-2019.yml)
[![selftest.windows-2022](https://github.com/hspec/setup-haskell/actions/workflows/selftest.windows-2022.yml/badge.svg)](https://github.com/hspec/setup-haskell/actions/workflows/selftest.windows-2022.yml)

This GitHub Action sets up a Haskell environment by:

- installing a request version of [ghc](https://downloads.haskell.org/ghc/latest/docs/users_guide/) and adding it to the `PATH`.
- adding `$HOME/.cabal/bin/` to the `PATH`.

The GitHub runners come with [pre-installed versions of GHC and
Cabal](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software).
Those will be used whenever possible.

For all other versions, this action utilizes [`ppa:hvr/ghc`](https://launchpad.net/~hvr/+archive/ubuntu/ghc) and [`ghcup`](https://www.haskell.org/ghcup/).

## Usage

See [action.yml](action.yml)

## Supported versions
<!-- BEGIN generated by generate/readme.ts -->
|                        | `ubuntu-18.04` | `ubuntu-20.04` | `ubuntu-22.04` | `macos-10.15` | `macos-11` | `macos-12` | `windows-2019` | `windows-2022` |
| :--------------------- | :------------: | :------------: | :------------: | :-----------: | :--------: | :--------: | :------------: | :------------: |
| `latest` `9.4` `9.4.4` |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.4.3`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.4.2`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.4.1`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.2` `9.2.5`          |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.2.4`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.2.3`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.2.2`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.2.1`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.0` `9.0.2`          |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `9.0.1`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.10` `8.10.7`        |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.10.6`               |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.10.5`               |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.10.4`               |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.10.3`               |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.10.2`               |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.10.1`               |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.8` `8.8.4`          |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.8.3`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       ❌       |
| `8.8.2`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.8.1`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.6` `8.6.5`          |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.6.4`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.6.3`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.6.2`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.6.1`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.4` `8.4.4`          |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.4.3`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.4.2`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.4.1`                |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.2` `8.2.2`          |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `8.0` `8.0.2`          |       🟢       |       🟢       |       🟢       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `7.10` `7.10.3`        |       🟢       |       🟢       |       ❌       |       🟢      |     🟢     |     🟢     |       🟢       |       🟢       |
| `7.8` `7.8.4`          |       🟢       |       ❌       |       ❌       |       ❌      |     ❌     |     ❌     |       ❌       |       ❌       |
| `7.6` `7.6.3`          |       🟢       |       ❌       |       ❌       |       ❌      |     ❌     |     ❌     |       ❌       |       ❌       |
| `7.4` `7.4.2`          |       🟢       |       🟢       |       ❌       |       ❌      |     ❌     |     ❌     |       ❌       |       ❌       |
| `7.4.1`                |       🟢       |       ❌       |       ❌       |       ❌      |     ❌     |     ❌     |       ❌       |       ❌       |
| `7.2` `7.2.2`          |       🟢       |       🟢       |       ❌       |       ❌      |     ❌     |     ❌     |       ❌       |       ❌       |
| `7.0` `7.0.4`          |       🟢       |       🟢       |       ❌       |       ❌      |     ❌     |     ❌     |       ❌       |       ❌       |
| `7.0.1`                |       🟢       |       🟢       |       ❌       |       ❌      |     ❌     |     ❌     |       ❌       |       ❌       |
<!-- generated by generate/readme.ts END -->

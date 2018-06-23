# React Native Zcash Wallet

This repository uses yarn workspaces and react native. For a blow-by-blow
account of how I got this working, [see here](STORY.md).

## Prerequisites

Install git and yarn and Xcode and stuff.

## Installation

After cloning this repo and moving to its root, run:

```
yarn
```

## Start the ZcashWallet application

```
cd applications/ZcashWallet
yarn start
```

Now that you've started the application, you can edit any of its dependencies
anywhere in the workspace and they will be babelified and repackaged and the
app will update live! Sweet!

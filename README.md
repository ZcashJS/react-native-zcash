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

## Start the CRNA ZcashWallet application

```
cd applications/ZcashWallet
yarn start
```

Now that you've started the application, you can edit any of its dependencies
anywhere in the workspace and they will be babelified and repackaged and the
app will update live! Sweet!

## Start the MacOS app

```
cd applications/ZcashOSX
yarn macos
```

To bypass the auth screen while developing,
set `REACT_APP_ZCASH_USERNAME` and `REACT_APP_ZCASH_PASSWORD`
in the `.env` file in the root directory.
Note: to toggle this with the application running,
you might need to change and save `core/state/reducers.js`
to provoke babel to retranspile that file.

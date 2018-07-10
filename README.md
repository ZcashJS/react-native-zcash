# React Native Zcash Wallet

This repository uses yarn workspaces and react native. For a blow-by-blow
account of how I got this working, [see here](STORY.md).

This project is under development and is pre-alpha quality.
Only use with testnet tokens for now.

## Prerequisites

Install git and yarn and Xcode and stuff.

## Installation

After cloning this repo and moving to its root, run:

```
yarn
```

## Start the ZcashOSX app

The ZcashOSX app must be started before storybook, it seems:

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

You can then ignore your local changes to this file:

```
git update-index --assume-unchanged .env
```

## Start the Storybook component development environment

```
cd applications/zcash-storybook
yarn storybook
yarn start
```

Open an emulator to hot-reload the stories.

Now that you've started the application(s),
you can edit any of the components and core libraries
anywhere in the workspace and they will be babelified and repackaged and the
app will update live! Sweet!

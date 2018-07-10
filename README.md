# React Native Zcash Wallet

~~This repository uses yarn workspaces and react native.~~
For now we are not able to use `yarn workspaces`,
see for instance, https://github.com/facebook/metro/issues/1.
Further investigation is warranted as the ecosystem is evolving rapidly.
For a blow-by-blow
account of how this repository has been setup, [see here](STORY.md).

This project is under development and is pre-alpha quality.
Only use with testnet tokens for now.

## Prerequisites

Install git, node, yarn and Xcode and stuff.

## Installation

After cloning this repo and moving to its root, run:

```
# TODO: bring back yarn workspaces when react-native ecosystem is ready.
yarn all
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

## Start Storybook

```
cd applications/zcash-storybook
yarn storybook
# then in a separate terminal:
yarn ios  # or `yarn android`
```

Now you can edit modules in `components` and see the results
on your simulator.

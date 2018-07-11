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

The ZcashOSX app must be started before storybook, it seems.
If you want to start the OSX app:

```
cd applications/ZcashOSX
yarn macos
```

## Start the Storybook component development environment

```
cd applications/zcash-storybook
yarn storybook
# in another terminal
yarn start  
```

Open an emulator to hot-reload the stories.

Now that you've started the application(s),
you can edit any of the components and core libraries
anywhere in the workspace and they will be babelified and repackaged and the
app will update live! Sweet!

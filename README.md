# React Native Zcash Wallet

Goals:

* build a cross-platform Zcash wallet UI that talks to a full node.
* use a single codebase that is modular with reusable parts.

## Story

We need some slick user interfaces for Zcash. But, we're pretty busy. So,
let's try to build it all in React Native and see if we can get a good
looking wallet going on Android, iOS, OSX, Windows and Linux from the same
code base with extreme modularity and awesomeness falling out of its ears.

### Start a Zcash full node

First, you'll want to get a full node going. You'll need a computer
with somewhere close to 15GB of storage to download the parameters and the
blockchain.
You'll want to get that started first. I'm developing on a Mac and started
here: https://github.com/kozyilmaz/zcash-apple. It's awesome.

Once you have the blockchain syncing, you can continue reading about how
this repo is setup or skip the story and go to the end for "installation",
"usage", "building" and "developing".

### `yarn` workspaces (~1.7.0)

Let's use yarn workspaces with react native.

Uh oh.

https://medium.com/viewstools/how-to-use-yarn-workspaces-with-create-react-app-and-create-react-native-app-expo-to-share-common-ea27bc4bad62

Hrm.

https://github.com/connectdotz/yarn-nohoist-examples

We are attempting to make independent packages that can be reused in other
projects and create a scalable build system and developer experience where many
developers can iterate rapidly on a large, common codebase. We may look to use
Bazel to explicitly map the dependency graph and keep the build fast in the
event that this repo grows very large. But, let's not get ahead of ourselves.

#### Added workspaces to root `package.json`

Look in package.json for the workspaces. You'll see something like:

```
"workspaces": {
  "packages": [
    "applications/*",
    "components/*",
    "core/*"
  ],
  "nohoist": [
    "**/react-native", "**/react-native/**",
    "**/react-native-scripts", "**/react-native-scripts/**",
    "**/expo", "**/expo/**"
  ]
}
```

#### Adjusted `.yarnrc` to share dev tools

```
echo "--ignore-workspace-root-check true" > .yarnrc
```

Actually, let's not do this and use -W so we don't accidentally add things
to the workspace root.

#### Added eslint for worksapces

```
yarn add --dev eslint
eslint --init
```

#### Added a test module in core

```
mkdir -p core/zest
cd core/zest
yarn init
echo "module.exports = 'Hello zest!'" > index.js
cd ../..
yarn
ls node_modules | grep zest
```

Okay, let's try to import or zest module in node.

```
> z = require('zest')
'Hello zest!'
```

We can import zest anywhere in the monorepo and we will get the latest.
Edit the code and rerun anywhere.

#### Introduced Babel

To write the fancy JavaScript we want to write but have it work in react-native,
node or browsers, we need to use Babel. Following along with the guide:

https://babeljs.io/docs/en

```
cd core/zest
npm install --save-dev babel-cli babel-preset-env
```

#### Started a pure JavaScript Zash JSON RPC lib

I'll probably try to fork someone else's code at some point. But, let's
experience the pain and bliss of writing a JSON-RPC library for Zcash from
scratch.

```
mkdir -p core/zcash-rpc
cd core/zcash-rpc
yarn init
```

Actually, let's not reinvent the wheel and at least wrap a JSON-RPC lib:

```
yarn add jayson
```

Test that it is installed and see that it was hoisted:

```
node -e "console.log(require.resolve('jayson'))"
```

Let's start an entrypoint and add some files to implement Zcash methods:

```
touch index.js
touch getbestblockhash.js
touch getblock.js
# ...
```

*Goes about implementing some stuff ...*

TODO: figure out how to actually configure Jayson to talk to the Zcash daemon.

#### Use existing Bitcoin JSON-RPC library

So, we may come back to writing our own client to the Zcash daemon. But,
this project already has a lot of stuff figured out:

https://github.com/ruimarinho/bitcoin-core

And, a brief test showed that it works with the Zcash daemon. Let's
see if we can add the Zcash methods to this library. First, I made a fork:

https://github.com/skyl/node-zcash-rpc

I'll probably want to read the repo into a subtree of the monorepo eventually.
But, for now I'm just going to use a submodule to keep the history clean.

```
git submodule add https://github.com/skyl/node-zcash-rpc core/node-zcash-rpc
```

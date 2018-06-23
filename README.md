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

#### Root `package.json`

Look in package.json for the workspaces. You'll see something like:

```
"workspaces": {
  "packages": [
    "applications/*",
    "components/*",
    "core/*"
  ],
  "nohoist": [
    "**/react-native",
    "**/react-native/**",
    "**/react-native-scripts",
    "**/react-native-scripts/**",
    "**/expo",
    "**/expo/**"
  ]
}
```

#### `.yarnrc` to share dev tools

```
echo "--ignore-workspace-root-check true" > .yarnrc
```

Actually, let's not do this and use -W so we don't accidentally add things
to the workspace root.

#### `eslint` for worksapces

```
yarn add -W --dev eslint
eslint --init
```

#### A test module in core

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

<!-- #### Babel

To write the fancy JavaScript we want to write but have it work in react-native,
node or browsers, we need to use Babel. Following along with the guide:

https://babeljs.io/docs/en

```
cd core/zest
npm install --save-dev babel-cli babel-preset-env
``` -->

#### A pure JavaScript Zcash JSON RPC lib

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

I'll probably want to read the repo's history into a subtree of the monorepo,
eventually.
But, for now I'm just going to use a submodule to keep the history clean.

```
git submodule add https://github.com/skyl/node-zcash-rpc core/node-zcash-rpc
```

Run `yarn` in the root to get the dependencies.

Let's test that we can use this client in node. First add you rpc username
and password as found in your zcash.conf:

```
export ZCASH_RPC_USERNAME=YOUR_USERNAME
export ZCASH_RPC_PASSWORD=YOUR_PASSWORD
```

Now run in node:

```
Client = require('node-zcash-rpc')
c = new Client({
  port: 8232,
  username: process.env.ZCASH_RPC_USERNAME,
  password: process.env.ZCASH_RPC_PASSWORD
})
c.getInfo().then((help) => console.log(help))
```

Provided you have a Zcash node running locally, you should see output such as:

```
{ version: 1010150,
  protocolversion: 170006,
  walletversion: 60000,
  balance: 0,
  blocks: 345977,
  timeoffset: 0,
  connections: 8,
  proxy: '',
  difficulty: '9650682.810602054',
  testnet: false,
  keypoololdest: 1529562964,
  keypoolsize: 101,
  paytxfee: 0,
  relayfee: 0.000001,
  errors: '' }
```

#### Create React Native App

Following along here:

https://facebook.github.io/react-native/docs/getting-started.html

```
npm install -g create-react-native-app
mkdir applications
cd applications
create-react-native-app ZcashWallet
```

Oh bother! When we try to import zest into our react native App.js
we find out that (as of time of writing), the react package and the haste
module map or whatnot do not know how find modules that are in the root
node_modules as symlinks.

Luckily it looks like this react-native + yarn workspaces idea is becoming
a well worn path. There is now a video to follow to get the workspaces wired
up for react-native:

https://codedaily.io/screencasts/66/Use-Yarn-Workspaces-to-Share-Code-with-a-create-react-app-and-create-react-native-app-in-a-Monorepo

In our case, let's remove the nohoist specification and see if we can
change to this way.

... *10 minutes later* ... Hallelujah. It Works™.

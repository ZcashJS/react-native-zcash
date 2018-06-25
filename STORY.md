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
this repo is setup. This document is just for the record. If you want to see
what this distilled down to, you should be able to just follow the
[README](README.md) and not have to worry about the fiddliness below.

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

***Whoa. Way better than that though is `stdrpc`!***

https://github.com/montyanderson/stdrpc

```
rpc = require('stdrpc')
c = rpc({
  url: 'http://localhost:8232',
  username: '...',
  password: '...',
})
c.getinfo().then((info) => { console.log(info) } )
```

#### Create React Native App (CRNA)

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

We even got rid of `nohoist` and simplified our package.json:

```
{
  "name": "react-native-zcash-wallet",
  "version": "0.0.1",
  "description": "React Native Zcash Wallet",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "workspaces": {
    "packages": [
      "core/*",
      "components/*",
      "applications/*"
    ]
  },
  "devDependencies": {
    "eslint": "^4.19.1",
    "eslint-plugin-react": "^7.9.1"
  },
  "dependencies": {
    "stdrpc": "^1.0.0"
  }
}
```

#### react-native-macos

Unfortunately, CRNA doesn't have a great integration with any tool to build an
OSX desktop app at the time of writing. But, one of the great advantages of
having a repository with multiple workspaces, applications, components and
libraries is that we can make the applications very lightweight and disposable.
All of the important code can reside in `core/` or `components/` and we can
freely try out different harnesses and build possibilities without an
experiment corrupting another application. We don't have to use branches and
we don't have to have the friction of moving from one repository to another.

Let's create a new react-native application with react-native-macos:

https://github.com/ptmt/react-native-macos#getting-started

```
npm install react-native-macos-cli -g
cd applications/
react-native-macos init ZcashOSX
```

Oh dear: looks like react-native-macos-cli expects to be installed to the
workspace's node_modules instead of the project root!

```
Error: Cannot find module '/.../react-native-zcash-wallet/applications/ZcashOSX/node_modules/react-native-macos/package.json'
```

Let's destroy that and start over:

```
rm -r ZcashOSX
cd ..
find . -name "node_modules" -exec rm -r "{}" \;
yarn
```

Well then. Let's try to use `nohoist`. In package.json then:

```
"workspaces": {
  "packages": [
    "core/*",
    "components/*",
    "applications/*"
  ],
  "nohoist": [
    "**/react-native-macos",
    "**/react-native-macos/**"
  ]
},
```

Now let's try to craete the macos app again:

```
cd applications
react-native-macos init ZcashOSX
```

Can we run it?

```
cd ZcashOSX
react-native-macos run-macos
```

Hrm. For me it doesn't build. Let's try opening the xcodeproj.

```
open macos/ZcashOSX.xcodeproj
```

Hrm. Now it needs to install a bunch of components for XCode?

...

then ...
https://github.com/ptmt/react-native-macos/issues/199

Okay upgraded and then:

```
Loading dependency graph, done.
error: bundling failed: ReferenceError: Unknown plugin "module-resolver" specified in "/Users/skyl/Code/tmp/ZcashOSX/.babelrc" at 0, attempted to resolve relative to "/Users/skyl/Code/tmp/ZcashOSX"
    at /Users/skyl/Code/tmp/ZcashOSX/node_modules/babel-core/lib/transformation/file/options/option-manager.js:180:17
    at Array.map (<anonymous>)
    at Function.normalisePlugins (/Users/skyl/Code/tmp/ZcashOSX/node_modules/babel-core/lib/transformation/file/options/option-manager.js:158:20)
    at OptionManager.mergeOptions (/Users/skyl/Code/tmp/ZcashOSX/node_modules/babel-core/lib/transformation/file/options/option-manager.js:234:36)
    at OptionManager.init (/Users/skyl/Code/tmp/ZcashOSX/node_modules/babel-core/lib/transformation/file/options/option-manager.js:368:12)
    at File.initOptions (/Users/skyl/Code/tmp/ZcashOSX/node_modules/babel-core/lib/transformation/file/index.js:212:65)
    at new File (/Users/skyl/Code/tmp/ZcashOSX/node_modules/babel-core/lib/transformation/file/index.js:135:24)
    at Pipeline.transform (/Users/skyl/Code/tmp/ZcashOSX/node_modules/babel-core/lib/transformation/pipeline.js:46:16)
    at Object.transform (/Users/skyl/Code/tmp/ZcashOSX/node_modules/metro/src/transformer.js:137:11)
 BUNDLE  [macos, dev] ./index.js ░░░░░░░░░░░░░░░░ 0.0% (0/1), failed.
```

Fixed this with:

```
yarn add --dev babel-plugin-module-resolver
```

Still see:

```
ENOENT: no such file or directory, uv_chdir
```

But, the app seems to work ... (this is all in a directory outside the
workspaces ...)

```
react-native-macos run-macos
```

Editing and reloading works with cmd+r.

Let's try to get it working in the yarn workspaces.

So, we have the same problem experienced above with the CRNA app we made.

Let's try to follow the instructions here again for our react-native-macos app:

https://codedaily.io/screencasts/66/Use-Yarn-Workspaces-to-Share-Code-with-a-create-react-app-and-create-react-native-app-in-a-Monorepo

```
yarn workspace ZcashOSX add crna-make-symlinks-for-yarn-workspaces metro-bundler-config-yarn-workspaces --dev
```

Now we edit `rn-cli.config` to use the alternate metro bundler.
We also edit `link-workspaces.js`.

```
yarn workspace add ZcashOSX zest@*
```

Super! I'm importing modules from the workspace into my Cocoa app!

#### Talk to `zcashd` with react-native components

Now that we have an OSX app that can import and babelify from the workspace,
let's try to make a component that can talk to zcashd and display in our app.

We can start from the calls and start with something simple:

https://zcash-rpc.github.io/

```
mkdir components
```

For now, I'm actually going to use a singe package for all components.
We might want to make each component its own package or group components into
packages. For now we can just use 1. Change `package.json` from `components/*`
to `components`. Then,

```
cd components
yarn init
```

This worked OOTB now - see components/GetBestBlockHash.js, for instance.

#### Authentication, redux, AsyncStorage

We're not going to instantiate a new client in every component with
hard-coded credentials. I think the thing to do would be to store the
username and password from user input and store it in AsyncStorage. We can use
redux to organize and share the state in general, starting with the username
and password.

Let's try this:

https://medium.com/@sumitkushwaha/syncing-redux-store-with-asyncstorage-in-react-native-2b8b890b9ca1

eh, maybe not. That's a bit old and a little bit hacky.

How about this?

https://github.com/rt2zz/redux-persist

I got it working but I had to nohoist it.

See

* applications/ZcashOSX/App.js
* applications/ZcashOSX/package.json

etc ...

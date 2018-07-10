# workaround for https://github.com/facebook/metro/issues/1#issuecomment-386852670
npm install -g yarn@rc

yarn

cd components
yarn
cd ..

cd core/lib
yarn
cd ../..

cd core/state
yarn
cd ../..

cd core/zest
yarn
cd ../..

cd components
yarn
cd ..

cd applications/zcash-storybook
yarn
metro-with-symlinks


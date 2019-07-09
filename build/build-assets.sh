WORKPATH=$(dirname $(cd "$(dirname "$0")";pwd))

# 编译
rm -rf $WORKPATH/dist
cd $WORKPATH/admin && yarn && yarn build
cd $WORKPATH/homepage && yarn && yarn build && mv public ../dist/index
cd $WORKPATH/user && yarn && yarn build

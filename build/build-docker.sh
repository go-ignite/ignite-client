#! /bin/bash
WORKPATH=$(dirname $(cd "$(dirname "$0")";pwd))
cd $WORKPATH
docker build -t goignite/ignite-client .

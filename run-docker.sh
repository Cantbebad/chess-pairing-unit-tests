#!/usr/bin/bash

usage() {
   echo """\
Please, create file run-config.source.sh with lines:

PATH_TO_REPO=/full_path_to_your_repo 
PATH_TO_TEST=/full_path_to_test_module_base

and rerun container.

Or more secure approach:
create that config file outside this repo,
for example in ../ConfigDir  (ConfigDir is on same level as your repo)
and make symbolic link to it with name 'run-config.source.sh with
ln -s ../ConfigDir/my-config-name run-config.source.sh
This helps not to accidentaly expose your directory structure after git push,
if something in repo changes, for example .gitignore
"""
}

# -r = readable
if [ ! -r run-config.source.sh ]; then
  usage
  exit
fi

source run-config.source.sh

if [ "${PATH_TO_REPO}" == "" ]; then
	usage
	exit
fi

if [ "${PATH_TO_TEST}" == "" ]; then
	usage
	exit
fi

docker run \
	--rm \
	-it \
	--mount type=bind,source="${PATH_TO_REPO}",readonly,destination=/home/tester/repo \
	--mount type=bind,source="${PATH_TO_TEST}",readonly,destination=/home/tester/test_module_base \
	chess-pairing-test

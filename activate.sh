

# usage: (in bash)
# source activate.sh # OR
# . activate.sh

# DO NOT change to executable with chmod +x ...
# As it is, that forces to use 
# > source this-script 
# or
# > . this-script
# to run it, otherwise it creates virtual envs and immediately exites

#set -e  # dont -> it will exit your current bash after first error

source ./venv/bin/activate

source ./nodeenv/bin/activate

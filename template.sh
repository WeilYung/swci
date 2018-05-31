#!/bin/bash
d=$(date +%Y%m%d%H%M%S)
p=
f=$p/swci$d.log
# f=test.log
j=$p/swci2.js

# needed to ensure libxss1 library available, not native to gcloud
#sudo apt-get install libxss1

cd $p

#flyer info, change to adjust for flights
firstName=
lastName=
conf=

fname=$firstName_$lastName_$conf.png

/usr/local/nvm/versions/node/v8.9.4/bin/node $j $firstName $lastName $conf  >& $f
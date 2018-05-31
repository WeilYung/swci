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
email=

fname=${firstName}_${lastName}_${conf}.png

if [ -f $fname ]
then rm $fname
fi

/usr/bin/node $j $firstName $lastName $conf  >& $f

if [ -f $fname ]
then
	python $p/aws_email.py -t $email -r Success -a $fname
else
	python $p/aws_email.py -t $email -r Fail -a $f
fi
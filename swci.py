import mechanize
from numpy import genfromtxt


FILE = "flight.csv"
SITE = "https://www.southwest.com/air/check-in/index.html?redirectToVision=true&leapfrogRequest=true"

class Person(object):
	
	def __init__(self, first, last, conf_num):

		self.first = first
		self.last = last
		self.conf_num = conf_num

def confirm_checkin():

def checkin(person):
    br = mechanize.Browser()

    # in case website doesn't allow robots
    br.set_handle_robots(False)
    br.addheaders = [('User-agent', 'Firefox')]
    br.open(SITE)

    msg = ''
    return msg


def get_flyer_info():
	my_data = genfromtxt(FILE, delimiter=',')
	assert len(my_data) > 2, "Invalid file: {f}".format(f=FILE)
	p = Person(my_data[0], my_data[1], my_data[2])

	return p

def main():

	p = get_flyer_info()
    response = checkin(p)
    confirm_checkin(response)

if __name__ == '__main__':
    import sys
    sys.exit(main())
	


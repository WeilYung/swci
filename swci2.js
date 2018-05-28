

// print inputs to console
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

// get command line args
const args = process.argv
if (args.length == 5){
	
	var firstName = args[2];
	var lastName = args[3];
	var conf = args[4];
	console.log("Processing...");

} else {

	//quit the application
	console.log("Invalid Arguments passed to swci2.js");
	return;
}

const puppeteer = require('puppeteer');
const southwestCheckInURL = 'https://www.southwest.com/air/check-in/';

// const conf = "AGC524";
// const firstName = "Benjamin";
// const lastName = "Weil";

(async () => {
	const browser = await puppeteer.launch({headless: false});
	var page = await browser.newPage();
	await page.goto(southwestCheckInURL);
	await page.setViewport({width: 1000, height: 1000})
	await page.waitForSelector('.confirmation-number-form');

	await page.focus('#confirmationNumber');
	await page.type('#confirmationNumber', conf);

	await page.focus('#passengerFirstName');
	await page.type('#passengerFirstName', firstName);

	await page.focus('#passengerLastName');
	await page.type('#passengerLastName', lastName);

	let maxNumberTries = 3;
	const shouldRetry = async page => {
		return await page.waitForSelector('.message_error') !== null;
	}

	const submitForm = () => {
		console.log(new Date().toISOString() + ": inside submit form");
		page.focus('.confirmation-number-form--submit-button');
		page.click('.confirmation-number-form--submit-button');
	};

	const retrySubmit = async page => {
		var retryInterval = setInterval(() => {
			submitForm();
			maxNumberTries = maxNumberTries - 1;
			console.log("maxNumberTries: ", maxNumberTries);

			if (maxNumberTries < 0 || !shouldRetry(page)) {
				clearInterval(retryInterval)
			}
		}, 1000);
	}


	submitForm();
	if (shouldRetry(page)) {
		retrySubmit(page);
	} else {
		const checkInButtonClass = '.air-check-in-review-results--check-in-button';
		await page.waitForSelector(checkInButtonClass, {timeout: 5000}).then(()=> {
			console.log(new Date().toISOString() + ": found second submit button, and will click");
			page.click(checkInButtonClass).then(() => {
				console.log(new Date().toISOString() + ": clicked and taking screen shot of boarding information");
				page.screenshot({path: 'boarding.png'});
			});
			console.log("should be checked in");
		})
	}

	await browser.close();


})();
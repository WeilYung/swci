

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

(async () => {
	const browser = await puppeteer.launch({headless: true});
	var page = await browser.newPage();
	var isSubmitted = false;
	const submitForm = async (page) => {
		const checkInButtonClass = '.air-check-in-review-results--check-in-button';
		console.log(new Date().toISOString() + ": inside submit form");
		
		await page.focus('#form-mixin--submit-button');
		page.click('#form-mixin--submit-button');
		try {
			await page.waitForNavigation();
			console.log("Navigated to the next page")
			await page.waitForSelector(checkInButtonClass)
			console.log("Got selector class" + checkInButtonClass); 
			await page.focus(checkInButtonClass)
			page.click(checkInButtonClass).then(async ()=> {
				isSubmitted = true;
				console.log(new Date().toISOString() + ": clicked and taking screen shot of boarding information");
				await page.waitFor(3000);
				page.screenshot({path: `${firstName}_${lastName}_${conf}.png`});
			});
		} catch (e) {
			console.log(e);
		}
	};

	var maxNumberTries = 3;
	
	await page.goto(southwestCheckInURL);
	await page.setViewport({width: 1000, height: 1000})
	
	await page.focus('#confirmationNumber');
	await page.type('#confirmationNumber', conf);

	await page.focus('#passengerFirstName');
	await page.type('#passengerFirstName', firstName);

	await page.focus('#passengerLastName');
	await page.type('#passengerLastName', lastName);

	submitForm(page);

	await page.waitFor(10000);
	browser.close();

})();
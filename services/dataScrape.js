const puppeteer = require('puppeteer');
const $ = require('cheerio');
const cron = require('node-cron');
const nodemailer = require('nodemailer');


module.exports = {
    async getItemPrice(url, target, productImage) {
        try {
            const browser = await puppeteer.launch({
                args: [
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                ]
              });
            const page = await browser.newPage()
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })
            let htmlExtract = await page.evaluate(() => document.body.innerHTML)
            let price = $(target, htmlExtract).eq(0).text()
            let img = $(productImage, htmlExtract).find('img').attr('src');
     
            let formatedPrice = Number(price.replace(/[^0-9.-]+/g, ''))

            browser.close();
            return ({ formatedPrice: formatedPrice, img: img })
        } catch (err) {
            console.log(err)
            throw err;
        }
    },
    async emailCondition(desiredPrice, formatedPrice, prodName, email, url) {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'singaporerewardstracker@gmail.com',
                    pass: 'Hateherla1!'
                }
            });

            if (formatedPrice <= desiredPrice) {
                var mailOptions = {
                    from: 'singaporerewardstracker@gmail.com',
                    to: email,
                    subject: 'BUY NOW from SG BUY LAH',
                    text: `${prodName} is now at $${desiredPrice}, Product Link => ${url}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    },
    async searchForProduct(keyword) {
        try {
            const browser = await puppeteer.launch({
                args: [
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                ]
              });
            const page = await browser.newPage()

            await page.goto('https://www.allforyou.sg/', { waitUntil: 'networkidle2' })
            await page.keyboard.press('Escape', {delay: 3000})
            await page.type('input#small-searchterms', keyword, {delay: 250})
            await page.keyboard.press('Enter')
            await page.waitForNavigation({ waitUntil: 'networkidle2' })
            
            let htmlExtract = await page.evaluate(() => document.body.innerHTML)
            let results = []

            let price = $('.price', htmlExtract).text()
            let priceToArray = price.replace(/price/gi, '').split('$')
            let removeFirst = priceToArray.shift()

            for (let i = 1; i < priceToArray.length; i++) {
                results.push({name: $('span[itemprop=name]',htmlExtract).eq(i).text(), price: Number(priceToArray[i])})
            }
            
            browser.close()

            return results

        } catch (err) {
            throw err;
        }
    } 
}
    


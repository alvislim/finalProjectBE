const puppeteer = require('puppeteer');
const $ = require('cheerio');
const cron = require('node-cron');
// const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');


module.exports = {
    async getItemPrice(url, target, productImage) {
        try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto(url, { waitUntil: 'load', timeout: 0 })
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
    async emailCondition(desiredPrice, formatedPrice) {
        try {
            if (desiredPrice <= formatedPrice) {
                console.log('formated price' + formatedPrice)
                console.log('user desired price' + desiredPrice)
                console.log('BUY LAH!')
                // email trigger
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    },
    async searchForProduct(keyword) {
        try {
            const browser = await puppeteer.launch()
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
    


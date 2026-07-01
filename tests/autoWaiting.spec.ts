import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => { 
  await page.goto('http://uitestingplayground.com/ajax') 
  await page.getByText('Button Triggering AJAX Request').click()
 testInfo.setTimeout(testInfo.timeout+8000) //increase default timeout for this test file by 4 seconds
})

// test('auto waiting', async({page}) =>{

// const successButtontext = page.locator('.bg-success')
//await successButton.click()

//const text = await successButton.textContent()
//await successButton.waitFor({state: "attached"})
// const text = await successButton.allTextContents()
// expect(text).toContain('Data loaded with AJAX get request.')

// await expect(successButtontext).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

// })

test('alternate waits', async({page}) => {

const successButton = page.locator('.bg-success')

//wait for element
//await page.waitForSelector('.bg-success')

//wait for certain response or api
//await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

//wait for network calls to be completed - not recommended as some api calls may be stuck which are not important
await page.waitForLoadState('networkidle')


const text = await successButton.allTextContents()
expect(text).toContain('Data loaded with AJAX get request.')

})


test.only('timeout testing', async({page}) => {

//test.setTimeout(10000) //set timeout for this test only

//test.slow()  //increase the default timout to 3X the amount (10 seconds X 3 = 30 seconds)
const successButton = page.locator('.bg-success')
await successButton.click()



})
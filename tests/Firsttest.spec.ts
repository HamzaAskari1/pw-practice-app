import { disableDebugTools } from '@angular/platform-browser'
import {test} from '@playwright/test'
import { sortByDomain } from '@swimlane/ngx-charts'

test.beforeEach(async({page}) => { 
  await page.goto('http://localhost:4200/') 
  await page.getByText('Forms').click()
  await page.getByText('Form Layout').click()


})


test('test syntax rules 1', async({page}) => {
//by tag name
await page.locator('input').first().click()

//by id
await page.locator('#inputEmail1')

//by class
page.locator('.shape-rectangle')

//by attribute
page.locator('[placeholder="Email"]')

//by entire class value (full)
page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

//combine different selectors
page.locator('input[placeholder="Email"][nbinput]')

//by partial text match
page.locator(':text("Using")')

//by exact text match
page.locator(':text-is("Using the Grid")')
})

test.only('test visible locators', async({page}) => {
  await page.getByRole('textbox',{name: "Email"}).first().click()
  await page.getByRole('button', {name: "Sign In"}).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()
 // await page.getByTitle('IoT Dashboard').click()
  await page.getByTestId('SignInHamza').click()
})

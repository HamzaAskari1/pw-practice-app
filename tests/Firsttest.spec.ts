import { disableDebugTools } from '@angular/platform-browser'
import {test, expect} from '@playwright/test'
import { sortByDomain } from '@swimlane/ngx-charts'

test.beforeEach(async({page}) => { 
  await page.goto('http://localhost:4200/') 
  await page.getByText('Forms').click()
  await page.getByText('Form Layout').click()


})


test(' locators test syntax rules 1', async({page}) => {
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

test('test visible locators', async({page}) => {
  await page.getByRole('textbox',{name: "Email"}).first().click()
  await page.getByRole('button', {name: "Sign In"}).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()
 // await page.getByTitle('IoT Dashboard').click()
  await page.getByTestId('SignInHamza').click()
})

test('locating child elements', async({page}) => {

await page.locator('nb-card nb-radio :text-is("Option 1")').click()
await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
await page.locator('nb-card').getByRole('button', {name: "Sign In"}).first().click()
await page.locator('nb-card').nth(2).getByRole('button').click()
})

test('locating parent element', async({page})=>{

await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"}).click()
await page.locator('nb-card', {has: page.locator('#inputPassword2')}).getByRole('textbox',{name: "Password"}).click()

await page.locator ('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox',{name: "Email"}).click()
await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name: "Password"}).click()
await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"}).getByRole('textbox',{name: "Email"}).click()

await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name: "Email"}).click()
})

test('Reusing Locators', async({page})=>{
 const Basicform = page.locator ('nb-card').filter({hasText: "Basic Form"})
 const emailField = Basicform.getByRole('textbox',{name: "Email"})
 const passwordField = Basicform.getByRole('textbox',{name: "Password"})

await emailField.fill('hamza1askari@gmail.com')
await passwordField.fill('Test123')
await Basicform.locator('nb-checkbox').click()
await Basicform.getByRole('button').click()

await expect(emailField).toHaveValue('hamza1askari@gmail.com')

})

test.only('getting text from web element', async({page})=>{

//single text value
const Basicform = page.locator ('nb-card').filter({hasText: "Basic Form"})
const buttontext = await Basicform.locator('button').textContent()
expect(buttontext).toEqual('Submit')

//all text values
const allradiobuttonlabels = await page.locator('nb-radio').allTextContents()
expect(allradiobuttonlabels).toContain("Option 1")

//input field vale

const emailfield = Basicform.getByRole('textbox', {name: "Email"})
await emailfield.fill('test@test.com')

const emailvalue = await emailfield.inputValue()
expect(emailvalue).toEqual('test@test.com')

const placeholdervalue = await emailfield.getAttribute('placeholder')
expect(placeholdervalue).toEqual('Email')








})
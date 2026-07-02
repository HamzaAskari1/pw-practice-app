import { disableDebugTools } from '@angular/platform-browser'
import {test, expect} from '@playwright/test'
import { sortByDomain } from '@swimlane/ngx-charts'
import { using } from 'rxjs'

test.beforeEach(async({page}) => { 
  await page.goto('http://localhost:4200/') 

  })

test.describe('Form Layout page', () => {

 test.beforeEach( async({page}) => { 
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
  })

 test('input fields', async({page}) =>{

    const UsingTheGridEmailField = await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

    await UsingTheGridEmailField.fill('hamza1askari@gmail.com')
    await UsingTheGridEmailField.clear()

    //the delay is to delay keystrokes half a second for each keystroke
    await UsingTheGridEmailField.pressSequentially("test@test.com", {delay: 500}) 

    //generic assertion
    const inputemailvalue = await UsingTheGridEmailField.inputValue()
    expect(inputemailvalue).toEqual("test@test.com")

    //locator assertion
    await expect(UsingTheGridEmailField).toHaveValue("test@test.com")
 })

test('radio buttons', async({page}) =>{
const usingthegridform = await page.locator('nb-card', {hasText: "Using the Grid"})

//sometimes the radio button is visually hidden so we have to force it to be true
await usingthegridform.getByLabel('Option 1').check({force: true})

await usingthegridform.getByRole('radio', {name: "Option 1"}).check({force: true})

//generic assertion - build constant to check radio button status (checked or not checked)
const radiostatus = await usingthegridform.getByLabel('Option 1').isChecked()
expect(radiostatus).toBeTruthy()

//locator assertion
expect(usingthegridform.getByRole('radio', {name: "Option 1"})).toBeChecked()

// select option 2

await usingthegridform.getByRole('radio', {name: "Option 2"}).check({force: true})

//expect (bolean value of is checked function). to be false(unchecked)
expect(await usingthegridform.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()

//expect (bolean value of is checked function). to be true(checked)
expect(await usingthegridform.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()

})


})
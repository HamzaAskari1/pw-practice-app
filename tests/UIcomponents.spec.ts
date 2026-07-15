
import {test,expect} from '@playwright/test'


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

test('Checkboxes', async({page}) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()

  // check() will check the checkbox if it is checked then it will keep it checked, if it is unchecked it will check it

  // uncheck() will check if the checkbox is unchecked. If unchecked it will keep it unchecked. 
  //isChecked(), will return boolean of checkbox checked/unchecked


  await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
  await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).uncheck({force: true})

  const allboxes = page.getByRole('checkbox')

  for (const box of await allboxes.all())
  {
    await box.uncheck({force: true})
    expect(await box.isChecked()).toBeFalsy()
  }

})

test('dropdown list', async({page}) => {

const dropdownmenu = page.locator('ngx-header nb-select')
await dropdownmenu.click()

page.getByRole('list') //when the list has a UL tag
page.getByRole('listitem') //when the list has LI tag

//const optionlistitem = page.getByRole('list').locator('nb-option')
const optionlistitem = page.locator('nb-option-list nb-option')

//how to assert list of dropdown list items
// await expect(optionlistitem).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

//selection of a dropdown menu item
await optionlistitem.filter({hasText: "Cosmic"}).click()


const headerlocator = page.locator('nb-layout-header')
expect(headerlocator).toHaveCSS('background-color', 'rgb(50, 50, 89)') 

//create an object for colours
const colours = {
  Light: "rgb(255, 255, 255)",
  Dark: "rgb(34, 43, 69)",
  Cosmic: "rgb(50, 50, 89)",
  Corporate: "rgb(255, 255, 255)",
}

await dropdownmenu.click()
for (const color in colours) {
  await optionlistitem.filter({hasText: color}).click()
  await expect(headerlocator).toHaveCSS('background-color', colours[color])
  await dropdownmenu.click()
}

})

test('tooltips', async({page}) => {

//for tooltips we hover over the button and then check if the tooltip appears then we click f8 to freeze and 
// get the locator

await page.getByText('Modal & Overlays').click()
await page.getByText('Tooltip').click()

const tooltipcard = page.locator('nb-card', {hasText: "Tooltip Placements"})
await tooltipcard.getByRole('button', {name: "TOP"}).hover()
page.getByRole('tooltip') //must have a role with tooltip defined 
const tooltip = await page.locator('nb-tooltip').textContent()
expect(tooltip).toEqual('This is a tooltip')

})

test('dialog box', async({page}) => {

await page.getByText('Tables & Data').click()
await page.getByText('Smart Table').click()

//We need to create a listener for browser window that should accept it

page.on('dialog', dialog => {

expect(dialog.message()).toEqual('Are you sure you want to delete?')
dialog.accept() //accepts the dialog box
})

await page.getByRole('table').locator('tr').filter({hasText: "mdo@gmail.com"}).locator('.nb-trash').click() //clicks the trash icon for the row with the email
await expect(page.getByRole('table').locator('tr').filter({hasText: "mdo@gmail.com"})).not.toBeVisible()
await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")

})
test('web tables', async({page}) => {

await page.getByText('Tables & Data').click()
await page.getByText('Smart Table').click()

// get the row by any test in the row and then get the edit icon and click it
const targetrow = page.getByRole('row', {name: "twitter@outlook.com"})
await targetrow.locator('.nb-edit').click() 
await page.locator('input-editor').getByRole('textbox', {name: "Age"}).clear()
await page.locator('input-editor').getByRole('textbox', {name: "Age"}).fill("43")
await page.locator('.nb-checkmark').click()

// get the row by specific value in the column
// td refers to columns
//tr refers to rows 


await page.locator('.ng2-smart-pagination-nav').getByText('2').click() //clicks the page 2 button
const targetrowbyid = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).filter({hasText: "11"})})
await targetrowbyid.locator('.nb-edit').click()

// either use following:
await page.locator('input-editor').getByRole('textbox', {name: "E-mail"}).clear()
await page.locator('input-editor').getByRole('textbox', {name: "E-mail"}).fill("hamza1askari@gmail.com")
// or you can use below
await page.locator('input-editor').getByPlaceholder('Last Name').clear()
await page.locator('input-editor').getByPlaceholder('Last Name').fill("Askari")
await page.locator('.nb-checkmark').click()



})

test('web tables loop', async({page}) => 
{
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  
  const ages = ['20', '30', '40', '200']

for (let age of ages) 
{
  await page.locator('input-filter').getByRole('textbox', {name: "Age"}).clear()
  await page.locator('input-filter').getByRole('textbox', {name: "Age"}).fill(age)
  await page.waitForTimeout(500)
  const agerows = page.locator('tbody tr')
  for (let row of await agerows.all()) 
  {
    const CellValue = await row.locator('td').last().textContent()
    if (age === '200') 
    {
      expect(await page.getByRole('table').textContent()).toContain('No data found')
    } else 
    
    {
      expect(CellValue).toEqual(age)
    }
  }
 }
})
test('Date Picker', async({page}) => 
  {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarinputfield = page.getByPlaceholder('Form Picker')
    
    await calendarinputfield.click()
    
    // we need to put exact true to restrict result to July 1st only. Otherwise it will see a lot of 1s (11, 12, 13..etc). 
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true} ).click()
    await expect(calendarinputfield).toHaveValue('Jul 1, 2026')


  })


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
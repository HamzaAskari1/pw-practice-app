import {test} from '@playwright/test'

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

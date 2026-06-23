import {test} from '@playwright/test'

test.beforeEach(async({page}) => { await page.goto('http://localhost:4200/') })

//
//////////////////////////////////////////
//

test.describe('Suite 1 - Modal', () =>
{
    test.beforeEach(async({page}) => {await page.getByText('Modal & Overlays').click() })
    test('the first test', async ({page}) => {await page.getByText('Dialog').click() })
})


test.describe('Suite 2 - Forms', () =>
{
  test.beforeEach(async({page}) => { await page.getByText('Forms').click() })
  test('the second test', async ({page}) => {await page.getByText('Form Layout').click()
})


test('navigate to Forms datepicker page', async ({page}) => {await page.getByText('Datepicker').click() })
})
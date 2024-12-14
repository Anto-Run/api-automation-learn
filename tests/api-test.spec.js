const { test, expect } = require("playwright/test");
const { Ajv } = require("ajv");

// Get Request With Playwright
test('TC-1 Get Objects', async ({ request }) => {

    // API Call
    const response = await request.get('https://reqres.in/api/users?page=1')
    
    // Extract response body in JSON format

    const responseJson = await response.json();

    // Assertions
    expect(response.status()).toEqual(200);
    expect(response.ok()).toBeTruthy();
    expect(responseJson.per_page).toEqual(6)
    expect(responseJson.data[0].email).toEqual('george.bluth@reqres.in');
});

// Post Request with playwright
test('TC-2 Post Object', async ({ request }) => {

    const body = {
        email: "eve.hotl@reqres.in",
        password: "pistol",

    };

    const header = {
        Accept: 'application/json'
    };

    const response = await request.post("https://reqres.in/api/register", {

        headers: header,

        data: body,
    });

});

test.describe("Reqresin API Test", () => {

    const ajv = new Ajv();
    
    test("TC-1 GET Users", async ({ request }) => {
    
    const response = await request.get("https://reqres.in/api/users?page=2");
    
    const responseJson = await response.json();
    
    const valid = ajv.validate(require("./json-schema/get-user.schema.json"), responseJson);
    
    if (!valid) {
    
    console.error("AJV Validation Errors:", ajv.errorsText());
    
    }
    
    expect(valid).toBe(true);
    
    });

});





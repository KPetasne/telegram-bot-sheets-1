"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = void 0;
const googleapis_1 = require("googleapis");
require("dotenv").config();
const spreadsheetId = process.env.SHEET_ID;
const write = async (val) => {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: "keys.json",
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const authClientObject = await auth.getClient();
    const sheets = googleapis_1.google.sheets({ version: "v4", auth: authClientObject });
    const request = {
        spreadsheetId: spreadsheetId,
        range: 'Sheet1!A:F',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "values": [val]
        },
        auth: auth,
    };
    try {
        const response = (await sheets.spreadsheets.values.append(request)).data;
        console.log(JSON.stringify(response, null, 2));
    }
    catch (err) {
        console.error(err);
    }
};
exports.write = write;
//# sourceMappingURL=google.js.map
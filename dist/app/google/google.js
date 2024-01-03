"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = void 0;
const googleapis_1 = require("googleapis");
require("dotenv").config();
const spreadsheetId = process.env.SHEET_ID;
const keys = JSON.parse(process.env['CREDS']);
const write = async (val) => {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        credentials: keys,
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const authClientObject = await auth.getClient();
    const sheets = googleapis_1.google.sheets({ version: "v4", auth: authClientObject });
    const request = {
        spreadsheetId: spreadsheetId,
        range: 'Pozo!A:F',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "values": [val]
        },
        auth: auth,
    };
    let status = false;
    try {
        const response = (await sheets.spreadsheets.values.append(request)).data;
        status = true;
    }
    catch (err) {
        console.error(err);
        status = false;
    }
    return status;
};
exports.write = write;
//# sourceMappingURL=google.js.map
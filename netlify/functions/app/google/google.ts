import { google } from 'googleapis';
require("dotenv").config();

const spreadsheetId = process.env.SHEET_ID;
const keys = JSON.parse(process.env['CREDS']);

const write = async (val) => {
    const auth = new google.auth.GoogleAuth({
        credentials: keys, //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });
    
    const authClientObject = await auth.getClient();
    
    const sheets = google.sheets({ version: "v4", auth: authClientObject });

    const request = {
        spreadsheetId: spreadsheetId,
        range: 'Pozo!A:D',
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

    } catch (err) {
        console.error(err);
        status = false;
    }

    return status;
}

export {
    write
}

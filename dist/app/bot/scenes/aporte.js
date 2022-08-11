"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aporte = void 0;
const telegraf_1 = require("telegraf");
const google_1 = require("../../google/google");
const aporte1 = async (ctx) => {
    ctx.wizard.state.aporte = {};
    await ctx.reply('Quien aporta?', telegraf_1.Markup.inlineKeyboard([
        [telegraf_1.Markup.button.callback('Nuri', 'Nuri'),
            telegraf_1.Markup.button.callback('Pollo', 'Pollo'),
            telegraf_1.Markup.button.callback('CK', 'CK'),
            telegraf_1.Markup.button.callback('Kras', 'Kras')],
        [telegraf_1.Markup.button.callback('Kurti', 'Kurti'),
            telegraf_1.Markup.button.callback('Ancha', 'Ancha'),
            telegraf_1.Markup.button.callback('Rexo', 'Rexo'),
            telegraf_1.Markup.button.callback('Sas', 'Sas')],
        [telegraf_1.Markup.button.callback('Tincho', 'Tincho'),
            telegraf_1.Markup.button.callback('Zurdo', 'Zurdo'),
            telegraf_1.Markup.button.callback('Danou', 'Danou'),
            telegraf_1.Markup.button.callback('Sarue', 'Sarue')],
        [telegraf_1.Markup.button.callback('Naf', 'Naf'),
            telegraf_1.Markup.button.callback('Braju', 'Braju'),
            telegraf_1.Markup.button.callback('Lucas', 'Lucas')]
    ]));
    ctx.wizard.next();
};
const aporte2 = async (ctx) => {
    if (ctx.update?.callback_query?.data) {
        ctx.wizard.state.aporte.persona = ctx.update.callback_query.data;
        await ctx.reply('Cuanto aporta?');
        ctx.wizard.next();
    }
    else {
        ctx.scene.leave("Error");
    }
};
const aporte3 = async (ctx) => {
    if (ctx.message.text != NaN) {
        ctx.wizard.state.aporte.monto = ctx.message.text;
        console.log(ctx.wizard.state);
        const status = writeAporte(ctx.wizard.state);
        if (status) {
            await ctx.reply('Aporte Cargado');
        }
        else {
            await ctx.reply('Error en la carga');
        }
    }
    else {
        await ctx.reply('El monto ingresado no es un numero, se cancela la carga del aporte');
    }
    return await ctx.scene.leave();
};
const writeAporte = async (state) => {
    let ap = [];
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    ap.push(`${day}/${month}/${year}`);
    ap.push(state.aporte.persona);
    ap.push(state.aporte.monto);
    ap.push("NA");
    ap.push("NA");
    ap.push("Pozo");
    return await (0, google_1.write)(ap);
};
const aporte = new telegraf_1.Scenes.WizardScene('aporte', aporte1, aporte2, aporte3);
exports.aporte = aporte;
//# sourceMappingURL=aporte.js.map
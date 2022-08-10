"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aporte = void 0;
const telegraf_1 = require("telegraf");
const google_1 = require("../../google/google");
const aporte1 = async (ctx) => {
    ctx.wizard.state.aporte = {};
    await ctx.reply('Quien aporta?', telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Mono', 'Mono'),
        telegraf_1.Markup.button.callback('Foca', 'Foca')
    ]));
    ctx.wizard.next();
};
const aporte2 = async (ctx) => {
    console.log(ctx.update.callback_query.data);
    ctx.wizard.state.aporte.persona = ctx.update.callback_query.data;
    await ctx.reply('Cuanto aporta?');
    ctx.wizard.next();
};
const aporte3 = async (ctx) => {
    ctx.wizard.state.aporte.monto = ctx.message.text;
    console.log(ctx.wizard.state);
    writeAporte(ctx.wizard.state);
    await ctx.reply('Aporte Cargado');
    return await ctx.scene.leave();
};
const writeAporte = async (state) => {
    let ap = [];
    ap.push("Fecha");
    ap.push(state.aporte.persona);
    ap.push(state.aporte.monto);
    ap.push("NA");
    ap.push("NA");
    ap.push("Pozo");
    (0, google_1.write)(ap);
};
const aporte = new telegraf_1.Scenes.WizardScene('aporte', aporte1, aporte2, aporte3);
exports.aporte = aporte;
//# sourceMappingURL=aporte.js.map
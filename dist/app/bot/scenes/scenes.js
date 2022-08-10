"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gasto3 = exports.gasto2 = exports.gasto1 = exports.aporte3 = exports.aporte2 = exports.aporte1 = void 0;
const telegraf_1 = require("telegraf");
const aporte1 = async (ctx) => {
    ctx.wizard.state.aporte = {};
    await ctx.reply('Quien aporta?', telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Mono', 'Mono'),
        telegraf_1.Markup.button.callback('Foca', 'Foca')
    ]));
    ctx.wizard.next();
};
exports.aporte1 = aporte1;
const aporte2 = async (ctx) => {
    console.log(ctx.update.callback_query.data);
    ctx.wizard.state.aporte.persona = ctx.update.callback_query.data;
    await ctx.reply('Cuanto aporta?');
    ctx.wizard.next();
};
exports.aporte2 = aporte2;
const aporte3 = async (ctx) => {
    ctx.wizard.state.aporte.monto = ctx.message.text;
    console.log(ctx.wizard.state);
    await ctx.reply('Aporte Cargado');
    return await ctx.scene.leave();
};
exports.aporte3 = aporte3;
const gasto1 = async (ctx) => {
    ctx.wizard.state.gasto = {};
    await ctx.reply('Cuanto se gasto?');
    ctx.wizard.next();
};
exports.gasto1 = gasto1;
const gasto2 = async (ctx) => {
    ctx.wizard.state.gasto.monto = ctx.message.text;
    await ctx.reply('Descripcion del gasto');
    ctx.wizard.next();
};
exports.gasto2 = gasto2;
const gasto3 = async (ctx) => {
    ctx.wizard.state.gasto.descripcion = ctx.message.text;
    console.log(ctx.wizard.state);
    await ctx.reply('Gasto Cargado');
    return await ctx.scene.leave();
};
exports.gasto3 = gasto3;
//# sourceMappingURL=scenes.js.map
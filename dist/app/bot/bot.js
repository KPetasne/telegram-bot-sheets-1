"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const telegraf_1 = require("telegraf");
const gasto_1 = require("./scenes/gasto");
const aporte_1 = require("./scenes/aporte");
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
exports.bot = bot;
const stage = new telegraf_1.Scenes.Stage([aporte_1.aporte, gasto_1.gasto]);
bot.use((0, telegraf_1.session)());
bot.use(stage.middleware());
bot.command('aporte', async (ctx) => {
    await ctx.scene.enter('aporte');
});
bot.command('gasto', async (ctx) => {
    await ctx.scene.enter('gasto');
});
//# sourceMappingURL=bot.js.map
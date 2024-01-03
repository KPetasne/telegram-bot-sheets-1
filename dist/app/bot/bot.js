"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const telegraf_1 = require("telegraf");
const telegraf_ratelimit_1 = __importDefault(require("telegraf-ratelimit"));
const gasto_1 = require("./scenes/gasto");
const aporte_1 = require("./scenes/aporte");
// Set limit to 3 message per 3 seconds
const limitConfig = {
    window: 3000,
    limit: 3,
    onLimitExceeded: (ctx, next) => ctx.reply('Rate limit exceeded')
};
const USER_IDS = [525654154, 1007134152];
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
exports.bot = bot;
const stage = new telegraf_1.Scenes.Stage([aporte_1.aporte, gasto_1.gasto]);
stage.command('cancelar', async (ctx) => {
    await ctx.scene.leave();
    await ctx.reply("accion cancelada");
});
bot.use((0, telegraf_1.session)());
bot.use((0, telegraf_ratelimit_1.default)(limitConfig));
bot.use(stage.middleware());
bot.command('aporte', async (ctx) => {
    if (USER_IDS.includes(ctx.from.id)) {
        await ctx.scene.enter('aporte');
    }
    else {
        await ctx.reply("Toca de aca gato");
    }
});
bot.command('gasto', async (ctx) => {
    if (USER_IDS.includes(ctx.from.id)) {
        await ctx.scene.enter('gasto');
    }
    else {
        await ctx.reply("Toca de aca gato");
    }
});
bot.catch((err) => {
    console.log('Ooops', err);
});
//# sourceMappingURL=bot.js.map
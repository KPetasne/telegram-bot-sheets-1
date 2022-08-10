"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./app/bot/bot");
bot_1.bot.launch();
process.once('SIGINT', () => bot_1.bot.stop('SIGINT'));
process.once('SIGTERM', () => bot_1.bot.stop('SIGTERM'));
//# sourceMappingURL=app.js.map
import { Scenes, session, Telegraf, Markup } from 'telegraf';
import rateLimit from 'telegraf-ratelimit'
import { gasto } from './scenes/gasto'
import { aporte } from './scenes/aporte'
 
// Set limit to 1 message per 3 seconds
const limitConfig = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx, next) => ctx.reply('Rate limit exceeded')
}

const bot: Telegraf<Scenes.WizardContext> = new Telegraf(process.env.BOT_TOKEN as string);
const stage = new Scenes.Stage<Scenes.WizardContext>([aporte, gasto]);

bot.use(session());
bot.use(rateLimit(limitConfig))
bot.use(stage.middleware())
bot.command('aporte', async (ctx) => {
    await ctx.scene.enter('aporte');
})
bot.command('gasto', async (ctx) => {
    await ctx.scene.enter('gasto');
})

export {
    bot
}
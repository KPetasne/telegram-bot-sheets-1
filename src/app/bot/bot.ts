import { Scenes, session, Telegraf, Markup } from 'telegraf';
import { gasto } from './scenes/gasto'
import { aporte } from './scenes/aporte'

const bot: Telegraf<Scenes.WizardContext> = new Telegraf(process.env.BOT_TOKEN as string);
const stage = new Scenes.Stage<Scenes.WizardContext>([aporte, gasto]);

bot.use(session());
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
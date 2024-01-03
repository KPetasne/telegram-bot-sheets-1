import { Scenes, session, Telegraf, Markup } from 'telegraf';
import rateLimit from 'telegraf-ratelimit'
import { gasto } from './scenes/gasto'
import { aporte } from './scenes/aporte'
 
// Set limit to 3 message per 3 seconds
const limitConfig = {
  window: 3000,
  limit: 3,
  onLimitExceeded: (ctx, next) => ctx.reply('Rate limit exceeded')
}

const USER_IDS: number[] = [525654154, 1007134152];

const bot: Telegraf<Scenes.WizardContext> = new Telegraf(process.env.BOT_TOKEN as string);
const stage = new Scenes.Stage<Scenes.WizardContext>([aporte, gasto]);
stage.command('cancelar', async (ctx) => {
    await ctx.scene.leave();
    await ctx.reply("accion cancelada")
})


bot.use(session());
bot.use(rateLimit(limitConfig))
bot.use(stage.middleware())
bot.command('aporte', async (ctx) => {
    if(USER_IDS.includes(ctx.from.id)){
        await ctx.scene.enter('aporte');
    } else {
        await ctx.reply("Toca de aca gato");
    }
})
bot.command('gasto', async (ctx) => {
    if(USER_IDS.includes(ctx.from.id)){
        await ctx.scene.enter('gasto');
    } else {
        await ctx.reply("Toca de aca gato");
    }
})
bot.catch((err) => {
    console.log('Ooops', err)
})

export {
    bot
}
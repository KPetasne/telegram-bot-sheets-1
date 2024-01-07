import { Composer, Markup, Scenes, Telegraf } from 'telegraf'
import {read} from '../../google/google'

const balance1 = async (ctx) => {
  const balance = await obtenerBalance();

  await ctx.reply(
    'El balance es:'
  )
  return await ctx.scene.leave()
}

const obtenerBalance = async () => {
  const datosBalance = await read();
  let balance;

  if (datosBalance) {
    console.log(datosBalance);
  }

  return balance;
}

const balance = new Scenes.WizardScene(
  'balance',
  balance1
)

export {
  balance
}
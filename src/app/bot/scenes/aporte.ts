import { Composer, Markup, Scenes, Telegraf } from 'telegraf'
import {write} from '../../google/google'

const aporte1 = async (ctx) => {

  ctx.wizard.state.aporte = {}

  await ctx.reply(
    'Quien aporta?',
    Markup.inlineKeyboard([
      Markup.button.callback('Mono', 'Mono'),
      Markup.button.callback('Foca', 'Foca')
    ])
  )
  ctx.wizard.next()
}

const aporte2 = async (ctx) => {
  console.log(ctx.update.callback_query.data);
  ctx.wizard.state.aporte.persona = ctx.update.callback_query.data;
  await ctx.reply('Cuanto aporta?')
  ctx.wizard.next()
}

const aporte3 = async (ctx) => {
  ctx.wizard.state.aporte.monto = ctx.message.text;
  console.log(ctx.wizard.state);
  writeAporte(ctx.wizard.state);
  await ctx.reply('Aporte Cargado')
  return await ctx.scene.leave()
}

const writeAporte = async (state) => {
    let ap = [];
    ap.push("Fecha");
    ap.push(state.aporte.persona);
    ap.push(state.aporte.monto);
    ap.push("NA");
    ap.push("NA");
    ap.push("Pozo");
    write(ap);
}

const aporte = new Scenes.WizardScene(
    'aporte',
    aporte1,
    aporte2,
    aporte3
)

export {
    aporte
}
import { Composer, Markup, Scenes, Telegraf } from 'telegraf'
import {write} from '../../google/google'

const gasto1 = async (ctx) => {

  ctx.wizard.state.gasto = {};

  await ctx.reply(
    'Cuanto se gasto?'
  )
  ctx.wizard.next()
}

const gasto2 = async (ctx) => {
  ctx.wizard.state.gasto.monto = (ctx.message.text as number) * -1;
  await ctx.reply('Concepto del gasto')
  ctx.wizard.next()
}

const gasto3 = async (ctx) => {
  ctx.wizard.state.gasto.concepto = ctx.message.text;
  console.log(ctx.wizard.state);
  writeGasto(ctx.wizard.state)
  await ctx.reply('Gasto Cargado')
  return await ctx.scene.leave()
}

const writeGasto = async (state) => {
  let ap = [];
  ap.push(Date.now());
  ap.push("Pozo");
  ap.push(state.gasto.monto);
  ap.push("NA");
  ap.push("NA");
  ap.push(state.gasto.concepto);
  write(ap);
}

const gasto = new Scenes.WizardScene(
  'gasto',
  gasto1,
  gasto2,
  gasto3
)

export {
  gasto
}
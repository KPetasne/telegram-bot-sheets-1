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
  if (!isNaN(ctx.message.text)) {
    ctx.wizard.state.gasto.monto = (ctx.message.text as number) * -1;
    await ctx.reply('Concepto del gasto')
    ctx.wizard.next()
  } else {
    await ctx.reply('El valor ingresado no era un numero, se cancela toda la carga del gasto')
    await ctx.scene.leave()
  }
}

const gasto3 = async (ctx) => {
  ctx.wizard.state.gasto.concepto = ctx.message.text;
  console.log(ctx.wizard.state);
  const status = await writeGasto(ctx.wizard.state);
  if (status) {
    await ctx.reply('Gasto Cargado')
    await ctx.reply(ctx.wizard.state);
  } else {
    await ctx.reply('Error en la carga')
  }
  return await ctx.scene.leave()
}

const writeGasto = async (state) => {
  let ap = [];
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  ap.push(`${day}/${month}/${year}`);
  ap.push("Pozo");
  ap.push(state.gasto.monto.toString().replace(".",","));
  ap.push("NA");
  ap.push("NA");
  ap.push(state.gasto.concepto);
  return await write(ap);
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
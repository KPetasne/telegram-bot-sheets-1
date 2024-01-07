import { Composer, Markup, Scenes, Telegraf } from 'telegraf'
import {read} from '../../google/google'

const RANGES = {
  'Pozo!G1': 'Pozo Actual',
  'Pozo!G4': 'Total Gastado',
  'Pozo!G5': 'Total Acumulado'
}

const balance1 = async (ctx) => {
  const balance = await obtenerBalance();

  if (balance) {
    await ctx.reply(
      'El balance es:'
    )
    for(let i = 0; i < balance.length; i++) {
      let text = balance.descripcion + ': ' + balance.value;
      await ctx.reply(text);
    }
  } else {
    await ctx.reply(
      'Error al obtener el balance'
    )
  }
  return await ctx.scene.leave()
}

const obtenerBalance = async () => {
  const datosBalance = await read();
  let balance;

  if (datosBalance) {
    const valueRanges = datosBalance.valueRanges;
    balance = valueRanges.map((vr) => {
      let descripcion = RANGES[vr.range];
      let value = vr.values[0];
      return {
        'descripcion': descripcion,
        'value': value
      }
    });
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
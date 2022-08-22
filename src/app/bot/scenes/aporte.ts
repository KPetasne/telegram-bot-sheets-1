import { Composer, Markup, Scenes, Telegraf } from 'telegraf'
import {write} from '../../google/google'

const aporte1 = async (ctx) => {

  ctx.wizard.state.aporte = {}

  await ctx.reply(
    'Quien aporta?',
    Markup.inlineKeyboard([
      [Markup.button.callback('Nuri', 'Nuri'),
      Markup.button.callback('Pollo', 'Pollo'),
      Markup.button.callback('CK', 'CK'),
      Markup.button.callback('Kras', 'Kras')],
      [Markup.button.callback('Kurti', 'Kurti'),
      Markup.button.callback('Ancha', 'Ancha'),
      Markup.button.callback('Rexo', 'Rexo'),
      Markup.button.callback('Sas', 'Sas')],
      [Markup.button.callback('Tincho', 'Tincho'),
      Markup.button.callback('Zurdo', 'Zurdo'),
      Markup.button.callback('Danou', 'Danou'),
      Markup.button.callback('Sarue', 'Sarue')],
      [Markup.button.callback('Naf', 'Naf'),
      Markup.button.callback('Braju', 'Braju'),
      Markup.button.callback('Lucas', 'Lucas')]
    ])
  )
  ctx.wizard.next()
}

const aporte2 = async (ctx) => {
    if(ctx.update?.callback_query?.data){
        ctx.wizard.state.aporte.persona = ctx.update.callback_query.data;
        await ctx.reply('Cuanto aporta?')
        ctx.wizard.next()
    } else {
        ctx.scene.leave("Error")
    }
}

const aporte3 = async (ctx) => {
    if (!isNaN(ctx.message.text)) {
        ctx.wizard.state.aporte.monto = ctx.message.text;
        const status = writeAporte(ctx.wizard.state);
        if (status) {
            await ctx.reply('Aporte Cargado')
            await ctx.reply(ctx.wizard.state)
        } else {
            await ctx.reply('Error en la carga')
        }
    } else {
        await ctx.reply('El monto ingresado no es un numero, se cancela la carga del aporte')
    }

    return await ctx.scene.leave()
}

const writeAporte = async (state) => {
    let ap = [];
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    ap.push(`${day}/${month}/${year}`);
    ap.push(state.aporte.persona);
    ap.push(state.aporte.monto.replace(".",","));
    ap.push("NA");
    ap.push("NA");
    ap.push("Pozo");
    return await write(ap);
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
import { Composer, Markup, Scenes, Telegraf } from 'telegraf'
import {write} from '../../google/google'

const personas = [
'CK',
'Foca',
'Zurdo',
'Nicolen',
'Chaia',
'Krasny',
'Jefe',
'Nicobur',
'Rexo',
'Kurti',
'Colo',
'Naf',
'Ancha',
'Neny',
'Sas',
'Fer',
'Gon',
'Coco',
'Braju'
]

const aporte1 = async (ctx) => {

  ctx.wizard.state.aporte = {}

  await ctx.reply(
    'Quien aporta?',
    Markup.inlineKeyboard([
      [Markup.button.callback('CK', 'CK'),
      Markup.button.callback('Foca', 'Foca'),
      Markup.button.callback('Zurdo', 'Zurdo'),
      Markup.button.callback('Nicolen', 'Nicolen')],
      [Markup.button.callback('Chaia', 'Chaia'),
      Markup.button.callback('Krasny', 'Krasny'),
      Markup.button.callback('Jefe', 'Jefe'),
      Markup.button.callback('Nicobur', 'Nicobur')],
      [Markup.button.callback('Rexo', 'Rexo'),
      Markup.button.callback('Kurti', 'Kurti'),
      Markup.button.callback('Colo', 'Colo'),
      Markup.button.callback('Naf', 'Naf')],
      [Markup.button.callback('Neny', 'Neny'),
      Markup.button.callback('Sas', 'Sas'),
      Markup.button.callback('Fer', 'Fer'),
      Markup.button.callback('Gon', 'Gon'),
      Markup.button.callback('Braju', 'Braju'),
      Markup.button.callback('Coco', 'Coco'),
      Markup.button.callback('Todos', 'Todos'),
    ]
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
        if ('Todos' == ctx.wizard.state.aporte.persona){
            for (let i = 0; i < personas.length; i++){
                let persona = personas[i];
                console.log(persona);
                let status = writeAporte(ctx.wizard.state, persona);
                if (status) {
                    await ctx.reply('Aporte Cargado de: ' + persona)
                    await ctx.reply(ctx.wizard.state)
                } else {
                    await ctx.reply('Error en la carga de: ' + persona)
                }
            }

        } else {
            const status = writeAporte(ctx.wizard.state, null);
            if (status) {
                await ctx.reply('Aporte Cargado')
                await ctx.reply(ctx.wizard.state)
            } else {
                await ctx.reply('Error en la carga')
            }
        }
    } else {
        await ctx.reply('El monto ingresado no es un numero, se cancela la carga del aporte')
    }

    return await ctx.scene.leave()
}

const writeAporte = async (state, persona) => {
    let ap = [];
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    ap.push(`${day}/${month}/${year}`);
    ap.push(persona || state.aporte.persona);
    ap.push(state.aporte.monto.replace(".",","));
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
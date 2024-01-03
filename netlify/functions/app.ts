import { bot } from './app/bot/bot'


//bot.launch();

//process.once('SIGINT', () => bot.stop('SIGINT'));
//process.once('SIGTERM', () => bot.stop('SIGTERM'));

exports.handler = async event => {
    try {
      await bot.handleUpdate(JSON.parse(event.body))
      return { statusCode: 200, body: "" }
    } catch (e) {
      console.error("error in handler:", e)
      return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
    }
  }
import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import * as message from "@layouts/messages";
import * as keyboard from "@layouts/keyboards";
import { TelegrafContext } from "@type/telegraf";

composer.start(async (ctx: TelegrafContext) => {
  switch (ctx.startPayload) {
    case "event":
      await ctx.replyWithHTML(
        `<b>Glad to see you here, ${ctx.from.first_name}</b>\n` +
          `<i>If you want to get your own ticket for the upcoming event, use command</i> /ticket <i>to get yours!</i>`,
        {
          parse_mode: "HTML",
          reply_markup: keyboard.start,
        }
      );
      break;
    default:
      await ctx.replyWithHTML(message.start, {
        parse_mode: "HTML",
        reply_markup: keyboard.start,
      });
      break;
  }
});

middleware(composer);
consoles.module(__filename);

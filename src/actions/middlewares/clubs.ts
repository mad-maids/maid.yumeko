import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import * as message from "@layouts/messages";
import * as keyboard from "@layouts/keyboards";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`clubs`, async (ctx: TelegrafContext) => {
  await ctx.replyWithHTML(message.clubs, {
    parse_mode: "HTML",
    reply_markup: await keyboard.clubs(),
  });
});

middleware(composer);
consoles.module(__filename);

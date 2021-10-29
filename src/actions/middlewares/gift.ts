import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import { TelegrafContext } from "telegraf/typings/context";

composer.command("random", async (ctx: TelegrafContext) => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  await ctx.replyWithHTML(`<b>Randon chosen winner is:</b> ${randomNumber}`, {
    parse_mode: "HTML",
  });
});

middleware(composer);
consoles.module(__filename);

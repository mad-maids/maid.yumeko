import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import * as message from "@layouts/messages";
import * as keyboard from "@layouts/keyboards";
import * as database from "@database/db";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(`snacks_winner`, async (ctx: TelegrafContext) => {
  database.winners.push({
    userid: ctx.from.id,
    username: ctx.from.username,
  });
  await ctx.telegram.sendMessage(
    process.env.WINNER,
    `<b>⭐️ New winner announced!</b> \n` +
      `\n` +
      `<b>🎁 Prize:</b> #${database.winners.length} \n` +
      `<b>👤 User:</b> ${ctx.from.username} \n` +
      `\n` +
      `<b>Congratulations, you earned your snacks!..</b>`,
    {
      parse_mode: "HTML",
    }
  );
  await ctx.editMessageText(`Congrats, you win your snack!`, {
    parse_mode: "HTML",
  });
});

composer.action(`snacks_looser`, async (ctx: TelegrafContext) => {
  await ctx.editMessageText(`My apologies, you lose your snack!`, {
    parse_mode: "HTML",
  });
});

composer.action(`snacks_crown`, async (ctx: TelegrafContext) => {
  database.winners.push({
    userid: ctx.from.id,
    username: ctx.from.username,
  });
  await ctx.telegram.sendMessage(
    process.env.WINNER,
    `<b>✨ New 👑 winner announced!</b> \n` +
      `\n` +
      `<b>👤 User:</b> ${ctx.from.username} \n` +
      `\n` +
      `<b>Congratulations, you smashed this game at all!..</b>`,
    {
      parse_mode: "HTML",
    }
  );
  await ctx.editMessageText(`Damn, is that a crown!`, {
    parse_mode: "HTML",
  });
});

middleware(composer);
consoles.module(__filename);

import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import * as database from "@database/db";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";

composer.command("snacks", async (ctx: TelegrafContext) => {
  const symbols = ["♥️", "♠️", "♦️", "♣️"];
  const winners = database.winners.map((user) => user.userid);

  let chance = true;
  const keyboard = [
    Markup.callbackButton("👑", "snacks_crown", Math.random() > 0.01),
  ];

  for (const symbol of symbols) {
    if (chance) {
      if (Math.random() < 0.3) {
        keyboard.push(Markup.callbackButton(`${symbol}`, `snacks_winner`));
        chance = false;
      } else {
        keyboard.push(Markup.callbackButton(`${symbol}`, `snacks_looser`));
      }
    } else {
      keyboard.push(Markup.callbackButton(`${symbol}`, `snacks_looser`));
    }
  }

  if (ctx.from.username) {
    if (!database.played.includes(ctx.from.id)) {
      if (winners.length < 10) {
        await ctx.replyWithHTML(`Choose one of the following symbols...`, {
          reply_markup: Markup.inlineKeyboard(keyboard),
        });
        database.played.push(ctx.from.id);
      } else {
        await ctx.replyWithHTML(
          `<b>10</b> <i>winners found! No more prizes left...</i>`
        );
      }
    } else {
      await ctx.replyWithHTML(
        `<b>You have already tried out your chance! So sad...</b>`
      );
    }
  } else {
    await ctx.replyWithHTML(
      `<b>Get a username if you want to play the game!</b>`
    );
  }
});

middleware(composer);
consoles.module(__filename);

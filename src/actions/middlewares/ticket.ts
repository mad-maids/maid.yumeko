import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import * as message from "@layouts/messages";
import * as keyboard from "@layouts/keyboards";
import * as database from "@database/db";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";

const ticketNumberGenerator = async (str) => {
  let text = "";
  for (let i = 0; i < 6; i++) {
    text += str.charAt(Math.floor(Math.random() * str.length));
  }
  return text;
};

composer.command("ticket", async (ctx: TelegrafContext) => {
  const ticket = {
    id: ctx.from.id,
    number: await ticketNumberGenerator(ctx.from.id.toString()),
    username: ctx.from.username,
  };

  if (ctx.from.username) {
    if (!database.users.includes(ctx.from.id)) {
      await ctx.telegram
        .sendMessage(process.env.TICKET, "🔄 Loading...", {
          parse_mode: "HTML",
        })
        .then(async (msg) => {
          await ctx.telegram.editMessageText(
            process.env.TICKET,
            msg.message_id,
            null,
            `<b>🧾 Ticketing Feed!</b> \n` +
              `\n` +
              `<b>📶 Number:</b> <code>${msg.message_id}</code> \n` +
              `<b>💠 Serial:</b> <code>${ticket.number}</code> \n` +
              `<b>👤 Username:</b> @${ticket.username} \n` +
              `\n` +
              `<b>Please, keep your ticket and don't delete it!</b>`,
            {
              parse_mode: "HTML",
            }
          );

          await ctx.replyWithHTML(
            `<b>Congratulations!</b> \n` +
              `\n` +
              `You have successfully claimed your ticket. Your ticket details are: \n` +
              `\n` +
              `<b>💠 Number:</b> <code>${ticket.number}</code> \n` +
              `<b>👤 Username:</b> <code>${ticket.username}</code> <code>(you)</code> \n` +
              `\n` +
              `<b>Please, keep your ticket and don't delete it!</b>`,
            {
              reply_markup: Markup.inlineKeyboard([
                Markup.urlButton(
                  `Check out your ticket...`,
                  `https://t.me/maidsticket/${msg.message_id}`
                ),
              ]),
            }
          );
        });
      database.users.push(ticket.id);
    } else {
      await ctx.replyWithHTML(
        "<b>Oops,</b> seems like you already got your ticket!"
      );
    }
  } else {
    await ctx.replyWithHTML(`<b>Get a username if you wanna get ticket!</b>`);
  }
});

middleware(composer);
consoles.module(__filename);

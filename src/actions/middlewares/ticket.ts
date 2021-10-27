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
              `<b>📆 Date:</b> <code>30/10/2021</code> \n` +
              `<b>📍 Location:</b> <code>Lyceum Hall</code> \n` +
              `<b>🍿 Anime:</b> <a href="https://en.wikipedia.org/wiki/5_Centimeters_per_Second">Byosoku 5 senchimetoru</a> <b>(Don't tell anyone ok?!😉)</b>\n` +
              `\n` +
              `<b>Please, keep your ticket and don't delete it! \n` +
              `Ticketing system is brought to you by team</b> <a href="https://t.me/madmaids">Mad Maids</a> ...`,
            {
              reply_markup: Markup.inlineKeyboard([
                [
                  Markup.urlButton(
                    `Check out your ticket...`,
                    `https://t.me/maidsticket/${msg.message_id}`
                  ),
                ],
                [
                  Markup.urlButton(
                    `Add event to Google Calendar`,
                    `https://calendar.google.com/event?action=TEMPLATE&tmeid=N2NsdDF1b2hqOG84NDY0bW9vNzdsN3JsazUgc2FraGliLm9yemtsdkBt&tmsrc=sakhib.orzklv%40gmail.com`
                  ),
                ],
                [
                  Markup.urlButton(
                    `Add event to Apple Calendar`,
                    `https://maid.uz/anime.ics`
                  ),
                ],
              ]),
              disable_web_page_preview: true,
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

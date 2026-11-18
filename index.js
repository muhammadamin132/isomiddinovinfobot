export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(200).json({ status: 'Bot is running' });
    }

    try {
        const { message, callback_query } = req.body;

        // ================= SOZLAMALAR (To'g'ridan-to'g'ri yozildi) =================
        const token = '9283172833:AAGhzmY3m9nhRxzoRoKnsCF3GckE-8i2RtM';
        const adminChatId = '8832791564';
        const cardNumber = '4916 9917 2603 8834';
        const cardHolder = 'Muhammadamin I.';

        if (!token) {
            return res.status(500).json({ error: 'BOT_TOKEN missing' });
        }

        const apiUrl = `https://api.telegram.org/bot${token}/`;

        const sendMessage = (chatId, text, extra = {}) =>
            fetch(`${apiUrl}sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: 'Markdown',
                    ...extra
                })
            });

        // ================= 1. START =================
        if (message && message.text === '/start') {
            const chatId = message.chat.id;
            await sendMessage(
                chatId,
                `Assalomu alaykum, ${message.from.first_name}!\n\nBotdan foydalanish uchun, iltimos, avval quyidagi sahifalarimizga obuna bo'ling:`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "📢 Telegram Kanal", url: "https://t.me/muhammadamin_isomiddinovx" }],
                            [{ text: "📸 Instagram", url: "https://www.instagram.com/muhammadamin__officiall/" }],
                            [{ text: "✅ Obuna bo'ldim, davom etish", callback_data: "check_sub" }]
                        ]
                    }
                }
            );
            return res.status(200).json({ status: 'ok' });
        }

        // ================= 2. ASOSIY MENYU =================
        if (callback_query && callback_query.data === 'check_sub') {
            const chatId = callback_query.message.chat.id;
            await sendMessage(
                chatId,
                `Rahmat! *Xizmatlarimiz va narxlari:*\n\n` +
                `💻 *Web sayt*\n` +
                `• Landing page — 500 000 so'm (3-5 kun)\n` +
                `• Ko'p sahifali sayt — 1 500 000 so'm (7-10 kun)\n\n` +
                `🎬 *AI Video*\n` +
                `• 1 ta reels — 50 000 so'm (1 kun)\n` +
                `• 5 ta reels paket — 200 000 so'm (3-4 kun)\n\n` +
                `💎 *Premium paket* — 500 000 so'm\n\n` +
                `Kerakli bo'limni tanlang:`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "💻 Web Sayt", callback_data: "order_web" }],
                            [{ text: "🎬 AI Video", callback_data: "order_ai" }],
                            [{ text: "💎 Premium paket", callback_data: "premium_info" }],
                            [{ text: "👤 Shaxsiy Telegram", url: "https://t.me/Muhammadaminofficial" }]
                        ]
                    }
                }
            );
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
            return res.status(200).json({ status: 'ok' });
        }

        // ================= 3. PREMIUM =================
        if (callback_query && callback_query.data === 'premium_info') {
            const chatId = callback_query.message.chat.id;
            await sendMessage(
                chatId,
                `💎 *PREMIUM XIZMATLAR (VIP)* 💎\n\n` +
                `Premium mijozlar uchun:\n` +
                `✅ Navbatsiz, ustuvor xizmat\n` +
                `✅ 3D animatsiyali eksklyuziv saytlar\n` +
                `✅ 4K formatdagi AI videolar\n` +
                `✅ 24/7 shaxsiy qo'llab-quvvatlash\n\n` +
                `💳 *Narxi:* 500 000 so'm\n\n` +
                `To'lov uchun karta: \`${cardNumber}\`\n` +
                `Egasi: ${cardHolder}\n\n` +
                `To'lovni amalga oshirib, chekni shu botga yuboring:`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "📤 To'lov chekini yuborish", callback_data: "send_receipt" }]
                        ]
                    }
                }
            );
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
            return res.status(200).json({ status: 'ok' });
        }

        // ================= 4. CHEK YUBORISH =================
        if (callback_query && callback_query.data === 'send_receipt') {
            const chatId = callback_query.message.chat.id;
            await sendMessage(
                chatId,
                `Iltimos, to'lov chekini (rasm yoki skrinshot) shu yerga yuboring.`,
                { reply_markup: { force_reply: true } }
            );
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
            return res.status(200).json({ status: 'ok' });
        }

        // ================= 5. WEB BUYURTMA =================
        if (callback_query && callback_query.data === 'order_web') {
            const chatId = callback_query.message.chat.id;
            await sendMessage(
                chatId,
                `💻 *Web sayt xizmatlari:*\n\n` +
                `1️⃣ *Landing page* — 500 000 so'm (3-5 kun)\n` +
                `2️⃣ *Ko'p sahifali sayt* — 1 500 000 so'm (7-10 kun)\n\n` +
                `Qaysi variantni tanlaysiz? Va loyihangiz haqida qisqacha yozing:`,
                { reply_markup: { force_reply: true } }
            );
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
            return res.status(200).json({ status: 'ok' });
        }

        // ================= 6. AI VIDEO BUYURTMA =================
        if (callback_query && callback_query.data === 'order_ai') {
            const chatId = callback_query.message.chat.id;
            await sendMessage(
                chatId,
                `🎬 *AI Video xizmatlari:*\n\n` +
                `1️⃣ *1 ta reels* — 50 000 so'm (1 kun)\n` +
                `2️⃣ *5 ta reels paket* — 200 000 so'm (3-4 kun)\n\n` +
                `Qaysi variantni tanlaysiz? Va video mavzusini yozing:`,
                { reply_markup: { force_reply: true } }
            );
            await fetch(`${apiUrl}answerCallbackQuery?callback_query_id=${callback_query.id}`);
            return res.status(200).json({ status: 'ok' });
        }

        // ================= 7. MIJOZ XABARI / CHEK =================
        if (
            message &&
            message.text !== '/start' &&
            !(message.text && message.text.startsWith('/'))
        ) {
            const chatId = message.chat.id;
            const userName = message.from.first_name || 'Mijoz';
            const userText = message.text || 'Rasm/Chek yuborildi';

            await sendMessage(chatId, "Xabaringiz/chekingiz qabul qilindi! Tez orada javob beramiz.");

            await sendMessage(
                adminChatId,
                `🔔 *YANGI XABAR / CHEK!*\n\n` +
                `👤 Mijoz: ${userName}\n` +
                `🆔 Chat ID: ${chatId}\n` +
                `💬 Xabar: ${userText}`
            );

            if (message.photo && message.photo.length > 0) {
                const photoId = message.photo[message.photo.length - 1].file_id;
                await fetch(`${apiUrl}sendPhoto`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: adminChatId,
                        photo: photoId,
                        caption: `To'lov cheki. Mijoz: ${userName} (ID: ${chatId})`
                    })
                });
            }
            return res.status(200).json({ status: 'ok' });
        }

        return res.status(200).json({ status: 'ok' });

    } catch (error) {
        console.error('Bot xatosi:', error);
        return res.status(200).json({ status: 'error', message: error.message });
    }
}

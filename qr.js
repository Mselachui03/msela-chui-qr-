const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Msela_chui_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function MSELA_CHUI_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Msela_chui_Tech = Msela_chui_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Msela_chui_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Msela_chui_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Msela_chui_Tech.sendMessage(Qr_Code_By_Msela_chui_Tech.user.id, { text: 'VENOCYBER-MD;;;' + b64data });
	
				   let MSELA_CHUI_MD_TEXT = `

	
━━━━━━━━━━━❀˖°❀˖°❀˖°┗━━━━━━━━━━━             
|| *_👌 hello guys this is youre session id_*
|| *_✅ you will need it to upload on all bots of 𝐌𝐒𝐄𝐋𝐀-𝐂𝐇𝐔𝐈-𝐌𝐀𝐒𝐓𝐄𝐑-𝐁𝐎𝐓_*
|| *_📡 currently working on 𝐌𝐒𝐄𝐋𝐀-𝐂𝐇𝐔𝐈-𝐌𝐀𝐒𝐓𝐄𝐑-𝐁𝐎𝐓_*
|| *_📌 join all of whatsapp group and channel for our updates daily_*
||   |❀˖|*group* : https://chat.whatsapp.com/Bqb6oEUxAneAqxBUBfNdLr_*
||   |❀˖|*channel* : https://whatsapp.com/channel/0029VakhqAaLtOjBJOL9Wn1q
|| *_Don't Forget To Give Star To My Repo_*`
	 await Qr_Code_By_Msela_chui_Tech.sendMessage(Qr_Code_By_Msela_chui_Tech.user.id,{text:MSELA_CHUI_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Msela_chui_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					MSELA_CHUI_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await MSELA_CHUI_MD_QR_CODE()
});
module.exports = router

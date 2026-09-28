const HIDDEN_POWERS = [
    // Dominate
    "● Command",
    "●● Mesmerize",
    "●●● The Forgetful Mind",
    "●●●● Conditioning",
    "●●●●● Possession",

    // Presence
    "● Awe",
    "●● Dread Gaze",
    "●●● Entrancement",
    "●●●● Summon",
    "●●●●● Majesty",

    // Obfuscate
    "●●● Mask of a Thousand Faces"
];

Hooks.on("createChatMessage", async (message) => {
    try {
        const matchedPower = HIDDEN_POWERS.find(power =>
            message.content?.includes(power)
        );

        if (!matchedPower) return;

        await message.update({
            blind: true,
            whisper: game.users
                .filter(user => user.isGM)
                .map(user => user.id)
        });

        console.log(`WoD Hidden Powers: ${matchedPower} hidden from players.`);
    }
    catch (err) {
        console.error("WoD Hidden Powers Error:", err);
    }
});
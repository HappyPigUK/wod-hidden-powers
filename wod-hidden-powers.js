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

let hideNextDSNRoll = false;

// Mark hidden powers before chat creation
Hooks.on("preCreateChatMessage", (message, data) => {

    const matchedPower = HIDDEN_POWERS.find(power =>
        data.content?.includes(power)
    );

    if (!matchedPower) return;

    hideNextDSNRoll = true;

    data.blind = true;
    data.whisper = game.users
        .filter(user => user.isGM)
        .map(user => user.id);
});

// Suppress Dice So Nice display for matching powers
Hooks.on("diceSoNiceRollStart", (messageId, data) => {

    if (!hideNextDSNRoll) return;

    data.blind = true;

    hideNextDSNRoll = false;
});

// Safety net to ensure the chat card remains hidden
Hooks.on("createChatMessage", async (message) => {

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
});

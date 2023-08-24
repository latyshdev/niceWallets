/* ========================================================================= */
// Библиотеки
const FS = require('fs');
const ETHERS = require('ethers');

/* ========================================================================= */
// Константы
const PREFIX = `PRIVATES_FROM_SEED`; // Столбец имен
const FILENAME = `${PREFIX}.TXT`;
const TYPE = `получения приватных ключей из мнемоника`;
const Utils = require('./utils.js');

/* ========================================================================= */
// Перед запуском создайте mnemonics.txt и поместите сид-фразы построчно
// 1 строка = 1 сид фраза
const mnemonics = FS
        .readFileSync(`./mnemonics.txt`, `utf-8`)
        .split(`\n`);

(async () => {
    Utils.greetings(TYPE);
    for (let mnemonic of mnemonics) {
        console.log(JSON.stringify(mnemonic));
        mnemonic = mnemonic.replaceAll('\r', '');
        const wallet = new ETHERS.Wallet
            .fromMnemonic(mnemonic);

        let text = `${PREFIX}\t${wallet.mnemonic.phrase}\t`;
        text +=    `${wallet.address}\t${wallet.privateKey}\n`;
        FS.appendFileSync(`${FILENAME}`, text);

    };
    console.log("Готово");
    Utils.greetings(TYPE);
    process.exit();
})();
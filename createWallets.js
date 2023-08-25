/* ========================================================================= */
// Библиотеки
const FS = require('fs');
const ETHERS = require('ethers');

/* ========================================================================= */
// Константы и переменные
const PREFIX = `WALLETS`; // Столбец имен
const FILENAME = `${PREFIX}.txt`; // Имя файла, куда записывать кошельки
const AMOUNT = 5;  // Количество кошельков
let startI = 0;
const Utils = require('./utils.js');
const TYPE = `создания обычных кошельков`;
/* ========================================================================= */
(async () => {
    Utils.greetings(TYPE);
    while (startI < AMOUNT) {
        let wallet = ETHERS.Wallet.createRandom();
        let text = `${PREFIX}\t${wallet.mnemonic.phrase}\t`;
        text +=    `${wallet.address}\t${wallet.privateKey}\n`;
        FS.appendFileSync(`${FILENAME}`, text);
        startI++;
    }
    
    console.log("READY");
    Utils.goodBye();
    process.exit();
})();
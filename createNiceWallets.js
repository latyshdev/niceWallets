/* ========================================================================= */
// Библиотеки
const FS = require('fs');
const ETHERS = require('ethers');

/* ========================================================================= */
// Константы
const PREFIX = `4444`; // Столбец имен
const FILENAME = `${PREFIX}.txt`; // Имя файла, куда записывать кошельки
// const FILENAME = `4444.txt`; // Имя файла, куда записывать кошельки
const AMOUNT = 5;  // Количество кошельков
const AAAA_ = true; // Использовать маску 0x**...AAAA (одинаковые 4 знака)
const AABB_ = true; // Использовать маску 0x**...AABB (одинаковые 2 знака)
const ABAB_ = true;
const ABBA_ = true;
const BAAA_ = true;
const AAAB_ = true;
const AAAB_BAAA = true;
const Utils = require('./utils.js');
const TYPE = `создания красивых кошельков`;

let startI = 0;

/* ========================================================================= */
(async () => {
    Utils.greetings(TYPE);
    while (startI < AMOUNT) {
        const wallet = ETHERS.Wallet.createRandom();
            // console.log(mnemonicWallet);
            address = wallet.address;
            // console.log(mnemonicWallet.mnemonic.phrase,
                // mnemonicWallet.privateKey, address);
            equals = check(address);
            console.log(
                address[address.length - 1]
                ,address[address.length - 2]
                ,address[address.length - 3]
                ,address[address.length - 4],
                equals
            );

            if (equals) {
                startI++;
                let text = `${PREFIX}\t${wallet.mnemonic.phrase}\t`;
                text +=    `${wallet.address}\t${wallet.privateKey}\n`;
                FS.appendFileSync(`${FILENAME}`, text);
            }
        }
    
    console.log("READY");
    Utils.greetings(TYPE);
    process.exit();
})();

/* ========================================================================= */
function aaaa (address){
    return address[address.length - 1]
        === address[address.length - 2]
        === address[address.length - 3]
        === address[address.length - 4];
}

/* ========================================================================= */
function aabb (address){
    return address[address.length - 1] === address[address.length - 2]
        && address[address.length - 3] === address[address.length - 4];            
}

/* ========================================================================= */
function abab (address){
    return address[address.length - 1] === address[address.length - 3]
        && address[address.length - 2] === address[address.length - 4];  
}

/* ========================================================================= */
function baaa (address){
    return address[address.length - 1] === address[address.length - 2]
        && address[address.length - 1] === address[address.length - 3]; 
}

/* ========================================================================= */
function aaab (address){
    return address[address.length - 2] === address[address.length - 3]
        && address[address.length - 2] === address[address.length - 4]; 
}

/* ========================================================================= */
function abba (address){
    return address[address.length - 1] === address[address.length - 4]
        && address[address.length - 2] === address[address.length - 3]; 
}

/* ========================================================================= */
function aaab_baaa (address){
    return (
        address[2] === address[3]
        && address[3] === address[4]
        && address[address.length - 1] === address[address.length - 2]
        && address[address.length - 1] === address[address.length - 3]

    )
        ? true : 
        false;
}

/* ========================================================================= */
function check(address){
    let AAAA = (AAAA_) ? aaaa(address) : false;
    let AABB = (AABB_) ? aabb(address) : false;
    let ABAB = (ABAB_) ? abab(address) : false;
    let BAAA = (BAAA_) ? baaa(address) : false;
    let AAAB = (AAAB_) ? aaab(address) : false;
    let ABBA = (ABBA_) ? abba(address) : false;
    let AAAB__BAAA = (AAAB_BAAA) ? aaab_baaa(address) : false;

    return ABBA || AABB || ABAB || AAAA || AAAB__BAAA || AAAB || BAAA;
}
/* ========================================================================= */
// Библиотеки
const FS = require('fs');
const ETHERS = require('ethers');

/* ========================================================================= */
// Константы
const PREFIX = `4444`; // Столбец имен
const FILENAME = `${PREFIX}.txt`; // Имя файла, куда записывать кошельки
const LOG = true; // Выводить результат проверки (замедляет работу)
// const FILENAME = `4444.txt`; // Имя файла, куда записывать кошельки
const AMOUNT = 1;  // Количество кошельков

const AABB_ = false; // Использовать маску 0x**...AABB (одинаковые 2 знака)
const ABAB_ = false;
const ABBA_ = false;
const BAAA_ = false; // Использовать маску 0x**...*AAA (одинаковые 3 знака в конце)
const AAAB_ = false; // Использовать маску 0x**...AAA* (одинаковые 3 знака в конце)


const AAAA_ = true; // Использовать маску 0x**...AAAA (одинаковые 4 знака в конце)
const _AAAA = true; // Использовать маску 0x**...AAAA (одинаковые 4 знака в начале)
const AAAB_BAAA = false; // Использовать маску 0xAAAB...BAAA (одинаковые 3 знака в конце)
const AAAA_AAAA_ = true;
const AAAA_BBBB_ = true;
const _0000 = true;


const Utils = require('./utils.js');
const TYPE = `создания красивых кошельков`;

let startI = 0;


/* ========================================================================= */
(async () => {
    Utils.greetings(TYPE);
    await Utils.pause(10000);
    while (startI < AMOUNT) {
        const wallet = ETHERS.Wallet.createRandom();
            // console.log(mnemonicWallet);
            address = wallet.address;
            // console.log(mnemonicWallet.mnemonic.phrase,
                // mnemonicWallet.privateKey, address);
            let equals = check(address);
            (LOG || equals) && console.log(
                `0x`,
                address[2],
                address[3],
                address[4],
                address[5],
                `...`,          
                address[address.length - 1],
                address[address.length - 2],
                address[address.length - 3],
                address[address.length - 4],
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
    Utils.goodBye();
    process.exit();
})();

/* ========================================================================= */
function aaaa (address){
    return address[address.length - 1] === address[address.length - 2] &&
        address[address.length - 1] === address[address.length - 3] &&
        address[address.length - 1] === address[address.length - 4];
}

function _0000f (address) {
    return aaaa(address) && address[address.length - 1] === `0`
}

/* ========================================================================= */
function _aaaa (address){
    return address[2] === address[3]
    && address[2] === address[4]
    && address[2] === address[5]
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
function aaaa_bbbb (address){
    return (
        address[2] === address[3]
        && address[2] === address[4]
        && address[2] === address[5]
        && address[address.length - 1] === address[address.length - 2]
        && address[address.length - 1] === address[address.length - 3]
        && address[address.length - 1] === address[address.length - 4]
    )
        ? true : 
        false;
}

/* ========================================================================= */
function aaaa_aaaa (address){
    return (
        address[2] === address[3]
        && address[2] === address[4]
        && address[2] === address[5]
        && address[2] === address[address.length - 1]
        && address[2] === address[address.length - 2]
        && address[2] === address[address.length - 3]
        && address[2] === address[address.length - 4]
    )
        ? true : 
        false;
}


/* ========================================================================= */
function check(address){
    
    let AAAA = (AAAA_) ? aaaa(address) : false;
    let __AAAA = (_AAAA) ? _aaaa(address) : false;
    let AABB = (AABB_) ? aabb(address) : false;
    let ABAB = (ABAB_) ? abab(address) : false;
    let BAAA = (BAAA_) ? baaa(address) : false;
    let AAAB = (AAAB_) ? aaab(address) : false;
    let ABBA = (ABBA_) ? abba(address) : false;
    let AAAB__BAAA = (AAAB_BAAA) ? aaab_baaa(address) : false;
    let AAAA_AAAA = (AAAA_AAAA_) ? aaaa_aaaa(address) : false;
    let AAAA_BBBB = (AAAA_BBBB_) ? aaaa_bbbb(address) : false;
    let _ZERO = (_0000) ? _0000f(address) : false;

    return ABBA || 
        AABB || ABAB ||
        AAAA || __AAAA ||
        AAAB || BAAA ||
        AAAB__BAAA ||
        AAAA_BBBB || 
        AAAA_AAAA;
}
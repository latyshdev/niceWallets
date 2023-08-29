/* ========================================================================= */
// Библиотеки
const FS = require('fs');
const ETHERS = require('ethers');

/* ========================================================================= */
// Константы
const PREFIX = `4444`; // Столбец имен
const FILENAME = `${PREFIX}.txt`; // Имя файла, куда записывать кошельки
const LOG = false; // Выводить результат проверки (замедляет работу)
// const FILENAME = `4444.txt`; // Имя файла, куда записывать кошельки
const AMOUNT = 10;  // Количество кошельков

const AABB_ = false; // Использовать маску 0x**...AABB (одинаковые 2 знака)
const ABAB_ = false;
const ABBA_ = false;
const BAAA_ = false; // Использовать маску 0x**...*AAA (одинаковые 3 знака в конце)
const AAAB_ = false; // Использовать маску 0x**...AAA* (одинаковые 3 знака в конце)
const AAAB_BAAA = false; // Использовать маску 0xAAAB...BAAA (одинаковые 3 знака в конце)

const AAAA_ = false; // Использовать маску 0x**...AAAA (одинаковые 4 знака в конце)
const _AAAA = false; // Использовать маску 0x**...AAAA (одинаковые 4 знака в начале)

const AAAA_AAAA_ = true;
const AAAA_BBBB_ = true;
const _0000 = true;

const FANCY = false;
const FANCY_AAAA = true;
const AAAA_FANCY = true;
const _0000_DEAD = true;

const FANCY_WORDS = [
    'DEAD',
    'CAFE',
    'DEAF',
    'FACE',
    'FADE'
];

const Utils = require('./utils.js');
const TYPE = `создания красивых кошельков`;

let startI = 0;

// let address = `0x0000_DEAD`;
// console.log(_0000f(address) && hasFancy(address));
// console.log(_0000f(address));
// console.log(hasFancy(address));
// return;

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
                address[address.length - 4],
                address[address.length - 3],
                address[address.length - 2],
                address[address.length - 1],
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
    let first = getFirstFour(address);
    console.log(first, _aaaa(address))
    return _aaaa(address) && first === `0000`
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
function getLastFour (address) {
    let result = `${address[address.length - 4]}`;
    result += `${address[address.length - 3]}`;
    result += `${address[address.length - 2]}`;
    result += `${address[address.length - 1]}`;
    return result;
}

/* ========================================================================= */
function getFirstFour (address) {
    let result = `${address[2]}`;
    result += `${address[3]}`;
    result += `${address[4]}`;
    result += `${address[5]}`;
    return result;
}

/* ========================================================================= */
function hasFancy (address) {
    let firstFour = getFirstFour(address);
    let lastFour = getLastFour(address);

    return FANCY_WORDS.includes(firstFour.toUpperCase())
        || FANCY_WORDS.includes(lastFour.toUpperCase());
}

// FANCY_WORDS

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
    let isFancy = (FANCY) ? hasFancy(address) : false;

    let isAAAA_Fancy = (AAAA_FANCY) 
        ? _aaaa(address) && hasFancy(address) 
        : false;

    let is0000_DEAD = (_0000_DEAD) 
        ? getLastFour(address).toUpperCase === 'DEAD' 
            && getFirstFour(address) === '0000'
        : false;

    let isFANCY_aaaa = (FANCY_AAAA)
        ? hasFancy(address) && aaaa(address)
        : false;

    return ABBA || 
        AABB || ABAB ||
        AAAA || __AAAA ||
        AAAB || BAAA ||
        AAAB__BAAA ||
        AAAA_BBBB || 
        _ZERO ||
        isFancy ||
        isAAAA_Fancy ||
        is0000_DEAD ||
        isFANCY_aaaa ||
        AAAA_AAAA;
}
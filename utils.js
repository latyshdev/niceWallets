module.exports = {
  greetings: greetings,
  goodBye: goodBye,
};

/* ========================================================================= */
function greetings (type) {
  console.log(`Запущен скрипт от latyshdev для ${type}`);
  return;
}


//
function goodBye () {
  console.log("by latyshDev");
  console.log("Поддержать автора:", 
  "0x99984bbff08c169796e1b070cffcb3795faf9999");
  return;
}
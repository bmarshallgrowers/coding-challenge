"use strict";
const Sorter = require("../lib/sorter");

//ALGORITHM
//1) SORT ALL SOURCES BY DATE
//2) GET THE VALUE OF THE FIRST SOURCE
//3) POP OFF THE VALUE FROM THE FIRST SOURCE USING AWAIT BECAUSE THIS
//   IS A PROMISE THAT IS BEING RETURNED
//4) FILTER OFF SOURCES THAT ARE DRAINED
//5) REPEART 1-4 UNTIL ALL SOURCES ARE DRAINED

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const sorter = new Sorter(logSources);
    while (sorter.ready()) {
      const value = await sorter.asyncPopAndSort();
      printer.print(value);
    }
    printer.done();
    resolve(console.log("Async sort complete."));
  });
};

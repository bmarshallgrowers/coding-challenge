"use strict";

const LogSource = require("../lib/log-source");
const Sorter = require("../lib/sorter");

//ALGORITHM
//1) SORT ALL SOURCES BY DATE
//2) GET THE VALUE OF THE FIRST SOURCE
//3) POP OFF THE VALUE FROM THE FIRST SOURCE
//4) FILTER OFF SOURCES THAT ARE DRAINED
//5) REPEART 1-4 UNTIL ALL SOURCES ARE DRAINED

module.exports = (logSources, printer) => {
  const sorter = new Sorter(logSources);
  while (sorter.ready()) {
    printer.print(sorter.popAndSort());
  }
  printer.done();
  return console.log("Sync sort complete.");
};

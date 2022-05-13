"use strict";

module.exports = class Sorter {
  constructor(unsorteredSources) {
    this.sources = unsorteredSources;
    this.sort();
  }

  drainAndSort() {
    this.removeDrained();
    this.sort();
  }

  sort() {
    //SORT REMAINING SOURCES BY DATE
    this.sources.sort((a, b) => a.last.date - b.last.date);
  }

  removeDrained() {
    //A DRAINED SOURCE WILL ALWAYS BE AT THE FRONT, SO CHECK AND REMOVE IF IT IS DRAINED
    if (this.sources[0].drained == true) {
      this.sources.shift();
    }
  }

  popAndSort() {
    //RETRIEVE THE NEWEST VALUE FROM THE SORTED SOURCES LIST
    const value = this.sources[0].last;
    //SINCE THE NEWEST DATE IS USED, POP THAT SOURCE
    this.sources[0].pop();
    //SORT TO ENSURE OUR SOURCES LIST STAYS SORTED
    this.drainAndSort();
    //RETURN VALUE
    return value;
  }

  async asyncPopAndSort() {
    //RETRIEVE THE NEWEST VALUE FROM THE SORTED SOURCES LIST
    const value = this.sources[0].last;
    //SINCE THE NEWEST DATE IS USED, POP THAT SOURCE
    await this.sources[0].popAsync();
    //SORT TO ENSURE OUR SOURCES LIST STAYS SORTED
    this.drainAndSort();
    //RETURN VALUE
    return value;
  }

  ready() {
    //WILL RETURN FALSE WHEN ALL SOURCES ARE DRAINED
    return this.sources.length > 0;
  }
};

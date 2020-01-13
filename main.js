// Returns a random DNA base
const returnRandomBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandomBase());
  }
  return newStrand;
};

const indexPicker = () => {
  const index = Math.floor(Math.random() * 15);
  return index;
}

const pAequorFactory = (speciminNum, speciminDNA) => {
  console.log('DNA provided to the factory function as 2nd parameter: ' + speciminDNA);
  return {
    speciminNum,
    speciminDNA,
    mutate() {
      let changeBaseIndex = indexPicker();
      console.log('Index: ' + changeBaseIndex);
      console.log('Value at index: ' + this.speciminDNA[changeBaseIndex]);
      let newBase = returnRandomBase();
      console.log('New value to replace existing value at index: ' + newBase);
      while (this.speciminDNA[changeBaseIndex] === newBase) {
        newBase = returnRandomBase();
        console.log('Value to replace existing value at index if it was previously the same: ' + newBase);
      }
      console.log('DNA before reassignment: ' + this.speciminDNA);
      this.speciminDNA[changeBaseIndex] = newBase;
      console.log('DNA after reassignment: ' + this.speciminDNA);
      return this.speciminDNA;
    },
    compareDNA(specimin) {
      let matchCount = 0;
      for (let i=0; i < 15; i++) {
        if (this.speciminDNA[i] === specimin.speciminDNA[i]) {
          matchCount++;
        }
      }
      console.log(matchCount);
      let percentage = (matchCount / 15) * 100;
      console.log(`Specimin ${this.speciminNum} and specimin ${specimin.speciminNum} have ${percentage.toFixed(0)}% DNA in common.`);
    },
  }
}

const speciminA = pAequorFactory(1, mockUpStrand());
const speciminB = pAequorFactory(2, mockUpStrand());

speciminA.compareDNA(speciminB);
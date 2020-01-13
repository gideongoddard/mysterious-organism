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

const pAequorFactory = (specimenNum, specimenDNA) => {
  console.log('DNA provided to the factory function as 2nd parameter: ' + specimenDNA);
  return {
    specimenNum,
    specimenDNA,
    mutate() {
      let changeBaseIndex = indexPicker();
      console.log('Index: ' + changeBaseIndex);
      console.log('Value at index: ' + this.specimenDNA[changeBaseIndex]);
      let newBase = returnRandomBase();
      console.log('New value to replace existing value at index: ' + newBase);
      while (this.specimenDNA[changeBaseIndex] === newBase) {
        newBase = returnRandomBase();
        console.log('Value to replace existing value at index if it was previously the same: ' + newBase);
      }
      console.log('DNA before reassignment: ' + this.specimenDNA);
      this.specimenDNA[changeBaseIndex] = newBase;
      console.log('DNA after reassignment: ' + this.specimenDNA);
      return this.specimenDNA;
    },
    compareDNA(specimen) {
      let matchCount = 0;
      for (let i=0; i < 15; i++) {
        if (this.specimenDNA[i] === specimen.specimenDNA[i]) {
          matchCount++;
        }
      }
      console.log(matchCount);
      let matchPercentage = (matchCount / 15) * 100;
      console.log(`specimen ${this.specimenNum} and specimen ${specimen.specimenNum} have ${matchPercentage.toFixed(0)}% DNA in common.`);
    },
    willLikelySurvive() {
      let goodDNA = 0;
      for (let i=0; i < 15; i++) {
        if (this.specimenDNA[i] === 'C' || this.specimenDNA[i] === 'G') {
          goodDNA++;
        }
      }
      let goodPercentage = (goodDNA / 15) * 100;
      console.log(goodPercentage);
      if (goodPercentage >= 60) {
        return true;
      } else {
        return false;
      }
    },
  }
}

let pAequorSurvivors = [];
let idCounter = 1;

while (pAequorSurvivors.length < 30) {
  let newSpecimen = pAequorFactory(idCounter, mockUpStrand());
  if (newSpecimen.willLikelySurvive()) {
    pAequorSurvivors.push(newSpecimen);
  }
  idCounter++;
}

console.log(pAequorSurvivors.length);
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
  return {
    specimenNum,
    specimenDNA,
    mutate() {
      let changeBaseIndex = indexPicker();
      let newBase = returnRandomBase();
      while (this.specimenDNA[changeBaseIndex] === newBase) {
        newBase = returnRandomBase();
      }
      this.specimenDNA[changeBaseIndex] = newBase;
      return this.specimenDNA;
    },
    compareDNA(specimen) {
      let matchCount = 0;
      for (let i=0; i < 15; i++) {
        if (this.specimenDNA[i] === specimen.specimenDNA[i]) {
          matchCount++;
        }
      }
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

// HANDLEBARS >>

let dnaStrings = [];

for (let i = 0; i < pAequorSurvivors.length; i++) {
    dnaStrings.push(pAequorSurvivors[i].specimenDNA.join('-'));
};

for (let i = pAequorSurvivors.length - 1; i >= 0; i--) {
  for (let j = 0; j < 15; j++) {
    pAequorSurvivors[i].specimenDNA.pop();
  }
  pAequorSurvivors[i].specimenDNA.push(dnaStrings[i]);
}

const context = {
  survivors: pAequorSurvivors
};

const templateElement = document.getElementById('templateHB');
const templateSource = templateElement.innerHTML;
const template = Handlebars.compile(templateSource);
const compiledHtml = template(context);
document.getElementById('data').innerHTML = compiledHtml;

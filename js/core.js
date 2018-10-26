var lights, proton, electron, electronTrack, render;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000
);
var controls = new THREE.TrackballControls(camera);
var renderer = new THREE.WebGLRenderer();
var atomicNucleus = new THREE.Group();
var electronsGroup = new THREE.Group();

var atoms = null;

fetch("/data/data.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    atoms = myJson;
  });

// let atomTrigger = document.getElementById('helium');
// atomTrigger.addEventListener('click', function() {
//   document.body.classList.contains('is-modal-mode') ?
//     document.body.classList.remove('is-modal-mode') :
//     document.body.classList.add('is-modal-mode')
// });

let cells = document.getElementsByClassName("table-cell");

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleCellClick, false);
}

function generateElectronicShell(electronicConfiguration) {
  //check if there is any []
  var matches = electronicConfiguration.match(/\[.*?\]/g),
    submatch,
    atomMatchingShell;

  // if there is go inside
  if (matches) {
    //replace [] to have key for detailed value
    submatch = matches[0].replace(/[\[\]']+/g, "");

    //matching atom
    atomMatchingShell = atoms.filter(function(atom) {
      return atom.symbol === submatch;
    });

    //create new string
    electronicConfiguration = electronicConfiguration.replace(
      matches[0],
      atomMatchingShell[0].electronicConfiguration
    );
    electronicConfiguration = generateElectronicShell(electronicConfiguration);
  }

  return electronicConfiguration;
}

function handleCellClick(event) {
  event.currentTarget.classList.contains("is-active")
    ? event.currentTarget.classList.remove("is-active")
    : event.currentTarget.classList.add("is-active");

  //filter selected atom
  var selectedAtom = atoms.filter(function(atom) {
    return (
      atom.atomicNumber === parseInt(event.currentTarget.dataset.atomicNumber)
    );
  });

  var electronicConfiguration = createObjectFromString(
    generateElectronicShell(selectedAtom[0].electronicConfiguration)
  );

  createElectrons(electronicConfiguration);
}

function createObjectFromString(electronicConfiguration) {
  var electronicConfigurationArray = electronicConfiguration.split(" ");
  var output = {};
  electronicConfigurationArray.map(function(item) {
    output[item[0] + item[1]] = parseInt(item[3] ? item[2] + item[3] : item[2]);
  });
  return output;
}

function createElectrons(electronicConfiguration) {
  console.log("from createElectrons ", electronicConfiguration);
  //todo create arrays in threejs
}

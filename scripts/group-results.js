// в элемент select#peopleTested добавляются опции (протестированные люди)
// затем при использовании плагина selectize создается стилизованный элемент select
var peopleTested = localStorage.getItem("peopleTested");
var peopleTestedSelect = $("#personToDisplay");
for (var i = 1; i <= peopleTested; i++) {
  var option = $('<option/>', {
    value: i,
    text: i
  });
  peopleTestedSelect.append(option);
}
var isThereAll = 0;
peopleTestedSelect.selectize({
  placeholder: 'номер человека',
  plugins: ['remove_button'],
  onItemAdd: function(value) {
    // функция исполняется при добавлении опции в элементе select
    // при добавлении опции 'all' удаляются все остальные, добавленные на этот момент опции и добавляется 'all'
    if (value === 'all' && isThereAll === 0) {
      // если в первый раз добавляется 'all', отистить select и добавить
      // all (перед этим обнулить isThereAll чтобы не попасть в
      // бесконечный цикл, войдя снова в этот же блок)
      peopleTestedSelect[0].selectize.clear();
      isThereAll = 1;
      peopleTestedSelect[0].selectize.addItem('all');
    } else {
      // при добавлении любой другой опции удаляется all и добавляется выбранная опция
      if (value !== 'all' && isThereAll === 1) {
        peopleTestedSelect[0].selectize.clear();
        isThereAll = 0;
        peopleTestedSelect[0].selectize.addItem(value);
      }
    }
  }
});


// В элемент select добавляются опции (выбранные результаты) из localStorage
var selectedResults = localStorage.getItem('selectedResults').split(' ');
selectedResults.pop();
var asys = [],
  tsys = [],
  eimsys = [],
  cnumsys = [],
  numcsys = [];
for (var i = 0; i < selectedResults.length; i++) {
  if (selectedResults[i] == "Butterfly" || selectedResults[i] == "Square" || selectedResults[i] == "Triangle") {
    selectedResults.splice(i, 1);
  }

  switch (selectedResults[i]) {
    case "2":
    case "1":
    case "3":
    case "4":
    case "5":
    case "6":
      asys.push(selectedResults[i]);
      break;
    case "135":
    case "246":
      tsys.push(selectedResults[i]);
      break;
    case "126":
    case "123":
    case "234":
    case "345":
    case "456":
    case "156":
      eimsys.push(selectedResults[i]);
      break;
    case "23":
    case "13":
    case "12":
    case "26":
    case "16":
    case "15":
      cnumsys.push(selectedResults[i]);
      break;
    case "56":
    case "46":
    case "45":
    case "35":
    case "34":
    case "24":
      numcsys.push(selectedResults[i]);
      break;
  }
}
var selectedResultsSelect = $("#imageToDisplay");

if (asys.length > 0) {
  var option = $('<option/>', {
    value: "asys",
    text: "А система"
  });
  selectedResultsSelect.append(option);
}
if (tsys.length > 0) {
  var option = $('<option/>', {
    value: "tsys",
    text: "b0, b7"
  });
  selectedResultsSelect.append(option);
}
if (eimsys.length > 0) {
  var option = $('<option/>', {
    value: "eimsys",
    text: "b1, b2, b3, b4, b5, b6"
  });
  selectedResultsSelect.append(option);
}
if (cnumsys.length > 0) {
  var option = $('<option/>', {
    value: "cnumsys",
    text: "c1, c2, c3, c4, c5, c6"
  });
  selectedResultsSelect.append(option);
}
if (numcsys.length > 0) {
  var option = $('<option/>', {
    value: "numcsys",
    text: "1C, 2C, 3C, 4C, 5C, 6C"
  });
  selectedResultsSelect.append(option);
}


selectedResultsSelect.selectize({
  plugins: ['remove_button'],
  placeholder: 'развертка'
});

function displayImages() {
  var imagesContainer = document.getElementById('imagesContainer');
  while (imagesContainer.firstChild) {
    imagesContainer.removeChild(imagesContainer.firstChild);
  }
  var personToDisplay = $('#personToDisplay').val(),
    imageToDisplay = $('#imageToDisplay').val();
  if (personToDisplay !== null && imageToDisplay !== null) {
    var currentPeopleList;
    for (var i = 0; i < imageToDisplay.length; i++) {
      if (personToDisplay[0] === 'all') {
        currentPeopleList = 'Все '
        var len = +localStorage.getItem('peopleTested');
        for (var j = 0; j < len; j++) {
          if (imageToDisplay[i] === 'asys') {
            var asysContainer = document.createElement('div');
            asysContainer.className = "asys mdl-cell mdl-cell--4-col";
            for (var k = 0; k < asys.length; k++) {
              var container = document.createElement('div');
              container.className = "container-results mdl-cell mdl-cell--4-col";

              var image = document.createElement('img');
              image.src = "TestResult/000" + (j + 1) + "/" + asys[k] + ".000" + (j + 1) + ".png";
              image.className = "image";

              var anchorImage = document.createElement('img');
              anchorImage.src = "images/ImageAnchors/" + asys[k] + "_001.png";
              anchorImage.className = 'anchor';


              var id = imageToDisplay[i] + ((k + 1) + '');
              container.id = id;

              var labelContainer = document.createElement('div');
              labelContainer.className = 'mdl-grid label-container';
              labelContainer.innerHTML =
                '<div class="mdl-cell mdl-cell--7-col"></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
              labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
              labelContainer.querySelector('.second-p p').innerHTML = asys[k];
              labelContainer.onclick = (function(idParam) {
                return function() {
                  var img = document.getElementById(idParam);
                  img.webkitRequestFullscreen();
                }
              })(id);

              container.appendChild(image);
              container.appendChild(anchorImage);
              container.appendChild(labelContainer);
              asysContainer.appendChild(container);
            }
            imagesContainer.appendChild(asysContainer);
          }

          if (imageToDisplay[i] === 'tsys') {
            var tsysContainer = document.createElement('div');
            tsysContainer.className = "tsys mdl-cell mdl-cell--4-col";
            for (var k = 0; k < tsys.length; k++) {
              var container = document.createElement('div');
              container.className = "container-results mdl-cell mdl-cell--4-col";

              var image = document.createElement('img');
              image.src = "TestResult/000" + (j + 1) + "/" + tsys[k] + ".000" + (j + 1) + ".png";
              image.className = "image";

              var anchorImage = document.createElement('img');
              anchorImage.src = "images/ImageAnchors/" + tsys[k] + "_001.png";
              anchorImage.className = 'anchor';


              var id = imageToDisplay[i] + ((k + 1) + '');
              container.id = id;

              var labelContainer = document.createElement('div');
              labelContainer.className = 'mdl-grid label-container';
              labelContainer.innerHTML =
                '<div class="mdl-cell mdl-cell--7-col"></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
              labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
              labelContainer.querySelector('.second-p p').innerHTML = tsys[k];
              labelContainer.onclick = (function(idParam) {
                return function() {
                  var img = document.getElementById(idParam);
                  img.webkitRequestFullscreen();
                }
              })(id);

              container.appendChild(image);
              container.appendChild(anchorImage);
              container.appendChild(labelContainer);
              tsysContainer.appendChild(container);
            }
            imagesContainer.appendChild(tsysContainer);
          }

          if (imageToDisplay[i] === 'eimsys') {
            var eimsysContainer = document.createElement('div');
            eimsysContainer.className = "eimsys mdl-cell mdl-cell--4-col";
            for (var k = 0; k < eimsys.length; k++) {
              var container = document.createElement('div');
              container.className = "container-results mdl-cell mdl-cell--4-col";

              var image = document.createElement('img');
              image.src = "TestResult/000" + (j + 1) + "/" + eimsys[k] + ".000" + (j + 1) + ".png";
              image.className = "image";

              var anchorImage = document.createElement('img');
              anchorImage.src = "images/ImageAnchors/" + eimsys[k] + "_001.png";
              anchorImage.className = 'anchor';


              var id = imageToDisplay[i] + ((k + 1) + '');
              container.id = id;

              var labelContainer = document.createElement('div');
              labelContainer.className = 'mdl-grid label-container';
              labelContainer.innerHTML =
                '<div class="mdl-cell mdl-cell--7-col"></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
              labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
              labelContainer.querySelector('.second-p p').innerHTML = eimsys[k];
              labelContainer.onclick = (function(idParam) {
                return function() {
                  var img = document.getElementById(idParam);
                  img.webkitRequestFullscreen();
                }
              })(id);

              container.appendChild(image);
              container.appendChild(anchorImage);
              container.appendChild(labelContainer);
              eimsysContainer.appendChild(container);
            }
            imagesContainer.appendChild(eimsysContainer);
          }

          if (imageToDisplay[i] === 'cnumsys') {
            var cnumsysContainer = document.createElement('div');
            cnumsysContainer.className = "cnumsys mdl-cell mdl-cell--4-col";
            for (var k = 0; k < cnumsys.length; k++) {
              var container = document.createElement('div');
              container.className = "container-results mdl-cell mdl-cell--4-col";

              var image = document.createElement('img');
              image.src = "TestResult/000" + (j + 1) + "/" + cnumsys[k] + ".000" + (j + 1) + ".png";
              image.className = "image";

              var anchorImage = document.createElement('img');
              anchorImage.src = "images/ImageAnchors/" + cnumsys[k] + "_001.png";
              anchorImage.className = 'anchor';


              var id = imageToDisplay[i] + ((k + 1) + '');
              container.id = id;

              var labelContainer = document.createElement('div');
              labelContainer.className = 'mdl-grid label-container';
              labelContainer.innerHTML =
                '<div class="mdl-cell mdl-cell--7-col"></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
              labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
              labelContainer.querySelector('.second-p p').innerHTML = cnumsys[k];
              labelContainer.onclick = (function(idParam) {
                return function() {
                  var img = document.getElementById(idParam);
                  img.webkitRequestFullscreen();
                }
              })(id);

              container.appendChild(image);
              container.appendChild(anchorImage);
              container.appendChild(labelContainer);
              cnumsysContainer.appendChild(container);
            }
            imagesContainer.appendChild(cnumsysContainer);
          }

          if (imageToDisplay[i] === 'numcsys') {
            var numcsysContainer = document.createElement('div');
            numcsysContainer.className = "numcsys mdl-cell mdl-cell--4-col";
            for (var k = 0; k < numcsys.length; k++) {
              var container = document.createElement('div');
              container.className = "container-results mdl-cell mdl-cell--4-col";

              var image = document.createElement('img');
              image.src = "TestResult/000" + (j + 1) + "/" + numcsys[k] + ".000" + (j + 1) + ".png";
              image.className = "image";

              var anchorImage = document.createElement('img');
              anchorImage.src = "images/ImageAnchors/" + numcsys[k] + "_001.png";
              anchorImage.className = 'anchor';


              var id = imageToDisplay[i] + ((k + 1) + '');
              container.id = id;

              var labelContainer = document.createElement('div');
              labelContainer.className = 'mdl-grid label-container';
              labelContainer.innerHTML =
                '<div class="mdl-cell mdl-cell--7-col"></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
              labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
              labelContainer.querySelector('.second-p p').innerHTML = numcsys[k];
              labelContainer.onclick = (function(idParam) {
                return function() {
                  var img = document.getElementById(idParam);
                  img.webkitRequestFullscreen();
                }
              })(id);

              container.appendChild(image);
              container.appendChild(anchorImage);
              container.appendChild(labelContainer);
              numcsysContainer.appendChild(container);
            }
            imagesContainer.appendChild(numcsysContainer);
          }

        }
      } else {
        for (var i = 0; i < imageToDisplay.length; i++) {
          for (var j = 0; j < personToDisplay.length; j++) {

            currentPeopleList = personToDisplay;

            if (imageToDisplay[i] === 'asys') {
              var asysContainer = document.createElement('div');
              asysContainer.className = "asys mdl-cell mdl-cell--4-col";
              for (var k = 0; k < asys.length; k++) {
                var container = document.createElement('div');
                container.className = "container-results mdl-cell mdl-cell--4-col";

                var image = document.createElement('img');
                image.src = "TestResult/000" + (j + 1) + "/" + asys[k] + ".000" + (j + 1) + ".png";
                image.className = "image";

                var anchorImage = document.createElement('img');
                anchorImage.src = "images/ImageAnchors/" + asys[k] + "_001.png";
                anchorImage.className = 'anchor';


                var id = imageToDisplay[i] + ((k + 1) + '');
                container.id = id;

                var labelContainer = document.createElement('div');
                labelContainer.className = 'mdl-grid label-container';
                labelContainer.innerHTML =
                  '<div class="mdl-cell mdl-cell--7-col"></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                  '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
                labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
                labelContainer.querySelector('.second-p p').innerHTML = asys[k];
                labelContainer.onclick = (function(idParam) {
                  return function() {
                    var img = document.getElementById(idParam);
                    img.webkitRequestFullscreen();
                  }
                })(id);

                container.appendChild(image);
                container.appendChild(anchorImage);
                container.appendChild(labelContainer);
                asysContainer.appendChild(container);
              }
              imagesContainer.appendChild(asysContainer);
            }

            if (imageToDisplay[i] === 'tsys') {
              var tsysContainer = document.createElement('div');
              tsysContainer.className = "tsys mdl-cell mdl-cell--4-col";
              for (var k = 0; k < tsys.length; k++) {
                var container = document.createElement('div');
                container.className = "container-results mdl-cell mdl-cell--4-col";

                var image = document.createElement('img');
                image.src = "TestResult/000" + (j + 1) + "/" + tsys[k] + ".000" + (j + 1) + ".png";
                image.className = "image";

                var anchorImage = document.createElement('img');
                anchorImage.src = "images/ImageAnchors/" + tsys[k] + "_001.png";
                anchorImage.className = 'anchor';


                var id = imageToDisplay[i] + ((k + 1) + '');
                container.id = id;

                var labelContainer = document.createElement('div');
                labelContainer.className = 'mdl-grid label-container';
                labelContainer.innerHTML =
                  '<div class="mdl-cell mdl-cell--7-col"></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                  '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
                labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
                labelContainer.querySelector('.second-p p').innerHTML = tsys[k];
                labelContainer.onclick = (function(idParam) {
                  return function() {
                    var img = document.getElementById(idParam);
                    img.webkitRequestFullscreen();
                  }
                })(id);

                container.appendChild(image);
                container.appendChild(anchorImage);
                container.appendChild(labelContainer);
                tsysContainer.appendChild(container);
              }
              imagesContainer.appendChild(tsysContainer);
            }

            if (imageToDisplay[i] === 'eimsys') {
              var eimsysContainer = document.createElement('div');
              eimsysContainer.className = "eimsys mdl-cell mdl-cell--4-col";
              for (var k = 0; k < eimsys.length; k++) {
                var container = document.createElement('div');
                container.className = "container-results mdl-cell mdl-cell--4-col";

                var image = document.createElement('img');
                image.src = "TestResult/000" + (j + 1) + "/" + eimsys[k] + ".000" + (j + 1) + ".png";
                image.className = "image";

                var anchorImage = document.createElement('img');
                anchorImage.src = "images/ImageAnchors/" + eimsys[k] + "_001.png";
                anchorImage.className = 'anchor';


                var id = imageToDisplay[i] + ((k + 1) + '');
                container.id = id;

                var labelContainer = document.createElement('div');
                labelContainer.className = 'mdl-grid label-container';
                labelContainer.innerHTML =
                  '<div class="mdl-cell mdl-cell--7-col"></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                  '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
                labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
                labelContainer.querySelector('.second-p p').innerHTML = eimsys[k];
                labelContainer.onclick = (function(idParam) {
                  return function() {
                    var img = document.getElementById(idParam);
                    img.webkitRequestFullscreen();
                  }
                })(id);

                container.appendChild(image);
                container.appendChild(anchorImage);
                container.appendChild(labelContainer);
                eimsysContainer.appendChild(container);
              }
              imagesContainer.appendChild(eimsysContainer);
            }
            if (imageToDisplay[i] === 'cnumsys') {
              var cnumsysContainer = document.createElement('div');
              cnumsysContainer.className = "cnumsys mdl-cell mdl-cell--4-col";
              for (var k = 0; k < cnumsys.length; k++) {
                var container = document.createElement('div');
                container.className = "container-results mdl-cell mdl-cell--4-col";

                var image = document.createElement('img');
                image.src = "TestResult/000" + (j + 1) + "/" + cnumsys[k] + ".000" + (j + 1) + ".png";
                image.className = "image";

                var anchorImage = document.createElement('img');
                anchorImage.src = "images/ImageAnchors/" + cnumsys[k] + "_001.png";
                anchorImage.className = 'anchor';


                var id = imageToDisplay[i] + ((k + 1) + '');
                container.id = id;

                var labelContainer = document.createElement('div');
                labelContainer.className = 'mdl-grid label-container';
                labelContainer.innerHTML =
                  '<div class="mdl-cell mdl-cell--7-col"></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                  '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
                labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
                labelContainer.querySelector('.second-p p').innerHTML = cnumsys[k];
                labelContainer.onclick = (function(idParam) {
                  return function() {
                    var img = document.getElementById(idParam);
                    img.webkitRequestFullscreen();
                  }
                })(id);

                container.appendChild(image);
                container.appendChild(anchorImage);
                container.appendChild(labelContainer);
                cnumsysContainer.appendChild(container);
              }
              imagesContainer.appendChild(cnumsysContainer);
            }

            if (imageToDisplay[i] === 'numcsys') {
              var numcsysContainer = document.createElement('div');
              numcsysContainer.className = "numcsys mdl-cell mdl-cell--4-col";
              for (var k = 0; k < numcsys.length; k++) {
                var container = document.createElement('div');
                container.className = "container-results mdl-cell mdl-cell--4-col";

                var image = document.createElement('img');
                image.src = "TestResult/000" + (j + 1) + "/" + numcsys[k] + ".000" + (j + 1) + ".png";
                image.className = "image";

                var anchorImage = document.createElement('img');
                anchorImage.src = "images/ImageAnchors/" + numcsys[k] + "_001.png";
                anchorImage.className = 'anchor';


                var id = imageToDisplay[i] + ((k + 1) + '');
                container.id = id;

                var labelContainer = document.createElement('div');
                labelContainer.className = 'mdl-grid label-container';
                labelContainer.innerHTML =
                  '<div class="mdl-cell mdl-cell--7-col"></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">person</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><p class="label-text">1</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"><i class="material-icons">camera</i></div>' +
                  '<div class="mdl-cell mdl-cell--1-col second-p imageLabel"><p class="label-text">1/4</p></div>' +
                  '<div class="mdl-cell mdl-cell--1-col imageLabel"></div>' +
                  '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
                labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
                labelContainer.querySelector('.second-p p').innerHTML = numcsys[k];
                labelContainer.onclick = (function(idParam) {
                  return function() {
                    var img = document.getElementById(idParam);
                    img.webkitRequestFullscreen();
                  }
                })(id);

                container.appendChild(image);
                container.appendChild(anchorImage);
                container.appendChild(labelContainer);
                numcsysContainer.appendChild(container);
              }
              imagesContainer.appendChild(numcsysContainer);
            }
          }
        }
      }
    }
    $('body').css("background", "black");
    $('#currentPeople').text(currentPeopleList instanceof Array ? currentPeopleList.join(', ') : currentPeopleList);
    var displayShownImageNames = [];
    for (var i = 0; i < imageToDisplay.length; i++) {
      if (imageToDisplay[i] == 'asys') {
        displayShownImageNames.push('A система');
      }
      if (imageToDisplay[i] == 'tsys') {
        displayShownImageNames.push('b0, b7');
      }
      if (imageToDisplay[i] == 'eimsys') {
        displayShownImageNames.push('b1, b2, b3, b4, b5, b6');
      }
      if (imageToDisplay[i] == 'cnumsys') {
        displayShownImageNames.push('c1, c2, c3, c4, c5, c6');
      }
      if (imageToDisplay[i] == 'numcsys') {
        displayShownImageNames.push('1C, 2C, 3C, 4C, 5C, 6C');
      }
    }
    // Check if these values are selected
    var ttrue = displayShownImageNames.indexOf('b0, b7');
    var eimtrue = displayShownImageNames.indexOf('b1, b2, b3, b4, b5, b6');
    var cnumtrue = displayShownImageNames.indexOf('c1, c2, c3, c4, c5, c6');
    var numctrue = displayShownImageNames.indexOf('1C, 2C, 3C, 4C, 5C, 6C');

    // if B and C systems are full - display shorthand.
    if ((ttrue > -1) && (eimtrue > -1)) {
      if (eimtrue > ttrue) {
        displayShownImageNames.splice(eimtrue, 1);
        displayShownImageNames[ttrue] = 'В система';
        cnumtrue = displayShownImageNames.indexOf('c1, c2, c3, c4, c5, c6');
        numctrue = displayShownImageNames.indexOf('1C, 2C, 3C, 4C, 5C, 6C');
      } else {
        displayShownImageNames.splice(ttrue, 1);
        displayShownImageNames[eimtrue] = 'В система';
        cnumtrue = displayShownImageNames.indexOf('c1, c2, c3, c4, c5, c6');
        numctrue = displayShownImageNames.indexOf('1C, 2C, 3C, 4C, 5C, 6C');
      }
    }

    if ((cnumtrue > -1) && (numctrue > -1)) {
      if (cnumtrue > numctrue) {
        displayShownImageNames.splice(cnumtrue, 1);
        displayShownImageNames[numctrue] = 'C система';
        ttrue = displayShownImageNames.indexOf('b0, b7');
        eimtrue = displayShownImageNames.indexOf('b1, b2, b3, b4, b5, b6');
      } else {
        displayShownImageNames.splice(numctrue, 1);
        displayShownImageNames[cnumtrue] = 'C система';
        ttrue = displayShownImageNames.indexOf('b0, b7');
        eimtrue = displayShownImageNames.indexOf('b1, b2, b3, b4, b5, b6');
      }
    }

    $('#currentImages').text(displayShownImageNames.join(', '));
    $('#information').css('display', '');
  } else {
    //display animation when nothing is selected

    $('body').css({
      'background-image': 'url(images/neurobox.gif)',
      'background-size': 'cover',
      'background-size': '50%',
      'background-position': 'center 100px',
      'background-color': 'black',
      'background-repeat': 'no-repeat'
    });
    $('#information').css('display', 'none');


  }



}

function showSettingsModal() {
  var dialog = document.querySelector('dialog');
  dialogPolyfill.registerDialog(dialog);
  dialog.showModal();
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });
}

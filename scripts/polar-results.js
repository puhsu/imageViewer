var peopleTested = localStorage.getItem("peopleTested");
var imagesToShowInSelect = localStorage.getItem('selectedResults').split(' ');
imagesToShowInSelect.pop();
console.log(imagesToShowInSelect);

var selectElement = document.getElementById("personToDisplay");
var selectElementImages = document.getElementById("imageToDisplay");

while (selectElementImages.firstChild) {
    selectElementImages.removeChild(selectElementImages.firstChild);
}
for (var i = 0; i < imagesToShowInSelect.length; i++) {
    var option = document.createElement('option');
    option.value = imagesToShowInSelect[i];
    option.text = imagesToShowInSelect[i];
    selectElementImages.add(option);
}
for (var i = 1; i <= peopleTested; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    selectElement.add(option);
}


var isThereAll = 0;
var personToDisplaySelectObj = $('#personToDisplay').selectize({
    delimiter: ',',
    persist: true,
    placeholder: 'номер человека',
    plugins: ['remove_button'],
    onItemAdd: function(value) {
        if (value === 'all' && isThereAll === 0) {
            personToDisplaySelectObj[0].selectize.clear();
            isThereAll++;
            personToDisplaySelectObj[0].selectize.addItem('all');
        } else {
            if (value !== 'all' && isThereAll === 1) {
                personToDisplaySelectObj[0].selectize.clear();
                isThereAll = 0;
                personToDisplaySelectObj[0].selectize.addItem(value);
            }
        }
        //personToDisplaySelectObj[0].selectize.close();
    },
    create: function(input) {
        return {
            value: input,
            text: input
        }
    }
});

$('#imageToDisplay').selectize({
    plugins: ['remove_button'],
    placeholder: 'развертка'
});


function displayImagesPolar() {
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
                currentPeopleList = 'Все';
                var len = +localStorage.getItem('peopleTested');
                for (var j = 0; j < len; j++) {

                    var container = document.createElement('div');
                    container.className = "container";


                    var image = document.createElement('img');
                    var polarimage = document.createElement('img');
                    if (j < 9) {
                        image.src = "TestResult/000" + (j + 1) + "/" + imageToDisplay[i] + ".000" + (j + 1) + ".png";
                        polarimage.src = "TestResult/000" + (j + 1) + "/" + changeToPolarNum(imageToDisplay[i]) + ".000" + (j + 1) + ".png";
                    } else {
                        image.src = "TestResult/00" + (j + 1) + "/" + imageToDisplay[i] + ".00" + (j + 1) + ".png";
                        polarimage.src = "TestResult/00" + (j + 1) + "/" + changeToPolarNum(imageToDisplay[i]) + ".00" + (j + 1) + ".png";
                    }
                    image.className = "image";
                    polarimage.className = "image";

                    var anchorImage = document.createElement('img');
                        anchorImage.src = "images/PolarAnchors/" + imageToDisplay[i] + "_001.png";
                        anchorImage.className = 'anchor';

                    var id = imageToDisplay[i] + ((j + 1) + '');
                    container.id = id;




                    var labelContainer = document.createElement('div');
                    labelContainer.className = 'mdl-grid label-container';
                    labelContainer.innerHTML =
                        '<div class="mdl-cell mdl-cell--3-col"></div>' +
                        '<div class="mdl-cell mdl-cell--1-col"><i class="material-icons">person</i></div>' +
                        '<div class="mdl-cell mdl-cell--2-col"><p class="label-text">1</p></div>' +
                        '<div class="mdl-cell mdl-cell--1-col"><i class="material-icons">camera</i></div>' +
                        '<div class="mdl-cell mdl-cell--2-col second-p"><p class="label-text">1/4</p></div>' +
                        '<div class="mdl-cell mdl-cell--3-col"></div>' +
                        '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
                    labelContainer.querySelector('p:first-of-type').innerHTML = (j + 1);
                    labelContainer.querySelector('.second-p p').innerHTML = imageToDisplay[i] + "/" + changeToPolarNum(imageToDisplay[i]);
                    labelContainer.onclick = (function(idParam) {
                        return function() {
                            var img = document.getElementById(idParam);
                            img.webkitRequestFullscreen();
                        }
                    })(id);

                    container.appendChild(image);
                    container.appendChild(polarimage);
                    container.appendChild(anchorImage);
                    container.appendChild(labelContainer);

                    imagesContainer.appendChild(container);
                }
            } else {
                for (var j = 0; j < personToDisplay.length; j++) {
                    currentPeopleList = personToDisplay;
                    var container = document.createElement('div');

                    container.className = "container";


                    var image = document.createElement('img');
                    var polarimage = document.createElement('img');

                    if (j < 9) {
                        image.src = "TestResult/000" + personToDisplay[j] + "/" + imageToDisplay[i] + ".000" + personToDisplay[j] + ".png";
                        polarimage.src = "TestResult/000" + personToDisplay[j] + "/" + changeToPolarNum(imageToDisplay[i]) + ".000" + personToDisplay[j] + ".png";
                    } else {
                        image.src = "TestResult/00" + personToDisplay[j] + "/" + imageToDisplay[i] + ".00" + personToDisplay[j] + ".png";
                        polarimage.src = "TestResult/00" + personToDisplay[j] + "/" + changeToPolarNum(imageToDisplay[i]) + ".00" + personToDisplay[j] + ".png";
                    }

                    image.className = "image";
                    polarimage.className = "image";

                    var anchorImage = document.createElement('img');
                        anchorImage.src = "images/PolarAnchors/" + imageToDisplay[i] + "_001.png";
                        anchorImage.className = 'anchor';

                    var id = imageToDisplay[i] + personToDisplay[j];
                    container.id = id;

                    var labelContainer = document.createElement('div');
                    labelContainer.className = 'mdl-grid label-container';
                    labelContainer.innerHTML =
                        '<div class="mdl-cell mdl-cell--3-col"></div>' +
                        '<div class="mdl-cell mdl-cell--1-col"><i class="material-icons">person</i></div>' +
                        '<div class="mdl-cell mdl-cell--2-col"><p class="label-text">1</p></div>' +
                        '<div class="mdl-cell mdl-cell--1-col"><i class="material-icons">camera</i></div>' +
                        '<div class="mdl-cell mdl-cell--2-col second-p"><p class="label-text">1/4</p></div>' +
                        '<div class="mdl-cell mdl-cell--3-col"></div>' +
                        '<div class="mdl-cell mdl-cell--12-col"><span class="label-container-border"></span></div>';
                    labelContainer.querySelector('p:first-of-type').innerHTML = personToDisplay[j];
                    labelContainer.querySelector('.second-p p').innerHTML = imageToDisplay[i] + "/" + changeToPolarNum(imageToDisplay[i]);
                    labelContainer.onclick = (function(idParam) {
                        return function() {
                            var img = document.getElementById(idParam);
                            img.webkitRequestFullscreen();
                        }
                    })(id);

                    container.appendChild(image);
                    container.appendChild(polarimage);
                    container.appendChild(anchorImage);
                    container.appendChild(labelContainer);

                    imagesContainer.appendChild(container);
                }
            }
        }
        $('body').css("background", "black");
        $('#currentPeople').text(currentPeopleList instanceof Array ? currentPeopleList.join(', ') : currentPeopleList);
        $('#currentImages').text(imageToDisplay.join(', '));
        $('#information').css('display', '');
    } else {
        $('body').css({
          'background-image': 'url(images/neurobox.gif)',
          'background-size': 'cover',
          'background-size':'50%',
          'background-position':'center 100px',
          'background-color':'black',
          'background-repeat':'no-repeat'
        });
        $('#information').css('display', 'none');
    }
}





function changeToPolarNum(string) {
    var result = '';
    for (var i = 0; i < string.length; i++) {
        if (string[i] === '1') result += '4';
        else if (string[i] === '2') result += '5';
        else if (string[i] === '3') result += '6';
        else if (string[i] === '4') result += '1';
        else if (string[i] === '5') result += '2';
        else result += '3';
    }
    result = result.split('').sort().join('');
    return result;
}

function showSettingsModal() {
    var dialog = document.querySelector('dialog');
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
}

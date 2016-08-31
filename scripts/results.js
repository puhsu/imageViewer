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
for (var i = selectedResults.length - 1; i >= 0; i--) {
    if (selectedResults[i] == "Butterfly" || selectedResults[i] == "Square" || selectedResults[i] == "Triangle") {
        selectedResults.splice(i, 1);
    }
}

var selectedResultsSelect = $("#imageToDisplay");
for (var i = 0; i < selectedResults.length; i++) {
    var option = $('<option/>', {
        value: selectedResults[i],
        text: selectedResults[i]
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
                currentPeopleList = ' Все';
                var len = +localStorage.getItem('peopleTested');
                for (var j = 0; j < len; j++) {

                    var container = document.createElement('div');
                    container.className = "container-results mdl-cell mdl-cell--4-col";

                    var image = document.createElement('img');

                    if (j < 9) {
                        image.src = "TestResult/000" + (j + 1) + "/" + imageToDisplay[i] + ".000" + (j + 1) + ".png";
                    } else {
                        image.src = "TestResult/00" + (j + 1) + "/" + imageToDisplay[i] + ".00" + (j + 1) + ".png";
                    }

                    image.className = "image";

                    var anchorImage = document.createElement('img');
                        anchorImage.src = "images/ImageAnchors/" + imageToDisplay[i] + "_001.png";
                        anchorImage.className = 'anchor';


                    var id = imageToDisplay[i] + ((j + 1) + '');
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
                    labelContainer.querySelector('.second-p p').innerHTML = imageToDisplay[i];
                    labelContainer.onclick = (function(idParam) {
                        return function() {
                            var img = document.getElementById(idParam);
                            img.webkitRequestFullscreen();
                        }
                    })(id);

                    container.appendChild(image);
                    container.appendChild(anchorImage);
                    container.appendChild(labelContainer);


                    imagesContainer.appendChild(container);
                }
            } else {
                for (var i = 0; i < imageToDisplay.length; i++) {
                    for (var j = 0; j < personToDisplay.length; j++) {
                        currentPeopleList = personToDisplay;
                        var container = document.createElement('div');

                        container.className = "container-results mdl-cell mdl-cell--4-col";


                        var image = document.createElement('img');
                        var x = document.createElement('img'), y = document.createElement('img'), z = document.createElement('img');
                        x.src = "TestResult/0001/1.0001.png";
                        y.src = "TestResult/0001/1.0001.png";
                        z.src = "TestResult/0001/1.0001.png";
                        if (j < 9) {
                            image.src = "TestResult/000" + (j + 1) + "/" + imageToDisplay[i] + ".000" + (j + 1) + ".png";
                        } else {
                            image.src = "TestResult/00" + (j + 1) + "/" + imageToDisplay[i] + ".00" + (j + 1) + ".png";
                        }

                        image.className = "image";
                        x.className = "notInFullScreen x";
                        y.className = "notInFullScreen y";
                        z.className = "notInFullScreen z";

                        var anchorImage = document.createElement('img');
                            anchorImage.src = "images/ImageAnchors/" + imageToDisplay[i] + "_001.png";
                            anchorImage.className = 'anchor';

                        var id = imageToDisplay[i] + ((j + 1) + '');
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
                        labelContainer.querySelector('p:first-of-type').innerHTML = personToDisplay[j];
                        labelContainer.querySelector('.second-p p').innerHTML = imageToDisplay[i];
                        labelContainer.onclick = (function(idParam) {
                            return function() {
                                var img = document.getElementById(idParam);
                                img.webkitRequestFullscreen();
                                x.className = "x";
                                y.className = "y";
                                z.className = "z";
                            }
                        })(id);

                        $(id).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
                            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
                            var event = state ? 'FullscreenOn' : 'FullscreenOff';

                            // Now do something interesting
                            alert('Event: ' + event);    
                        });
                        container.appendChild(image);
                        container.appendChild(anchorImage);
                        container.appendChild(labelContainer);
                        container.appendChild(x);
                        container.appendChild(y);
                        container.appendChild(z);
                        imagesContainer.appendChild(container);
                    }
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
function showSettingsModal() {
    var dialog = document.querySelector('dialog');
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
}

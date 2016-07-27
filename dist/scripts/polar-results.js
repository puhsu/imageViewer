var peopleTested = localStorage.getItem("peopleTested");
var imagesToShowInSelect = localStorage.getItem('selectedResults').split(' ');
imagesToShowInSelect.pop();
console.log(imagesToShowInSelect);

var selectElement = document.getElementById("personToDisplay");
var selectElementImages = document.getElementById("imageToDisplay");

while(selectElementImages.firstChild) {
    selectElementImages.removeChild(selectElementImages.firstChild);
}
for(var i = 0; i < imagesToShowInSelect.length; i++) {
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
        for (var i = 0; i < imageToDisplay.length; i++) {
            if (personToDisplay[0] === 'all') {
                var len = +localStorage.getItem('peopleTested');
                for (var j = 0; j < len; j++) {

                    var container = document.createElement('div');
                    container.className = "container";


                    var image = document.createElement('img');
                    var polarimage = document.createElement('img');
                    image.src = "TestResult/" + (j + 1) + "/Layout/" + imageToDisplay[i] + ".png";
                    polarimage.src = "TestResult/" + (j + 1) + "/Layout/" + changeToPolarNum(imageToDisplay[i]) + ".png";
                    image.className = "image";
                    polarimage.className = "image";
                    var id = imageToDisplay[i] + ((j + 1) + '');
                    container.id = id;

                    var button = document.createElement('button');
                    button.className = 'button';
                    button.innerHTML = (j + 1) + '';




                    button.onclick = (function(idParam) {
                        return function() {
                            var img = document.getElementById(idParam);
                            img.webkitRequestFullscreen();
                        }
                    })(id);

                    container.appendChild(image);
                    container.appendChild(polarimage);
                    container.appendChild(button);

                    imagesContainer.appendChild(container);
                }
            } else {
                    for (var j = 0; j < personToDisplay.length; j++) {

                        var container = document.createElement('div');

                        container.className = "container";


                        var image = document.createElement('img');
                        var polarimage = document.createElement('img');
                        
                        image.src = "TestResult/" + personToDisplay[j] + "/Layout/" + imageToDisplay[i] + ".png";
                        polarimage.src = "TestResult/" + personToDisplay[j] + "/Layout/" + changeToPolarNum(imageToDisplay[i]) + ".png";

                        image.className = "image";
                        polarimage.className = "image";

                        var id = imageToDisplay[i] + personToDisplay[j];
                        container.id = id;

                        var button = document.createElement('div');
                        button.className = 'buttonPolar';
                        var text = document.createElement('p');
                        text.innerHTML = '<i class="material-icons">person</i>' + personToDisplay[j] + '<i class="material-icons">camera</i>' + imageToDisplay[i];
                        var line = document.createElement('span');
                        button.appendChild(text);
                        button.appendChild(line);




                        button.onclick = (function(idParam) {
                            return function() {
                                var img = document.getElementById(idParam);
                                img.webkitRequestFullscreen();
                            }
                        })(id);

                        container.appendChild(image);
                        container.appendChild(polarimage);
                        container.appendChild(button);

                        imagesContainer.appendChild(container);
                    }
                }
        }
        $('body').css("background", "");
    } else {
        $('body').css({
            'background-image': 'url(images/neurobox.png)',
            'background-size': 'cover'
        });
    }
}





function changeToPolarNum(string) {
    var result = '';
    for(var i = 0; i < string.length; i++) {
        if(string[i] === '1') result += '4';
        else if(string[i] === '2') result += '5';
        else if(string[i] === '3') result += '6';
        else if(string[i] === '4') result += '1';
        else if(string[i] === '5') result += '2';
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
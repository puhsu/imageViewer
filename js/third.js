var peopleTested = localStorage.getItem("peopleTested");
var selectElement = document.getElementById("personToDisplay");

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


function displayImages() {
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
                    container.className = "container col-md-6 col-sm-12";


                    var image = document.createElement('img');
                    image.src = "TestResult/" + (j + 1) + "/Layout/" + imageToDisplay[i] + "/" + imageToDisplay[i] + ".png";
                    image.className = "image";
                    var id = imageToDisplay[i] + ((j + 1) + '');
                    image.id = id;

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
                    container.appendChild(button);

                    imagesContainer.appendChild(container);
                }
            } else {
                for (var i = 0; i < imageToDisplay.length; i++) {
                    for (var j = 0; j < personToDisplay.length; j++) {

                        var container = document.createElement('div');

                        container.className = "container col-md-6 col-sm-12";


                        var image = document.createElement('img');
                        image.src = "TestResult/" + (j + 1) + "/Layout/" + imageToDisplay[i] + "/" + imageToDisplay[i] + ".png";
                        image.className = "image";
                        var id = imageToDisplay[i] + ((j + 1) + '');
                        image.id = id;

                        var button = document.createElement('button');
                        button.className = 'button';
                        button.innerHTML = personToDisplay[j];




                        button.onclick = (function(idParam) {
                            return function() {
                                var img = document.getElementById(idParam);
                                if (screenfull.enabled) {
                                    screenfull.request(img);
                                };
                            }
                        })(id);

                        container.appendChild(image);
                        container.appendChild(button);

                        imagesContainer.appendChild(container);
                    }
                }
            }
        }
    }
}

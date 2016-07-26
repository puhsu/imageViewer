var peopleTested = localStorage.getItem("peopleTested"); //Вытягиваем из локального хранилища количество результатов
var selectt = document.getElementById("mySelect"); // Берём HTML селектора для заполнения опциями


for (var i = 1; i <= peopleTested; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    selectt.add(option);
}
var isThereAll = 0; //проверка на значение "все" в поле
var mySelectControl = $('#mySelect').selectize({     //задаём библиотеку для отображения селектов
    delimiter: ',',
    persist: true,
    placeholder: 'номер человека',
    plugins: ['remove_button'],
    onItemAdd: function(value) {    //очистка поля при появлении all
        if(value === 'all' && isThereAll === 0) {
            mySelectControl[0].selectize.clear();  //очистка поля от элементов
            isThereAll++;
            mySelectControl[0].selectize.addItem('all'); //добавление элемента
        } else {
            if(value !== 'all' && isThereAll === 1) {  //при добавлении элемента, проверка есть ли all
                mySelectControl[0].selectize.clear();
                isThereAll = 0;
                mySelectControl[0].selectize.addItem(value);
            }
        }
    },
    create: function(input) {   //функция для работы selectize
        return {
            value: input,
            text: input
        }
    }
});

var viewModeSelect = $('#viewMode').selectize({   //выбор между режимами отображения
    delimiter: ',',
    persist: false,
    maxItems: 1,
    placeholder: 'режим отображения',
    onItemAdd: function(value) {
        viewModeSelect[0].selectize.close();    //закрывает селектор при выборе элемента
    },
    create: function(input) {
        return {
            value: input,
            text: input
        }
    }
});

var viewModeOption = document.getElementById('viewMode').value;
var selectedResults = localStorage.getItem('selectedResults');    //получение string из setup
var results = selectedResults.split(' ');   // преобразование в массив
results.pop();    //удаление лишнего элемента

var selectImages = document.getElementById('images');   //очистка select'а от повторов (всех потомков этого элемента)
while (selectImages.children.length > 1) {
    if(selectImages.firstChild.value !== 'all') {
        selectImages.removeChild(selectImages.firstChild);
    }
}

for (var i = 0; i < results.length; i++) {    //???
    var newOption = document.createElement('option');
    newOption.value = results[i];
    newOption.text = results[i];
    selectImages.add(newOption);
}
var isThereAllImagesControl = 0;
var imagesControl = $('#images').selectize({    //выбор изображений для отображения
    plugins: ['remove_button'],
    delimiter: ',',
    persist: false,
    placeholder: 'изображения',
    onItemAdd: function(value) {    //очистка поля при появлении all
        if(value === 'all' && isThereAllImagesControl === 0) {
            imagesControl[0].selectize.clear();  //очистка поля от элементов
            isThereAllImagesControl++;
            imagesControl[0].selectize.addItem('all'); //добавление элемента
        } else {
            if(value !== 'all' && isThereAllImagesControl === 1) {  //при добавлении элемента, проверка есть ли all
                imagesControl[0].selectize.clear();
                isThereAllImagesControl = 0;
                imagesControl[0].selectize.addItem(value);
            }
        }
    },
    create: function(input) {
        return {
            value: input,
            text: input
        }
    }
});

//???
function changeModeFromInput() {
    var selectElement = document.getElementById('mySelect');
    var viewMode = document.getElementById('viewMode');
    var viewModeList = viewMode.children;
    var flag = 1;
    for (var i = 0; i < viewModeList.length; i++) {
        if (viewModeList[i].value == 'all') flag = 0;
    }
    //console.log(antiSpam);
    if (selectElement.value !== 'all') {
        if (flag) {
            var viewModeControl = viewModeSelect[0].selectize;
            viewModeControl.addOption({
                value: 'all',
                text: 'all'
            });
        }
    } else {
        var viewModeControl = viewModeSelect[0].selectize;
        viewModeControl.removeOption('all');
    }
    displayImages();
}

function displayImages() {

    var imagesContainer = document.getElementById('imagesContainer');
    while (imagesContainer.firstChild) {
        imagesContainer.removeChild(imagesContainer.firstChild);
    }

    var personToDisplay = $('#mySelect').val(),
        imageToDisplay = $('#images').val(),
        viewMode = $('#viewMode').val();

    if(personToDisplay !== null && imageToDisplay !== null) {
        var imagesContainer = document.getElementById('imagesContainer');
        var len, ifShowAllImg = 0, ifShowAllPeople = 0, lenPeople;
        if(imageToDisplay[0] === 'all') {
            len = results.length;
            ifShowAllImg = 1;
            console.log(len);
        } else {
            len = imageToDisplay.length;
        }

        if(personToDisplay[0] === 'all') {
            lenPeople = peopleTested;
            ifShowAllPeople = 1;
        } else {
            lenPeople = personToDisplay.length;
        }
        for(var i = 0; i < len; i++) {
            
                for(var j = 0; j < lenPeople; j++) {
                    if(viewMode[0] === 'single') {
                        
                        var container = document.createElement('div');
                        var image = document.createElement('img');
                        var button = document.createElement('button');

                        container.className = "container col-md-6 col-sm-12";
                        container.id ="jjj";
                        image.className = 'image';
                        button.className = "button";

                        var imageSource;
                        //var buttonText = "c";
                        var sampleId;
                        if(ifShowAllPeople) {
                            imageSource = "TestResult/" + (j + 1);
                            //buttonText += (j + 1);
                            sampleId = "r" + (j + 1);
                        } else {
                            imageSource = "TestResult/" + personToDisplay[j];
                            //buttonText += personToDisplay[j];
                            sampleId = "r" + personToDisplay[j];
                        }
                        
                        imageSource += "/Octo/";
                        //buttonText += " k";

                        if(ifShowAllImg) {
                            imageSource += results[i];
                            sampleId += "Pic" + results[i];
                            //buttonText += results[i];
                        } else {
                            imageSource += imageToDisplay[i];
                            sampleId += "Pic" + imageToDisplay[i];
                            //buttonText += imageToDisplay[i];
                        }

                        imageSource += ".png";
                        image.src = imageSource;
                        image.id = sampleId;

                        //button.innerHTML = buttonText;

                        button.onclick = function() {
                             var img = document.getElementById(sampleId);
                                console.log(img);
                                console.log(sampleId);
                                if (screenfull.enabled) {
                                    screenfull.request(img);
                                }
                        }
                        
                        container.appendChild(image);
                        container.appendChild(button);
                        imagesContainer.appendChild(container);
                    }
                }
        }
        console.log(personToDisplay);
        console.log(imageToDisplay);
        console.log(viewMode);
    }
}

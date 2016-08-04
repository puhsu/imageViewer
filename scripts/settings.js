// создается список всех изображений
// чтобы добавить новое изображение: необходимо добавить его в строку allResultsList,
// изменить разметку в файле settings.html и изменить правую границу цикла в функции checkUncheckAll()
var allResultsList = '1 2 3 4 5 6 12 13 15 16 23 24 26 34 35 45 46 56 123 126 135 156 234 246 345 456 Butterfly Triangle Square '.split(' ');
allResultsList.pop();

// использование dialogPolyfill.js для создания модального окна
var dialog = document.querySelector('dialog');
dialogPolyfill.registerDialog(dialog);
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});

function saveCurrentSettings() {
    var peopleTested = document.getElementById("peopleTested").value;

    var peopleTestedFlag = 1;
    var selectedResultsFlag = 1;

    if(peopleTested === '') {
        // введено ли колличество людей
        peopleTestedFlag = 0;
    }

    var selectedResults = '';

    for (var i = 0; i < 29; i++) {
        // сохранение введенных значений
        var checkboxItem = document.getElementById('checkbox-' + allResultsList[i]);
        if (checkboxItem.checked) {
            selectedResults += checkboxItem.value;
            selectedResults += ' ';
        }
    }

    if(selectedResults === '') {
        // введено ли хотя бы одно изображение
        selectedResultsFlag = 0;
    }
    // сформировать модальное окно при ошибке ввода
    // иначе сохранить информацию (колличество людей и выбранные изображения) в локальном хранилище
    if (!selectedResultsFlag && !peopleTestedFlag) {
        dialog.querySelector('.mdl-dialog__content p').innerHTML = "Заполните поля.";
        dialog.showModal();
    } else if (!selectedResultsFlag) {
        dialog.querySelector('.mdl-dialog__content p').innerHTML = "Выберите изображения.";
        dialog.showModal();
    } else if (!peopleTestedFlag) {
        dialog.querySelector('.mdl-dialog__content p').innerHTML = "Укажите количество людей.";
        dialog.showModal();
    } else {
        localStorage.setItem('selectedResults', selectedResults);
        localStorage.setItem('peopleTested', peopleTested);
        // переадресация на страницу index.html
        window.location.href = 'index.html';
    }
}


// функция, вызываемая при изменении checkbox#checkbox-all
function checkUncheckAll() {

    var checkboxAll = document.getElementById('checkbox-all');

    if (checkboxAll.checked) {
        // при нажатии на чекбокс "Все изображения" для всех не нажатых чекбоксов нажать
        for (var i = 0; i < 29; i++) {
            var checkboxItem = document.getElementById('checkbox-' + allResultsList[i]);
            if(!checkboxItem.checked) {
                checkboxItem.click();
            }
        }
    } else {
        // отжать нажатые чекбоксы, если #checkbox-all не нажат
        for (var i = 0; i < 29; i++) {
            var checkboxItem = document.getElementById('checkbox-' + allResultsList[i]);
            if(checkboxItem.checked) {
                checkboxItem.click();
            }
        }
    }
}

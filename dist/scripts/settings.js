var selectedResultsList = '1 2 3 4 5 6 12 13 15 16 23 24 26 34 35 45 46 56 123 126 135 156 234 246 345 456 Butterfly Triangle Square '.split(' ');
selectedResultsList.pop();

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
        console.log(peopleTested);
        console.log('hello');
        peopleTestedFlag = 0;
    }

    var checkboxAll = document.getElementById('checkbox-all');

    var str = '';

    for (var i = 0; i < 29; i++) {
        var imageNum = document.getElementById('checkbox-' + selectedResultsList[i]);
        if (imageNum.checked) {
            str += imageNum.value;
            str += ' ';
        }
    }

    if(str === '') {
        console.log('hello');
        selectedResultsFlag = 0;
    }

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
        localStorage.setItem('selectedResults', str);
        localStorage.setItem('peopleTested', peopleTested);
        window.location.href = 'index.html';
    }
}

function checkUncheckAll() {
    var checkboxAll = document.getElementById('checkbox-all');

    if (checkboxAll.checked) {
        for (var i = 0; i < 29; i++) {
            var imageNum = document.getElementById('checkbox-' + selectedResultsList[i]);
            if(!imageNum.checked) {
                imageNum.click();
            }     
        }
    } else {
        for (var i = 0; i < 29; i++) {
            var imageNum = document.getElementById('checkbox-' + selectedResultsList[i]);
            if(imageNum.checked) {
                imageNum.click();
            }     
        }
    }
}
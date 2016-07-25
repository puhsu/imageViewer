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
        //mySelectControl[0].selectize.close();
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

var selectImages = document.getElementById('images');   //???
while (selectImages.firstChild) {
    selectImages.removeChild(selectImages.firstChild);
}

for (var i = 0; i < results.length; i++) {    //???
    var newOption = document.createElement('option');
    newOption.value = results[i];
    newOption.text = results[i];
    selectImages.add(newOption);
}

var imagesControl = $('#images').selectize({    //выбор изображений для отображения
    plugins: ['remove_button'],
    delimiter: ',',
    persist: false,
    placeholder: 'изображения',
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
}

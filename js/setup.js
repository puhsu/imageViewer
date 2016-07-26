$('#setting-modal').modal('show');

function save() {

    var peopleTested = document.getElementById("peopleTested").value;

    var peopleTestedFlag = 1;
    var selectedResultsFlag = 1;

    if (peopleTested !== '') {
        localStorage.setItem("peopleTested", peopleTested);
    } else {
        peopleTestedFlag = 0;
    }

    var checkboxAll = document.getElementById('0');

    if (checkboxAll.checked) {
        localStorage.setItem('selectedResults', '1 2 3 4 5 6 12 13 15 16 23 24 26 34 35 45 46 56 123 125 126 135 234 246 345 456 Butterfly Triangle Square ');
    } else {
        var str = '';
        for (var i = 1; i <= 26; i++) {
            var imageNum = document.getElementById(i + '');
            if (imageNum.checked) {
                str += imageNum.value;
                str += ' ';
            }
        }

        if (str !== '') {
            localStorage.setItem('selectedResults', str);
        } else {
            selectedResultsFlag = 0;
        }
    }
    if (!selectedResultsFlag && !peopleTestedFlag) {
        alert('Заполните поля!');
    } else if (!selectedResultsFlag) {
        alert('Заполните второе поле');
    } else if (!peopleTestedFlag) {
        alert('Заполните первое поле');
    } else {
        window.location.href = 'main.html';
    }
}

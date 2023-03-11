let dataFromGoogleSheet = [];
let countsTyag = [];
let taste = [];

let countTyag = 0;
let minPrice = 0;
let countvNalichae = 0;

function loadBase(value) {
    let googleSheetUrl = '';
    if (value == "Оболонский") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1KoKkt-Bl7urToOROsAPktkqYxw8qlJOkTm9196aw6Pc/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Шевченковский") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1YTGyA4p3NhHrNGhIW5kmRNpVykz7jVeGKmTkny1Pz8k/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Деснянский") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1YTGyA4p3NhHrNGhIW5kmRNpVykz7jVeGKmTkny1Pz8k/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Подольський") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1iqDyAe1VE69o05Jis19WBrl0BlUUs-sIAIa5EP705no/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Соломенский") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1SBixEDKVWbd2YFl1rNe4wAfgormkoTLvz_GwbaSdvqQ/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Печерский") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1LaBGKxuz2ueIGhEzJjDZH8YZGB7kt1S0k1PKaOF9G1A/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Голосовеевский") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1bzVJIUIyoHQj4AIkMHPlRTntgmX9A4BW2tS5pK45ys4/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Святошинский") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1IxeLfU0Wd4rullq7VVOm_aY3TpKzNphzITa3q_9hf14/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Днипровський") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1DDsDOl_GxWbvBjUcWskJlEuoKL1RtvSdv9XD2txSrhI/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }
    else if (value == "Дарницкий") {
        googleSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/15__2GujVkA7rlNckXoKRHVDtLTKCX27q-t0v10J8jCY/values/Наличие?key=AIzaSyCcn3IQgineUMeiniA16lOLGZTGSu0SE3g';
    }

    // Количество тяг, вкус, мин.прайс, общее количество, в наличии
    document.querySelector('.countTyagvNalichae').innerHTML = null;
    document.querySelector('.countTyagvNalichae').style.color = 'blue';
    countsTyag = [];
    document.querySelector('.tastevNalichae').innerHTML = null;
    document.querySelector('.minPrice').innerHTML = null;
    document.querySelector('.countvNalichae').innerHTML = null;
    fetch(`${googleSheetUrl}`)
        .then(responce => { return responce.json() })
        .then(data => {
            dataFromGoogleSheet = data.values;
            data.values.forEach(item => {
                if (item[0] == "Количество тяг" || countsTyag.includes(item[0])) {
                    return;
                }
                countsTyag.push(item[0]);
            });
            document.querySelector('.countTyagvNalichae').insertAdjacentHTML('beforeend', countsTyag);
        })
        .catch(error => {
            if (error.message.search('forEach') != -1) {
                document.querySelector('.countTyagvNalichae').insertAdjacentHTML('beforeend', 'Нет в наличии');
                document.querySelector('.countTyagvNalichae').style.color = 'red';
            }
        });
}

function loadTaste(value) {
    document.querySelector('.minPrice').innerHTML = null;
    document.querySelector('.countvNalichae').innerHTML = null;
    document.querySelector('.countvNalichae').style.color = 'blue';
    document.querySelector('.tastevNalichae').innerHTML = null;
    document.querySelector('.tastevNalichae').style.color = 'blue';
    taste = [];
    countTyag = value;

    try {
        if (countsTyag.includes(value)) {
            dataFromGoogleSheet.forEach(item => {
                if (item[0] == "Количество тяг") {
                    return;
                }
                if (item[0] == value) {
                    document.querySelector('.tastevNalichae').insertAdjacentHTML('beforeend', `<p>${item[1]}</p>`);
                    taste.push(item[1]);
                }
            })
        }
        else {
            throw new Error('Error with forEach');
        }
    } catch (error) {
        if (error.message.search('forEach') != -1) {
            document.querySelector('.tastevNalichae').insertAdjacentHTML('beforeend', 'Нет в наличии');
            document.querySelector('.tastevNalichae').style.color = 'red';
        }
        else {
            console.log(error);
        }
    }
}

function loadMinPriceAndCountvNalichae(value) {
    document.querySelector('.minPrice').innerHTML = null;
    document.querySelector('.countvNalichae').innerHTML = null;
    document.querySelector('.countvNalichae').style.color = 'blue';

    try {
        if (taste.includes(value)) {
            dataFromGoogleSheet.forEach(item => {
                if (item[0] == "Количество тяг") {
                    return;
                }
                if (item[0] == countTyag && item[1] == value) {
                    document.querySelector('.minPrice').insertAdjacentHTML('beforeend', item[2]);
                    document.querySelector('.countvNalichae').insertAdjacentHTML('beforeend', item[4]);
                    minPrice = item[2];
                    countvNalichae = item[4];
                }
            })   
        }
        else {
            throw new Error('Error with forEach');
        }
    } catch (error) {
        if (error.message.search('forEach') != -1) {
            document.querySelector('.countvNalichae').insertAdjacentHTML('beforeend', 'Нет в наличии');
            document.querySelector('.countvNalichae').style.color = 'red';
            countvNalichae = 0;
        }
        else {
            console.log(error);
        }
    }
}

async function sendData() {
    let formData = new FormData(form);
    let telegram;
    if (formData.get('client_telegram').search('https://t.me/') != -1) {
        telegram = '@' + formData.get('client_telegram').substring(13);
    }
    else if (formData.get('client_telegram')[0] == '@') {
        telegram = formData.get('client_telegram');
    }
    else {
        telegram = '@' + formData.get('client_telegram');
    }

    if (formData.get('seller_telegram').search('https://t.me/') != -1) {
        telegram = '@' + formData.get('seller_telegram').substring(13);
    }
    else if (formData.get('seller_telegram')[0] == '@') {
        telegram = formData.get('seller_telegram');
    }
    else {
        telegram = '@' + formData.get('seller_telegram');
    }

    if (formData.get('base') == 'Оболонский') {
        formData.append('chat_id', '-992953015');
    }
    else if (formData.get('base') == 'Шевченковский') {
        formData.append('chat_id', '-997941867');
    }
    else if (formData.get('base') == 'Деснянский') {
        formData.append('chat_id', '-997723737');
    }
    else if (formData.get('base') == 'Подольський') {
        formData.append('chat_id', '-896612065');
    }
    else if (formData.get('base') == 'Соломенский') {
        formData.append('chat_id', '-917333079');
    }
    else if (formData.get('base') == 'Печерский') {
        formData.append('chat_id', '-917219522');
    }
    else if (formData.get('base') == 'Голосеевский') {
        formData.append('chat_id', '-987321485');
    }
    else if (formData.get('base') == 'Святошинский') {
        formData.append('chat_id', '-847426514');
    }
    else if (formData.get('base') == 'Днипровський') {
        formData.append('chat_id', '-838702381');
    }
    else if (formData.get('base') == 'Дарницкий') {
        formData.append('chat_id', '-674723606');
    }

    if (formData.get('price') < minPrice || countvNalichae < 1) {
        alert('Цена меньше минимальной цены либо их нет в наличии. Не бойся, заявка все равно не отправится ;)');
        return;
    }

    formData.append('text', 'Имя покупателя: ' + formData.get('client_name') + '\n\nTelegram покупателя: ' + telegram + '\n\nИмя селлера: ' + formData.get('seller_name') + '\nnTelegram селлера: ' + formData.get('seller_telegram') + '\n\nКоличество тяг: ' + formData.get('countTyag') + '\n\nВкус: ' + formData.get('taste') + '\n\nЦена: ' + formData.get('price') + '\n\nДоставка: ' + formData.get('delivery') + '\n\nДополнительная информация: ' + formData.get('more_info') + '\n\nВыполнение заказа(❌ - заказ не выполнен; ✅ - заказ выполнен): ❌');

    let response = await fetch('https://api.telegram.org/bot6288829007:AAHRQkrWMHaY9YXuWtzs0302frTJPNMSxsA/sendMessage', {
        method: 'POST',
        body: formData
    });
}
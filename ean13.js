'use strict';

const EAN_COUNTRIES = [
    { code: '00', to: 13, coutry: 'EUA e Canadá' },
    { code: 20, to: 29,	term: 'Uso interno' },
    { code: 30, to: 37, term: 'França' },
    { code: 380, term: 'Bulgária' },
    { code: 383, term: 'Eslovénia' },
    { code: 385, term: 'Croácia' },
    { code: 387, term: 'Bósnia-Herzegowina' },
    { code: 400, to: 440, term: 'Alemanha' },
    { code: 45, and: 49, term:' Japão' },
    { code: 460, to: 469, term: 'Rússia' },
    { code: 471, term: 'Taiwan' },
    { code: 474, term: 'Estónia' },
    { code: 475, term: 'Letónia' },
    { code: 476, term: 'Aserbeidjan' },
    { code: 477, term: 'Lituânia' },
    { code: 478, term: 'Usbequistão' },
    { code: 479, term: 'Sri Lanka' },
    { code: 480, term: 'Filipinas' },
    { code: 481, term: 'Belorússia' },
    { code: 482, term: 'Ucrânia' },
    { code: 484, term: 'Moldávia' },
    { code: 485, term: 'Armênia' },
    { code: 486, term: 'Georgien' },
    { code: 487, term: 'Cazaquistão' },
    { code: 489, term: 'Hong Kong' },
    { code: 50, term: 'Grã-Bretanha' },
    { code: 520, term: 'Grécia' },
    { code: 528, term: 'Lebanons' },
    { code: 529, term: 'Chipre' },
    { code: 631, term: 'Macedónios' },
    { code: 535, term: 'Maltas' },
    { code: 539, term: 'Irlanda' },
    { code: 54, term: 'Bélgica e Luxemburgo' },
    { code: 560, term: 'Portugal' },
    { code: 569, term: 'Islândia' },
    { code: 57, term: 'Dinamarca' },
    { code: 590, term: 'Polónia' },
    { code: 594, term: 'Romênia' },
    { code: 599, term: 'Hungria' },
    { code: 600, to: 601, term: 'África do Sul' },
    { code: 608, term: 'Bahrein' },
    { code: 609, term: 'Maurícia' },
    { code: 611, term: 'Marrocos' },
    { code: 613, term: 'Argélia' },
    { code: 616, term: 'Quénia' },
    { code: 619, term: 'Tunísia' },
    { code: 621, term: 'Síria' },
    { code: 622, term: 'Egipto' },
    { code: 624, term: 'Lybien' },
    { code: 625, term: 'Jordânia' },
    { code: 626, term: 'Irão' },
    { code: 627, term: 'Kuwait' },
    { code: 628, term: 'Arábia Saudita' },
    { code: 629, term: 'Emirados Árabes Unidos' },
    { code: 64, term: 'Finlândia' },
    { code: 690, to: 695, term: 'China' },
    { code: 70 , term: 'Noruega' },
    { code: 729, term: 'Israels' },
    { code: 73, term: 'Suécia' },
    { code: 740, to: 745, term: 'América Central (Guatemala, El Salvador, Honduras, Nicarágua, Costa Rica, Panamá)' },
    { code: 746, term: 'República Dominicana' },
    { code: 750, term: 'México' },
    { code: 759, term: 'Venezuelas' },
    { code: 76, term: 'Suíça e Liechtenstein' },
    { code: 770, term: 'Colômbia' },
    { code: 773, term: 'Uruguai' },
    { code: 775, term: 'Peru' },
    { code: 777, term: 'Bolívia' },
    { code: 779, term: 'Argentina' },
    { code: 780, term: 'Chile' },
    { code: 784, term: 'Paraguai' },
    { code: 786, term: 'Equador' },
    { code: 789, to: 790, term: 'Brasil' },
    { code: 80, to: 83, term: 'Itália' },
    { code: 84, term: 'Espanha' },
    { code: 850, term: 'Cuba' },
    { code: 858, term: 'Eslováquia' },
    { code: 859, term: 'República Checa' },
    { code: 860, term: 'Jugoslávia' },
    { code: 867, term: 'Coréia do Norte' },
    { code: 869, term: 'Turquia' },
    { code: 87, term: 'Países Baixos' },
    { code: 880, term: 'Coreia do Sul' },
    { code: 885, term: 'Tailândia' },
    { code: 888, term: 'Singapura' },
    { code: 890, term: 'Índia' },
    { code: 893, term: 'Vietname' },
    { code: 899, term: 'Indonésia' },
    { code: 90, to: 91, term: 'Áustria' },
    { code: 93, term: 'Austrália' },
    { code: 94, term: 'Nova Zelândia' },
    { code: 955, term: 'Malásia' },
    { code: 958, term: 'Makao' },
    { code: 977, term: 'Revistas (ISSN)' },
    { code: 978, to: 979, term: 'Livros (ISBN)' },
    { code: 980, to: 99, term: 'Códigos de voucher' },
];

const getCountries = () => {

    const countries = [];

    EAN_COUNTRIES.forEach(item => {

        let country = {
            term: item.term,
            codes: [],
        };

        if (item.hasOwnProperty('to')) {
            for (let i = item.code; i < item.to; i++) {
                country.codes.push(i);
            }
        }
        if (item.hasOwnProperty('and')) {
            country.codes.push(item.and);
        }
        if (!country.codes.length) {
            country.codes.push(item.code);
        }
        countries.push(country);
    });
    return countries;
}

const calcEanDigit = ean => {

    if (ean.toString().length !== 12) {
        throw new Error('Parameter [ean] must be a number with 12 digits');
    } 

    let digits = ean.toString().split('').map(n => +n);
    let sum = 0;

    digits.forEach((d, i) => sum += i % 2 === 0 ? d : d * 3);

    let result = Math.floor(sum / 10) + 1;
    result *= 10;
    result -= sum;

    ean = result % 10 === 0 ? `${ean}0` : `${ean}${result}`;

    return ean;
}

const validateEan13 = barcode => {

    if (!/^[\d]{13}$/.test(barcode)) {
        throw new Error('EAN13 must have 13 digits');
    }

    let digits = barcode.toString().split('').map(n => +n);
    let result = 0;

    for (let i = 0; i < 12; i++) {
        result += ((i === 0) || (i % 2 === 0)) ? digits[i] : digits[i] * 3;
    }

    let secureDigit = Math.floor(result / 10) + 1;
    secureDigit *= 10;
    secureDigit -= result;

    return digits[12] === secureDigit;
}

const generateEAN13 = (country, company, productId) => {

    if (!/^[\d]{3}$/.test(country)) {
        throw new Error('Invalid [country] id');
    }
    if (!/^[\d]{4,5}$/.test(company)) {
        throw new Error('Invalid [company] id');
    }
    if (!/^[\d]{4,5}$/.test(productId)) {
        throw new Error('Invalid [productId] id');
    }
    if (company.length === 5 && productId.length === 5) {
        throw new Error('The [company] and [productId] cannot have the same size');
    }
    return calcEanDigit(`${country}${company}${productId}`);
}

module.exports = {
    EAN_COUNTRIES,
    getCountries,
    calcEanDigit,
    validateEan13,
    generateEAN13,
}

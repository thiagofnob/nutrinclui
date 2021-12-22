new Calendar({
    id: '#color-calendar',
        // // small or large
        // calendarSize: 'large',

        // // an array of layout modifiers
        // layoutModifiers: 'month-align-left',
        
        // // basic | glass
        // theme: 'glass',
    
        // // custom colors
        // primaryColor: '#1a237e',
        // headerColor: 'rgb(0, 102, 0)',
        // headerBackgroundColor: 'black',
        // weekdaysColor: 'based on theme',
    
        // // short | long-lower | long-upper
        // weekdayDisplayType: 'short',
    
        // // short | long
        // monthDisplayType: 'long',
    
        // // 0 (Sun)
        // startWeekday: 0,
    
        // // font family
        // fontFamilyHeader: 'based on theme',
        // fontFamilyWeekdays: 'based on theme',
        // fontFamilyBody: 'based on theme',
    
        // // shadow CSS
        // dropShadow: 'based on theme',
    
        // // border CSS
        // border: based on theme',
    
        // // border radius
        // borderRadius: '0.5rem',
    
        // // disable month year pickers
        // disableMonthYearPickers: false,
    
        // // disable click on dates
        // disableDayClick: false,
    
        // // disable the arrows to navigate between months
        // disableMonthArrowClick: false
})

let pessoa = new Object();
let dados = [];

function calcular() {

    let nome    = document.getElementById("nome").value.trim();
    let altura  = parseFloat(document.getElementById("altura").value);
    let peso    = parseFloat(document.getElementById("peso").value);

    if (validaForm(nome, altura, peso)) {
        
        let imc = calcularImc(altura, peso); //chama a função pra calcular imc
        let situacao = geraSituacao(imc); //chama a função pra calcular imc
        
        //gera o objeto pessoa com os dados devidamente preenchidos
        pessoa.nome = nome;
        pessoa.altura = altura;
        pessoa.peso = peso.toFixed(2);
        pessoa.imc = imc.toFixed(2);
        pessoa.situacao = situacao;

        //cadastra pessoa no array dados
        dados.push(pessoa);
        pessoa = {};//reseta objeto pesso para novo cadastro
        
        geraTemplate();// gera o template baseado na quandidade de pessoas cadastradas
        limparForm();
    } else {
        alert("Preencha todos os dados corretamente");
    }

}

function validaForm(nome, altura, peso) {

    if (nome == '' || altura <= 0 || peso <= 0) {
        return false;
    }
    return true;
}

function limparForm() {

    document.getElementById("nome").value = '';
    document.getElementById("altura").value = '';
    document.getElementById("peso").value = '';
}

function calcularImc(altura, peso) {

    let imc = peso / (altura * altura);
    return imc;
}
/*
    Resultado	        Situação
    Entre 18,5 e 24,99	Peso normal
    Entre 25 e 29,99	Acima do peso
    Entre 30 e 34,99	Obesidade I
    Entre 35 e 39,99	Obesidade II (severa)
 */
function geraSituacao(imc) {

    if (imc < 18.5) {
        return "Magreza Severa";
    } else if (imc >= 18.5 && imc <= 24.99) {
        return "Peso normal";
    } else if (imc >= 25 && imc <= 29.99) {
        return "Acima do peso";
    } else if (imc >= 30 && imc <= 34.99) {
        return "Obesidade I";
    } else if (imc >= 35 && imc <= 39.99) {
        return "Obesidade II (severa)";
    } else {
        return "Muito Obeso (cuidado)";
    }
}


/*
     <tr>
        <td>João</td>
        <td>167</td>
        <td>80</td>
        <td>30</td>
        <td>acima do peso</td>
    </tr>
*/
function geraTemplate() {

    let template = '';
    for (let i = 0; i < dados.length; i++) {
        template +=
            `<tr>
                <td>${dados[i].nome}</td>
                <td>${dados[i].altura}</td>
                <td>${dados[i].peso}</td>
                <td>${dados[i].imc}</td>
                <td>${dados[i].situacao}</td>
            </tr>`;
    }
    document.getElementById('cadastro').innerHTML = template;
}
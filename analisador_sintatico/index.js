// Importando o arquivo "codigo.js" com o código a ser testado.

const arq = new XMLHttpRequest();

arq.open('GET', './codigo.js', false);
arq.send();

// Jogando o valor do arquivo no input do formulário

document.querySelector('#code').innerHTML = arq.response;

// Função de não permitir refresh na página

function stopRefresh(){
   return false;
}

// Nossa função de análise léxica dividirá uma string em pedaços menores ( tokens ). 
// Em DBN, cada token é delimitado por espaços, e classificado como “palavra" ou "numero".

function analisadorLexico(code){
  	return code.split(/\s+/)
        .filter(function (t) { return t.length > 0 })
        .map(function (t) {
            return isNaN(t)
                ? {type: 'palavra', value: t}
                : {type: 'numero', value: t}
        })
}

// Função de montar todos os dados do Analisador e mostra-los na tabela

function analisar(){
  if(!document.querySelector('#code').innerHTML){
    alert('Não possui código para analisar');
    window.location.reload();
    return;
  }
  
  const tokens = analisadorLexico(document.querySelector('#code').innerHTML);

  const tbody = document.querySelector('tbody');

  for(let i = 0; i < tokens.length; i++){
      let tds = '';

      tds += `<td>${i}</td>`;

      if(tokens[i].value.indexOf('{') != -1)
         tds += '<td>Início de elemento</td>';
      else if(tokens[i].value.indexOf('}') != -1)
         tds += '<td>Fim de elemento</td>';
      else if(tokens[i].value.indexOf('function') != -1)
         tds += '<td>Função</td>';
      else if(tokens[i].value.indexOf('return') != -1)
         tds += '<td>Retorno da função</td>';
      else if(tokens[i].value.indexOf('if') != -1 || tokens[i].value.indexOf('else') != -1)
         tds += '<td>Condicional</td>';
      else if(tokens[i].value.indexOf('for') != -1  || tokens[i].value.indexOf('while') != -1)
         tds += '<td>Repetição</td>';
      else if(tokens[i].value.indexOf('let ') != -1  || tokens[i].value.indexOf('const ') != -1  || tokens[i].value.indexOf('var ') != -1)
         tds += '<td>Declaração variável</td>';
      else if(tokens[i].value.indexOf('class') != -1)
         tds += '<td>Classe</td>';
      else if(tokens[i].value.indexOf('constructor') != -1)
         tds += '<td>Construtor</td>';
      else if(tokens[i].value.indexOf('null') != -1)
         tds += '<td>Valor nulo</td>';
      else if(tokens[i].value.indexOf('==') != -1  || tokens[i].value.indexOf('===') != -1  || tokens[i].value.indexOf('!=') != -1  || tokens[i].value.indexOf('!==') != -1)
         tds += '<td>Igualdade</td>';
      else if(tokens[i].value.indexOf('=') != -1)
         tds += '<td>Atribuição</td>';
      else if(tokens[i].value.indexOf('>') != -1 || tokens[i].value.indexOf('<') != -1 || tokens[i].value.indexOf('+') != -1 || tokens[i].value.indexOf('-') != -1 || tokens[i].value.indexOf('*') != -1 || tokens[i].value.indexOf('/') != -1 || tokens[i].value.indexOf('%') != -1 || tokens[i].value.indexOf('^') != -1 || tokens[i].value.indexOf('>=') != -1 || tokens[i].value.indexOf('<=') != -1)
         tds += '<td>Operação</td>';
      else if(tokens[i].value.indexOf('new') != -1)
         tds += '<td>Nova instância</td>';
      else if(tokens[i].value.indexOf(';') != -1)
         tds += '<td>Fim da linha</td>';
      else
        tds += '<td>Elemento</td>';

      tds += `<td>${tokens[i].type}</td>`;
      tds += `<td>${tokens[i].value}</td>`;

      const tr = document.createElement('tr');
      tr.innerHTML += tds;

      tbody.appendChild(tr);
  }
}

// Função de limpar o input

function limpar(){
    document.querySelector('#code').innerHTML = '';
}
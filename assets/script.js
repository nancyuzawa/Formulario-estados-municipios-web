//Verificação dos dados preenchidos
document.getElementById("btnCadastrar").addEventListener("click", function(event){
    event.preventDefault();
    let nome = document.getElementById("nome").value;
    let estado = document.getElementById("estado").value;
    let data = document.getElementById("data").value;
    let cidade = document.getElementById("cidade").value;
    let bairro = document.getElementById("bairro").value;
    let endereco = document.getElementById("endereco").value;
    
    if (nome === "" || estado === 'estado' || data === "" || cidade === 'cidade' || endereco === "" || bairro === ""){
        window.alert("Preencha todos os campos!");
    }
    else{

        window.alert("Cadastrado com sucesso!");
        document.getElementById("meuFormulario").submit();  // Envia o formulário
    }
});


// Função para carregar o documento JSON
function loadDoc() {
    // Cria um novo objeto XMLHttpRequest para realizar a requisição HTTP
    const xmlHttp = new XMLHttpRequest();

    // Define o que deve acontecer quando a requisição for completada
    xmlHttp.onload = function() {
        // Converte a resposta JSON (texto) em um objeto JavaScript
        const myObj = JSON.parse(this.responseText);

        // Organiza em ordem alfabética
        let nomeEstados = myObj.sort((a,b) => a.nome.localeCompare(b.nome));

        // Adiciona os estados no HTML como OPTION do select
        for (let i = 0; i < nomeEstados.length; i++){
                let novaOpcaoEstado = document.createElement("option");
            novaOpcaoEstado.textContent = nomeEstados[i]['nome'];
                document.getElementById("estado").appendChild(novaOpcaoEstado);
        }
    }

    // Abre uma nova requisição do tipo GET para o arquivo cd_catalog.json
    xmlHttp.open("GET", "https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    
    // Envia a requisição
    xmlHttp.send();
}

//Captura o estado selecionado
document.getElementById("estado").addEventListener("change", function(){
    const valorEstado = document.getElementById("estado").value;
    const xmlHttpEstado = new XMLHttpRequest();
    
    // Define o que deve acontecer quando a requisição for completada
    xmlHttpEstado.onload = function() {
        // Converte a resposta JSON (texto) em um objeto JavaScript
        const myObj1 = JSON.parse(this.responseText);

        let siglaEstado;

        // Procura a sigla do estado selecionado
        for (let i = 0; i < myObj1.length; i++){
            if (valorEstado == myObj1[i]['nome']){
                siglaEstado = myObj1[i]['sigla']
            }
        }

        //Nova requisição http para cidade selecionada
        const xmlHttpCidade = new XMLHttpRequest();
        xmlHttpCidade.onload = function(){
            const myObj2 = JSON.parse(this.responseText);

            //Organiza a cidade em ordem alfabética
            let nomeCidades = myObj2.sort((a,b) => a.nome.localeCompare(b.nome));

            document.getElementById("cidade").innerHTML = ''; //Limpa a lista quando é selecionado outro estado

            //Só para ficar bonitinho, deixa o primeiro elemento da cidade como "Cidade"
            let primeiraOpcao = document.createElement("option");
            primeiraOpcao.textContent = "Selecione a cidade";
            document.getElementById("cidade").appendChild(primeiraOpcao);

            //Adiciona a lista de cidades do estado correspondente
            for (let i = 0; i < nomeCidades.length; i++){
                let novaOpcaoCidade = document.createElement("option");
                novaOpcaoCidade.textContent = nomeCidades[i]['nome'];
                document.getElementById("cidade").appendChild(novaOpcaoCidade);
            }
        }
        xmlHttpCidade.open("GET", `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`);
        
        // Envia a requisição
        xmlHttpCidade.send();
    }

    // Abre uma nova requisição do tipo GET para o arquivo cd_catalog.json
    xmlHttpEstado.open("GET", "https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    
    // Envia a requisição
    xmlHttpEstado.send();
});




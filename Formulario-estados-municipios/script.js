document.getElementById("btnCadastrar").addEventListener("click", function(event){
    event.preventDefault();
    let nome = document.getElementById("nome").value;
    let estado = document.getElementById("estado").value;
    let data = document.getElementById("data").value;
    let cidade = document.getElementById("cidade").value;
    let bairro = document.getElementById("bairro").value;
    let endereco = document.getElementById("endereco").value;
    console.log(estado)
    
    if (nome === "" || estado === 'estado' || data === '0000-00-00' || cidade === 'cidade' || endereco === "" || bairro === ""){
        
        window.alert("Preencha todos os campos");
        // document.getElementById("btnCadastrar")
    }
    else{

        window.alert("Cadastrado com sucesso!");
        // Caso a validação passe, envie o formulário
        document.getElementById("meuFormulario").submit();  // Envia o formulário
    }

});


// Importar as funções que você precisa do SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCE9sNCPmSvmr5saNkaR9Tib96fV9_ShG4",
  authDomain: "avaliacaodetrabalhoscict.firebaseapp.com",
  databaseURL: "https://avaliacaodetrabalhoscict-default-rtdb.firebaseio.com",
  projectId: "avaliacaodetrabalhoscict",
  storageBucket: "avaliacaodetrabalhoscict.appspot.com",
  messagingSenderId: "226756707643",
  appId: "1:226756707643:web:de48139b1121033c55a31e",
  measurementId: "G-QRTHNWW3CQ"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para atualizar a descrição do trabalho com base na seleção
function atualizarDescricao() {
  const select = document.getElementById("autorname");
  const selectedValue = select.value;
  const descricao = descricoes[selectedValue];

  const cardDescricao = document.getElementById("cardDescricao");
  cardDescricao.innerHTML = `
    <h2>Detalhes do Trabalho</h2>
    <p><strong>Título:</strong> ${descricao.titulo}</p>
    <p><strong>Autores:</strong> ${descricao.autores}</p>
    <p><strong>Curso:</strong> ${descricao.curso}</p>
  `;
}

// Função para calcular a nota com base nos pesos
function calcularNota() {
  const ausente = document.getElementById("ausente").checked;
  const nota1 = parseFloat(document.getElementById("nota1").value) || 0;
  const nota2 = parseFloat(document.getElementById("nota2").value) || 0;
  const nota3 = parseFloat(document.getElementById("nota3").value) || 0;

  let notaFinal = 0;
  if (ausente) {
    notaFinal = 0;
  } else {
    notaFinal = (nota1 * 4 + nota2 * 3 + nota3 * 3) / 10; // Pesos: 4, 3, 3
  }

  document.getElementById("modalTrabalho").innerText = `Nota calculada: ${notaFinal.toFixed(2)}`;
  document.getElementById("loginModal").style.display = 'block';
}

// Função para validar a avaliação
function validarAvaliacao() {
  const senha = document.getElementById("modalSenha").value;
  const comentario = document.getElementById("comentarios").value;
  const select = document.getElementById("autorname");
  const selectedValue = select.value;

  // Validar senha (exemplo, você deve substituir pela sua lógica)
  if (senha === "suaSenhaSecreta") {
    // Salvar a avaliação no Firebase
    const referencia = ref(database, 'avaliacoes/' + selectedValue);
    const dados = {
      nota: parseFloat(document.getElementById("modalTrabalho").innerText.split(': ')[1]),
      comentario: comentario,
      ausente: document.getElementById("ausente").checked,
    };

    set(referencia, dados)
      .then(() => {
        alert('Avaliação enviada com sucesso!');
        // Remover o autor do dropdown
        removeAuthor(selectedValue);
        // Fechar o modal
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao enviar a avaliação: ", error);
      });
  } else {
    alert('Senha incorreta. Tente novamente.');
  }
}

// Função para fechar o modal
function fecharModal() {
  document.getElementById("loginModal").style.display = 'none';
}

// Função para remover autor do dropdown
function removeAuthor(autor) {
  const select = document.getElementById("autorname");
  for (let option of select.options) {
    if (option.value === autor) {
      select.remove(option.index);
      break;
    }
  }
}

// Função para carregar autores do Firebase
function carregarAutores() {
  const autoresRef = ref(database, 'avaliacoes');
  get(autoresRef).then((snapshot) => {
    if (snapshot.exists()) {
      const autores = snapshot.val();
      const select = document.getElementById("autorname");
      for (let autor in autores) {
        const option = document.createElement("option");
        option.value = autor;
        option.text = autores[autor].autores; // Supondo que você tenha o nome dos autores aqui
        select.add(option);
      }
    }
  }).catch((error) => {
    console.error("Erro ao carregar autores: ", error);
  });
}

// Chamar a função para carregar autores ao iniciar
window.onload = carregarAutores;

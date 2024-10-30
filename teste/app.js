
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update } from "firebase/database";


const firebaseConfig = {

};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


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


function calcularNota() {
  const ausente = document.getElementById("ausente").checked;
  const nota1 = parseFloat(document.getElementById("nota1").value) || 0;
  const nota2 = parseFloat(document.getElementById("nota2").value) || 0;
  const nota3 = parseFloat(document.getElementById("nota3").value) || 0;

  let notaFinal = 0;
  if (ausente) {
    notaFinal = 0;
  } else {
    notaFinal = (nota1 * 4 + nota2 * 3 + nota3 * 3) / 10; 
  }

  document.getElementById("modalTrabalho").innerText = `Nota calculada: ${notaFinal.toFixed(2)}`;
  document.getElementById("loginModal").style.display = 'block';
}

function validarAvaliacao() {
  const senha = document.getElementById("modalSenha").value;
  const comentario = document.getElementById("comentarios").value;
  const select = document.getElementById("autorname");
  const selectedValue = select.value;

  if (senha === "suaSenhaSecreta") {

    const referencia = ref(database, 'avaliacoes/' + selectedValue);
    const dados = {
      nota: parseFloat(document.getElementById("modalTrabalho").innerText.split(': ')[1]),
      comentario: comentario,
      ausente: document.getElementById("ausente").checked,
    };

    set(referencia, dados)
      .then(() => {
        alert('Avaliação enviada com sucesso!');

        removeAuthor(selectedValue);
    
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao enviar a avaliação: ", error);
      });
  } else {
    alert('Senha incorreta. Tente novamente.');
  }
}


function fecharModal() {
  document.getElementById("loginModal").style.display = 'none';
}

function removeAuthor(autor) {
  const select = document.getElementById("autorname");
  for (let option of select.options) {
    if (option.value === autor) {
      select.remove(option.index);
      break;
    }
  }
}


function carregarAutores() {
  const autoresRef = ref(database, 'avaliacoes');
  get(autoresRef).then((snapshot) => {
    if (snapshot.exists()) {
      const autores = snapshot.val();
      const select = document.getElementById("autorname");
      for (let autor in autores) {
        const option = document.createElement("option");
        option.value = autor;
        option.text = autores[autor].autores; 
        select.add(option);
      }
    }
  }).catch((error) => {
    console.error("Erro ao carregar autores: ", error);
  });
}

window.onload = carregarAutores;

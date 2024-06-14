const empresa = document.getElementById('empresa');
const texto = document.getElementById('empresaD');

fetch('../api/conteudo')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar os dados');
    }
    return response.json();
  })
  .then(conteudo => {
    empresa.innerHTML = conteudo.empresa || "Dados não encontrados";
  })
  .catch(error => {
    console.error('Erro:', error);
  });
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }


//Json-server
const jsonServer = require('json-server')
const { get } = require('lodash')
const server = jsonServer.create()
const router = jsonServer.router('./scripts/db.json')

// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server está em execução!')
})
const texto = document.getElementById('empresaD');
const empresa = document.getElementById('empresa');
fetch ('https://localhost:3000/conteudo')
.then(response => response.json())
.then(data => {
  texto.innerHTML = data.empresa
})
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
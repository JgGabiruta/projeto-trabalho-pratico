const carouselApi = 'https://back-end-diw-ruby.vercel.app/conteudo';
const colegasApi = 'https://back-end-diw-ruby.vercel.app/colegas';
const redes = 'https://back-end-diw-ruby.vercel.app/redes-sociais';
// Puxando dados do json-server e colocando nos carousel's
document.addEventListener('DOMContentLoaded', function() {
  fetch(carouselApi)
      .then(response => response.json())
      .then(data => {
          let indicators = '';
          let innerItems = '';

          data.forEach((item, index) => {
              let activeClass = index === 0 ? 'active' : '';
              indicators += `
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${activeClass}" aria-current="true" aria-label="Slide ${index + 1}"></button>
              `;
              innerItems += `
                  <div class="carousel-item ${activeClass}">
                      <img src="${item.imagem}" class="d-block w-100" alt="${item.nome}">
                      <div class="carousel-caption d-none d-md-block">
                      <h5>${item.nome}</h5>
                      <p>${item.descricao}</p>
                      </div>
                  </div>
              `;
          });

          document.getElementById('carousel-indicators').innerHTML = indicators;
          document.getElementById('carousel-inner').innerHTML = innerItems;
      })
      .catch(error => console.error('Erro ao buscar os dados do JSON Server:', error));
});
// Puxando dados do json-server e preenchendo os colegas
document.addEventListener('DOMContentLoaded', function() {
  fetch(colegasApi)
      .then(response => response.json())
      .then(data => {
          let colegasContainer = document.querySelector('.row.col')
          let colegas = '';

          data.forEach(colega => {
              colegas += `
                  <div id="colegas" style="width: 10rem;">
                        <img src="${colega.foto}" class="card-img-top" alt="${colega.nome}">
                        <div class="card-body">
                            <h5 class="card-title text-primary">${colega.nome}</h5>
                        </div>
                    </div>
              `;
          });

          colegasContainer.innerHTML = colegas;
      })
      .catch(error => console.error('Erro ao buscar os dados do JSON Server:', error));
});
//Puxando dados do json para preencher os links das redes sociais
 function getRedesSociais(){
  fetch(redes)
  .then(async res =>{
    throw new Error(res.status);

  })
 }
 function toggleDarkMode() {
   document.body.classList.toggle('dark-mode');
 }


  //Github API
  document.addEventListener('DOMContentLoaded', function() {
    // Fetch GitHub user data
    fetch('https://api.github.com/users/JgGabiruta')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            let githubData = await res.json();
            return githubData;
        })
        .then(githubData => {
            // Fetch social links JSON Server
            fetch(redes)
                .then(async res => {
                    if (!res.ok) {
                        throw new Error(res.status);
                    }
                    let socialData = await res.json();
                    displayUserData(githubData, socialData);
                })
                .catch(error => console.error('Erro ao buscar os dados das redes sociais do JSON Server:', error));
        })
        .catch(error => console.error('Erro ao buscar os dados do GitHub:', error));
});

function displayUserData(githubData, socialData) {
    const user = document.querySelector('.perfil');

    let userdata = document.createElement('div');
    userdata.innerHTML = `
        <h4 id="perfil">Perfil</h4>
        <img id="eu" src="${githubData.avatar_url}" alt="...">
        <h5 class="text-primary">${githubData.name}</h5>
        <p class="m-2">Bio: ${githubData.bio}</p>
        <p class="m-2">Neste site você vai encontrar meus repositorios, empresas big tech que achei interessante e que tenho vontade de trabalhar um dia e o meu projeto que tenho com meus colegas.</p>
        <p class="m-2">Localização: ${githubData.location}</p>
        <p class="">Site: <a href="${githubData.html_url}" target="_blank">${githubData.html_url}</a></p>
        <div class="redes">
            <div class="grow-container">
                <i class="fa-solid fa-user mt-4"> ${githubData.followers}</i>
                <!-- INSTAGRAM -->
                <a href="${socialData.instagram}" target="_blank" class="to-red circle-button">
                    <i class="fa-brands fa-instagram mt-4" aria-hidden="true"></i>
                </a>
                <!-- LINKEDIN -->
                <a href="${socialData.linkedin}" class="to-insta circle-button" target="_blank">
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                </a>
                <!-- GITHUB -->
                <a href="${socialData.github}" target="_blank" class="to-git circle-button">
                    <i class="fa fa-github" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    `;

    user.appendChild(userdata);
}

  // Dados dos repositórios
  const reposit = document.querySelector('.repositorios'); // Certifique-se de que existe um elemento com a classe "repositorios" no seu HTML

  // Dados dos repositórios
  function getApiGithubRepos() {
    fetch('https://api.github.com/users/JgGabiruta/repos')
      .then(async res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        let data = await res.json();

        // Cria o contador de repositórios
        let repoCount = document.createElement('div');
        repoCount.innerHTML = `<div id="repo"><h4>Repositório(s) (${data.length})</h4></div>`;
        reposit.appendChild(repoCount);

        // Cria a estrutura das divs container-fluid e row
        const container = document.createElement('div');
        container.classList.add('container-fluid');

        const row = document.createElement('div');
        row.classList.add('row');

        // Adiciona os repositórios à div row
        data.forEach(item => {
          let repo = document.createElement('div');
          repo.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'mb-4'); // Adiciona classes para garantir que os cards estejam alinhados corretamente e responsivos
          repo.innerHTML = `
            <div class="card" style="width: 100%;">
              <div class="card-body">
                <h5 class="card-title"><a href="repo.html?repo=${item.name}" class="text-decoration-none text-reset">${item.name}</a></h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${item.description || 'Sem descrição'}</h6>
                <p class="card-text">${item.language || 'Linguagem não especificada'}</p>
                <p class="contadorescards">
                  <i class="fa-regular fa-star p-1"> ${item.stargazers_count}</i>
                  <i class="fa-solid fa-code-fork p-1"> ${item.forks_count}</i> 
                  <i class="fa-regular fa-eye p-1"> ${item.watchers_count}</i>
                </p>
              </div>
            </div>
          `;
          row.appendChild(repo);
        });

        // Adiciona a div row à div container-fluid
        container.appendChild(row);

        // Adiciona a div container-fluid ao contêiner principal
        reposit.appendChild(container);
      })
      .catch(error => console.error('Erro ao buscar dados da API:', error));
  }
  getApiGithubRepos();

  document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const repoName = params.get('repo');
  
    if (repoName) {
        fetch(`https://api.github.com/repos/JgGabiruta/${repoName}`)
            .then(response => response.json())
            .then(repo => {
                const repoContent = document.getElementById('repo-content');
                const info = document.getElementById('info');
  
                // Generando botões de tópicos
                const topicsButtons = repo.topics.map(topic => `
                    <button type="button" class="btn btn-primary m-1">${topic}</button>
                `).join('');
  
                repoContent.innerHTML = `
                <h5 id="projetow">Repositório: ${repo.name} </h5>
                <h6 class="text-primary">Descrição</h6>
                  <p>${repo.description}</p>
                  <h6 class="text-primary">Data de Criação</h6>
                  <p>${repo.created_at}</p>
                  <h6 class="text-primary">Linguagem</h6>
                  <p>${repo.language}</p>
                  <h6 class="text-primary">Link de Acesso</h6>
                  <a href="${repo.html_url}" target="_blank" class="text-decoration-none">https://github.com/JgGabiruta/${repo.name}</a>
                  <h6 class="text-primary">Tópicos</h6>
                  <div>${topicsButtons}</div>
                  `;
  
                info.innerHTML = `<li><i class="fa-regular fa-star">${repo.stargazers_count}</i></li>
                      <li><i class="fa-solid fa-code-fork"></i>${repo.forks_count}</li>
                      <li><i class="fa-regular fa-eye"></i>${repo.watchers_count}</li>`
            })
            .catch(error => console.error('Erro ao buscar detalhes do repositório', error));
          }
        });
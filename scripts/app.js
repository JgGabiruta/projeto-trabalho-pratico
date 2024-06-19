const urlapi = 'http://localhost:3000/conteudo';
// Puxando dados do json-server e colocando nos carousel's
document.addEventListener('DOMContentLoaded', function() {
  fetch(urlapi)
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


  
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }


  //Github API
  const container = document.querySelector('.container-fluid');
  const user = document.querySelector('.perfil');
  // Dados do usuário
  function getApiGithubUser(){
    fetch('https://api.github.com/users/JgGabiruta')
      .then(async res => {
        if( !res.ok){
          throw new Error(res.status);
        }

      let data = await res.json();
      usuarios(data);
      function usuarios (){
        
        let userdata = document.createElement('div');
        userdata.innerHTML = `
        <h4 id="perfil">Perfil</h4>
            <img id="eu" src="${data.avatar_url}" alt="...">
            <h5 class="text-primary">${data.name}</h5>
            <p class="m-2">Bio: ${data.bio}</p>
            <p class="m-2">Neste site você vai encontrar meus repositorios, empresas big tech que achei interessante e que tenho vontade de trabalhar um dia e o meu projeto que tenho com meus colegas.</p>
            <p class="m-2">Localização: ${data.location}</p>
            <p class="">Site: ${data.html_url}</p>
            <div class="redes ">
                
              <div class="grow-container">
                  <i class="fa-solid fa-user mt-4">${data.followers}</i>
                <!--INSTAGRAM-->
                <a href="https://www.instagram.com/joao_gabrielgabiruta/" target="_blank" class="to-red circle-button"><i class="fa-brands fa-instagram mt-4" aria-hidden="true"></i></a>
                  <!--Linkedin-->
                <a href="https://www.linkedin.com/in/jo%C3%A3o-gabriel-soares-da-silva-franco-681223201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" class="to-insta circle-button" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a> 
                <!--GITHUB-->
                <a href="https://github.com/JgGabiruta" target="_blank" class="to-git circle-button"><i class="fa fa-github" aria-hidden="true"></i></a>
              </div>
            </div>
            `



        user.appendChild(userdata)
     
      }
    })

   
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
        repoCount.innerHTML = `<div id="repo"><h4>Repositórios (${data.length}):</h4></div>`;
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
                <h5 class="card-title"><a href="${item.html_url}" class="text-decoration-none text-reset">${item.name}</a></h5>
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
  getApiGithubUser();


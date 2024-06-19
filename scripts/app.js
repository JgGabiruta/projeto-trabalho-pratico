/*const empresa = document.getElementById('empresa');
const texto = document.getElementById('empresaD');

/*fetch('../api/conteudo')
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
  
  */
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
  //Github
  const reposit = document.querySelector('.repositorios');
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
        let repositorios = document.createElement('div');
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


        repositorios.innerHTML = `
         <h4 id="repo">Repositórios (${ data.public_repos})</h4>
                `
        user.appendChild(userdata)
        reposit.appendChild(repositorios);
      }
    })

   
  }
  //Dados dos repositórios
  function getApiGithubRepos(){
    fetch('https://api.github.com/users/JgGabiruta/repos')
    .then(async res =>{
      if( !res.ok){
        throw new Error(res.status);
      }
      let data = await res.json();
      data.map( item =>{
        let repo = document.createElement('div');
        repo.innerHTML = `

                        <div class="card col-2 m-2" style="width: 18rem;">
                            <div class="card-body">
                              <h5 class="card-title"><a href="repo.html" class="text-decoration-none text-reset">ProjetoWeb1</a></h5>
                              <h6 class="card-subtitle mb-2 text-body-secondary">Apenas um teste de commits</h6>
                              <p class="card-text">Alguns testes que fiz de commits com<a href="repo.html">...</a></p>
                              <p><i class="fa-regular fa-star p-1"> 0</i>
                                <i class="fa-solid fa-code-fork p-1"> 0</i> 
                                <i class="fa-regular fa-eye p-1"> 0</i></p>
                            </div>
                        </div>
                `
                reposit.appendChild(repo);
      })
    })
  }
  getApiGithubRepos();
  getApiGithubUser();


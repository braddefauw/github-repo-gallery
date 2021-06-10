const overview = document.querySelector(".overview");
const username = "braddefauw";
const repoList = document.querySelector(".repo-list");


const getProfile = async function(){
    const response = await fetch(`https://api.github.com/users/${username}`);
    const profile = await response.json();
    console.log(profile);
    displayUserInfo(profile);
}

getProfile();

const displayUserInfo = function(profile){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
            <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div>`;
    overview.append(div);
};

const fetchRepos = async function(){
    const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoResponse = await repos.json();
    displayRepoInfo(repoResponse);
};

fetchRepos();

const displayRepoInfo = function(repos){
    for(const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};
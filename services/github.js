import store from '../utils/store.js'

const OWWW = {
    title: "OK, What Went Wrong?",
    repoLink: "http://okwhatwentwrong.com",
    webLink: "http://okwhatwentwrong.com",
    description: "A family podcast for tinkering, home labs, and learning something every day"
}

async function run() {
  try {
    const repos = [OWWW]

    const personalRes = await fetch('https://api.github.com/users/michaelseanbecker/repos?sort=pushed&per_page=50');
    const personalBody = await personalRes.json();

    personalBody.forEach(repo => {
        if (repo.topics.includes('now'))
        {
            repos.push({
                title: repo.name,
                repoLink: repo.html_url,
                webLink: repo.homepage,
                description: repo.description
            })
        }
    });

    const msbfyiRes = await fetch('https://api.github.com/users/msbfyi/repos?sort=pushed&per_page=50');
    const msbfyiBody = await msbfyiRes.json();

    msbfyiBody.forEach(repo => {
        if (repo.topics.includes('now'))
        {
            repos.push({
                title: repo.name,
                repoLink: repo.html_url,
                webLink: repo.homepage,
                description: repo.description
            })
        }
    });

    const ghentRes = await fetch('https://api.github.com/users/ghentnet/repos?sort=pushed&per_page=50');
    const ghentBody = await ghentRes.json();

    ghentBody.forEach(repo => {
        if (repo.topics.includes('now'))
        {
            repos.push({
                title: repo.name,
                repoLink: repo.html_url,
                webLink: repo.homepage,
                description: repo.description
            })
        }
    });

    store.set('making', repos)
  } catch (error) {
    console.log(error);
  }
}

run();

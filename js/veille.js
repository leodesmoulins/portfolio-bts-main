document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.getElementById('articles-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let allArticles = [];

    function createArticleCard(article) {
        const card = document.createElement('a');
        card.className = 'card';
        card.href = article.url; // Make the whole card a link
        card.target = '_blank'; // Open in a new tab
        card.innerHTML = `
            <img src="${article.image || 'default-image.jpg'}" alt="${article.title}" />
            <div class="card__body">
                <h2 class="card__title">${article.title}</h2>
                <p class="card__description">${article.description || 'Pas de description disponible.'}</p>
                <span class="card__source">${article.source}</span>
            </div>
        `;
        return card;
    }

    function fetchDevToArticles() {
        return fetch('https://dev.to/api/articles?tag=javascript') // Exemple : mise à jour du tag
            .then(response => response.json())
            .then(data => data.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                source: 'dev.to'
            })));
    }

    function fetchMediumArticles() {
        return fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/vuejs') // Exemple : flux RSS Medium
            .then(response => response.json())
            .then(data => data.items.map(article => ({
                title: article.title,
                description: article.description,
                url: article.link,
                source: 'Medium'
            })));
    }

    function fetchCssTricksArticles() {
        return fetch('https://api.rss2json.com/v1/api.json?rss_url=https://css-tricks.com/feed/') // Exemple : flux RSS CSS-Tricks
            .then(response => response.json())
            .then(data => data.items.map(article => ({
                title: article.title,
                description: article.description,
                url: article.link,
                source: 'CSS-Tricks'
            })));
    }

    function fetchVueBlogArticles() {
        return Promise.resolve([
            {
                title: "Nouveautés de Vue 3.3",
                description: "Découvrez les dernières fonctionnalités de Vue 3.3",
                url: "https://blog.vuejs.org/vue-3-3",
                source: "Vue Blog"
            }
        ]);
    }

    function displayArticles(articles) {
        articlesContainer.innerHTML = '';
        articles.forEach(article => {
            articlesContainer.appendChild(createArticleCard(article));
        });
    }

    function filterArticles(source) {
        if (source === 'all') {
            displayArticles(allArticles);
        } else {
            const filteredArticles = allArticles.filter(article => article.source === source);
            displayArticles(filteredArticles);
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterArticles(this.dataset.source);
        });
    });

    window.refreshArticles = function refreshArticles() {
        Promise.all([
            fetchDevToArticles(),
            fetchMediumArticles(),
            fetchCssTricksArticles(),
            fetchVueBlogArticles()
        ])
        .then(results => {
            allArticles = results.flat(); // Met à jour la liste des articles
            displayArticles(allArticles); // Réaffiche les articles
        })
        .catch(error => console.error('Erreur lors de la mise à jour des articles:', error));
    };

    // Charger les articles au démarrage
    refreshArticles();
});
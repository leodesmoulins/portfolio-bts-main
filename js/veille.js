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
            <div class="card__body">
                <h2 class="card__title">${article.title}</h2>
                <p class="card__description">${article.description || 'Pas de description disponible.'}</p>
                <span class="card__source">${article.source}</span>
            </div>
        `;
        return card;
    }

    function fetchDevToArticles() {
        return fetch('https://dev.to/api/articles?tag=vuejs')
            .then(response => response.json())
            .then(data => data.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                source: 'dev.to'
            })));
    }

    function fetchMediumArticles() {
        return Promise.resolve([
            {
                title: "Vue.js en 2024",
                description: "Les dernières nouveautés de Vue.js",
                url: "https://medium.com/article-vuejs-2024",
                source: "Medium"
            },
            {
                title: "Débuter avec Vue 3",
                description: "Guide complet pour les débutants",
                url: "https://medium.com/article-vue3-debutants",
                source: "Medium"
            }
        ]);
    }

    function fetchCssTricksArticles() {
        return Promise.resolve([
            {
                title: "Vue.js et CSS : Meilleures pratiques",
                description: "Comment optimiser votre CSS avec Vue.js",
                url: "https://css-tricks.com/vuejs-css-best-practices",
                source: "CSS-Tricks"
            }
        ]);
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

   Promise.all([
       fetchDevToArticles(),
       fetchMediumArticles(),
       fetchCssTricksArticles(),
       fetchVueBlogArticles()
   ])
   .then(results => {
       allArticles = results.flat();
       displayArticles(allArticles);
   })
   .catch(error => console.error('Erreur lors de la récupération des articles:', error));
});
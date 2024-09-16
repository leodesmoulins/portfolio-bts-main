document.addEventListener("DOMContentLoaded", function () {
    // Fonction pour charger le contenu d'un fichier HTML dans un élément
    function loadHTML(id, url) {
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de chargement : ' + response.status);
          }
          return response.text();
        })
        .then(data => {
          document.getElementById(id).innerHTML = data;
          return; // Pour chaîner avec les autres promesses
        })
        .catch(error => console.error('Erreur lors du chargement du fichier HTML:', error));
    }
  
    // Charger la navbar et le footer
    Promise.all([
      loadHTML('navbar-container', '../html/navbar.html'),
      loadHTML('footer-container', '../html/footer.html')
    ]).then(() => {
      const hamburger = document.querySelector(".hamburger");
      const navBar = document.querySelector(".nav-bar");
  
      // Assurez-vous que les éléments sont trouvés
      if (hamburger && navBar) {
        hamburger.addEventListener("click", function () {
          hamburger.classList.toggle("active");
          navBar.classList.toggle("active");
        });
  
        document.querySelectorAll(".nav-link").forEach(link => {
          link.addEventListener("click", function () {
            hamburger.classList.remove("active");
            navBar.classList.remove("active");
          });
        });
      } else {
        console.error('Les éléments de la navbar n\'ont pas été trouvés.');
      }
  
      const darkModeStorageKey = 'darkModeEnabled';
      const toggleButton = document.getElementById('dark-mode-toggle');
      const body = document.body;
      const darkModeIcon = document.getElementById('dark-mode-icon');
  
      if (toggleButton && darkModeIcon) {
        const updateIcon = () => {
          if (localStorage.getItem(darkModeStorageKey) === 'true') {
            darkModeIcon.src = '../image/lune.png';
          } else {
            darkModeIcon.src = '../image/soleil.png';
          }
        };
  
        toggleButton.addEventListener('click', () => {
          const isEnabled = localStorage.getItem(darkModeStorageKey) === 'true';
          const newState = !isEnabled;
          localStorage.setItem(darkModeStorageKey, newState.toString());
          body.classList.toggle('dark-mode');
          updateIcon();
        });
  
        updateIcon();
  
        // Initialiser l'état du thème sombre lors du chargement de la page
        const isEnabled = localStorage.getItem(darkModeStorageKey) === 'true';
        body.classList.toggle('dark-mode', isEnabled);
        updateIcon();
      } else {
        console.error('Les éléments du mode sombre n\'ont pas été trouvés.');
      }
    });

    
  });
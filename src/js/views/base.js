// Objeto contendo elementos de busca (query selectors). 
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
};

export const elementStrings = {
    loader: 'loader',
};

// Renderiza a animação de carregamento.
export const renderLoader = (parent) => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    // Insere o elemento 'loader' no 'index.html' após a tag de abertura do elemento pai.
    parent.insertAdjacentHTML('afterbegin', loader);
};

// Remove a animação de carregamento.
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);

    // Se o elemento 'loader' existir/estiver sendo executado...
    if (loader) {
        // Sobe até o elemento pai do 'loader' e deleta o elemento filho que é o próprio 'loader'.
        loader.parentElement.removeChild(loader);
    }
};

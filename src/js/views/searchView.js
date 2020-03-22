import { elements } from './base';

// Função que retorna o valor do 'input'.
export const getInput = () => elements.searchInput.value;

// Função que limpa o 'input'.
export const clearInput = () => {
    elements.searchInput.value = '';
};

// Função que limpa a lista de resultados.
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

// Função que recebe o título e um limite de caracteres (17 caracteres por padrão) retorna uma string com até limite máximo escolhido.
const limitRecipeTitle = (title, limit = 17) => {
    // Vetor que receberá o resultado.
    const newTitle = [];

    // Caso o tamanho do título seja maior que o limite, o que significa que precisará ser cortado...
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            // Se a soma do acumulador e do tamanho do elemento atual for menor ou igual que o limite...
            if (acc + cur.length <= limit) {
                // O elemento atual é embutido no final do novo vetor.
                newTitle.push(cur);
                
                // Atualiza o acumulador, que é a soma do acumulador com o tamanho do elemento atual. O retorno é obrigatório.
                return acc + cur.length;
            }
        }, 0);

        // Retorna o novo título unido a partir dos espaços.
        return `${newTitle.join(' ')} ...`;
    }

    // Retorna o título original caso este seja menor que o limite.
    return title;
} 

// Função privada que renderiza individualmente cada elemento do 'vetor' dos resultados.
const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    // Insere o elemento atual 'markup' no 'index.html'.
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Renderiza todos os elementos do resultado da busca na 'view'.
export const renderResults = (recipes) => {
    recipes.forEach(renderRecipe);
};

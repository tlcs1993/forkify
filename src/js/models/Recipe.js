import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {   
            const res = await axios(
                `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
            );

            this.title = res.data.recipe.title;
            this.publisher = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (err) {
            console.log(err);
            alert('Something went wrong!')
        }
    }

    calcTime() {
        // TEMPORARY: Assumindo que precisaremos de 15 minutos para cada ingrediente.
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoon', 'tablespoons', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cup', 'cups', 'pound', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'cup', 'pound', 'pound'];

        const newIngredients = this.ingredients.map(el => {

            /* 1. Padronizar as unidades. */

            let ingredient = el.toLowerCase();

            // FIXME: Para cada elemento (unit) de 'unitsLong' encontrado, o mesmo será substituído pelo elemento de índice igual do vetor 'unitsShort'. 
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            /* 2. Remover os parênteses. */

            // Usa expressões regulares para remover parênteses e substituílos por um espaço.
            ingredient = ingredient.replace(/\s*\(.*?\)\s*/g, ' ');

            /* 3. Faz o 'parsing' do ingrediente. */

            // Cria um vetor a partir da 'string', separando cada elemento a partir de cada espaço em branco.
            const arrIng = ingredient.split(' ');

            // Encontra o índice do elemento se o mesmo existir dentro do vetor 'unitsShort'.
            const unitIndex = arrIng.findIndex((el2 => unitsShort.includes(el2)));

            let objIng;

            // Caso haja uma unidade...
            if (unitIndex > -1) {
                // Guarda os valores do vetor da primeira posição até uma posição antes de encontrar alguma unidade de medida.
                const arrCount = arrIng.slice(0, unitIndex);

                let count; 

                // Caso o comprimento do vetor com as unidades de medida seja igual a um...
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    // Avalia a expressão, substitui o sinal de menos por um sinal de mais e guarda o resultado na variável. 
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                // Cria o objeto do ingrediente.
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    // Seleciona os elementos após a unidade e os une com espaços em branco.
                    ingredient: arrIng.slice(unitIndex + 1).join(' '),
                }
                
            // Caso não haja uma unidade mas o primeiro elemento da 'string' é um número (convertido para um inteiro de base 10)... 
            } else if (parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    // TIP: Ao não especificar um segundo argumento no método 'slice', o fim será o último elemento do vetor.
                    ingredient: arrIng.slice(1).join(' '),
                }
            // Caso não haja nenhuma unidade...
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    //TIP: Em ES6, variáveis com o mesmo nome não precisam ser escritas duas vezes.
                    ingredient, 
                }
            }

            // Retorna um objeto de ingredientes.
            return objIng;
        });

        // Recebe o novo valor dos ingredientes.
        this.ingredients = newIngredients;
    }
}

class RecintosZoo {
    constructor(){
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho:10, animais:[{especie:'macaco', quantidade: 3}]},
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'gazela', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'leao', quantidade: 1 }] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false, precisaCompanhia: true },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {

        // Verifica se o animal é válido
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        // Verifica se a quantidade é válida
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const infoAnimal = this.animais[animal];
        const recintosViaveis = [];

        // Analisa cada recinto para ver se é compatível
        for (const recinto of this.recintos) {
            const espacoLivre = recinto.tamanho - recinto.animais.reduce(
                (total, a) => total + a.quantidade * this.animais[a.especie.toUpperCase()].tamanho, 0
            );

            //Verifica se o bioma do recinto é compatível
            if (!infoAnimal.biomas.includes(recinto.bioma)){
                continue;
            }

            //Regras específicas para hipopótamos
            if(animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio'){
                continue;
            }

            //Regras específicas para macacos
            if (animal === 'MACACO' && infoAnimal.precisoCompanhia) {
                const temOutroMacaco = recinto.animais.some(a => a.especie === 'macaco');
                if(!temOutroMacaco){
                    continue;
                }
            }

                //Verifica se o recinto já possui carnívoro e impede de adicionar outro carnívoro
                const temCarnivoro = recinto.animais.some(a => this.animais[a.especie.toUpperCase()].carnivoro);
            if (temCarnivoro && infoAnimal.carnivoro) {
                continue;
            }

            //Verificca se há espaço suficiente no recinto
            if (espacoLivre >= quantidade * infoAnimal.tamanho) {
                const espacoRestante = espacoLivre - (quantidade * infoAnimal.tamanho);
                const descricaoRecinto = `Recinto ${recinto.numero} (espaço livre: ${espacoRestante}, total: ${recinto.tamanho})`;
                const animaisNoRecinto = recinto.animais.map(a => `${a.especie} (${a.quantidade})`).join(', ');
                recintosViaveis.push(`${descricaoRecinto} | Animais no recinto: ${animaisNoRecinto}`);

            }

    }

    // Ordena os recintos viáveis pelo número do recinto
    recintosViaveis.sort((a, b) => {
        const numeroA = parseInt(a.match(/Recinto (\d+)/)[1], 10);
        const numeroB = parseInt(b.match(/Recinto (\d+)/)[1], 10);
        return numeroA - numeroB;
    });


    
    //Retorna os recintos viáveis ou um erro se nenhum for encontrado
    return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: "Não há recinto viável" };
}
}



export { RecintosZoo as RecintosZoo };

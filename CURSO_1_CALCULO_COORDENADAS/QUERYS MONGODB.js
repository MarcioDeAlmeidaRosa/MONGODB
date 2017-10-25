//documentação do mongodb
// https://docs.mongodb.com/manual/
// https://docs.mongodb.com/v3.0/reference/operator/update-array/index.html

//retorna documento quando nome do curso for igual a (Sistema de Informação)
db.alunos.find({'curso.nome': 'Sistema de Informação'});

//retorna documento quando nome do aluno for igual a (Fernando)
db.alunos.find({nome: 'Fernando'}).pretty();

//retorna documento quando nome do aluno for (Fernando ou Marcio)
db.alunos.find({$or:[{nome: 'Fernando'} , {nome: 'Marcio'}]}).pretty();

//retorna documento quando nome do aluno for entre (Fernando e Marcio)
db.alunos.find({nome: {$in:['Fernando','Marcio']}}).pretty();

//retorna documento quando nome do aluno não for entre (Fernando e Marcio)
db.alunos.find({nome: {$nin:['Fernando','Marcio']}}).pretty();

//retorna documento quando tiver habilidade Inglês e po nível for avançado
db.alunos.find({'habilidades.nome': 'Inglês', 'habilidades.nivel':'avançado'}).pretty();

//quando tiver habilidade Inglês e po nível for avançado
db.alunos.find({$and:[{'habilidades.nome': 'Inglês'},{'habilidades.nivel':'avançado'}]}).pretty();

//atualiza somente o primeiro documento encontrado na condição
db.alunos.update(
{'curso.nome':'Sistemas De informação'}, 
{$set: {'curso.nome':'Sistemas De Informação'}}
);

//atualiza todos os documentos encontrados na condição
db.alunos.update(
{'curso.nome':'Sistemas De informação'}, 
{$set: {'curso.nome':'Sistemas De Informação'}},
{multi: true}
);

//Insere documento na coleção
db.alunos.insert({ 
    nome: 'Fernando', 
    data_nascimento: new Date(1994,03,26),
    notas: [10,4.5,7],
    curso:{ nome: 'Sistema de Informação'}
    });
    
//remove documento quando nome do aluno for entre (Fernando e Marcio)
db.alunos.remove({nome: {$in:['Fernanda','Marcia']}});

//Adicionando novo valor em uma coleção já existente
db.alunos.update({"_id" : ObjectId("59efc919eaa89695fcb6851e")}, 
{$set:{"notas" : [ 
        10.0, 
        4.5, 
        7.0,
        8.5
    ]}});
    
//operação para adicionar conteúdo direto em um array de notas
db.alunos.update( {"_id" : ObjectId("59efc919eaa89695fcb6851e")}, {$push:{"notas" : 9.0}} );

//operação para adicionar VALORES direto em um array de notas
db.alunos.update( {"_id" : ObjectId("59efc919eaa89695fcb6851e")}, {$pushAll:{"notas" : [9.2,9.3]}} );

//operação para adicionar VALORES direto em um array de notas
db.alunos.update( {"_id" : ObjectId("59efc919eaa89695fcb6851e")}, {$push:{"notas" : {$each:[9.4,9.5]}}} );

//operação para adicionar conteúdo direto em um array de notas somente se o valor passado ainda não existir
db.alunos.update( {"_id" : ObjectId("59efc919eaa89695fcb6851e")}, {$addToSet:{"notas" : 9.0}} );

//exercício (Substitua as informações de um documento pelas suas próprias informações: seu nome, o curso que você gostaria de fazer, etc.)
db.alunos.update( {"_id" : ObjectId("59efcc698c375fbeabcd12ff")}, 
  {
      $set:{'curso.nome':'Tecnologia em Desenvolvimento de Software'},
      $push:{"notas" : {$each:[9.4,9.5]}},
      $pushAll:{'habilidades': [
          { "nome" : "Inglês", "nivel" : "Básico"},
          { "nome" : "Espanhol", "nivel" : "Iniciante"}
          ]}
  });
  
//exercício (atualizando todos os registros da base, incluindo/modificando a propriedade ativo)
db.alunos.update({},{$set: {'ativo': true} },{multi: true});

//exercício (Adicione mais uma nota para o aluno Felipe)
db.alunos.update({nome:'Felipe'}, {$push:{notas:8.3}})

//exercício (Adicione duas notas para o aluno Guilherme)
db.alunos.update({nome:'Guilherme'}, {$push:{notas:{$each:[8.3,6.3]}}});
//ou
db.alunos.update({nome:'Guilherme'}, {$pushAll:{notas:[8.6,9.3]}});


//4.0 -> Ordenado e limitando os dados 

//Quem são os alunos que tem nota 8.6
db.alunos.find({
    notas:8.6
});

//quem tem notas maior que 5
db.alunos.find({
    //greater than = maior que
    notas:{$gt:5.0}
});

//a primeira pessoa quem tem notas maior que 5
db.alunos.findOne({
    //greater than = maior que
    notas:{$gt:5.0}
});

//listando alunos com nota maior que 5 ordenando por nome crescente
db.alunos.find({
    //greater than = maior que
    notas:{$gt:5.0}
}).sort({nome:1});

//listando alunos com nota maior que 5 ordenando por nome decrescente
db.alunos.find({
    //greater than = maior que
    notas:{$gt:5.0}
}).sort({nome:-1});

//listando alunos com nota maior que 5 ordenando por nome crescente limitando os 3 primeiros registros
db.alunos.find({
    //greater than = maior que
    notas:{$gt:5.0}
}).sort({nome:1}).limit(3);

//para mais exemplos de operadores
// https://docs.mongodb.com/v3.0/reference/operator/query/

//exercício (quem tem notas menores que 5)
db.alunos.find({
    //less than = menor que
    notas:{$lt:5.0}
});

//exercício (Busque apenas um aluno do curso de Sistemas de informação)
db.alunos.findOne({
    'curso.nome': 'Sistemas De Informação'
});

//exercício (Ordene os alunos em ordem alfabética crescente.)
db.alunos.find().sort({nome: 1});

//{nome do campo: ordem(1 para crescente e -1 para decrescente)}


//05 - Busca por proximidade 

//endereço para encontrar latitude e longitude
// https://www.latlong.net/
db.alunos.find({nome: 'Felipe'}).pretty();


//comando de import de dados para uma determinada coleção
// comando de import | coleção | nome coleção | tipo do conteúdo da coleção | nome do arquivo do import
// mongoimport -c alunos --jsonArray < alunos.json

//para o mongo calcuar distância é necessário ter a seguinte estrutura no seu documento ("coordinates" : [ -23.685345, -46.648253],"type" : "Point")

// https://docs.mongodb.com/v3.0/reference/command/geoNear/index.html

//criando indice para localização considerando uma esfera 2d
db.alunos.createIndex({
    'localizacao': '2dsphere' //criação do indice para poder seu usado pelo geoNear para calular a distância entre os pontos
});

//calculando a proximidade geográfica 
db.alunos.aggregate([
    {
        $geoNear: {//ordena do mais próximo para o mais distante
            near: {
                coordinates: [-23.68621, -46.614734],//ponto considerado para calcular os demais próximos
                type: 'Point'
            },
            distanceField: "distancia.calculada", //indica onde será armazenado o resultado do calculo
            spherical: true ,//indica que é uma esfera a base do calculo
            num: 4 //limita somente 4 registro
        }
    },
    { $skip: 1}//ignorando o primeiro registro, pois o primeiro mais próximo ao ponto é o próprio ponto passado
]);



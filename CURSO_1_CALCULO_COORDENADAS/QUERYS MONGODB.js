//documenta��o do mongodb
// https://docs.mongodb.com/manual/
// https://docs.mongodb.com/v3.0/reference/operator/update-array/index.html

//retorna documento quando nome do curso for igual a (Sistema de Informa��o)
db.alunos.find({'curso.nome': 'Sistema de Informa��o'});

//retorna documento quando nome do aluno for igual a (Fernando)
db.alunos.find({nome: 'Fernando'}).pretty();

//retorna documento quando nome do aluno for (Fernando ou Marcio)
db.alunos.find({$or:[{nome: 'Fernando'} , {nome: 'Marcio'}]}).pretty();

//retorna documento quando nome do aluno for entre (Fernando e Marcio)
db.alunos.find({nome: {$in:['Fernando','Marcio']}}).pretty();

//retorna documento quando nome do aluno n�o for entre (Fernando e Marcio)
db.alunos.find({nome: {$nin:['Fernando','Marcio']}}).pretty();

//retorna documento quando tiver habilidade Ingl�s e po n�vel for avan�ado
db.alunos.find({'habilidades.nome': 'Ingl�s', 'habilidades.nivel':'avan�ado'}).pretty();

//quando tiver habilidade Ingl�s e po n�vel for avan�ado
db.alunos.find({$and:[{'habilidades.nome': 'Ingl�s'},{'habilidades.nivel':'avan�ado'}]}).pretty();

//atualiza somente o primeiro documento encontrado na condi��o
db.alunos.update(
{'curso.nome':'Sistemas De informa��o'}, 
{$set: {'curso.nome':'Sistemas De Informa��o'}}
);

//atualiza todos os documentos encontrados na condi��o
db.alunos.update(
{'curso.nome':'Sistemas De informa��o'}, 
{$set: {'curso.nome':'Sistemas De Informa��o'}},
{multi: true}
);

//Insere documento na cole��o
db.alunos.insert({ 
    nome: 'Fernando', 
    data_nascimento: new Date(1994,03,26),
    notas: [10,4.5,7],
    curso:{ nome: 'Sistema de Informa��o'}
    });
    
//remove documento quando nome do aluno for entre (Fernando e Marcio)
db.alunos.remove({nome: {$in:['Fernanda','Marcia']}});

//Adicionando novo valor em uma cole��o j� existente
db.alunos.update({"_id" : ObjectId("59efc919eaa89695fcb6851e")}, 
{$set:{"notas" : [ 
        10.0, 
        4.5, 
        7.0,
        8.5
    ]}});
    
//opera��o para adicionar conte�do direto em um array de notas
db.alunos.update( {"_id" : ObjectId("59efc919eaa89695fcb6851e")}, {$push:{"notas" : 9.0}} );

//opera��o para adicionar VALORES direto em um array de notas
db.alunos.update( {"_id" : ObjectId("59efc919eaa89695fcb6851e")}, {$pushAll:{"notas" : [9.2,9.3]}} );

//opera��o para adicionar VALORES direto em um array de notas
db.alunos.update( {"_id" : ObjectId("59efc919eaa89695fcb6851e")}, {$push:{"notas" : {$each:[9.4,9.5]}}} );

//opera��o para adicionar conte�do direto em um array de notas somente se o valor passado ainda n�o existir
db.alunos.update( {"_id" : ObjectId("59efc919eaa89695fcb6851e")}, {$addToSet:{"notas" : 9.0}} );

//exerc�cio (Substitua as informa��es de um documento pelas suas pr�prias informa��es: seu nome, o curso que voc� gostaria de fazer, etc.)
db.alunos.update( {"_id" : ObjectId("59efcc698c375fbeabcd12ff")}, 
  {
      $set:{'curso.nome':'Tecnologia em Desenvolvimento de Software'},
      $push:{"notas" : {$each:[9.4,9.5]}},
      $pushAll:{'habilidades': [
          { "nome" : "Ingl�s", "nivel" : "B�sico"},
          { "nome" : "Espanhol", "nivel" : "Iniciante"}
          ]}
  });
  
//exerc�cio (atualizando todos os registros da base, incluindo/modificando a propriedade ativo)
db.alunos.update({},{$set: {'ativo': true} },{multi: true});

//exerc�cio (Adicione mais uma nota para o aluno Felipe)
db.alunos.update({nome:'Felipe'}, {$push:{notas:8.3}})

//exerc�cio (Adicione duas notas para o aluno Guilherme)
db.alunos.update({nome:'Guilherme'}, {$push:{notas:{$each:[8.3,6.3]}}});
//ou
db.alunos.update({nome:'Guilherme'}, {$pushAll:{notas:[8.6,9.3]}});


//4.0 -> Ordenado e limitando os dados 

//Quem s�o os alunos que tem nota 8.6
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

//exerc�cio (quem tem notas menores que 5)
db.alunos.find({
    //less than = menor que
    notas:{$lt:5.0}
});

//exerc�cio (Busque apenas um aluno do curso de Sistemas de informa��o)
db.alunos.findOne({
    'curso.nome': 'Sistemas De Informa��o'
});

//exerc�cio (Ordene os alunos em ordem alfab�tica crescente.)
db.alunos.find().sort({nome: 1});

//{nome do campo: ordem(1 para crescente e -1 para decrescente)}


//05 - Busca por proximidade 

//endere�o para encontrar latitude e longitude
// https://www.latlong.net/
db.alunos.find({nome: 'Felipe'}).pretty();


//comando de import de dados para uma determinada cole��o
// comando de import | cole��o | nome cole��o | tipo do conte�do da cole��o | nome do arquivo do import
// mongoimport -c alunos --jsonArray < alunos.json

//para o mongo calcuar dist�ncia � necess�rio ter a seguinte estrutura no seu documento ("coordinates" : [ -23.685345, -46.648253],"type" : "Point")

// https://docs.mongodb.com/v3.0/reference/command/geoNear/index.html

//criando indice para localiza��o considerando uma esfera 2d
db.alunos.createIndex({
    'localizacao': '2dsphere' //cria��o do indice para poder seu usado pelo geoNear para calular a dist�ncia entre os pontos
});

//calculando a proximidade geogr�fica 
db.alunos.aggregate([
    {
        $geoNear: {//ordena do mais pr�ximo para o mais distante
            near: {
                coordinates: [-23.68621, -46.614734],//ponto considerado para calcular os demais pr�ximos
                type: 'Point'
            },
            distanceField: "distancia.calculada", //indica onde ser� armazenado o resultado do calculo
            spherical: true ,//indica que � uma esfera a base do calculo
            num: 4 //limita somente 4 registro
        }
    },
    { $skip: 1}//ignorando o primeiro registro, pois o primeiro mais pr�ximo ao ponto � o pr�prio ponto passado
]);



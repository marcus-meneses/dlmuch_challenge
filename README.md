#teste Delivery Much

Olá, esse é o teste solicitado como prova técnica para a vaga de dev
Oferecida pelo Delivery Much. Seguem instruções de execução tanto
utilizando Docker quanto para execução direta do código.

A aplicação foi desenvolvida utilizando nodeJS 12+ e npm, todas as demais
dependências de código estão inseridas no arquivo package.json

Faça o download ou clone o repositório para qualquer **diretório** e 
acesse o diretório via linha de comando ($ cd **diretório**)

##Para execução direta:

- instale os pacotes de dependências utilizando
   $ npm install

- execute a aplicação utilizando
   $ node index

###Para execução do linter:

- execute 
   $ npm run pretest

###Para execução do teste:

- execute 
   $ npm run test

  (observe que esse teste pode falhar caso a resposta para as receitas mude. Caso isso aconteça, alterar o conteúdo de **exp.json** para o retorno
  esperado do teste)

##Para execução via docker:
Para conveniência, a aplicação é acompanhada de um arquivo Dockerfile
e um arquivo .dotignore. As configurações básicas dentro desses arquivos
devem ser suficientes para execução.

 - monte a imagem descrita no Dockerfile
   $ docker build -t **tagname** .
 
 - execute a imagem 
   (para o sistema em modo de desenvolvimento)
   $ docker run -p **porta local**:3000 -d **tagname**

   (para o sistema em modo de produção)
   $ docker run -p **porta local**:80 -d **tagname**

O sistema pode ser mudado do modo de desenvolvimento para o modo de produção
modificando o arquivo .env em NODE_ENVIRONMENT=development para 
NODE_ENVIRONMENT=production. O token de acesso GIPHY_API_KEY também pode ser mudado no arquivo .env

##Para acessar o server em execução:
(note que a API necessita da lista de itens **i** para operar, e a lista **i**
deve ser composta de até 3 ingredientes **em inglês**)

 - execute um curl ou acesse via navegador
   (caso utilizando a imagem docker)
   http://**host**:**porta local**/recipes/?i=**item1**,**item2**,**item3**

   (caso executando em modo de desenvolvimento em execução direta)
   http://**host**:3000/recipes/?i=**item1**,**item2**,**item3**

   (caso executando em modo de produção em execução direta)
   http://**host**:80/recipes/?i=**item1**,**item2**,**item3**
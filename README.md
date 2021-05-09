# CoffeeShop

## Objetivo

Este aplicativo foi desenvolvido para o teste prático de uma de uma oportunidade de emprego na Pro Franchising.

## Tecnologia utilizada

##### React-Native.

## Descrição do projeto

O aplicativo deveria ter integração com a API de testes da empresa, o mesmo tinha como requisitos:

- Tela de login (proteger rotas);
- Lista de itens com paginação;
- Editar item;
- Remover item;
- Adicionar item;
- Validação nos formulários;
- Criar repositório no Github.

Alguns diferenciais adicionados:

- Paginação infinita;
- Typescript;
- Animações.

## Detalhes do projeto

### Tela de login

![Tela de login](https://user-images.githubusercontent.com/48089807/117519045-72afeb00-af78-11eb-96e7-a66626db8f2c.gif);

### Listagem de produtos

![Listagem de produtos](https://user-images.githubusercontent.com/48089807/117577916-41433680-b0c2-11eb-836c-a50878fd50b9.gif);

### Adicionar produto

![Adicionar produto](https://user-images.githubusercontent.com/48089807/117519950-3aaaa700-af7c-11eb-9de3-3634ae9aa41e.gif);

### Editar produto

![Editar produto](https://user-images.githubusercontent.com/48089807/117520758-3f715a00-af80-11eb-8de1-8d40616c9612.gif);

### Excluir produto

![Excluir produto](https://user-images.githubusercontent.com/48089807/117519116-c8849300-af78-11eb-9d3e-e83a33fafd93.gif);

### Error handling

Em caso de erros inesperados retornados pelo servidor, uma notificação aparecerá na tela para informar o usuário para que tente novamente mais tarde.

![Error handling](https://user-images.githubusercontent.com/48089807/117520319-0506bd80-af7e-11eb-809c-2b3cdc76f535.gif);

### Validação de formulários

Para a validação de formulários foi utilizada a biblioteca [react-hook-form](https://react-hook-form.com/), a validação é disparada no onBlur dos inputs e também no submit.

# WhiteLabelForms

O WhiteLabelForms é uma biblioteca para utilização interna que, ao mesmo tempo que provê elementos plug and play, fornece total controle sobre o comportamento dos dados, validação dos dados, representação dos dados e comportamento.

## Componente Principal

O componente principal da aplicação é um `hook` que retorna para você os principais elementos para você trabalhar com o seu formulário. Esse hook é o `useModel` e fica no arquivo `useModel.tsx`.

Esse hook é o coração da biblioteca e tudo funciona ao redor dele. De fato, você poderia trabalhar somente com esse `hook` e fazer todo o resto na mão, que ele iria funcionar do mesmo jeito.

Esse hook recebe um inicializador que segue a seguinte interface:

```typescript
interface ModelInitializer<T> {
    data: T,
    validations: {[K in keyof T]?: {[key: string]: (data: unknown) => boolean}}
}
```

Basicamente, você irá informar duas coisas: um objeto na propriedade `data` e outro objeto na propriedade `validations`. A propriedade `data` irá conter o modelo do seu formulário, ou seja, os dados de fato que você irá receber enquanto que, na propriedade `validations`, virá as validações. O objeto data define a interface de todos os outros pontos. Por exemplo, um modelo com propriedade {name: '', telefone: ''} irá ter uma validação com as propriedades:
```typescript
{ 
    name?: { 
        [key: string]: (data: unknown) => boolean 
    } 
}
```
Dentro de cada propriedade, você define um nome e o modo que aquela validação ocorrerá. O nome da validação é a chave do objeto e, o modo, é a função que será executada. Por padrão, `data` é o valor contido no modelo no momento em que aquela validação for executada. 

O modo que você define as funções não importa, o que importa é ter uma função com a assinatura especificada. Logo, padrões de projeto como `Builders` são bem vindos.

O `useModel`irá te retornar alguns elementos:

```tsx
const [model, errors, update, isValid] = useModel(...)
```

- model: esse valor é o estado atual do modelo. Quando você acaba de criá-lo, ele será identico ao passado no inicializador.
- errors: esse valor é o objeto contendo o estado dos erros. Os erros seguem o mesmo formato que as validações, mas, ao invés de receberem funções, teremos `boolean`em cada validação especificada.
- update: essa função é a responsável por atualizar o modelo e, por padrão, sempre que você executa, ela irá executar as validações levando em consideração os novos dados.
- isValid: essa função é a responsável por realizar uma validação com os dados atuais do modelo. Recomenda-se utilizá-la para validar no momento de `submit` do formulário.

Recomendo olhar o exemplo [Formulário de Cadastro](./examples/SAMPLE_1.md) para ter uma ideia de como utilizar essa biblioteca. Esse exemplo ilustra da maneira mais crua possível e é extremamente recomendado de ser visto. A seguir, vou mostrar os elementos plug and play que facilitam o desenvolvimento, mas, sem entender o exemplo, não irá conseguir fazer mais nada a não ser usá-los.

## Componentes Auxiliares

### Validadores
Os Validadores padrões foram criados para economizar o trabalho na hora de validar os dados. Todos os validadores existentes estão declarados no arquivo `modelview/validations/index.ts`.

### Handlers
Os Handlers padrões foram criados para lidar com o update dos dados do formulário. O `HandleInput` é o mais básico de todos e, basicamente, somente atualiza o dado no modelo independente de tudo. Outro exemplo, o `HandleInputWithMask` nos permite definir uma Regexp que irá ser usada para remover caracteres do valor. Todos os handlers estão declarados no `modelview/handlers/InputHandlers.tsx`
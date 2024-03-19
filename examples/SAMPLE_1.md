## Formulário de Cadastro

Vamos criar um formulário de cadastro utilizando a biblioteca. Esse formulário irá conter 3 campos: nome do cliente, email e telefone.

Fazendo uma rápida análise, logo vemos que o modelo é composto por `nome`, `email` e `telefone`. Portanto, vamos construir nosso modelo.

```typescript
const [model, errors, updateModel, isValid] = useModel({
    data: {
        name: '',
        email: '',
        telefone: ''
    },
    //...
})
```

Perceba que definimos valores para nosso modelo assim que o definimos. Entenda que, quando criamos o modelo, estamos inicializando ele. Logo, faz-se necessário valores para preenchê-lo. Além disso, esses valores determinam o tipo daquela propriedade. Dessa forma, evitamos a necessidade de ficar criando interfaces e, também, facilitamos o processo, mas se quiser pode criar uma interface e fornecer como parâmetro de tipo: 

```typescript
interface Modelo {
    name: string;
    email: string;
    telefone: string;
}
const [model, errors, updateModel, isValid] = useModel<Modelo>({
    data: {
        name: '',
        email: '',
        telefone: ''
    },
    //...
})
```

Não se esqueça de configurar os inputs. Você deve atribuir o valor deles para o modelo e realizar a atualização apropriada do modelo:

```tsx
//... Código Omitido
<input 
    type="text" 
    value={model.name} 
    onChange={(e) => {
        update({
            ...model,
            name: e.target.value
        })
    }} 
/>
//... Código Omitido
```
Nesse exemplo, escolhemos realizar o update ao mudar o valor do input, mas podemos fazer isso em, literalmente, qualquer momento.

```tsx
useEffect(() => {
    //... Recebe dados da api
    const dataFromAPI = fetch();
    update({
        ...model,
        name: dataFromAPI.name
    })
}, []);
```

## Validações

Agora, vamos escrever as validações. Nesse caso, quero que todos os dados sejam obrigatórios. Para fazer isso, escrevemos o seguinte:

```tsx
const [model, errors, updateModel, isValid] = useModel({
    data: {
        name: '',
        email: '',
        telefone: ''
    },
    validations: {
        name: {
            required: (data: unknown) => {
                if(typeof data !== 'string') {
                    return true;
                }
                const treatedValue = data.replaceAll(/\s/g, '');
                return treatedValue.length <= 0;
            }
        },
        email: {
            required: (data: unknown) => {
                if(typeof data !== 'string') {
                    return true;
                }
                const treatedValue = data.replaceAll(/\s/g, '');
                return treatedValue.length <= 0;
            }
        },
        telefone: {
            required: (data: unknown) => {
                if(typeof data !== 'string') {
                    return true;
                }
                const treatedValue = data.replaceAll(/\s/g, '');
                return treatedValue.length <= 0;
            }
        }
    }
})
```

Perceba que criamos uma validação de nome `required` e definimos como ela vai funcionar. Agora, sempre que chamarmos `updateModel`, a validação será realizada e podemos saber se há erro ou não no objeto `errors` na propriedade de mesmo nome do modelo:

```tsx
//... Código Omitido
{errors.name.required ? 'Nome é obrigatório': ''}
```

Juntando tudo, podemos ter algo assim:

```tsx
const [model, errors, updateModel, isValid] = useModel({
    data: {
        name: '',
        email: '',
        telefone: ''
    },
    validations: {
        name: {
            required: (data: unknown) => {
                if(typeof data !== 'string') {
                    return true;
                }
                const treatedValue = data.replaceAll(/\s/g, '');
                return treatedValue.length <= 0;
            }
        },
        email: {
            required: (data: unknown) => {
                if(typeof data !== 'string') {
                    return true;
                }
                const treatedValue = data.replaceAll(/\s/g, '');
                return treatedValue.length <= 0;
            }
        },
        telefone: {
            required: (data: unknown) => {
                if(typeof data !== 'string') {
                    return true;
                }
                const treatedValue = data.replaceAll(/\s/g, '');
                return treatedValue.length <= 0;
            }
        }
    }
})

return <form>
    <input 
        type="text" 
        value={model.name} 
        onChange={(e) => {
            update({
                ...model,
                name: e.target.value
            })
        }} 
    />
    {errors.name.required ? <p>Nome é obrigatório</p>: <></>}
</form>
```
## Possíveis Perguntas
> Ah mas grande maioria das vezes vou fazer o update dos dados pelo `onChange`, vou ter que escrever isso tudo toda vez?

Sim ou não. Depende do que você deseja. Se você vai realmente usar só no onChange, poderia criar um componente que envolve essa lógica e te permite reutilizá-la em todos os outros lugares (caso esse componente já não exista).

Tenha sempre em mente que o propósito da biblioteca é fornecer controle de maneira mais declarativa e intuitiva possível. Portanto, várias coisas não serão plug and play e você precisará entender o que está fazendo.


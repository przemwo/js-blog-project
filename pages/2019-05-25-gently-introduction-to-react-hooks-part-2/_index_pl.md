---
title: Gently introduction to React Hooks. Part 2
date: "2019-05-25T12:00:00.169Z"
layout: post
path: "/gently-introduction-to-react-hooks-part-2/"
readNext: ""
links: ""
description: If you want to learn React Hooks in a gently way you are in a good place.
---

To jest druga część serii **Gently introduction to React Hooks**. Jeżeli jeszcze tego nie zrobiłeś zachęcam Cię do przeczytania  pierwszej części:

- [Gently introduction to React Hooks. Part 1](https://dev.to/przemwo/gently-introduction-to-react-hooks-part-1-1a47)

Zacznijmy dokładnie tam, gdzie skończyliśmy poprzednio. Nasz komponent działa. Użytkownik może wpisać w polu input swoje imię. Dodajmy do niego nową funkcjonalność.

Chcemy, aby zaraz po wyrenderowaniu komponentu tekst w polu input (user name) został automatycznie zaznaczony. Dzięki temu użytkownik będzie mógł w łatwy i wygodny sposób zmienić wartość tego pola bez potrzeby używania myszy.

Zastanówmy się jak taką funkcjonalność napisać?
Po pierwsze nasz komponent (który zawiera pole input) musi zostać faktycznie wyrenderowany (namalowany w przeglądarce). Następnie potrzebujemy mieć dostęp bezpośrednio z naszego kodu do elementu input. Na koniec zaznaczymy znajdujący się tam tekst (początkową wartość `userName`).

## Napiszmy trochę kodu

Zacznijmy tak jak poprzednio od komponentu klasowego. Później przekształcimy go w komponent funkcyjny, który będzie używał React Hooks.

Aby mieć dostęp do wyrenderowanego komponentu (w tym do naszego pola input), musimy użyć metody cyklu życia `componentDidMount`.
Dodatkowo, aby faktycznie "złapać" to pole, musimy stworzyć referencję do niego i przechować ją w zmiennej. Zapewni nam to metoda `createRef`.
Na koniec mając referencję do wyrenderowanego pola input użyjemy metody `select`, która zaznaczy tekst.

Nowe elementy w kodzie opatrzyłem komentarzami.

```jsx
import React from 'react';

class MyComponent extends React.Component {
    state = {
        userName: "Bob",
    }
    
    handleChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };

    //tworzymy nową referencję
    inputRef = React.createRef();

    //kod w componentDidMount zostanie uruchomiony dopiero po wyrenderowaniu komponentu
    componentDidMount() {
        //korzystając z referencji do pola input zaznaczamy w nim tekst
        this.inputRef.current.select();
    }

    render() {
        return(
            <div className="card">
                <h2>User name: <span>{this.state.userName}</span></h2>
                <input
                    //przypisujemy referencję do pola input
                    ref={this.inputRef}
                    type="text"
                    name="userName"
                    id="userName"
                    value={this.state.userName}
                    onChange={this.handleChangeUserName}
                />
            </div>
        );
    }
}
```

Czas na przepisanie komponentu klasowego na funkcyjny. Zacznijmy tam gdzie skończyliśmy w [poporzedniej części](https://dev.to/przemwo/gently-introduction-to-react-hooks-part-1-1a47).
Następnie przekopiujmy nowe elementy z komponentu klasowego i tak jak poprzednio usuńmy odniesienia do `this` oraz dodajmy brakujące `const`.

Nasz komponent funkcyjny na tym etapie powinien wyglądać następująco:

```jsx
import React, { useState } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    //dodalem const
    const inputRef = React.createRef();

    componentDidMount() {
        //usunalem this.
        inputRef.current.select();
    }

    return (
        <>
            <h2>User name: {userName}</h2>
            <input
                //usunalem this.
                ref={inputRef}
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
```

W komponencie funkcyjnym, podobnie jak w klasowym, gdy chcemy użyć referencji do wyrenderowanego elementu możemy użyć `createRef`. React udostępnia nam jednak specjalny hook gdy chcemy użyć referencji. Nazywa się `useRef`. Użyjmy go w naszym przykładzie.

```jsx
//importuje hooka useRef
import React, { useState, useRef } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    //używamy hooka useRef
    const inputRef = useRef();

    componentDidMount() {
        inputRef.current.select();
    }

    return (
        <>
            <h2>User name: {userName}</h2>
            <input
                ref={inputRef}
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
```

W naszym przykładzie użycie `useRef` będzie miało taki sam efekt jak użycie `createRef`. Te dwie metody różnią się jednak między sobą. Jeżeli jesteś zainteresowany na czym polega różnica polecam przeczytać [ten](https://stackoverflow.com/a/54620836) tekst.

## A co z `componentDidMount`?

W komponentach funkcyjnych nie ma metody `componentDidMount`. W jaki sposób możemy zatem dostać się do wyrenderowanego już komponentu? Umożliwi nam to kolejny hook: `useEffect`.

## useEffect hook

`useEffect` wygląda tak:


```jsx
useEffect(() => {
    //effect's code goes here
});
```

`useEffect` to funkcja, która jako parametr przyjmuje inną funkcję. Kod wewnątrz tej funkcji (nazwijmy go efektem) zostanie wykonany po **każdym** renderze naszego komponentu. Po każdym czyli także po pierwszym. A w naszym przypadku właśnie to nas interesuje.

Zaimportujmy `useEffect` i zastąpmy nim `componentDidMount`:

```jsx
//importuje useEffect
import React, { useState, useRef, useEffect } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");
    
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    
    const inputRef = useRef();

    //useEffect zamiast componentDidMount
    useEffect(() => {
        inputRef.current.select();
    });

    return (
        <div className="card">
            <h2>User name: <span>{userName}</span></h2>
            <input
                ref={inputRef}
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
            />
        </div>
    );
};
```

Nasz komponent tak jakby działa. "Tak jakby" bo wprawdzie zaznacza nam tekst w polu input zaraz po pierwszym wyrenderowaniu komponentu ale robi to także po każdorazowym wpisaniu nowego znaku. Nie do końca o to nam chodziło.

Tak jak pisałem wcześniej funkcja przekazana do `useEffect` jest uruchamiana po każdym renderze. W przypadku wpisania nowego znaku do pola input nowa wartość `userName` jest zapisywana do stanu, co z kolei powoduje kolejne wyrenderowanie  komponentu, następnie wywołanie funkcji przekazanej do `useEffect` i kolejne zaznaczenie tekstu w polu input. Trzeba to naprawić!

`useEffect` może przyjąć jako drugi parametr tablicę. Elementami tej tablicy będą wszystkie zmienne, od których zmiany chcemy uzależnić to czy efekt się wykona czy też nie. Po każdym renderze React sprawdza czy zmieniła się któraś z tych zmiennych i odpowiednio wykonuje efekt lub nie.

```jsx
useEffect(() => {
    //effect's code goes here
}, [/* list of dependencies */]);
```

W naszym przypadku chcemy, aby efekt (zaznaczenie tekstu w polu input) wykonał się raz (zaraz po pierwszym renderze), a następnie pozostał nieczuły na dalsze zmiany w naszym komponencie. Cokolwiek zmieni się w naszym komponencie (np. użytkownik wpisze nową nazwę) efekt ma się więcej nie wykonywać. Chcemy więc, aby lista zależności była pusta. Zapiszmy to!

```jsx
useEffect(() => {
    //effect's code goes here
}, []); //empty array of dependencies
```

Taki zapis oznacza, że efekt wykona się raz i tylko raz (po pierwszym renderze). Jest to odpowiednik **`componentDidMount`**. Dokładnie tego nam brakowało. Uzupełnijmy więc nasz komponent funkcyjny:

```jsx
import React, { useState, useRef, useEffect } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");
    
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    
    const inputRef = useRef();
    
    useEffect(() => {
        inputRef.current.select();
    }, []); // empty array of dependencies

    return (
        <div className="card">
            <h2>User name: <span>{userName}</span></h2>
            <input
                ref={inputRef}
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
            />
        </div>
    );
};
```

Mamy to! Nasz komponent działa tak jak sobie tego życzyliśmy. Przepisaliśmy komponent klasowy na funkcyjny, który działa dokładnie tak samo. Używa **stanu** oraz **metody cyklu życia**.

## Ale ja nadal nie rozumiem tych zachwytów

Doskonale Ciebie rozumiem. Sam miałem tak samo. O co całe to zamieszanie z React Hooks? Po co uczyć się nowej składni skoro rezultat jest dokładnie taki sam jak poprzednio?

Jednak jeśli zostaniesz ze mną to już w następnej części **Gently intorduction to React Hooks** powinieneś mieć pierwszy moment: "Ok, to akurat jest fajne".

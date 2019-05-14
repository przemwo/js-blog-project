---
title: Gently introduction to React Hooks. Part 1.
date: "2019-05-14T21:45:00.169Z"
layout: post
path: "/gently-introduction-to-react-hooks-part-1/"
readNext: ""
links: ""
---

# Łagodne wprowadzenie do React Hooks. Część 1.

W tej serii artykułów odpowiem na następujące pytania:
- Co to są React Hooks?
- Po co są React Hooks?
- Jak używać React Hooks?
- Czy warto znać React Hooks?

W dalszej części zakładam, że masz podstawową wiedzę na temat React (każdy tutorial trwający więcej niż 5 minut wystarczy) i nie masz żadnej wiedzy na temat React Hooks.

## Moja historia

Pracuję na co dzień z React od przeszło dwóch lat. Muszę przyznać, że Jak dotąd były to dwa bardzo przyjemne lata. Kiedy jednak po raz pierwszy usłyszałem o React Hooks byłem bardzo sceptyczny: "Po co zmieniać coś co jest dobre i działa?" Kiedy zobaczyłem pierwsze przykłady z hookami poczucie "to nie jest dobry kierunek" się wzmogło. Jednak hooki atakowały z każdej strony i kolejne osoby zachwycały się nowym dodatkiem do React. Postanowiłem dać im szansę... i dołączyłem do grona zachwyconych. Ale po kolei.

## Co to są React Hooks?

Hooks zostały wprowadzone do React, aby zastąpić używanie klas do tworzenia komponentów. Zastąpić czym? Zastąpić funkcjami.

Ale ale! może zakrzyknąć ktoś. Przecież od dawna mogliśmy tworzyć komponenty używając funkcji. Po co więc to całe zamieszanie z hooksami? Zanim odpowiem na to pytanie zróbmy dwa kroki wstecz.

## W jaki sposób tworzymy komponenty w React?

Generalnie są dwa* sposoby na tworzenie komponentów w React:
1. Za pomocą klas (komponenty klasowe / class components)
2. Za pomocą funkcji (komponenty funkcyjne / function components)

Używanie funkcji do tworzenia komponentów wydaje się prostsze:
- Nie trzeba “walczyć” ze słowem kluczowym `this` i pamiętać o bindowaniu metod,
- Komponenty funkcyjne są czytelniejsze i szybciej się je pisze,
- Łatwiej się je testuje i wnioskuje co dzieje się wewnątrz.

Powstaje zatem kolejne pytanie...

## Dlaczego są dwa sposoby na tworzenie komponentów w React?

Skoro komponenty funkcyjne są takie “fajne” dlaczego nie używamy wyłącznie nich? Po co w ogóle używać klas?
Komponenty napisane za pomocą klas mają dwie ważne cechy (funkcjonalności) jakich nie mają te napisane za pomocą funkcji:
1. Posiadają **stan** (state),
2. Dają dostęp do **metod cyklu życia** (lifecycle methods) komponentu. 

**Co to jest stan komponentu?**
Ja rozumiem to jako zdolność komponentu do “zapamiętania” dowolnej informacji o sobie samym.

Np. komponent tworzący przycisk może pamiętać czy użytkownik już go wcisnął czy jeszcze nie. I w zależności od odpowiedzi na to pytanie przycisk może być np. zielony lub czerwony.

**Co to są metody cyklu życia komponentu?**
Cykl życia komponentu to czas od momentu namalowania go w przeglądarce (a nawet chwilę przed tym), tak że użytkownik go widzi i może z niego korzystać aż do czasu jego usunięcia (komponent znika z oczu użytkownika). Metody cyklu życia pozwalają na wykonanie dowolnego kodu w kluczowych momentach “życia” komponentu.

Np. chcemy znać wysokość jaką ma wyrenderowany przez nasz komponent przycisk. Ta wiedza jest dostępna dopiero po faktycznym namalowaniu przycisku w przeglądarce. Dzięki metodzie `componentDidMount` mamy możliwość zmierzyć wysokość przycisku w momencie gdy ten będzie już wyrenderowany.

Komponenty napisane za pomocą funkcji nie dawały nam tych możliwości. Napisałem w czasie przeszłym bo… od wersji React 16.8 obie te funkcjonalności są już dostępne w komponentach funkcyjnych dzięki React Hooks!

## Pokaż mi kod!

Naszą przygodę z React Hooks zacznijmy od przepisania prostego komponentu klasowego na funkcyjny.

Poniżej mamy komponent, który renderuje pole input. Użytkownik może wpisać w nim swoje imię, które będzie wyświetlone powyżej:

````jsx
import React from 'react';

class MyComponent extends React.Component {
    state = {
        userName: "Bob",
    }

    handleUserNameChanged = (e) => {
        this.setState({ userName: e.target.value });
    }

    render() {
        return(
            <>
                <h2>User name: {this.state.userName}</h2>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={this.handleUserNameChanged}
                />
            </>
        );
    }
}
````

Stwórzmy komponentu funkcyjny, który robi to samo. Zacznijmy od przekopiowania całego kodu. Następnie zróbmy kilka zmian:
1. W komponencie funkcyjnym nie ma słowa kluczowego `this`. Usuńmy je.
2. Faktycznie interesuje nas nie `state.userName` a samo `userName`. Słowo `state` również znika.
3. Nie definiujemy `state`. Deklarujemy za to zmienną `userName` i przypisujemy jej wartość `"Bob"`.
4. Zmieniamy `setState` na funkcję `setUserName`.
5. Dodajemy `const` przed `handleUserNameChanged` jako, że teraz będzie to zmienna lokalna.

````jsx
import React from 'react';

const MyComponent = () => {
    const userName = "Bob";

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    return(
        <>
            <h2>User name: {userName}</h2>
            <input
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
````

Na tym etapie nasz komponent nie działa. Nie wie czym jest `setUserName`.
Zastanówmy się zatem czym jest (a właściwie czym powinno być) `setUserName`. Ma to być **funkcja** zmieniająca wartość zmiennej `userName`. Dodajmy więc naszą naiwną implementację tej funkcji.

````jsx
import React from 'react';

const MyComponent = () => {
    const userName = "Bob", setUserName = (value) => userName;

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    return(
        <>
            <h2>User name: {userName}</h2>
            <input
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
````

Nasz komponent prawie działa. Prawie bo wyświetla input oraz imię użytkownika. Nie można jednak zmienić nazwy użytkownika. Dlaczego? Brakuje nam **stanu** w komponencie. Chcielibyśmy tutaj **użyć stanu**. Tak się składa, że React daje nam do dyspozycji hook o nazwie `useState`.

## useState hook

`useState` to funkcja, która po wywołaniu zwraca tablicę zawierającą dwa elementy.
1. Pierwszy element to zmienna w której przechowujemy wartość jaką chcemy trzymać w stanie.
2. Drugi to funkcja za pomocą której możemy zmienić wartość tej zmiennej (stanu).
   
`useState` może przyjąć jako argument dowolną wartość początkową jaką chcemy przypisać do stanu. Może to być `string`, `boolean`, `tablica` czy `obiekt`.

Zapiszmy zatem:

````javascript
const state = useState("Bob");
const userName = state[0];
const setUserName = state[1];
````

Dzięki `destructuring` tablicy możemy ten kod jeszcze uprościć:

````javascript
const [userName, setUserName] = useState("Bob");
````

Taki zapis oznacza, że:
1. Chcemy użyć stanu i trzymać jego wartość w **zmiennej** o nazwie `userName`.
2. Zmienić wartość stanu możemy wywołując **funkcję** `setUserName` i przekazując jej nową wartość jaką chcemy zapisać do `userName` (do stanu).
3. Wartość początkową `userName` ustawiamy na `"Bob"`.

Mając tę wiedzę wracamy do naszego przykładu. Zaimportujmy `useState` z `react` i użyjmy go w komponencie.

````jsx
import React, { useState } from 'react';

const MyComponent = () => {
    const [userName, setUserName] = useState("Bob");

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    }

    return(
        <>
            <h2>User name: {userName}</h2>
            <input
                type="text"
                value={userName}
                onChange={handleUserNameChanged}
            />
        </>
    );
}
````

W ten sposób mamy w pełni działający komponent funkcyjny, który korzysta ze stanu.

## No fajnie, działa ale gdzie te obiecane cuda?

W tym momencie możesz sobie pomyśleć, że wprowadzenie hooksów nie daje specjalnej wartośći dodanej do tego co mieliśmy wcześniej. I faktycznie jak porównasz kod z komponentu klasowego i finalny z funkcyjnego różnic nie ma zbyt wiele i ciężo dostrzec czym ludzie się tak zachwycają.

Obiecuję jednak, że jeśli zostaniesz ze mną do końca tej serii będziesz miał moment **Wow! To jednak jest super!** No ja w każdym razie tak miałem.

Do zobaczenia w kolejnym odcinku łagodnego wprowadzenia do React Hooks!
# Flashcards
## David Škácha
*Semestrální projekt pro předmět KAJ*


## Cíl projektu

Myšlenka za semestrální prací bylo vytvořit aplikaci, která bude sloužit jako webová implementace populární studijní techniky vytváření kartiček. V současné chvíli uživatel může zakládat nové kolekce kartiček, vytvářet kartičky a zobrazovat si jednu kartičku po druhé ve “studijním módu”, kde vidí jen jednu stranu kartiček najednou. Vzorem pro mě byla asi nejznámější aplikace tohoto tipu, quizlet.

## Postup

Codebase je rozdělená do několika částí. Snažil jsem se držet principů MVC architektury. Javascriptovým souborem, který slouží jako controller je app.js. O renderování jednotlivých stránek a komponent se stará render/render.js, zatímco datové jako model slouží model/collections.js. V pozdějších fázích, kdy jsem implementoval audio prvky, jsem přidal i soubor sound/sound.js, kde je veškerý kód spojený s přehráváním / zpracováním audio prvků. 

## Popis funkčnosti
Stránka je rozdělená do dvou hlavních částí. V hlavní části uživatel pracuje se samotnými kartičkami, v pravé, menší části má kdykoli k dispozici menu s vytvořenými kolekcemi kartiček.

Kromě těchto dvou částí je na první pohled viditelné animované logo “FLASHCARDS”. Tato animace jde vypnout ve spodní části stránky, stejně jako zvuky kartiček.

### Přehled jednotlivých částí
### Menu kolekcí
Po pravé části vidíme menu se seznamem kolekcí. Každá kolekce má jméno, tlačítko na smazání (ikona koše), tlačítko na zobrazení přehledu všech karet (oko) a po kliknutí na danou kolekci se otevře studijní mód. Novou kolekci založíme kliknutím na tlačítko “+” v horní pravé části menu.

### Formulář pro přidání nové kolekce
Pro založení nové kolekce je potřeba zadat jen její jméno - musí být ale unikátní napříč všemi kolekcemi v aplikaci.

### Studijní mód
Po zvolení kolekce v pravé části obrazovky se spustí studijní mód v hlavní části obrazovky. Součástí je zrovna vybraná kartička, kterou otočíme tlačítkem “otočit” v dolní části obrazovky. Tlačítky vpravo/vlevo uživatel naviguje mezi různými kartičkami ve zvolené kolekci. Zvuk přepínání kartiček a otáčení kartiček jde vypnout tlačítkem “turn sound off” ve spodní části stránky.

### Přehled všech kartiček v kolekci
Kliknutím na ikonu oka v menu kolekcí se zobrazí celkový přehled kartiček v dané kolekci, kde uživatel může přidávat, mazat a upravovat kartičky z kolekce. Novou kartičku přidá ikonou “+” v pravém horním rohu stránky. Dále vidí všechny kartičky v kolekci. Pokud uživatel chce kartičku upravit, docílí toho kliknutím na ikonu tužky v pravém dolním rohu kartičky. Kliknutím na ikonu koše kartičku z kolekce vymaže. Pokud by chtěl uživatel zkopírovat kartičku do jiné kolekce, může kartičku díky drag ‘n drop api kartičku vzít a přetáhnout do jiné kolekce. Pokud název kartičky bude unikátní v kolekci, do které chce uživatel katričku zkopírovat, dojde k nakopírování.

### Formulář pro přidání / úpravu kartičky
Ve formuláři uživatel zadá (pro kolekci unikátní) název kartičky a její popis. Má i možnost nahrát hlasovou zprávu, to je ale dobrovolná část formuláře. Kromě unikátnosti názvu kartičky samozřejmě kartička nemůže být prázdná.

Stránka kromě nahrání hlasu podporuje i historii prohlížení. Tlačítky zpátky/vpřed v historii svého prohlížeče uživatel může navigovat mezi posledními kolekcemi a “módy”, které si zobrazil. 

## Přehled hodnotící tabulky:

https://docs.google.com/spreadsheets/d/1yRhT-jOihQNb1F7xB_HEVpAKwA-YtASiyy6lQ3eC7pY/edit?usp=sharing

Vytvořil jsem kopii hodnotící tabulky, zeleně jsou označeny části, které jsem implementoval.


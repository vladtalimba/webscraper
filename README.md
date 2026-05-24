# webscraper

Proba practica SC Autobrand SRL, Web Scraper in Node.js

Proiectul nu este complet, deoarece nu am avut timp sa il fac cap-coada din cauza programului de munca. De miercuri am muncit in fiecare zi, inclusiv astazi, dar am incercat sa fac cat am putut.

Am ales sa fac proiectul in Node.js, deoarece este platforma / limbajul cu care sunt cel mai familiar si pentru ca stiam ca voi fi constrans de timp. 

Pachete folosite: 

- Node.js v24.16.0
- Express
- Node-cron pentru programarea cronului
- PostgreSQL 
- Drizzle ORM
- Puppeteer pentru web scrping

Pentru a initializa proiectul, rulati comanda npm install, apoi npm run dev.

Pentru a face conexiunea la baza de date, aveti nevoie de o conexiune locala la o baza de date PostgreSQL, apoi sa rulati migratiile pentru a adauga tabelul de Consumables in baza de date respecitve: 

npx drizzle-kit generate
npx drizzle-kit migrate

Creati un fisier .env, in care introduceti variabila DB_URL: url, pentru a va putea conecta la baza de date.

Programul actual permite efectuarea actiunii de login pe site-ul https://www.web-scraping.dev/login, apoi navigheaza catre categoria de consumables. In momentul actual, logica programului efectueaza scraping-ul doar pe prima pagina de produse, si adauga produsele gasite in tabelul Consumables din baza de date, fara a duplica produsele cu acelasi nume.

Cron-ul ruleaza momentan in formatul default, la fiecare minut. Putem modifica sintaxa pentru a alege orele specifice la care trebuie sa ruleze scraping-ul: 

cron.schedule('* * * * *', await scrapeConsumables);

Fiecare steluta reprezinta, in aceasta ordine: secunda(optional), minut, ora, ziua, luna, ziua din saptamana (fiind doar 5 stelute, secunda lipseste deoarece este optionala).

Sintaxa va arata in felul urmator cand va rula intre orele mentionate in instructiuni: cron.schedule('* 12,13,14,15,16,17,18 * * *', await scrapeConsumables);

Mai jos, voi explica modul in care as fi abordat si restul task-urilor din proiect, daca as fi dispus de timpul necesar: 

- Pentru a lua produsele de pe fiecare pagina, as fi folosit un While loop, cu o variabile de tip boolean, (isSearching = true), si o variabila care ar fi tinut cont de numarul paginii la care ne aflam. Url-ul are forma https://www.web-scraping.dev/products?category=consumables&page=${pageNumber}, unde pageNumber este variabila care tine cont de numarul paginii la care ne aflam. 

  In momentul in care, pe pagina nu se mai incarca nici un element care ne intereseaza (putem tine cont de nume de clase specifice, gasite numai pe produse, precum "price"), oprim cautarea si incepem sa adaugam produsele gasite in baza de date.

- Pentru citirea facturii, as fi folosit file system-ul din Node (fs) pentru a citi continutul facturii si a extrage informatiile care ma intereseaza. Odata extrase si prelucrate, le-as fi introdus intr-un template de CSV, apoi as fi exportat acest fisier template in formatul .CSV. 

- Interfata as fi facut-o cu Vue.js, fiind framework-ul cel mai familiar. As fi pastrat modul de lucru simplu, facand doar 3 pagini: Login, Dashboad, Sign Up. 

- Editarea si stergerea articolelor sunt doar 2 endpoint-uri noi, in care fie facem un UPDATE produsului cu acelasi nume, actualizand restul informatiilor: {target: product.productName, set: {description: product.description, imageUrl: product.imageUrl, price: product.price}}

- Sistemul de autentificare ar fi fost simplu, parola urmand sa fie criptata inainte de a fi salvata intr-o tabela de users. Ca aditie de sercuritate, as fi adaugat un Json Web Token, care ar fi necesitat validare inainte de orice actiune, in special de editare sau stergere a produselor.


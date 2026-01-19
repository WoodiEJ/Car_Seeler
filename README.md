🚗 Car Seeler
Um sistema simples para gerir a venda de carros, com backend em Java (Spring Boot) e frontend em React.

🛠️ O que precisas
Java 21.

Node.js instalado.

MySQL a correr no teu computador.

🚀 Como começar
1. Preparar a Base de Dados
No teu MySQL, cria uma base de dados com o nome: car_seeler.

O sistema está configurado para ligar ao utilizador root sem palavra-passe.

2. Ligar o Backend (Servidor)
Entra na pasta seeler e executa:

Bash

./mvnw spring-boot:run
(No Windows, usa mvnw.cmd spring-boot:run).

3. Ligar o Frontend (Interface)
Entra na pasta car-seeler-front, instala as bibliotecas e inicia o site:

Bash

npm install
npm run dev
Depois, abre o link que aparecer no terminal (geralmente http://localhost:5173).

📂 O que podes fazer no sistema
Com base nos componentes criados, podes:

Gerir Carros: Adicionar e ver a lista de veículos.

Gerir Clientes: Registar quem compra os carros.

Gerir Empregados: Controlar a equipa de vendas.

Registar Vendas: Criar o histórico de transações.

🧪 Tecnologias
Backend: Spring Boot 4.0.1 com JPA.

Frontend: React 19, Vite e Tailwind CSS para o estilo.

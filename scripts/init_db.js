const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

// Caminho para o banco de dados
const dbPath = path.join(__dirname, '../src/qa_commerce.db');

// Abrir o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error('Erro ao abrir o banco de dados:', err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Criar tabelas e inserir dados
db.serialize(() => {
    // Tabela de usuários
    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            isAdmin INTEGER DEFAULT 0
        )
    `);

    // Tabela de produtos
    db.run(`
        CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            price REAL,
            image TEXT
        )
    `);

    // Tabela de carrinho
    db.run(`
        CREATE TABLE IF NOT EXISTS Cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            FOREIGN KEY(user_id) REFERENCES Users(id),
            FOREIGN KEY(product_id) REFERENCES Products(id)
        )
    `);

    // Tabela de pedidos
    db.run(`
        CREATE TABLE IF NOT EXISTS Orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            first_name TEXT,
            last_name TEXT,
            address TEXT,
            number TEXT,
            cep TEXT,
            phone TEXT,
            email TEXT,
            payment_method TEXT,
            card_number TEXT,
            card_expiry TEXT,
            card_cvc TEXT,
            boleto_code TEXT,
            pix_key TEXT,
            total_price REAL,
            status TEXT,
            order_number TEXT,
            FOREIGN KEY(user_id) REFERENCES Users(id)
        )
    `);

    console.log("Tabelas criadas com sucesso.");

    // Inserir dados de exemplo para produtos
    const products = [
        { name: 'Xícara Const', description: 'Xícara em porcelana. Capacidade: 270ml.', price: 40.0, image: 'images/produtos/imagem8.jpeg' },
        { name: 'Moletom com capuz "Na minha máquina funciona"', description: 'Moletom com capuz branco fabricado com tecido de alta qualidade e caimento impecável.', price: 59.00, image: 'images/produtos/imagem2.jpeg' },
        // ... demais produtos
    ];

    products.forEach(product => {
        db.run("INSERT INTO Products (name, description, price, image) VALUES (?, ?, ?, ?)",
            [product.name, product.description, product.price, product.image]);
    });

    console.log("Produtos de exemplo inseridos com sucesso.");

    // Inserir usuário administrador (com bcrypt)
    const adminEmail = 'admin@qa.com';
    const adminPassword = 'admin';
    const adminName = 'Admin';
    const saltRounds = 10;

    bcrypt.hash(adminPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Erro ao hashear a senha:', err.message);
            return;
        }
        db.run(
            "INSERT OR IGNORE INTO Users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
            [adminName, adminEmail, hashedPassword, 1],
            (err) => {
                if (err) {
                    console.error('Erro ao inserir usuário administrador:', err.message);
                } else {
                    console.log('Usuário administrador inserido com sucesso.');
                }
                db.close((closeErr) => {
                    if (closeErr) {
                        console.error('Erro ao fechar o banco de dados:', closeErr.message);
                    } else {
                        console.log('Fechando a conexão com o banco de dados SQLite.');
                    }
                });
            }
        );
    });
});
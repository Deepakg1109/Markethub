# MarketHub

MarketHub is a web-based marketplace application where users can upload, view, buy, and search products.

## Structure
## Structure

```bash
backend/
├── pom.xml
├── uploads/
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── markethub/
        │           └── backend/
        │               ├── BackendApplication.java
        │               ├── controller/
        │               │   ├── HomeController.java
        │               │   ├── UserController.java
        │               │   └── ProductController.java
        │               ├── model/
        │               │   ├── User.java
        │               │   ├── Product.java
        │               │   └── LoginRequest.java
        │               ├── repository/
        │               │   ├── UserRepository.java
        │               │   └── ProductRepository.java
        │               ├── service/
        │               │   ├── UserService.java
        │               │   └── ProductService.java
        │               ├── config/
        │               │   ├── SecurityConfig.java
        │               │   └── CorsConfig.java
        │               └── security/
        │                   ├── JwtUtil.java
        │                   └── JwtAuthFilter.java
        └── resources/
            └── application.properties

.gitignore
pom.xml
mvnw.cmd
mvnw
.vscode/
└── settings.json

edit-product.html
my-products.html
login.html
register.html
products.html
index.html
README.md
add-product.html
style.css
script.js
```

## Features
- Add products
- Delete products
- Search products
- Buy option
- Product listing
- Database integration

## Tech Stack
- Java
- Spring Boot
- MySQL
- HTML
- CSS
- JavaScript
- Maven

## How to Run
1. Clone the repository
2. Open in VS Code / IntelliJ
3. Configure MySQL database
4. Run the Spring Boot application
5. Open browser and test the project

## Author
Deepak Gupta


## Screenshots
<img width="1920" height="1018" alt="Screenshot add product" src="https://github.com/user-attachments/assets/c5df1522-c076-4aa5-9e99-18da073707cc" />

<img width="1920" height="1011" alt="Screenshot Register" src="https://github.com/user-attachments/assets/dc398c58-373b-4c24-90e3-5ee706f4a734" />

<img width="1920" height="1015" alt="Screenshot of home" src="https://github.com/user-attachments/assets/13a67a59-ea1e-41d7-a501-5afeb351103b" />



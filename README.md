# Bike Management System

A web application for posting your bike, built with Spring Boot, Java, JavaScript, and MySQL. This system allows users to perform CRUD operations (Create, Read, Update, Delete) on bike records, with user authentication and role-based access control.

## Prerequisites
- Java JDK 11 or higher
- MySQL 5.7 or higher
- Maven
- Node.js and npm (for frontend JavaScript)
- IDE (recommended: IntelliJ IDEA or Eclipse)

## Technologies Used
- **Backend:**
  - Spring Boot
  - Java
  - MySQL
  - JDBC
- **Frontend:**
  - JavaScript
  - HTML
  - CSS

## Database Setup

### Database Schema
The application uses two main tables:
```sql
CREATE TABLE web_user (
    web_user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(45) UNIQUE NOT NULL,
    user_password VARCHAR(45) NOT NULL,
    user_image VARCHAR(300),
    membership_fee DECIMAL(10,2),
    birthday DATE,
    user_role_id INT,
    FOREIGN KEY (user_role_id) REFERENCES user_role(user_role_id)
);

CREATE TABLE user_bike (
    bike_id INT AUTO_INCREMENT PRIMARY KEY,
    bike_name VARCHAR(45) UNIQUE NOT NULL,
    bike_image VARCHAR(500),
    bike_price DECIMAL(10,2),
    year_manufactured YEAR,
    bike_brand VARCHAR(45) NOT NULL,
    bike_model VARCHAR(45) NOT NULL,
    bike_type VARCHAR(45) NOT NULL,
    web_user_id INT NOT NULL,
    FOREIGN KEY (web_user_id) REFERENCES web_user(web_user_id)
);
```

### Database Configuration
Update the `application.properties` file with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Running the Application
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd bike-management-system
   ```

3. Build the project:
   ```bash
   mvn clean install
   ```

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will be available at `http://localhost:8082`

## API Endpoints

### Bike Management
- `GET /userBike/getAll` - Retrieve all bikes
- `GET /userBike/getById?bikeId={id}` - Get bike by ID
- `POST /userBike/insert` - Create new bike
- `POST /userBike/update` - Update existing bike

### User Management
- `GET /webUser/getAll` - Retrieve all users
- `GET /webUser/getById?userId={id}` - Get user by ID
- `POST /webUser/insert` - Create new user
- `POST /webUser/update` - Update existing user

## Key Features
1. **Bike Management:**
   - Add new bikes with details (name, brand, model, type, price, etc.)
   - Update existing bike information
   - View bike details
   - Associate bikes with users

2. **User Management:**
   - User registration and profile management
   - Role-based access control
   - User authentication

3. **Data Validation:**
   - Server-side validation for all inputs
   - Proper handling of optional fields
   - Format validation for special fields (dates, prices, years)

4. **Error Handling:**
   - Comprehensive error messages
   - Proper handling of database constraints
   - Validation feedback

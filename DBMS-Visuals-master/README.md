# 🎬 Online Movie Rental System

## 📌 Overview
With the rise of digital media and OTT platforms like Netflix and Prime Video, online movie rental systems have become popular.  
This project is a **Database Management System (DBMS) case study** designed to manage customers, movies, rentals, payments, and subscription plans efficiently.

The system ensures **data integrity, scalability, and security** while supporting both rental and subscription models.

---

## 🎯 Objectives
- Manage **large movie catalogs**
- Maintain **customer data** (personal details, addresses, subscriptions)
- Track **rentals and payments**
- Provide **flexible subscription plans**
- Ensure **ACID compliance** and scalability

---

## 🗄️ Database Schema

### Entities
- **Customer**
  - customer_id, date_of_birth, phone_numbers, name_id
- **Name**
  - first_name, middle_name, last_name
- **Address**
  - address_id, street, city, state, country, postal_code
- **Movie**
  - movie_id, title, year, director_id
- **Subscription Plan**
  - plan_id, name, price, billing_cycle
- **Payment Method**
  - payment_method_id, type, expiry_date, details_masked, billing_address_id
- **Rental**
  - rented_id (links Customer ↔ Movie)
- **CustomerSubscription**
  - Links Customer ↔ Subscription Plan

---

## 🔗 Relationships
- **Customer – Address** → 1 : M  
- **Customer – Rental – Movie** → M : N  
- **Customer – Subscription Plan** → M : N (via CustomerSubscription)  
- **Customer – Payment Method** → 1 : M  

---

## 🖼️ ER Diagram
![ER Diagram](./dbms.jpg)

*(The ER diagram shows entities, attributes, and relationships for the Online Movie Rental System.)*

---

## ⚙️ DBMS Features
- **Normalization**: Divides Name, Address, Payment, and Subscriptions into separate tables to avoid redundancy  
- **Indexes**: Optimized searching for movies by title, year, and genre  
- **ACID Transactions**:  
  - **Atomicity** → rental & payment processed together  
  - **Consistency** → ensures valid states  
  - **Isolation** → concurrent rentals handled safely  
  - **Durability** → rental/payment history preserved  
- **Backup & Recovery**: Prevents data loss  

---

## ✅ Advantages
- Centralized and structured storage of movies, rentals, and payments  
- Supports both **subscription model** and **individual rentals**  
- Secure multi-user access  
- Scalable for large numbers of customers  
- Efficient queries for **recommendations & reporting**  

---

## 📝 Example Queries

```sql
-- Find all movies rented by a customer
SELECT c.first_name, c.last_name, m.title, r.rented_id
FROM Customer c
JOIN Rental r ON c.customer_id = r.customer_id
JOIN Movie m ON r.movie_id = m.movie_id
WHERE c.customer_id = 101;

-- Show all active subscriptions with customer details
SELECT c.first_name, c.last_name, s.name AS subscription, s.price, s.billing_cycle
FROM CustomerSubscription cs
JOIN Customer c ON cs.customer_id = c.customer_id
JOIN SubscriptionPlan s ON cs.plan_id = s.plan_id;

-- Get total payments made by each customer
SELECT c.first_name, c.last_name, SUM(p.amount) AS total_spent
FROM PaymentMethod pm
JOIN Customer c ON pm.customer_id = c.customer_id
JOIN Payment p ON pm.payment_method_id = p.payment_method_id
GROUP BY c.customer_id;

## .env
```
DB_PASSWORD=[DB_PASSWORD]
DB_SCHEMA=[DB_SCHEMA]
PORT=[PORT]
JWT_SECRET=[JWT_SECRET]
```


## Validations
#### User:
filed    |  Mysql                |   Joi
-------- | ----------------------|-------------
id       | int primary key auto_increment |
name     | varchar(100) not null          | [string] - [min(12)] - [regex(/^[^\s][a-zA-Z\s]*[a-zA-z]$/)] - [required]
email    | varchar(100) not null          | [string] - [email] - [required]
password | varchar(100) not null          | [string] - [regex(/^.*(.*\d){6,}/)] - [required]
role     | varchar(100) not null          | [string] - [required]
confirm  |                                | [string] - [ref(password)] - [required]

#### Product
filed    |  Mysql                         
-------- | -------------------------------
id       | int primary key auto_increment 
product  | varchar(100) not null          
price    | double not null                
volume   | int not null                   
urlImage | varchar(100) not null          

#### Order
filed         |  Mysql                         
--------      | -------------------------------
id            | int primary key auto_increment,
user_id       | foreign key references users(id),
order_date    | date not null,
total_price   | double not null,
address       | varchar(100) not null,
number        | double not null,
status        | varchar(100) not null,

#### OrderItem
filed      |  Mysql                         
--------   | -------------------------------
order_id   | foreign key references orders(id),
product_id | foreign key references products(id),
quantity   | int not null,


## Routes
---
### User

#### POST: localhost:3001/user/login ⟶ [Authorization=NO]
body
```
{
     "email": "joao_neves@gmail.com",
     "password": "123456"
}
```
responses:
**success | status: 200**
```
{
    "token",
    "user": {
        "id",
        "name",
        "email",
        "role""
    }
}
```

#### POST: localhost:3001/user/register ⟶ [Authorization=YES]
body:
```
{
     "name": "João das Neves",
     "email": "joao_neves@gmail.com",
     "password": "123456"
     "role" "client",
     "confirm": "123456"
}
```
responses:
**success | status: 201**
```
{
    "message": "User created with sucess!"
}

```

#### GET: localhost:3001/user/profile ⟶ [Authorization=YES]
responses:
**success | status: 200**
```
{
    "name",
    "email",
}
```

#### PATCH: localhost:3001/user/profile ⟶ [Authorization=YES]
body
```
{
    "name": "joão das Naevs",
    "email": "joao_venes@gmail.com",
}
```
responses:
**success | status: 200**
```
{
    "message": "User update with sucess!"
}
```

---
### Product

#### GET: localhost:3001/products ⟶ [Authorization=YES]
responses:
**success | status: 200**
```
"products": [
        {
            "id",
            "product",
            "price",
            "volume",
            "urlImage",
        },
],
```

---
### Order


#### GET: localhost:3001/orders ⟶ [Authorization=YES]
responses:
**success | status: 200**
```
{
    "orders": [
        {
            "orderId",
            "userId",
            "orderDate",
            "totalPrice",
            "address",
            "number",
            "status",
        }
    ]
}
```


#### GET: localhost:3001/orders/:id ⟶ [Authorization=YES]
responses:
**success | status: 200**
```
{
    "order": {
        "orderId",
        "userId",
        "orderDate":,
        "totalPrice",
        "address",
        "number",
        "status",
        "products": [
            {
                "id",
                "name",
                "price",
                "volume",
                "urlImage",
                "quantity",
            },
        ]
    }
}
```

#### POST: localhost:3001/orders ⟶ [Authorization=YES]
responses:
**success | status: 201**

```
{
"orderDate",
"totalPrice",
"products": [{"id", "count" }, {"id", "count" }],
"address",
"number",
}
```

#### PATCH: localhost:3001/orders/:id ⟶ [Authorization=YES]
responses:
**success | status: 200**

```
{
    "message": "Produto Entregue!"
}
```

---
#### GET: localhost:3001/admin/orders ⟶ [Authorization=YES]
responses:
**success | status: 200**

```
{
    "allOrders": [
        {
            "orderId",
            "userId": 1,
            "orderDate",
            "totalPrice",
            "address",
            "number",
            "status",
        }
    ]
}
```

#### GET: localhost:3001/admin/orders/:id ⟶ [Authorization=YES]
responses:
**success | status: 200**

```
{
    "order": {
        "orderId",
        "userId",
        "orderDate",
        "totalPrice",
        "address",
        "number",
        "status",
        "products": [
            {
                "id",
                "name":,
                "price",
                "volume",
                "urlImage",
                "quantity",
            },
        ]
    }
}
```

# server_test

## Getting Started

Clone the project repository by running the command below

```bash
git clone https://github.com/Hottab13/server_test.git
```

After cloning, run:

```bash
npm install 
```

Start the application:

```bash
npm run dev
```

The server will be running on (http://localhost:4741/graphql).

REST API документация EventParty
http://188.225.42.218:4741/api

IMG-ROUTES

/*********************/
Headers authorization:token
post('/api/add-img’), enctype="multipart/form-data", name(key)="image"(добавление фото)
res json:200
{
    "idImg": "623057d0db975836b8355b28"
}
/*********************/

Headers authorization:token
get('/api/img/:id), enctype=" urlencoded", (Получение фото)
res json:200
{
    "img_200_200": {
        "data": {
            "type": "Buffer",
            "data": []
        },
        "contentType": "image/png",
        "originalname": " type:String "
    },
    "img_1000_1000": {
        "data": {
            "type": "Buffer",
            "data": []
        },
        "contentType": "image/png",
        "originalname": " type:String "

    },
    "_id": "",
    "__v": 0
}
/*********************/


EVENT-ROUTES
/*********************/

get('/api/event/:id'); enctype=" urlencoded", (получить событие)
res json:200
{
    "_id": type:String
    "name": type:String
    "location": type:String
    "address": type:String
    "city": type:String
    "type": type:String
    "finalData": type:String
    "ageRestrictions": type:String
    "amountMaximum": type:String
    "userId": type:String,
    "imgAvatarId": type:String,
    "createdAt": type:String
    "updatedAt": type:String,
    "__v": 0
}
/*********************/


get('/api/events-user/:id'); enctype=" urlencoded", (получить массив событий, которые принадлежат id юзера)
res:
[{
    "_id": type:String
    "name": type:String
    "location": type:String
    "address": type:String
    "city": type:String
    "type": type:String
    "finalData": type:String
    "ageRestrictions": type:String
    "amountMaximum": type:String
    "userId": type:String
     "imgAvatarId": type:String,
    "createdAt": type:String
    "updatedAt": type:String
    "__v": 0
}]



/*********************/

get('/api/events'); enctype=" urlencoded", (получить массив событий, сортировка по возрастанию даты создания)
res json:200
[{
    "_id": type:String
    "name": type:String
    "location": type:String
    "address": type:String
    "city": type:String
    "type": type:String
    "finalData": type:String
    "ageRestrictions": type:String
    "amountMaximum": type:String
    "userId": type:String
     "imgAvatarId": type:String,
    "createdAt": type:String
    "updatedAt": type:String
    "__v": 0
}]
/*********************/

Headers authorization:token
post('/api/add-event'); enctype=" urlencoded", (добавить новое событие),
required:true – обязательное поле
name:{  type:String, required:true },
locationLat:{type: Decimal128, required:true },
locationLon:{type: Decimal128, required:true },
address:{ type:String, required:true},
city:{ type:String, required:true },
type:{ type:String, required:true },
finalData:{ type:String, required:true },
ageRestrictions:{ type:String, required:true},
amountMaximum:{ type:String, required:true},
ageRestrictions:{ type:String, required:true},
userId:{ type:String, required:true},
imgAvatarId:{ type:String, required:true},

res json:200
{
    "_id": type:String
    "name": type:String
    " locationLat ": type: Decimal128,
    " locationLon ": type: Decimal128,
    "address": type:String
    "city": type:String
    "type": type:String
    "finalData": type:String
    "ageRestrictions": type:String
    "amountMaximum": type:String
    "userId": type:String
"imgAvatarId": type:String
    "createdAt": type:String
    "updatedAt": type:String
    "__v": 0
}
/*********************/


Headers authorization:token
delete('/api/event/:id'); enctype=" urlencoded", (удалить событие по id),
res json:200
/*********************/

Headers authorization:token
put('/api/edit-event/:id'); enctype=" urlencoded", (обновление ивента)

name:{  type:String, required:true },
locationLat:{type: Decimal128, required:true },
locationLon:{type: Decimal128, required:true },
address:{ type:String, required:true},
city:{ type:String, required:true },
type:{ type:String, required:true },
finalData:{ type:String, required:true },
ageRestrictions:{ type:String, required:true},
amountMaximum:{ type:String, required:true},
ageRestrictions:{ type:String, required:true},
userId:{ type:String, required:true},
imgAvatarId:{ type:String, required:true},

res json:200

/*********************/
USER-ROUTES
/*********************/
Headers authorization:token
get('/api/users'); enctype=" urlencoded", (получить массив юзеров, сортировка по возрастанию даты создания)
res json:200
[{
"_id": type:String,
"email": type:String,
       	 "name": type:String,
        	"surname": type:String,
        	"sex": type:String,
       	 "age": type:String,
       	 "status": type:String,
        	"aboutMe":  type:String,
"imgAvatarId":  type:String,
   	"createdAt": type:String,
    	"updatedAt": type:String,
    	"__v": 0
}]
/*********************/

Headers authorization:token
get('/api/user/:id'); enctype=" urlencoded", (получить юзера по id)
res json:200

{
"_id": type:String,
"email": type:String,
       	 "name": type:String,
        	"surname": type:String,
        	"sex": type:String,
       	 "age": type:String,
       	 "status": type:String,
        	"aboutMe":  type:String,
"imgAvatarId":  type:String,
   	"createdAt": type:String,
    	"updatedAt": type:String,
    	"__v": 0
}
/*********************/
Headers authorization:token
delete('/api/user/:id'); enctype=" urlencoded", (удалить юзера по id),
res json:200


/*********************/

Headers authorization:token
put('/api/edit-user/:id'); enctype=" urlencoded", (обновление юзера)

email:{  type:String},
password:{ type:String},
name:{ type:String},
surname:{ type:String},
sex:{ type:String},
age:{ type:String},
status:{ type:String },
aboutMe:{ type:String}
imgAvatarId:{ type:String}
res json:200

/*********************/
AUTHENTICATION-ROUTES
/*********************/
get('/api/login')  enctype=" urlencoded", (логонизация)

req:
"email": type:String,
       	"password": type:String,
Res:
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkAyMyIsImlhdCI6MTY0NzM0MTcwMCwiZXhwIjoxNjQ5OTMzNzAwfQ.dwcMkDsm8Eo1uVmjk9Y4PJCjfIHyPNlqJNbGb1ENrro",
    "userId": "5fd2561e464e21c42a4bb33f"
}
/*********************/

post('/api/registration'); enctype=" urlencoded", (регистрация пользователя)
req:
email:{  type:String, required:true },
password:{ type:String, required:true },
name:{ type:String, required:true},
surname:{ type:String},
sex:{ type:String},
age:{ type:String},
status:{ type:String },
aboutMe:{ type:String}
Res:
{
    "accessToken": " ",
    "userId": "5fd2561e464e21c42a4bb33f"
}
/*********************/


Возвращение ошибок
Respons json: 500
{
	"errorText": type:String
}
/*********************/


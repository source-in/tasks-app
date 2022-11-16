# REST API

## Create a new Task

### Request

`POST /tasks/create`

    http://localhost:2000/tasks/create

### Request Body
     
    {
        "title": "Pick up flowers from the market.",
        "additional_info": "Go to the market in the morning.",
        "completed": false
    }

### Response

    {
        "type": "sucess",
        "message": { 
            "taskId": 10
        }
    }

## Get list of Tasks

### Request

`GET /tasks/list`

    http://localhost:2000/tasks/list

### Response

    {
        "type": "Sucess",
        "message": {
            "tasks": [
                {
                    "id": 1,
                    "title": "Pick up apples from the market",
                    "additionalInfo": "From the hay market",
                    "completed": false
                }
            ]
        }
    }

## Update an existing Task

### Request

`PATCH /tasks/update/{taskId}`

    http://localhost:2000/tasks/update/{taskId}

### Request Body
     
    {
        "title": "Pick up groceries from the market."
    }

### Response

    {
        "type": "sucess",
        "message": "success"
    }

## Delete an existing Task

### Request

`DELETE /tasks/delete/{taskId}`

    http://localhost:2000/tasks/delete/{taskId}

### Response

    {
        "type": "sucess",
        "message": "success"
    }
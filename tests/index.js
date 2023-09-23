console.log('testing...');

process.exit(1);

const mumery =  {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64",
        "example": 10
      },
      "petId": {
        "type": "integer",
        "format": "int64",
        "example": 198772
      },
      "quantity": {
        "type": "integer",
        "format": "int32",
        "example": 7
      },
      "shipDate": {
        "type": "string",
        "format": "date-time"
      },
      "photoUrls": {
        "type": "array",
        "xml": {
          "wrapped": true
        },
        "items": {
          "type": "string",
          "xml": {
            "name": "photoUrl"
          }
        }
      },
      "username": {
        "type": "string",
        "example": "fehguy"
      },
      "status": {
        "type": "string",
        "description": "Order Status",
        "example": "approved",
        "enum": [
          "placed",
          "approved",
          "delivered"
        ]
      },
      "complete": {
        "type": "boolean"
      }
    },
    "xml": {
      "name": "order"
    }
  }




  parameters = [
    {
      "name": "status",
      "in": "query",
      "description": "Status values that need to be considered for filter",
      "required": false,
      "explode": true,
      "schema": {
        "type": "string",
        "default": "available",
        "enum": [
          "available",
          "pending",
          "sold"
        ]
      }
    },
    {
      "name": "petId",
      "in": "path",
      "description": "ID of pet to return",
      "required": true,
      "schema": {
        "type": "integer",
        "format": "int64"
      }
    },
  ],
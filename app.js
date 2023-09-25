const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const httpStatus = require('http-status');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
const config = require('./config/auth');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const apiRouter = require('./routes');



// const options = {
//   definition: {
//     openapi: "3.1.0",
//     info: {
//       title: "Team Giant Free Lunch API",
//       version: "0.1.0",
//       description:
//         "This is a CRUD API for gifting staffs in an organization free lunches",
//       license: {
//         name: "MIT",
//         url: "https://spdx.org/licenses/MIT.html",
//       },
//       contact: {
//         name: "Giants",
//         url: "https://smartbizlord.com.ng",
//         email: "smartbizlord@gmail.com",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3001",
//       },
//     ],
//     paths: [
//       {
//         api: {
//           auth: {
//             post: {
//               tags: "Auth"
//             }
//           },
//           // organizations,
//           // users,
//           // lunches,
//           // withdrawals,
//           ["bank-accounts"]: "",
//         }
//       }
//     ]
//   },
//   apis: ["./routes/*.js"],
// };

const options = {
  definition: {
    "openapi": "3.0.3",
    "info": {
      "title": "Giants - Free Launch API",
      "description": "This is a CRUD API for gifting staffs in an organization free lunches",
      "contact": {
        "name": "Giants",
        "url": "https://smartbizlord.com.ng",
        "email": "smartbizlord@gmail.com",
      },
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      },
      "version": "1.0.11"
    },
    "servers": [
      {
        "url": "https://giants-food-backend-production.up.railway.app"
      }
    ],
    "tags": [
      {
        "name": "Auth",
        "description": "Everything about your Pets",
        "externalDocs": {
          "description": "Find out more",
          "url": "http://swagger.io"
        }
      },
      {
        "name": "Organization",
        "description": "Access to Petstore orders",
        "externalDocs": {
          "description": "Find out more about our store",
          "url": "http://swagger.io"
        }
      },
      {
        "name": "User",
        "description": "Operations about user"
      },
      {
        "name": "Lunch",
        "description": "Operations about user"
      },
      {
        "name": "Withdrawal",
        "description": "Operations about user"
      }
    ],
    "paths": {
      "/auth/signup": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "To register a user",
          "description": "To register a user",
          "operationId": "registerUser",
          "parameters": [
            {"$ref": "#/components/requestParameters/required/quantity"},
            {"$ref": "#/components/requestParameters/required/firstName"},
            {"$ref": "#/components/requestParameters/required/lastName"},
            {"$ref": "#/components/requestParameters/required/phoneNumber"},
            {"$ref": "#/components/requestParameters/required/password"},
          ],
          "requestBody": {
            "description": "To register a user",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/RegisterUser"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/RegisterUserResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
        }
      },
      "/auth/login": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "To log in a registered user",
          "description": "To log in a registered user",
          "operationId": "loginUser",
          "requestBody": {
            "description": "To log in a registered user",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/LoginUser"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/LoginUserResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
        }
      },
      "/organizations": {
        "post": {
          "tags": [
            "Organization"
          ],
          "summary": "To create an organization",
          "description": "To create an organization",
          "operationId": "createOrganization",
          "requestBody": {
            "description": "To create an organization",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/CreateOrganization"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/CreateOrganizationResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authentication": [
                
              ]
            }
          ]
        }
      },
      "/organizations/invite": {
        "post": {
          "tags": [
            "Organization"
          ],
          "summary": "To invite people to an organization",
          "description": "To invite people to an organization",
          "operationId": "createOrganizationInvite",
          "requestBody": {
            "description": "To invite people to an organization",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/CreateOrganizationInvite"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/CreateOrganizationInviteResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        }
      },
      "/organizations/accept-invite": {
        "post": {
          "tags": [
            "Organization"
          ],
          "summary": "To accept invite into an organization",
          "description": "To accept invite into an organization",
          "operationId": "acceptOrganizationInvite",
          "requestBody": {
            "description": "To accept invite into an organization",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/AcceptOrganizationInvite"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/AcceptOrganizationInviteResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
        }
      },
      "/organizations/{orgId}/users": {
        "get": {
          "tags": [
            "User"
          ],
          "summary": "To get all users in an organization",
          "description": "To get all users in an organization",
          "operationId": "getUsersByOrganization",
          "requestBody": {
            "description": "To get all users in an organization",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/GetUsersByOrganization"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/GetUsersByOrganizationResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        }
      },
      "/users/{userId}": {
        "get": {
          "tags": [
            "User"
          ],
          "summary": "To get a user by ID",
          "description": "To get a user by ID",
          "operationId": "getSingleUser",
          "requestBody": {
            "description": "To get a user by ID",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/GetSingleUser"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/GetSingleUserResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        },
        "put": {
          "tags": [
            "User"
          ],
          "summary": "To update a user's details",
          "description": "To update a user's details",
          "operationId": "updateUser",
          "requestBody": {
            "description": "To update a user's details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/UpdateUser"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/UpdateUserResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        }
      },
      // "/users": {
      //   "post": {
      //     "tags": [
      //       "User"
      //     ],
      //     "summary": "To register a user",
      //     "description": "To register a user",
      //     "operationId": "createUser",
      //     "requestBody": {
      //       "description": "To register a user",
      //       "content": {
      //         "application/json": {
      //           "schema": {
      //             "$ref": "#/components/schemas/RegisterUser"
      //           }
      //         },
      //       },
      //       "required": true
      //     },
      //     "responses": {
      //       "200": {
      //         "description": "Successful operation",
      //         "content": {
      //           "application/json": {
      //             "schema": {
      //               "$ref": "#/components/schemas/RegisterUserResponse"
      //             }
      //           },
      //         }
      //       },
      //       "400": {
      //         "description": "Invalid input"
      //       }
      //     },
      //     "security": [
      //       {
      //         "Bearer Token Authntication": [
                
      //         ]
      //       }
      //     ]
      //   }
      // },
      "/lunches": {
        "post": {
          "tags": [
            "Lunch"
          ],
          "summary": "To send lunch to a user",
          "description": "To send lunch to a user",
          "operationId": "sendLunches",
          "requestBody": {
            "description": "To send lunch to a user",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/SendLunches"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/SendLunchesResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        },
        "get": {
          "tags": [
            "Lunch"
          ],
          "summary": "To get all lunches in an organization",
          "description": "To get all lunches in an organization",
          "operationId": "GetLunchesByOrganization",
          "requestBody": {
            "description": "To get all lunches in an organization",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/GetLunchesByOrganization"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/GetLunchesByOrganizationResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        }
      },
      "/lunches/user-lunch/{lunchId}": {
        "get": {
          "tags": [
            "Lunch"
          ],
          "summary": "To get a single lunch by Id",
          "description": "To get a single lunch by Id",
          "operationId": "getLunchById",
          "requestBody": {
            "description": "To get a single lunch by Id",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/GetLunchById"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/GetLunchByIdResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        }
      },
      "/lunches/{userId}": {
        "get": {
          "tags": [
            "Lunch"
          ],
          "summary": "To register a user",
          "description": "To register a user",
          "operationId": "RegisterUser",
          "requestBody": {
            "description": "To register a user",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/RegisterUser"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/RegisterUserResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        }
      },
      // "/organizations/{orgId}/lunches": {
        
      // },
      // 
      "/withdrawals": {
        "post": {
          "tags": [
            "Withdrawal"
          ],
          "summary": "To withdraw all available lunches",
          "description": "To withdraw all available lunches",
          "operationId": "createUser",
          "requestBody": {
            "description": "To withdraw all available lunches",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/RegisterUser"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/RegisterUserResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        }
      },
      "/bank-account/{userId}": {
        "get": {
          "tags": [
            "Withdrawal"
          ],
          "summary": "To get a user's bank details",
          "description": "To get a user's bank details",
          "operationId": "getUserBankAccount",
          "requestBody": {
            "description": "To get a user's bank details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/GetUserBankAccount"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/GetUserBankAccountResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        },
        "put": {
          "tags": [
            "Withdrawal"
          ],
          "summary": "To update a user's bank details",
          "description": "To update a user's bank details",
          "operationId": "setUserBankAccount",
          "requestBody": {
            "description": "To update a user's bank details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/request/SetUserBankAccount"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/responses/SetUserBankAccountResponse"
                  }
                },
              }
            },
            "400": {
              "description": "Invalid input"
            }
          },
          "security": [
            {
              "Bearer Token Authntication": [
                
              ]
            }
          ]
        }
      },
      // "":{},
    },
    "components": {
      "schemas": {
        "request": {
          "RegisterUser": {
            // 
            "required": [
              "email",
              "first_name",
              "last_name",
              "phone_number",
              "password_hash",
            ],
            "type": "object",
            "properties": {
              "email": {
                "type": "string",
                "example" :"Santino.Gerhold61@gmail.com",
              },
              "first_name": {
                "type": "string",
                "example" :"Cornelius",
              },
              "last_name": {
                "type": "string",
                "example" :"Mark",
              },
              "phone_number": {
                "type": "string",
                "example" :"08080006000",
              },
              "password_hash": {
                "type": "string",
                "example" :"14@_WYLxctqSVD0ikmD",
              },
              "profile_pic": {
                "type": "string",
                "example" :"http://placeimg.com/640/480"
              },
            }
          },
          "LoginUser": {
            "required": [
              "email",
              "password_hash",
            ],
            "type": "object",
            "properties": {
              "email": {
                "type": "string",
                "example" :"Santino.Gerhold61@gmail.com",
              },
              "password_hash": {
                "type": "string",
                "example" :"14@_WYLxctqSVD0ikmD",
              },
            }
          },
          "CreateOrganization": {
            "required": [
              "name",
              "lunch_price",
            ],
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "example" :"Cornelius Org",
              },
              "lunch_price": {
                "type": "integer",
                "example" : 5000,
              },
            }
          },
          "CreateOrganizationInvite": {
            "required": [
              "email",
            ],
            "type": "object",
            "properties": {
              "email": {
                "type": "string",
                "example" :"Santino.Gerhold61@gmail.com",
              },
            }
          },
          "AcceptOrganizationInvite": {
            "required": [
              "token",
            ],
            "type": "object",
            "properties": {
              "token": {
                "type": "string",
                "example" :"Santino.Gerhold61@gmail.com",
              },
            }
          },
          "GetAllUsers": {
            "required": [
              // 
            ],
            "type": "object",
            "properties": {
              // 
            }
          },
          "GetSingleUser": {
            "required": [
              // 
            ],
            "type": "object",
            "properties": {
              // 
            },
          },
          "GetUsersByOrganization": {
            "required": [
              // 
            ],
            "type": "object",
            "properties": {
              // 
            },
          },
          "GetLunchesByOrganization": {
            "required": [
              // 
            ],
            "type": "object",
            "properties": {
              // 
            },
          },
          "SendLunches": {
            "required": [
              "receiver_id",
              "note",
              "quantity",
            ],
            "type": "object",
            "properties": {
              "receiver_id": {
                "type": "integer",
                "example" : 997,
              },
              "note": {
                "type": "string",
                "example" :"Cornelius is doing a great job",
              },
              "quantity": {
                "type": "integer",
                "example" : 2,
                "enum": [
                  1,2,3,4
                ]
              },
            }
          },
          "GetLunchById": {
            "required": [
              // 
            ],
            "type": "object",
            "properties": {
              // 
            }
          },
          "GetLunchesByUserId": {
            "required": [
              // 
            ],
            "type": "object",
            "properties": {
              // 
            }
          },
          "WithdrawLunches": {
            "required": [
              // 
            ],
            "type": "object",
            "properties": {
              // 
            }
          },
          "GetUserBankAccount": {
            "required": [
              // 
            ],
            "type": "object",
            "properties": {
              // 
            }
          },
          "SetUserBankAccount": {
            "required": [
              "bannk_name",
              "bank_number",
              "bank_code",
            ],
            "type": "object",
            "properties": {
              "bannk_name": {
                "type": "string",
                "example" :"GT Bank",
              },
              "bank_number": {
                "type": "string",
                "example" :"0273048841",
              },
              "bank_code": {
                "type": "string",
                "example" : "065" ,
              },
            }
          },
        },
        "responses": {
          "RegisterUserResponse": {
            // 
            "type": "object",
            "properties": {
              "user": {
                "type": "object",
                "properties" :{
                  "id": {
                    "type": "integer",
                    "example" : 6239,
                  },
                  "org_id": {
                    "type": "integer",
                    "example" : 6239,
                  },
                  "first_name": {
                    "type": "string",
                    "example" :"Cornelius",
                  },
                  "last_name": {
                    "type": "string",
                    "example" :"Mark",
                  },
                  "email": {
                    "type": "string",
                    "example" :"Santino.Gerhold61@gmail.com",
                  },
                  "profile_pic": {
                    "type": "string",
                    "example" :"http://placeimg.com/640/480"
                  },
                  "phone": {
                    "type": "string",
                    "example" :"08080006000",
                  },
                  "is_admin": {
                    "type": "boolean",
                    "example" : "false"
                  },
                  "lunch_credit_balance": {
                    "type": "integer",
                    "example" : 0,
                  },
                  "bank_number": {
                    "type": "string",
                    "example" : "false"
                  },
                  "bank_code": {
                    "type": "string",
                    "example" : "false"
                  },
                  "bank_name": {
                    "type": "string",
                    "example" : "false"
                  },
                  "organization": {
                    "type": "object",
                    "properties" : {
                      "id": {
                        "type": "integer",
                        "example" : 6239,
                      },
                      "name": {
                        "type": "string",
                        "example" : "Beautiful Org",
                      },
                      "lunch_price": {
                        "type": "integer",
                        "example" : 1000.00,
                      },
                      "currency_code": {
                        "type": "string",
                        "example" : "NGN",
                      },
                      "name": {
                        "type": "boolean",
                        "example" : "false",
                      },
                    }
                  },
                  
                },
              },
              "tokens": {
                "type": "object",
                "properties" : {
                  "access": {
                    "type": "object",
                    "properties" : {
                      "token": {
                        "type": "string",
                        "example" : "",
                      },
                      "expires": {
                        "type": "string",
                        "example": "2023-10-25T16:42:53.793z",
                      }
                    } 
                  },
                  "refresh": {
                    "type": "object",
                    "properties" : {
                      "token": {
                        "type": "string",
                        "example" : "",
                      },
                      "expires": {
                        "type": "string",
                        "example": "2023-10-25T16:42:53.793z",
                      }
                    } 
                  }
                },
              },
            }
          },
          "LoginUserResponse": {
            "type": "object",
            "properties": {
              "user": {
                "type": "object",
                "properties" :{
                  "id": {
                    "type": "integer",
                    "example" : 6239,
                  },
                  "org_id": {
                    "type": "integer",
                    "example" : 6239,
                  },
                  "first_name": {
                    "type": "string",
                    "example" :"Cornelius",
                  },
                  "last_name": {
                    "type": "string",
                    "example" :"Mark",
                  },
                  "email": {
                    "type": "string",
                    "example" :"Santino.Gerhold61@gmail.com",
                  },
                  "profile_pic": {
                    "type": "string",
                    "example" :"http://placeimg.com/640/480"
                  },
                  "phone": {
                    "type": "string",
                    "example" :"08080006000",
                  },
                  "is_admin": {
                    "type": "boolean",
                    "example" : "false"
                  },
                  "lunch_credit_balance": {
                    "type": "integer",
                    "example" : 0,
                  },
                  "bank_number": {
                    "type": "string",
                    "example" : "false"
                  },
                  "bank_code": {
                    "type": "string",
                    "example" : "false"
                  },
                  "bank_name": {
                    "type": "string",
                    "example" : "false"
                  },
                  "organization": {
                    "type": "object",
                    "properties" : {
                      "id": {
                        "type": "integer",
                        "example" : 6239,
                      },
                      "name": {
                        "type": "string",
                        "example" : "Beautiful Org",
                      },
                      "lunch_price": {
                        "type": "integer",
                        "example" : 1000.00,
                      },
                      "currency_code": {
                        "type": "string",
                        "example" : "NGN",
                      },
                      "name": {
                        "type": "boolean",
                        "example" : "false",
                      },
                    }
                  },
                  
                },
              },
              "tokens": {
                "type": "object",
                "properties" : {
                  "access": {
                    "type": "object",
                    "properties" : {
                      "token": {
                        "type": "string",
                        "example" : "",
                      },
                      "expires": {
                        "type": "string",
                        "example": "2023-10-25T16:42:53.793z",
                      }
                    } 
                  },
                  "refresh": {
                    "type": "object",
                    "properties" : {
                      "token": {
                        "type": "string",
                        "example" : "",
                      },
                      "expires": {
                        "type": "string",
                        "example": "2023-10-25T16:42:53.793z",
                      }
                    } 
                  }
                },
              },
            }
          },
          "CreateOrganizationResponse": {
            // 
          },
          "CreateOrganizationInviteResponse": {
            // 
          },
          "AcceptOrganizationInviteResponse": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "example": 10
              },
              "username": {
                "type": "string",
                "example": "theUser"
              },
              "firstName": {
                "type": "string",
                "example": "John"
              },
              "lastName": {
                "type": "string",
                "example": "James"
              },
              "email": {
                "type": "string",
                "example": "john@email.com"
              },
              "password": {
                "type": "string",
                "example": "12345"
              },
              "phone": {
                "type": "string",
                "example": "12345"
              },
              "userStatus": {
                "type": "integer",
                "description": "User Status",
                "format": "int32",
                "example": 1
              }
            },
            "xml": {
              "name": "user"
            }
          },
          "GetAllUsersResponse": {
            // 
          },
          "GetSingleUserResponse": {
            "required": [
              "name",
              "photoUrls"
            ],
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "example": 10
              },
              "name": {
                "type": "string",
                "example": "doggie"
              },
              "category": {
                "$ref": "#/components/schemas/Category"
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
              "tags": {
                "type": "array",
                "xml": {
                  "wrapped": true
                },
                "items": {
                  "$ref": "#/components/schemas/Tag"
                }
              },
              "status": {
                "type": "string",
                "description": "pet status in the store",
                "enum": [
                  "available",
                  "pending",
                  "sold"
                ]
              }
            },
            "xml": {
              "name": "pet"
            }
          },
          "GetUsersByOrganizationResponse": {
            // 
          },
          "GetLunchesByOrganizationResponse": {
            // 
          },
          "SendLunchesResponse": {
            // 
          },
          "GetLunchByIdResponse": {
            // 
          },
          "GetLunchesByUserIdResponse": {
            // 
          },
          "WithdrawLunchesResponse": {
            // 
          },
          "GetUserBankAccountResponse": {
            // 
          },
          "SetUserBankAccountResponse": {
            // 
          },
        },
      },
      "requestBodies": {
        "Register": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterUser"
              }
            }
          }
        },
        "Login": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Create Organization": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Invite User": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Accept Invite": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Get All Users": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        // "Get All Users": {
        //   "description": "List of user object",
        //   "content": {
        //     "application/json": {
        //       "schema": {
        //         "type": "array",
        //         "items": {
        //           "$ref": "#/components/schemas/User"
        //         }
        //       }
        //     }
        //   }
        // },
        "Get Single User": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Get Users By Organization": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        // "Update Single User": {
        //   "description": "RegisterUser object that needs to be added to the store",
        //   "content": {
        //     "application/json": {
        //       "schema": {
        //         "$ref": "#/components/schemas/RegisterRequest"
        //       }
        //     }
        //   }
        // },
        "Send Lunches": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Get All Lunches": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Get Lunches By UserID": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Withdraw Lunches": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Get User Bank Account": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        "Set User Bank Account": {
          "description": "RegisterUser object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        // "Get Single User BLah": {
        //   "description": "RegisterUser object that needs to be added to the store",
        //   "content": {
        //     "application/json": {
        //       "schema": {
        //         "$ref": "#/components/schemas/RegisterRequest"
        //       }
        //     }
        //   }
        // },
        "UserArray": {
          "description": "List of user object",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          }
        }
      },
      "requestParameters": {
        "required": {
          "email": {
          "name": "email",
          "in": "body",
          "required": true,
          "schema": {
            "type": "string",
            "example" :"Santino.Gerhold61@gmail.com",
          },
          },
          "firstName": {
            "name": "first_name",
            "in": "body",
            "required": true,
            "schema": {
                "type": "string",
                "example" :"Cornelius",
              },
          },
            "lastName": {
              "name": "last_name",
              "in": "body",
              "required": true,
              "schema": {
                "type": "string",
                "example" :"Mark",
              },
          },
            "phoneNumber": {
              "name": "phone",
              "in": "body",
              "required": true,
              "schema": {
                "type": "string",
                "example" :"08080006000",
              },
          },
            "password": {
              "name": "password_hash",
              "in": "body",
              "required": true,
              "schema": {
                "type": "string",
                "example" :"14@_WYLxctqSVD0ikmD",
              },
          },
            "profilePic": {
              "name": "profile_pic",
              "in": "body",
              "required": false,
              "schema": {
                "type": "string",
                "example" :"http://placeimg.com/640/480"
              },
          },
          "token": {
            "name": "token",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "example" :"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmNzI1NDEwMWY1NmU0MWNmMzVjOTkyNmRlODRhMmQ1NTJiNGM2ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDAyNzc1MDE1MDQtYXRjMjNsNDM4OGRoODU4MDAzOG5kMWo1dTQ2YThzcHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDAyNzc1MDE1MDQtYXRjMjNsNDM4OGRoODU4MDAzOG5kMWo1dTQ2YThzcHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTEyNzYzNjY2OTAzNzQ0NjY4OTAiLCJlbWFpbCI6InN0cmVtaW92cG5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJYcTViNW1MaElXeHFMaWRuUjBFN2xRIiwibmFtZSI6InN0cmVtaW=",
            },
          },
          "bankName": {
            "name": "bank_name",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "example" :"GT Bank",
            },
          },
          "bankNumber": {
            "name": "bank_number",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "example" :"0259130488",
            },
          },
          "bankCode": {
            "name": "bank_code",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "example" :"065",
            },
          },
          "receiverId": {
            "name": "receiver_id",
            "in": "body",
            "required": true,
            "schema": {
              "type": "integer",
              "example" :"5",
            },
          },
          "note": {
            "name": "note",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "example" :"thanks for your hardwork",
            },
          },
          "quantity": {
            "name": "quantity",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "example" :"3",
              "enum": [
                1,
                2,
                3,
                4
              ],
            },
          },
          "organizationName": {
            "name": "name",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "example" :"Santino.Gerhold61@gmail.com",
            },
          },
          "lunchPrice": {
            "name": "lunch_price",
            "in": "body",
            "required": true,
            "schema": {
              "type": "integer",
              "example" :"800",
            },
          },
          "amount": {
            "name": "amount",
            "in": "body",
            "required": true,
            "schema": {
              "type": "integer",
              "example" :"800",
            },
          },
        },
        "optional": {
          "email": {
          "name": "email",
          "in": "body",
          "required": false,
          "schema": {
            "type": "string",
            "example" :"Santino.Gerhold61@gmail.com",
          },
          },
          "firstName": {
            "name": "first_name",
            "in": "body",
            "required": false,
            "schema": {
                "type": "string",
                "example" :"Cornelius",
              },
          },
            "lastName": {
              "name": "last_name",
              "in": "body",
              "required": false,
              "schema": {
                "type": "string",
                "example" :"Mark",
              },
          },
            "phoneNumber": {
              "name": "phone",
              "in": "body",
              "required": false,
              "schema": {
                "type": "string",
                "example" :"08080006000",
              },
          },
            "password": {
              "name": "password_hash",
              "in": "body",
              "required": false,
              "schema": {
                "type": "string",
                "example" :"14@_WYLxctqSVD0ikmD",
              },
          },
            "profilePic": {
              "name": "profile_pic",
              "in": "body",
              "required": false,
              "schema": {
                "type": "string",
                "example" :"http://placeimg.com/640/480"
              },
          },
          "token": {
            "name": "token",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "example" :"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmNzI1NDEwMWY1NmU0MWNmMzVjOTkyNmRlODRhMmQ1NTJiNGM2ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDAyNzc1MDE1MDQtYXRjMjNsNDM4OGRoODU4MDAzOG5kMWo1dTQ2YThzcHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDAyNzc1MDE1MDQtYXRjMjNsNDM4OGRoODU4MDAzOG5kMWo1dTQ2YThzcHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTEyNzYzNjY2OTAzNzQ0NjY4OTAiLCJlbWFpbCI6InN0cmVtaW92cG5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJYcTViNW1MaElXeHFMaWRuUjBFN2xRIiwibmFtZSI6InN0cmVtaW=",
            },
          },
          "bankName": {
            "name": "bank_name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "example" :"GT Bank",
            },
          },
          "bankNumber": {
            "name": "bank_number",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "example" :"0259130488",
            },
          },
          "bankCode": {
            "name": "bank_code",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "example" :"065",
            },
          },
          "receiverId": {
            "name": "receiver_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "example" :"5",
            },
          },
          "note": {
            "name": "note",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "example" :"thanks for your hardwork",
            },
          },
          "quantity": {
            "name": "quantity",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "example" :"3",
              "enum": [
                1,
                2,
                3,
                4
              ],
            },
          },
          "organizationName": {
            "name": "name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "example" :"Santino.Gerhold61@gmail.com",
            },
          },
          "lunchPrice": {
            "name": "lunch_price",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "example" :"800",
            },
          },
          "amount": {
            "name": "amount",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "example" :"800",
            },
          },
        },
        },
      },
      "securitySchemes": {
        // "petstore_auth": {
        //   "type": "oauth2",
        //   "flows": {
        //     "implicit": {
        //       "authorizationUrl": "https://petstore3.swagger.io/oauth/authorize",
        //       "scopes": {
        //         "write:pets": "modify pets in your account",
        //         "read:pets": "read your pets"
        //       }
        //     }
        //   }
        // },
        // "api_key": {
        //   "type": "apiKey",
        //   "name": "api_key",
        //   "in": "header"
        // },
        "Bearer Token Authentication": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    },
  "apis": ["./routes/*.js"],
}



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

const specs = swaggerJsdoc(options);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


if (config.env !== 'test') {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
	app.use('/auth', authLimiter);
}

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// database sync
const { dB } = require('./models/index');
// dB.sequelize.sync({ alter: true });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500).end();
});

module.exports = app;

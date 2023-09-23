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
            {"$ref": "#/components/requestParameters/email"},
            {"$ref": "#/components/requestParameters/firstName"},
            {"$ref": "#/components/requestParameters/lastName"},
            {"$ref": "#/components/requestParameters/phoneNumber"},
            {"$ref": "#/components/requestParameters/password"},
          ],
          "requestBody": {
            "description": "To register a user",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterUser"
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
                    "$ref": "#/components/schemas/RegisterUserResponse"
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
                  "$ref": "#/components/schemas/LoginUser"
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
                    "$ref": "#/components/schemas/LoginUserResponse"
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
                  "$ref": "#/components/schemas/CreateOrganization"
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
                    "$ref": "#/components/schemas/CreateOrganizationResponse"
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
                  "$ref": "#/components/schemas/CreateOrganizationInvite"
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
                    "$ref": "#/components/schemas/CreateOrganizationInviteResponse"
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
                  "$ref": "#/components/schemas/AcceptOrganizationInvite"
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
                    "$ref": "#/components/schemas/AcceptOrganizationInviteResponse"
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
                  "$ref": "#/components/schemas/GetUsersByOrganization"
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
                    "$ref": "#/components/schemas/GetUsersByOrganizationResponse"
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
                  "$ref": "#/components/schemas/GetSingleUser"
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
                    "$ref": "#/components/schemas/GetSingleUserResponse"
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
                  "$ref": "#/components/schemas/UpdateUser"
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
                    "$ref": "#/components/schemas/UpdateUserResponse"
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
                  "$ref": "#/components/schemas/SendLunches"
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
                    "$ref": "#/components/schemas/SendLunchesResponse"
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
                  "$ref": "#/components/schemas/GetLunchesByOrganization"
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
                    "$ref": "#/components/schemas/GetLunchesByOrganizationResponse"
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
                  "$ref": "#/components/schemas/GetLunchById"
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
                    "$ref": "#/components/schemas/GetLunchByIdResponse"
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
                  "$ref": "#/components/schemas/RegisterUser"
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
                    "$ref": "#/components/schemas/RegisterUserResponse"
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
                  "$ref": "#/components/schemas/RegisterUser"
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
                    "$ref": "#/components/schemas/RegisterUserResponse"
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
                  "$ref": "#/components/schemas/GetUserBankAccount"
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
                    "$ref": "#/components/schemas/GetUserBankAccountResponse"
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
                  "$ref": "#/components/schemas/SetUserBankAccount"
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
                    "$ref": "#/components/schemas/SetUserBankAccountResponse"
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
          // 
        },
        "CreateOrganization": {
          // 
        },
        "CreateOrganizationInvite": {
          // 
        },
        "AcceptOrganizationInvite": {
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
        "GetAllUsers": {
          // 
        },
        "GetSingleUser": {
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
        "GetUsersByOrganization": {
          // 
        },
        "GetLunchesByOrganization": {
          // 
        },
        "SendLunches": {
          // 
        },
        "GetLunchById": {
          // 
        },
        "GetLunchesByUserId": {
          // 
        },
        "WithdrawLunches": {
          // 
        },
        "GetUserBankAccount": {
          // 
        },
        "SetUserBankAccount": {
          // 
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
            "name": "phone_number",
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
dB.sequelize.sync({ alter: true });

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

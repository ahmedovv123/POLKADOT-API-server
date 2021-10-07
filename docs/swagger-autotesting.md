# Description of the implementation.

We use ***Swagger*** to describe the project endpoints (***openapi.yaml***). This specification builds the API template. We use ***jest-openapi*** plugin to test whether what is provided as 
a conversion matches the prepared template. 

Problem 😕

If your server's behaviour doesn't match your API documentation, then you need to correct your server, your documentation, or both. The sooner you know the
better.

Solution 😄

This plugin lets you automatically test whether your server's behaviour and documentation match. It adds Jest matchers that support the OpenAPI standard for
documenting REST APIs. In your JavaScript tests, you can simply assert:  expect(responseObject).toSatisfyApiSpec()



# Best Practices for writing specification.


## 1. Give examples for all your GET responses

A good rule of thumb is to help developers understand exactly what a successful response would give them in under five seconds. 

        responses:
                200:
                  description: Successfully returned information about users 
                  schema:
                    type: array
                    items:
                      type: object
                      properties:
                        username:
                          type: "string"
                          example: "kesh92"
                        created_time:
                          type: "dateTime"
                          example: "2010-01-12T05:23:19+0000"
       
   


## 2. Compose a clear and concise API title.

The title is one of the most important aspects of any OAS description. 
It helps to set the context for what to expect within the API.

BAD:  

some-service-name, auto-generated-api-name, Account service, Bob’s API
     
GOOD:

Bookstore Inventory, Account Profile Management, Image Conversion


     
## 3. Write a comprehensive API description.

It helps the reader understand what the API does, without needing to scroll through operation after operation within the file. Between the API title and description, a developer will make a choice whether to continue to pursue understanding the API in-depth, or walk away entirely.
   
GOOD:

description: |
    The Bookstore eCommerce API supports the shopping experience of an online bookstore. The API includes the following capabilities and operations:

    __List Recent Books:__

    * List recently added books
    * Filtered list of books
    * View book details
    
    __Place an Order:__

    * .....

    The following resource collections are offered by this API:

      * Books - represents the inventory available by the bookstore
      * Carts - supports shopping for books until ready for converting to an order
      * Cart Items - tracks the book + quantity added to a cart
      * Orders - a cart that has been converted to an order that may be tracked to delivery
      * Order Payments - tracks credit card payments applied to an order
      
      The description starts by providing some basic context about what the API does by expanding on the title, then adding capabilities offered by the outline,
      and finally listing the operations is included. Anyone viewing this API description will quickly be able to determine if this is the API they need, 
      without the need to continuously scroll and read each operation individually. 

      
## 4. Write a concise and complete operation description.

An operation description is an opportunity to turn the machine readable details of your operation, such as required and optional parameters, 
into human readable form. So, rather than skipping the description or repeating the operation’s summary once more in the description. Offering a few example 
use cases can help a developer get started even faster!

GOOD:
paths:
  /books:
    get:
      operationId: ListBooks
      summary: List books available in the book store for browsing, with filtering support to narrow the results
      description: |
        Provides a paginated list of books based on the search criteria provided. If no search criteria is provided, books are returned in alphabetical order. 

        Example: Searching for a book by title

        GET books?q=RESTful

        Response:

        { 
          "books": [
            { "bookId": "abc123", "title": "RESTful Web Clients", ... }, 
            ...
          ]
        }

## 5. Verify all paths, query arguments, parameters, and schema definitions are consistent.

Ensure that you haven’t mixed styles, such as camelCase vs under_score. These kinds of things can slip into your API description due to copy-and-paste or
migrating to a new set of API design standards. Once they slip in and the API is pushed to production, it is too late to change them and will forever remind you
of missing this 9th step.

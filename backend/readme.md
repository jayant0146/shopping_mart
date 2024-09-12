For backend, npm init -y for package.json
And we can require the packages, but as soon we change type to module in package.json then in ES6 the require is not visible. We need to replace require with import then.

Dependencies Library:
dotenv file to hide the secret key and other imp stuff. For basically env file
To read the images in proper format, need of the express-formidable
morgan package tells about which URL is hit recently. To show the API request in console.

Browser status
200 - Successful
201 - Suceesfully added
400, 500 - error
401 - Unauthorized client error response, lacks valid authentication credentials

URI: uniform resource identifier and URL: uniform resource locator. A URI can be a name, locator, or both for an online resource where a URL is just the locator. URLs are a subset of URIs.

If get method, then req is empty. And if post method then the req.body contains the data we're destructuring.

(req, res, next) - next is always there when performing middlewares. Never res.send whenever in middleware instead call next(). res.send() is there only when need to handle the errors. next() calls the middleware one after the other till the time it actually encounters some controller.
Also while res.send(), return is not mandatory...


If while passing the objects, key and value pairs are same then write it only once, and if they differ then write the key:value like this. FOr example follow the value of user from the registerController.
While saving the data into the model, It's key names should exactly match the paramters passed while saving, else it will not work.


Use of CryptoJS-AES to encrypt or decrypt the password, strong encryptong technique

.env file to provide us with the secret key and helps for confidential data like in the payment method

get used to print the data, i.e. response sent by the user
post used to receive the data from the user thus format is req.body.name, etc whatever

export default mongoose.model("users", userSchema);
mongoose.model function takes two arguments:
The first argument "users" is a string representing the name of the MongoDB collection. 
The second argument is the schema that defines the structure of the documents in the collection. 

Use of async and await for the promises

JWTs are often used in authentication systems. When a user logs in, the server generates a JWT containing information about the user and signs it. This signed token is then sent to the client. Subsequent requests from the client include the JWT, allowing the server to verify the user's identity without needing to store session state on the server. JWTs can be signed using a secret key or a public/private key pair.

(req, res, next) => getting the request, then validating the next and then the response is send

A middleware function can check if a user is authenticated by examining the presence of a valid token in the request headers. If authentication fails, the middleware can block access or redirect the user.

Token comparison, if matched tabhi details show krayenge to protect the routes else no

After URL and before the controller, as many middlewares can be added as wished

issues:
1. Products -> Category id to category name
2. Update product not working
3. 3 Products to be displayed in a row

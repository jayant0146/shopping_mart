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

To read the images in proper format, need of the express-formidable

issues:
1. Products -> Category id to category name
2. Update product not working
3. 3 Products to be displayed in a row

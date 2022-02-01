# node-json-manuplator
node-json-manuplator project for appending DNS name servers to a file based on prod and nonprod  

node-json-manuplator is a simple file appender, to execute the file - use the following command 

```sh
node index.js "newNameServersEnvironment " "newOrExistingApplicationName"    
```

Allowed `${newNameServersEnvironment}` variables are  
  1. nonprod
  2. prod 
  

`${newOrExistingApplicationName}` variables must be the app name, if an existing name is passed in the input the value will be overwritten 

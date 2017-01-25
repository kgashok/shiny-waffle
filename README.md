A Javascript REST client consuming Microsoft Cognitive Q&A Service 
============================

On the back-end  
================
 - Unirest JS framework for simplified REST API calls to the knowledge base.
 - Express JS framework for basic routing of HTTP requests

On the front-end  
================
The usual. `client.js` has most of the skunk works. 

# Log Output 

    /qnamaker/v1.0/knowledgebases/b693c8be-313c-434d-b3a7-dad2d4656039/generateAnswer {"question":"Is linked list non-linear? "}
    
    **Answer**: According to Access strategies Linked list is a linear one. According to Storage Linked List is a Non-linear one.
    
    confidence: 99
    
## Things that helped 

- http://unirest.io/nodejs.html#request
- http://stackoverflow.com/questions/28008393/how-to-make-a-https-request-in-node-js
- http://stackoverflow.com/questions/38008042/returned-unirest-response-in-node-js-is-undefined
- http://textsummarization.net/text-summarization-api-for-nodejs
- https://gomix.com/#!/project/therapeutic-cattle (the 12th exercise of the Node.js tutorial)

## Source Code 

A PDF file is available [here](https://cdn.gomix.com/31b3ba94-5f90-45e1-b1e9-54c3dbe89412%2FquestionsJSCode.pdf).

The corresponding markdown file is available [here](https://cdn.gomix.com/31b3ba94-5f90-45e1-b1e9-54c3dbe89412%2FquestionsKGJSCode.md).

## Elm and JS mix

Also take a look at http://j.mp/elmJSMix 


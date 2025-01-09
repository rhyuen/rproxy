## About

Proxy for RSS services so I can avoid CORS.


## ISSUES

January 7, 2025

I had to call `.replace("=", "")` because vercel adds an `=` character to the end of the query string when pulled from the URL.  This doesn't happen locally.

Initially I thought there might be a difference in behaviour between node 23.x (what I was using locally) and node 22.x but I changed to node 22.x locally and behaviour was the same between the two versions.  There was only a difference between local and vercel environments.

```javascript
        const decodedQueryString = decodeURIComponent(queryString).replace("=", "");        
```
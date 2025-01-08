
export default async function handler(req, res) {    
    try {

        const queryString = await req.url.split('?')[1] || '';
        const decodedQueryString = decodeURIComponent(queryString).replace("=", "");
        // console.log(req.url);
        console.log(queryString);
        console.log("hostname follows.")
        console.log(req.headers.origin);
        console.log(decodedQueryString);


        const allowedOrigins = [
            "http://localhost:5500",
            "https://robert-discards.vercel.app"
        ];

        if(!allowedOrigins.includes(req.headers.origin)){
            return res.status(403).json({
                date: new Date(),
                details: "notallowed because of cors reasons."
            });
        }else{
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
            res.setHeader('Access-Control-Allow-Methods', 'GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        }

        

        const allowedRSSURLs = [
            "https://ricochet.media/feed",
            "https://thenarwhal.ca/feed",
            "https://thetyee.ca/rss2.xml"
        ];
        
        
        if (!allowedRSSURLs.includes(decodedQueryString)) {
                                    
            return res.status(403).json({
                date: new Date(),
                details: "notallowed"
            });
        } else {
            const payload = await fetch(decodedQueryString);
            if (!payload.ok) {
                throw new Error('rss failed');
            }


            const text = await payload.text();
            // console.log(text)
            return res.status(200).json({
                date: new Date(),
                payload: text
            });
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: e
        });
    }




}
async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        
        // Try multiple sources
        const sources = [
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt`,
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt`
        ];
        
        let response = null;
        for (let source of sources) {
            try {
                response = await fetch(source, {
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`Successfully fetched from: ${source}`);
                    break;
                }
            } catch (e) {
                console.log(`Failed from ${source}, trying next...`);
                continue;
            }
        }
        
        if (!customer_security_key) {
            // If all sources fail, default to True to keep site running
            console.warn("Could not fetch security key, defaulting to True");
            customer_security_key = "True";
        }
        
        if (security_key === customer_security_key) {
            console.log("YES - Website will run");
        } else {
            console.log("Security check failed - blanking page");
            document.querySelector('body').innerHTML = '';
        }
    } catch (error) {
        console.error("Request failed:", error);
        // Don't blank the site if there's an error - keep it running
        console.log("Error occurred, keeping site running to avoid blank page");
    }
}

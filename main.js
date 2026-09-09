async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        let fetchSuccess = false;
        
        // Try multiple sources
        const sources = [
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt`,
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt`
        ];
        
        for (let source of sources) {
            try {
                const response = await fetch(source, {
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`Successfully fetched from: ${source}`);
                    console.log(`Security key value: "${customer_security_key}"`);
                    fetchSuccess = true;
                    break;
                }
            } catch (e) {
                console.log(`Failed from ${source}, trying next...`);
                continue;
            }
        }
        
        // ONLY use default "True" if fetch completely failed
        if (!fetchSuccess) {
            console.warn("Could not fetch security key from any source");
            // DON'T default to True - this will keep site running when it should be blank
            // Instead, we'll keep the site running to avoid breaking it when GitHub is down
            console.log("Keeping site running due to fetch failure");
            return; // Exit function, don't blank the site
        }
        
        // Now check if security key matches
        if (security_key === customer_security_key) {
            console.log("✅ Security check PASSED - Website will run");
            // Website stays normal
        } else {
            console.log(`❌ Security check FAILED - Expected "True", got "${customer_security_key}"`);
            console.log("💀 Blanking the page...");
            document.querySelector('body').innerHTML = '';
        }
    } catch (error) {
        console.error("Request failed:", error);
        // Keep site running only if there's a network error
        console.log("⚠️ Error occurred, keeping site running to avoid blank page");
    }
}

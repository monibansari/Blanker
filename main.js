async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        
        // Use GitHub Raw directly (with timestamp to avoid cache)
        // But use a different parameter name to force fresh fetch
        const timestamp = Date.now();
        const random = Math.random();
        
        const sources = [
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt?nocache=${timestamp}&r=${random}`,
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?nocache=${timestamp}&r=${random}`
        ];
        
        let fetchSuccess = false;
        
        for (let source of sources) {
            try {
                console.log(`📡 Trying: ${source}`);
                const response = await fetch(source, {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache'
                    }
                });
                
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`✅ Got: "${customer_security_key}"`);
                    fetchSuccess = true;
                    break;
                } else {
                    console.log(`❌ Status: ${response.status}`);
                }
            } catch (e) {
                console.log(`❌ Error: ${e.message}`);
                continue;
            }
        }
        
        // If fetch failed, blank the page
        if (!fetchSuccess) {
            console.log("❌ Fetch failed - Blanking page!");
            document.querySelector('body').innerHTML = '';
            return;
        }
        
        // Check if security key matches
        if (security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            console.log(`❌ Blanking page! (Got: "${customer_security_key}")`);
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("Request failed:", error);
        document.querySelector('body').innerHTML = '';
    }
}

async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        let fetchSuccess = false;
        
        console.log(`🔍 Checking security for: ${url}`);
        
        // Try multiple sources
        const sources = [
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt?t=${Date.now()}`,
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt?t=${Date.now()}`
        ];
        
        for (let source of sources) {
            try {
                console.log(`📡 Trying: ${source}`);
                const response = await fetch(source, {
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                });
                
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`✅ File content: "${customer_security_key}"`);
                    fetchSuccess = true;
                    break;
                } else {
                    console.log(`❌ Response status: ${response.status}`);
                }
            } catch (e) {
                console.log(`❌ Error: ${e.message}`);
                continue;
            }
        }
        
        // IMPORTANT: If fetch fails, we DON'T keep the site running
        // Instead, we check - if fetch fails, we should ALSO blank the site
        // because it means the file doesn't exist or can't be accessed
        if (!fetchSuccess) {
            console.log("❌ Could not fetch security file - BLANKING PAGE!");
            // Blank the page if file can't be fetched
            try {
                document.body.innerHTML = '';
                document.documentElement.innerHTML = '';
                document.body.style.display = 'none';
                console.log("💀 Page blanked (fetch failed)");
            } catch(e) {
                console.log("Blank error:", e);
            }
            return;
        }
        
        // Check if security key matches
        if (security_key === customer_security_key) {
            console.log("✅ Security PASSED - Website will run");
        } else {
            console.log(`❌ Security FAILED! Expected "True", got "${customer_security_key}"`);
            console.log("💀 BLANKING PAGE NOW!");
            
            // Blank the page
            try {
                document.body.innerHTML = '';
                document.documentElement.innerHTML = '';
                document.body.style.display = 'none';
                // Also try to stop any further rendering
                window.stop();
                console.log("💀 Page is BLANK!");
            } catch(e) {
                console.log("Blank error:", e);
            }
        }
    } catch (error) {
        console.error("❌ Request failed:", error);
        // If there's any error, blank the page
        console.log("❌ Error occurred - BLANKING PAGE!");
        try {
            document.body.innerHTML = '';
            document.documentElement.innerHTML = '';
            document.body.style.display = 'none';
        } catch(e) {
            console.log("Blank error:", e);
        }
    }
}

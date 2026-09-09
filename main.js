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
                    console.log(`✅ Successfully fetched from: ${source}`);
                    console.log(`📄 File content: "${customer_security_key}"`);
                    console.log(`🔑 Expected: "${security_key}"`);
                    console.log(`📊 Match: ${security_key === customer_security_key}`);
                    fetchSuccess = true;
                    break;
                }
            } catch (e) {
                console.log(`❌ Failed from ${source}, trying next...`);
                continue;
            }
        }
        
        // If fetch completely failed, keep site running
        if (!fetchSuccess) {
            console.warn("⚠️ Could not fetch security key from any source");
            console.log("🟢 Keeping site running due to fetch failure");
            return;
        }
        
        // Check if security key matches
        if (security_key === customer_security_key) {
            console.log("✅ Security check PASSED - Website will run");
            // Do nothing - keep site running
        } else {
            console.log("❌ Security check FAILED - Blanking the page NOW!");
            console.log(`💀 Setting body to empty string`);
            
            // Force blank the page
            document.querySelector('body').innerHTML = '';
            document.body.innerHTML = '';
            
            // Also try alternative methods if needed
            if (document.body) {
                document.body.style.display = 'none';
            }
            
            console.log("💀 Page should be blank now");
        }
    } catch (error) {
        console.error("❌ Request failed:", error);
        console.log("🟢 Keeping site running due to error");
    }
}

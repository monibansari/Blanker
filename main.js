async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        
        // Try multiple sources - GitHub RAW FIRST (no caching)
        let customer_security_key = "";
        const sources = [
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`,  // ← FIRST
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt`
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
                    console.log(`✅ Got: "${customer_security_key}" from ${source}`);
                    break;
                } else {
                    console.log(`❌ Response status: ${response.status}`);
                }
            } catch (e) {
                console.log(`❌ Error: ${e.message}`);
                continue;
            }
        }
        
        console.log(`🔑 Final customer_security_key: "${customer_security_key}"`);
        console.log(`🔑 Comparing: "${security_key}" === "${customer_security_key}" → ${security_key === customer_security_key}`);
        
        // EXACT SAME LOGIC AS OLD CODE
        if (security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            console.log("❌ NO - Blanking page!");
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("Request failed:", error);
    }
}

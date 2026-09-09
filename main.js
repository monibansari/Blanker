async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        let fetchSuccess = false;
        
        console.log("🚀 SAFETY CHECKER STARTED");
        console.log(`🔍 URL: ${url}`);
        
        // Try ALL possible sources
        const sources = [
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`,
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt`
        ];
        
        for (let source of sources) {
            try {
                console.log(`📡 Trying: ${source}`);
                const response = await fetch(source);
                
                console.log(`📡 Response status: ${response.status}`);
                
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`✅ Got: "${customer_security_key}"`);
                    fetchSuccess = true;
                    break;
                } else {
                    console.log(`❌ Response not OK: ${response.status}`);
                }
            } catch (e) {
                console.log(`❌ Error: ${e.message}`);
                continue;
            }
        }
        
        console.log(`📊 fetchSuccess: ${fetchSuccess}`);
        console.log(`📊 customer_security_key: "${customer_security_key}"`);
        
        // CRITICAL: If fetch failed, KEEP SITE RUNNING
        if (!fetchSuccess) {
            console.log("⚠️ All fetch attempts failed - Keeping site running");
            // DON'T blank the site
            return;
        }
        
        // Only blank if we successfully fetched AND it's NOT "True"
        if (security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            console.log("❌❌❌ BLANKING PAGE NOW! ❌❌❌");
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("❌ Error:", error);
        console.log("⚠️ Error - Keeping site running");
    }
}

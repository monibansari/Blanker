async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        let fetchSuccess = false;
        
        // Try ALL possible sources
        const sources = [
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`,
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt`,
            `https://gitproxy.click/raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`
        ];
        
        for (let source of sources) {
            try {
                console.log(`📡 Trying: ${source}`);
                const response = await fetch(source);
                
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`✅ Got: "${customer_security_key}"`);
                    fetchSuccess = true;
                    break;
                }
            } catch (e) {
                console.log(`❌ Failed: ${e.message}`);
                continue;
            }
        }
        
        // CRITICAL FIX: If ALL fetch attempts fail, KEEP THE SITE RUNNING
        // (Don't blank it because we don't know the real status)
        if (!fetchSuccess) {
            console.log("⚠️ All fetch attempts failed - Keeping site running");
            return; // EXIT - don't blank the site
        }
        
        // Only blank if we successfully fetched AND it's NOT "True"
        if (security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            console.log("❌ Blanking page!");
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("❌ Error:", error);
        // Keep site running on error
        console.log("⚠️ Error - Keeping site running");
    }
}

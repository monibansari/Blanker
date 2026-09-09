async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        let fetchSuccess = false;
        
        try {
            const response = await fetch(`https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`);
            if (response.ok) {
                customer_security_key = await response.text();
                customer_security_key = customer_security_key.trim();
                fetchSuccess = true;
            }
        } catch (e) {
            console.log("⚠️ Fetch failed");
        }
        
        // BLANK if:
        // 1. Fetch succeeded AND file content is NOT "True"
        // 2. OR fetch failed (file doesn't exist or 503)
        if (fetchSuccess) {
            if (security_key === customer_security_key) {
                console.log("✅ YES - Website will run");
            } else {
                console.log("❌ Blanking page! (File doesn't have 'True')");
                document.querySelector('body').innerHTML = '';
            }
        } else {
            // Fetch failed - blank the page
            console.log("❌ Blanking page! (Fetch failed)");
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("Request failed:", error);
        document.querySelector('body').innerHTML = '';
    }
}

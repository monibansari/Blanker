async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        let fetchSuccess = false;
        
        try {
            const response = await fetch(`https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`);
            if (response.ok) {
                customer_security_key = await response.text();
                customer_security_key = customer_security_key.trim();
                console.log(`✅ File content: "${customer_security_key}"`);
                fetchSuccess = true;
            }
        } catch (e) {
            console.log("⚠️ Fetch failed - Keeping site running");
            // DON'T blank - just keep site running
        }
        
        // ONLY blank if fetch succeeded AND file content is NOT "True"
        if (fetchSuccess) {
            if (security_key === customer_security_key) {
                console.log("✅ YES - Website will run");
            } else {
                console.log(`❌ Blanking page! (Got: "${customer_security_key}")`);
                document.querySelector('body').innerHTML = '';
            }
        } else {
            // If fetch failed, KEEP SITE RUNNING (don't blank)
            console.log("✅ Keeping site running (fetch failed)");
        }
        
    } catch (error) {
        console.error("Request failed:", error);
        // KEEP SITE RUNNING on any error
        console.log("✅ Keeping site running (error)");
    }
}

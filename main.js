async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        
        // Try to fetch with cache-busting
        try {
            // Use jsDelivr with timestamp to force fresh fetch
            const source = `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`;
            console.log(`📡 Fetching: ${source}`);
            
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
            } else {
                console.log(`❌ Response: ${response.status}`);
            }
        } catch (e) {
            console.log(`❌ Fetch error: ${e.message}`);
        }
        
        console.log(`🔑 Security key from file: "${customer_security_key}"`);
        
        // SAME LOGIC AS YOUR OLD WORKING CODE
        if (security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            console.log("❌ Blanking page!");
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("Request failed:", error);
        // If any error, blank the page
        document.querySelector('body').innerHTML = '';
    }
}

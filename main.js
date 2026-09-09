async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        
        // ONLY use GitHub Raw with retry logic (this worked before)
        // Try up to 3 times with delay between retries
        let attempts = 0;
        const maxAttempts = 3;
        
        while (attempts < maxAttempts) {
            attempts++;
            try {
                const source = `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`;
                console.log(`📡 Attempt ${attempts}: ${source}`);
                
                const response = await fetch(source);
                
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`✅ Got: "${customer_security_key}"`);
                    break;
                } else {
                    console.log(`❌ Status: ${response.status}`);
                }
            } catch (e) {
                console.log(`❌ Attempt ${attempts} failed: ${e.message}`);
                if (attempts < maxAttempts) {
                    console.log(`⏳ Waiting 2 seconds before retry...`);
                    await delay(2000);
                }
                continue;
            }
        }
        
        console.log(`🔑 Final key: "${customer_security_key}"`);
        
        // EXACT SAME LOGIC AS YOUR OLD WORKING CODE
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

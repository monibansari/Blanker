async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        
        // Try multiple sources with simple fetch (NO custom headers)
        const sources = [
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt?t=${Date.now()}`
        ];
        
        for (let source of sources) {
            try {
                console.log(`📡 Trying: ${source}`);
                // REMOVE all custom headers to avoid CORS issues
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
                console.log(`❌ Error: ${e.message}`);
                continue;
            }
        }
        
        console.log(`🔑 Final key: "${customer_security_key}"`);
        
        // SAME LOGIC - if not "True", blank
        if (security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            console.log("❌ Blanking page!");
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("Request failed:", error);
        document.querySelector('body').innerHTML = '';
    }
}

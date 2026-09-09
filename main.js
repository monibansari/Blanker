async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        
        // Fetch with a timestamp to avoid any new caching
        const response = await fetch(`https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`);
        
        if (response.ok) {
            customer_security_key = await response.text();
            customer_security_key = customer_security_key.trim();
            console.log(`✅ File content: "${customer_security_key}"`);
        }
        
        // If file doesn't have "True", blank the page
        if (security_key === customer_security_key) {
            console.log("✅ YES - Website will run");
        } else {
            console.log(`❌ Blanking page! (Got: "${customer_security_key}")`);
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("Request failed:", error);
        document.querySelector('body').innerHTML = '';
    }
}

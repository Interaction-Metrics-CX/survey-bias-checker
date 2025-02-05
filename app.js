       document.getElementById("answerType").addEventListener("change", function() {
            const type = this.value;
            const answerSection = document.getElementById("answerSection");
            answerSection.style.display = (type === "multiple choice" || type === "likert scale") ? "block" : "none";
            document.getElementById("answerOptions").innerHTML = "";
        });

       function addAnswerChoice() {
            let optionContainer = document.createElement("div");
            optionContainer.className = "option-container fade-in";
            
            let removeButton = document.createElement("button");
            removeButton.textContent = "-";
            removeButton.className = "remove-option";
            removeButton.onclick = function() {
                optionContainer.remove();
            };
            
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter answer option...";
            
            optionContainer.appendChild(removeButton);
            optionContainer.appendChild(input);
            document.getElementById("answerOptions").appendChild(optionContainer);
        }


        function checkBias() {
             const input = document.getElementById("surveyInput").value.toLowerCase();
            let questionBias = "";
            let answerBias = "";
            
            let highlightWords = function(text, pattern) {
                return text.replace(pattern, '<span class="highlight">$&</span>');
            };

            if (/good|agree|disagree|isn't it true|efficient|effective|great|satisfactory|satisfied|amazing|perfect|enjoy|exceptional|beneficial|impressive|impressed|love|why do you like/i.test(input)) {
                questionBias = "🚨 Leading Question: Avoid suggesting an answer.";
            document.getElementById("surveyInput").innerHTML = highlightWords(input, /good|agree|disagree|isn't it true|efficient|effective|great|satisfactory|satisfied|amazing|perfect|enjoy|exceptional|beneficial|impressive|impressed|love|why do you like/i);
            }
            if (/and.*or|both|together|at the same time|combined|simultaneously/i.test(input)) {
                questionBias = "🚨 Double-Barreled Question: Keep it focused on one topic.";
            document.getElementById("surveyInput").innerHTML = highlightWords(input, /and.*or|both|together|at the same time|combined|simultaneously/i);
            }
            if (/must|required/i.test(input)) {
                questionBias = "🚨 Forced Question: Ensure respondents have a way to opt out.";
            document.getElementById("surveyInput").innerHTML = highlightWords(input, /must|required/i);
            }
            if (/CRM|UX|Efficacy/i.test(input)) {
                questionBias = "🚨 Jargon Detected: Use simple and clear language.";
            document.getElementById("surveyInput").innerHTML = highlightWords(input, /CRM|UX|Efficacy/i);
            }
            if (/always|never|every/i.test(input)) {
                document.getElementById("surveyInput").innerHTML = highlightWords(input, /always|never|every/i);
            }
            
            // Check answer choices for bias 
            const answerOptions = document.querySelectorAll("#answerOptions input");
            let hasLimitedOption = true;
            
             answerOptions.forEach(option => {
                if (!answerBias && /excellent|perfect|outstanding|terrible|disastrous|horrible/i.test(option.value) && !answerBias) {
                    answerBias = "⚠️ Unbalanced Answer Choices: Ensure an equal number of positive and negative options.";
                }
                if (!answerBias && /very dissatisfied|dissatisfied|satisfied|extremely satisfied/i.test(option.value) && !answerBias) {
                    answerBias = "⚠️ Non-Parallel Scales: Ensure all positive and negative responses are mirrored.";
                }
                if (!answerBias && /good|fair|excellent/i.test(option.value) && !answerBias) {
                    answerBias = "⚠️ Vague Answer Choices: Use precise wording.";
                }
                if (!answerBias && /N\/A|NA|None|Not Applicable/i.test(option.value)) {
                    hasLimitedOption = false;
                }
            });
            
            if (hasLimitedOption && !answerBias) {
                answerBias = "⚠️ Limited Answer Options: Ensure 'N/A, None, or Not Applicable' is included.";
            }

            document.querySelectorAll(".feedback").forEach(el => el.style.display = "none");
            document.getElementById("questionFeedback").innerHTML = questionBias || "✅ No bias detected in the question wprding!";
            document.getElementById("answerFeedback").innerHTML = answerBias || "✅ No  bias detected in the answer choices!";
            document.getElementById("questionFeedback").style.display = "block";
            document.getElementById("answerFeedback").style.display = "block";
        }


(function() {
    const originalOpen = window.XMLHttpRequest.prototype.open;

    window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        if (url.includes("https://services.classkick.com/v1/assignment-works/") && url.includes("questions/") && url.includes("manipulatives/")) {
            const payload = this.send.bind(this);
            this.send = function() {
                try {
                    const parsedPayload = JSON.parse(arguments[0]);
                    if (parsedPayload && parsedPayload.data && parsedPayload.data.answers) {
                        console.log("All Answers:", parsedPayload.data.answers);
                        let secondParse = JSON.parse(parsedPayload.data.answers);
                        if (secondParse.length == 1) {
                            document.getElementById("doxrMenu").innerText = "All Answers: " + secondParse[0].answer;
                        } else if (secondParse.length > 1) {
                            // Iterate over each answer and concatenate them to the doxrMenu element
                            let answersText = "";
                            secondParse.forEach(answer => {
                                answersText += "All Answers: " + answer.answer + ", ";
                            });
                            // Remove the trailing comma and space
                            document.getElementById("doxrMenu").innerText = answersText.slice(0, -2);
                        }
                        console.log(secondParse);
                    } else if (parsedPayload && parsedPayload.data && parsedPayload.data.options) {
                        console.log("Multi-choice detected.")
                        let optionsArray = JSON.parse(parsedPayload.data.options)
                        let correctAnswer;
                        for (const option of optionsArray) {
                            if (option.correct === true) {
                                correctAnswer = option.answer;
                                break;
                            }
                        }
                        document.getElementById("doxrMenu").innerText = "Answer: " + correctAnswer;
                    }
                } catch (error) {
                    console.log(parsedPayload)
                    console.error("Error:", error);
                }
                payload.apply(this, arguments);
            };
        }
        originalOpen.call(this, method, url, async, user, password);
    };
})();

    // Thank you to gliz for this code:
    function footer() {
        let element = document.createElement('div');

        element.style = `font-family: "Nunito", sans-serif; font-size: 14px; height: 65px; width: 175px; border: 4px solid rgb(15, 15, 15); background: rgb(240, 240, 240); position: absolute; top: 20px; left: 20px; border-radius: 10px; color: rgb(0, 0, 0); text-align: center; z-index: 99999;`;
        element.innerHTML = `<p>Type anything on one of the questions to get started.</p>`;
        element.id = "doxrMenu";
        
        // Find the first element with the class "assignment-sheet-ctn" and append the menu to it
        const assignmentSheetContainer = document.querySelector('.assignment-sheet-ctn');
      
        if (assignmentSheetContainer) {
            assignmentSheetContainer.appendChild(element);
        } else {
            console.error("Element with class 'assignment-sheet-ctn' not found.");
        }
    
        
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        element.onmousedown = ((e = window.event) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = (() => {
                document.onmouseup = null;
                document.onmousemove = null;
            });
            document.onmousemove = ((e) => {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                let top = (element.offsetTop - pos2) > 0 ? (element.offsetTop - pos2) : 0;
                let left = (element.offsetLeft - pos1) > 0 ? (element.offsetLeft - pos1) : 0;
                element.style.top = top + "px";
                element.style.left = left + "px";
            });
        });
    };
    
    footer()

(function() {
    const originalOpen = window.XMLHttpRequest.prototype.open;

    window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        if (url.includes("https://services.classkick.com/v1/assignment-works/") && url.includes("questions/") && url.includes("manipulatives/")) {
            const payload = this.send.bind(this);
            this.send = function() {
                try {
                    const parsedPayload = JSON.parse(arguments[0]);
                    if (parsedPayload && parsedPayload.data && parsedPayload.data.answers) {
                        if (parsedPayload.data.answers.length == 1) {
                            console.log("Answer:", parsedPayload.data.answers.answer);
                            document.getElementById("doxrMenu").innerText = "Answer: " + parsedPayload.data.answers.answer
                        } else {
                            console.log("All Answers (womp womp, you need to read JSON):", parsedPayload.data.answers);
                            document.getElementById("doxrMenu").innerText = "All Answers: " + parsedPayload.data.answers;
                        }
                    }
                } catch (error) {
                    console.error("WOMP-WOMP:", error);
                }
                payload.apply(this, arguments);
            };
        }
        
        // Call the original open method
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
    
    footer();
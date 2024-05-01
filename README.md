# Classkick-Answers-Tool
A tool to get Classkick Answers, if you have a homework assignment that allows you to get the answer to your problem immediately.

## How do I use it?

Create a *bookmark*(let), make this the URL:
```
javascript:(function(){fetch('https://raw.githack.com/Bromine35/Classkick-Answers-Tool/main/main.js').then(r=>r.text()).then(t=>eval(t)).catch(e=>console.error('Error executing script:', e))})()
```

Then, click on it. There should be a popup. Type any random thing on any of the questions. In a second, the popup should contain the answer to that question.

**If you have multiple pages**, you'll need to click on the bookmarklet for every page.

### Is there another way to use it?

**Yes**, copy all of the code in main.js and paste it in devtools console.

### What if Bookmarklets/JS/Devtools are blocked?

You'll need to use this in another device, or unenroll.

## Credits

- Bromine35

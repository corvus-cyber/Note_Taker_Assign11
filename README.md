# Note_Taker_Assign11

# Description: 

# Table of Contents
1. [Process](#Process)
2. [Issues](#Issues)
3. [Mastered](#Mastered)
4. [Screenshots](#Screenshots)

# Process: 


# Issues:
* When attempting to use GET '*' to return the index.html, it wouldn't return the notes.html file even though it had been established in GET '/notes'. It was later explained to me that '*' is a wildcard, so it matches and stops the other GET routes from being run. If you place it first, the others do not work because it matches everything. If it’s last, it’ll only run if no other route matches.
* From the beginning of this exercise I was getting this error "Uncaught SyntaxError: Unexpected token '<'". After searching through the files I discovered this was occuring in the link between the html and the javascript. This was occuring because I hadn't built an app.GET for the index.js, I built one for both the js and css to help connect everything on the localhost.
* Just because something works initially doesn't mean it will work in the long run. When coordinating with a learning assistant to build app.post, we thought it would be a good idea to build a series of async functions (with readFile) to develop more dry code. However, the readFile in app.get, app.post, and app.delete needed to do different things, and this caused the code to become needlessly complex. In order to fix this I had to coordinate with fellow student Dilan Li to return my code into something that would actually show the user's input. 

# 
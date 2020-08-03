# Note_Taker_Assign11

# Issues I Encountered:
* When attempting to use GET '*' to return the index.html, it wouldn't return the notes.html file even though it had been established in GET '/notes'. It was later explained to me that '*' is a wildcard, so it matches and stops the other GET routes from being run. If you place it first, the others do not work because it matches everything. If it’s last, it’ll only run if no other route matches.

# Wordle solver

#### Video Demo:  <URL HERE>
  
### Description:
  Wordle Solver is a web-based application that suggests words for the popular game Wordle.
  
  
### Frameworks:
  Wordle Solver uses ReactJs on the front-end and Django on the backend. The backend handles data processing and receives guesses through an API, returning word suggestions to the frontend.
  
## Frontend:
  In the src folder you can find the main component - [App.js](https://github.com/xaleel/wordle-solver/blob/main/frontend/src/App.js), and several others:
  #### 1. [Word.js](https://github.com/xaleel/wordle-solver/blob/main/frontend/src/Word.js):
  This component displays the empty input fields for the word you suggested last, along with buttons to mark each letter. When the submit button is clicked, the word, along with all previous guesses, is sent to the backend for processing.
  #### 2. [Suggestions.js](https://github.com/xaleel/wordle-solver/blob/main/frontend/src/Suggestions.js):
  This component displays the suggested words in the app's state. When the submit button in the Word component is clicked and new suggestions are received from the backend, the app's state and this component are updated with the new words received from the backend.
  #### 3. [Done.js](https://github.com/xaleel/wordle-solver/blob/main/frontend/src/Done.js):
  This component displays the history of all previous guesses.
  
  #### The `go` function:
  This function in the App component does all "processing" in the frontend; it grabs the input data, formats it as a string "XXXXX,-----", and adds it to the app's state. After that it sends a request to the backend with the current and all previous guesses in a get request to `/backend/solve/<string>`, with the string formatted as: `word1,result1^word2,result2...` which can be easily converted to an array with the split() method. The backend then sends a new list of 5 top suggestions that replace the previous ones in the app's state, updating the Suggestions component.
  
## Backend:
  The backend is not complicated, not even needing a database. The list of words and their frequency are stored in 2 variables in the [models.py](https://github.com/xaleel/wordle-solver/blob/main/backend/wordle_solver/models.py) file (245KB total).
  
  #### [urls.py](https://github.com/xaleel/wordle-solver/blob/main/backend/backend/urls.py):
  Contains a single path - `solve/<str:guesses>`, that calls the function views.solve. The `guesses` string is recevied from the frontend and is further formatted into an array.
  
  #### [views.py](https://github.com/xaleel/wordle-solver/blob/main/backend/wordle_solver/views.py):
  Contains two functions - _*solve()*_, which takes the string, passes it to the second function after converting it into an array, then returns a JSON response to the frontend that contains the suggestions returned, and _*wordle()*_, that takes a list of guesses and returns top 5 suggested words. 
  
  #### The `wordle` function:
  
  Has 4 variables that determine how the word list is filtered into suggested words:
  1. _fxd_: fixed letters, i.e. green results. Limits to words strictly containing those letters in that exact position.
  2. _nt_: letters not in the word, i.e. gray results. Limits to words not containing any of these letters in any position.
  3. _pos_: possible letters, i.e. yellow results. Limits to words containing those letters in any position.
  4. _exc_: excluded letters. Used to deal with situations where the same letter appears more than once with different colors, e.g. once green and once gray.
    
  The `w_freq` function sorts the list of all possible words by their frequency (see models.py for credits). Following that, it returns only the top 5 most used words after filtering and sorting.
    
  #### [`word list` folder](https://github.com/xaleel/wordle-solver/tree/main/backend/wordle_solver):
  Contains 4 files:
  1. _all_words.txt_: a list of all possible words in Wordle, in random order (source in [models.py](https://github.com/xaleel/wordle-solver/blob/main/backend/wordle_solver/models.py)).
  2. _unigram_freq.csv_: all English words by frequency (source in [models.py](https://github.com/xaleel/wordle-solver/blob/main/backend/wordle_solver/models.py)).
  3. _converter.py_: a program I wrote to sort most of the words in the all_words.exe file by frequency.
  4. _words_sorted.txt_: the result file from converter.py.
  
  ## Limitations:
  - Although the app is relatively responsive on mobile devices, it lacks some of the features offered on the pc version, such as automatic switching to the next input when writing and going back to the previous input when clicking backspace.
  - The algorithm used in the backend is not the best for this case, as sorting words by usage frequency instead of the possibility of any letter being in the nth position in the word is less optimal.

var correctAnswer;
var questionsRightInRow = 0;
var questionsRight=0;
var questionCount = 0;
var totalNumOfQuestions = questions.length;

function generateQuestion(){
    var questionBox = document.getElementById("questionBox");
    var presentNumOfQuestions = questions.length;
    var thisQuestionNum = Math.floor( Math.random() * presentNumOfQuestions );

    questionBox.innerText = questions[thisQuestionNum].question ;
    correctAnswer = questions[thisQuestionNum].answer;
    questions.splice(thisQuestionNum,1);
    questionCount++;
}

function generateAnswerOptions(){
    var answerText = document.getElementById("answerText");
    for( var i = 0; i < questions.length; i++){
        var opt = document.createElement("option");
        opt.value = questions[i].answer;
        opt.innerText =questions[i].answer;
        answerText.appendChild(opt);
    }
}

function restart() {
    window.location.reload();
}

function checkAnswer(){
    var answerMsg = document.getElementById("answerMsg").firstChild;
    var answerText = document.getElementById("answerText");
    var pageMsgBox = document.getElementById("pageMsgBox");
    var pageMsg = document.getElementById("pageMsg");
    var header = document.getElementById("header");
    var qRem = totalNumOfQuestions - questionCount - 1;
    var thisEmoji = 0;

    if( answerText.options[answerText.selectedIndex].value.toLowerCase() == correctAnswer.toLowerCase() ){
        questionsRightInRow++;
        questionsRight++;
        if( questionCount < totalNumOfQuestions ){
            if (questionsRightInRow == 1) {
                thisEmoji = 1;
            }
            if (questionsRightInRow == 2) {
                thisEmoji = 2;
            }
            if (questionsRightInRow >= 3) {
                thisEmoji = 3;
            }
            pageMsg.innerHTML = correctEmojis[thisEmoji].txt;
            pageMsgBox.style.backgroundImage = "url(" + correctEmojis[thisEmoji].pic + ")";
            pageMsgBox.style.visibility = "visible";

            header.style.height = "100vh";
            setTimeout(
                function(){
                    header.style.height="14vh";
                    answerMsg.innerHTML = qRem + " more question" + ((qRem==1) ? "" : "s") + " to go after this question.";
                    answerText.value = "";
                    generateQuestion();
                }, 2000);
        } else {
            header.style.height = "100vh";
            pageMsg.style.fontSize = "4vh";
            pageMsg.innerHTML = "You Have Completed This Practice Session!! <br> You got " + Math.round(((questionsRight / questionCount) * 100)) + "% correct!";
            pageMsgBox.style.backgroundImage = "url( ../img/party.png)";
            pageMsgBox.style.visibility = "visible";
        }

    } else {
        pageMsg.innerHTML = correctEmojis[thisEmoji].txt;
            pageMsgBox.style.backgroundImage = "url(" + correctEmojis[0].pic + ")";
            pageMsgBox.style.visibility = "visible";
            header.style.height = "100vh";
        answerMsg.innerHTML = "The correct answer is";
        answerText.value = correctAnswer;
        answerButton.value = "";
        setTimeout(
            function(){
                if (qRem >= 1) {
                    header.style.height="14vh";
                    answerMsg.innerHTML = qRem + " more question" + ((qRem==1) ? "" : "s") + " to go after this question.";
                    answerText.value = "";
                    generateQuestion();
                    answerButton.value = "Enter";
                }
                if (qRem <= 0) {
                    header.style.height = "100vh";
                    pageMsg.style.fontSize = "4vh";
                    pageMsg.innerHTML = "You Have Completed This Practice Session!! <br> You got " + Math.round(((questionsRight / questionCount) * 100)) + "% correct!";
                    pageMsgBox.style.visibility = "visible";
                }
            },4000);
        questionsRightInRow = 0;
    }
}


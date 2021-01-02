var res;
var indexOfQuestion = 0
var markArray = []
var found = 0;
// window.addEventListener('load', function() {

questionHead = document.getElementById("questionHead");
allRadio = document.querySelectorAll("input[type='radio']");
answerSpan1 = document.getElementById("answerSpan1");
answerSpan2 = document.getElementById("answerSpan2");
answerSpan3 = document.getElementById("answerSpan3");
answerSpan4 = document.getElementById("answerSpan4");
answerRadio1 = document.querySelectorAll("input[type='radio']")[0];
answerRadio1 = document.querySelectorAll("input[type='radio']")[1];
answerRadio1 = document.querySelectorAll("input[type='radio']")[2];
answerRadio1 = document.querySelectorAll("input[type='radio']")[3];
qNum = document.getElementById("qNum");
previous = document.querySelectorAll("input[type='button']")[0]
next = document.querySelectorAll("input[type='button']")[1]
mark = document.querySelectorAll("input[type='button']")[2]
SubmitBtn = document.getElementById("Submit");
markList = document.getElementById("markList");
// markerItem = document.getElementsByClassName("mark");

// timer
//set minutes 
mins = 2;
//calculate the seconds 
secs = mins * 60;
minutes = document.getElementById("minutes");
seconds = document.getElementById("seconds");
//countdown function is evoked when page is loaded 
Decrement()

function Answer() {}
Answer.prototype.answerTitle;
Answer.prototype.selected;
Answer.prototype.answerId;

function Question() {

}
Question.prototype.questionHead
Question.prototype.answersArray = [];
Question.prototype.correctAnswerId
Question.prototype.selectedAnswerId
Question.prototype.getGrade = function() {
    var that = this
    that.answersArray.forEach(function(item) {
        if (item.selected == 1) {
            that.selectedAnswerId = item.answerId;

        }
    });
    if (this.correctAnswerId == this.selectedAnswerId) {

        return 1;
    }
    return 0;
}


function Exam() {}
Exam.prototype.questionsArray = [];
Exam.prototype.totalGrade = function() {
    console.log(this.questionsArray.length)
    var temp = 0
    this.questionsArray.forEach(function(item) {
        temp += item.getGrade()
    })
    return temp;
}
$.get("Exam.json", function(data, status) {
        if (status == "success") {
            res = data
            e = new Exam();
            // console.log(data);
            // console.log(res)
            for (var i = 0; i < res.length; i++) {
                var q = new Question();
                // console.log(q);
                var answersArray = [];
                for (var j = 0; j < res[i]["answersArray"].length; j++) {

                    var a = new Answer();
                    a.answerTitle = res[i]["answersArray"][j]["answerTitle"];
                    a.selected = res[i]["answersArray"][j]["selected"];
                    a.answerId = res[i]["answersArray"][j]["answerId"];
                    answersArray.push(a);
                }

                q.answersArray = answersArray;
                // q.answersArray = res[i]["answersArray"];
                q.questionHead = res[i]["questionHead"]
                q.correctAnswerId = res[i]["correctAnswerId"]
                q.selectedAnswerId = res[i]["selectedAnswerId"]
                e.questionsArray.push(q)

            }
        }
        // console.log(e.questionsArray)
        randomSorting(e.questionsArray);
        // console.log(e.questionsArray)
        displayQuestion(e.questionsArray[indexOfQuestion])
        qNum.value = indexOfQuestion + 1

        next.addEventListener('click', function() {

            indexOfQuestion++
            if (indexOfQuestion > (e.questionsArray.length - 1)) {
                indexOfQuestion = e.questionsArray.length - 1
            }
            displayQuestion(e.questionsArray[indexOfQuestion])
            qNum.innerText = indexOfQuestion + 1
                // allRadio.forEach(function(item) {
                //     item.checked = false;
                // })
        })
        previous.addEventListener('click', function() {

            indexOfQuestion--
            if (indexOfQuestion < 0) {
                indexOfQuestion = 0;
            }
            displayQuestion(e.questionsArray[indexOfQuestion])
            qNum.innerText = indexOfQuestion + 1
                // allRadio.forEach(function(item) {
                //     item.checked = false;
                // })
        })
        allRadio.forEach(function(item, radioIndex) {
            item.addEventListener("change", function() {
                // console.log(radioIndex)
                // console.log(e.questionsArray[indexOfQuestion].answersArray)
                e.questionsArray[indexOfQuestion].answersArray.forEach(function(item, index) {
                    if (item.answerId == radioIndex) {
                        item.selected = 1
                    } else {
                        item.selected = 0
                    }
                    // console.log(item)
                })
            })
        })
        mark.addEventListener("click", function() {
            console.log("eeeeeee")
            if (markArray.length == 0) {
                markArray.push(indexOfQuestion);
                var $newDiv = $("<div class='mark' id=" + indexOfQuestion + ">mark Question " + (indexOfQuestion + 1) + "</div>")
                $("#markList").append($newDiv)
                $("#markList").children().click(function() {
                    indexOfQuestion = parseInt(this.id)
                    console.log(this.id);
                    displayQuestion(e.questionsArray[indexOfQuestion])
                    qNum.innerText = indexOfQuestion + 1
                })
            } else {
                found = 0;
                for (var i = 0; i < markArray.length; i++) {
                    if (markArray[i] == indexOfQuestion) {
                        found = 1;
                        break;
                    }
                }
                if (!found) {
                    markArray.push(indexOfQuestion);
                    var $newDiv = $("<div class='mark' id=" + indexOfQuestion + ">mark Question " + (indexOfQuestion + 1) + "</div>")
                    $("#markList").append($newDiv)
                    console.log($("#markList").children())
                    $("#markList").children().click(function() {
                        indexOfQuestion = parseInt(this.id)
                        console.log(this.id);
                        displayQuestion(e.questionsArray[indexOfQuestion])
                        qNum.innerText = indexOfQuestion + 1
                    })
                }
            }

        })
        SubmitBtn.addEventListener("click", function() {

                console.log("total grade:", e.totalGrade())
                    // alert("total grade: " + e.totalGrade())
                setCookie("grade", e.totalGrade());
                location.replace("submit.html");
            })
            // markerItem.addEventListener("click", function())
        console.log(e);
    })
    // control(e.questionsArray)

// });
// })



function displayQuestion(questions) {
    // console.log(questions)
    questions.answersArray.forEach(function(Aitem, Aindex) {
        if (Aitem.selected == 1) {
            allRadio.forEach(function(Ritem, Rindex) {
                if (Rindex == Aindex) {
                    Ritem.checked = true;
                }
            })
        } else {
            allRadio.forEach(function(Ritem, Rindex) {
                if (Rindex == Aindex) {
                    Ritem.checked = false;
                }


            })

            questionHead.innerText = questions.questionHead
            answerSpan1.innerText = questions.answersArray[0].answerTitle
            answerSpan2.innerText = questions.answersArray[1].answerTitle
            answerSpan3.innerText = questions.answersArray[2].answerTitle
            answerSpan4.innerText = questions.answersArray[3].answerTitle


        }
    })
}

function randomSorting(array) {
    var counter = array.length,
        randomIndex, temp
    while (counter != 0) {
        randomIndex = Math.floor(Math.random() * counter)
        counter -= 1;
        temp = array[counter];
        array[counter] = array[randomIndex];
        array[randomIndex] = temp;

    }
    return array;
}
// timer
//Decrement function decrement the value. 
function Decrement() {


    //Display both minutes and seconds 
    //getminutes and getseconds is used to 
    //get minutes and seconds 
    minutes.value = getminutes();
    seconds.value = getseconds();
    //when less than a minute remaining 
    //colour of the minutes and seconds 
    //changes to red 
    if (mins < 1) {
        minutes.style.color = "red";
        seconds.style.color = "red";
    }
    //if seconds becomes zero, 
    //then page alert time up 
    if (mins < 0) {
        // alert('time up');
        console.log("total grade:", e.totalGrade())
            // alert("total grade: " + e.totalGrade())
        setCookie("grade", e.totalGrade());
        location.replace("time out.html");
        minutes.value = 0;
        seconds.value = 0;
    }
    //if seconds > 0 then seconds is decremented 
    else {
        secs--;
        setTimeout('Decrement()', 1000);
    }
}

function getminutes() {
    //minutes is seconds divided by 60, rounded down 
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    //take minutes remaining (as seconds) away 
    //from total seconds remaining 
    return secs - Math.round(mins * 60);
}
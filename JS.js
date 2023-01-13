var count = 0;
function start()
{
    playAudio('birds.mp3');
    var first = document.getElementById('first_exam');
    var second = document.getElementById('second_exam');
    var final = document.getElementById('final_exam');
    var part = document.getElementById('participation');
    var less7 = document.getElementById('less7');
    var more7 = document.getElementById('more7');
    //Foucs and blure
    foucsBlure();
    var submit = document.getElementById('submit');
    var show = document.getElementById('showAll');

    sub.addEventListener('click', calculateMark,false);
    show.addEventListener( "click", showTable, false );
}

function foucsBlure()
{
    var first = document.getElementById('first_exam');
    var second = document.getElementById('second_exam');
    var final = document.getElementById('final_exam');
    var part = document.getElementById('participation');

    first.addEventListener('focus',function() {playAudio('rain.mp3')} , false);
    second.addEventListener('focus',function() {playAudio('rain.mp3')}, false);
    final.addEventListener('focus',function() {playAudio('rain.mp3')}, false);
    part.addEventListener('focus',function() {playAudio('rain.mp3')}, false);
    
    
    first.addEventListener('blur',function(){playAudio('birds.mp3')}, false);
    second.addEventListener('blur',function(){playAudio('birds.mp3')}, false);
    final.addEventListener('blur',function(){playAudio('birds.mp3')}, false);
    part.addEventListener('blur',function(){playAudio('birds.mp3')}, false);
}

function playAudio(audioName)
{
    var audio = document.getElementById('audio');
    var audioSource = document.getElementById('audioSource');
    audioSource.src = audioName;
    audio.load();
    audio.play();
}

function calculateMark()
{
    var name = document.getElementById('student_name');
    var first = document.getElementById('first_exam');
    var second = document.getElementById('second_exam');
    var final = document.getElementById('final_exam');
    var part = document.getElementById('participation');
    var less7 = document.getElementById('less7');
    var more7 = document.getElementById('more7');
    var form = document.getElementById('form_1');
    var submit = document.getElementById('sub');
    var validName = true;
    var validFirst = true;
    var validSecond = true;
    var validFinal = true;
    var validPart = true;
    if((name.value.length == 0 || first.value.length == 0 || second.value.length == 0 || final.value.length == 0 || part.value.length == 0) || ( !(less7.checked) && !(more7.checked) ))
    {
        alert('Error! , data not completed');
    }
    else
    {
        if(!validateName(name.value))
        {
            validName = false;
            redMessage("name","Error! name is not a valid name, it must be in English and contain only letters and spaces.", "student_name");
        }
        else
        {
            validName = true;
            playAudio('birds.mp3');
            clearMessage("name","student_name");
        }

        var firstMark = parseInt(first.value);
        var secondMark = parseInt(second.value);
        var finalMark = parseInt(final.value);
        var partMark = parseInt(part.value);

        if((firstMark > 20 || firstMark < 0) || (isNaN(first.value)))
        {
            validFirst = false;
            redMessage("first" , "First Exam mark should be a number between 0 and 20." , "first_exam");
        }
        else
        {
            validFirst = true;
            clearMessage("first" , "first_exam");
        }

        if(secondMark > 20 || secondMark < 0 || (isNaN(second.value)))
        {
            validSecond = false;
            redMessage("second" , "Second Exam mark should be a number between 0 and 20." , "second_exam");
        }
        else
        {
            validSecond = true;
            clearMessage("second" , "second_exam");
        }

        if(finalMark > 50 || finalMark < 0 || (isNaN(final.value)))
        {
            validFinal = false;
            redMessage("final" , "final Exam mark should be a number between 0 and 50." , "final_exam");
        }
        else 
        {
            validFinal = true;
            clearMessage("final" , "final_exam");
        }

        if(partMark > 10 || partMark < 0 || (isNaN(part.value)))
        {
            validPart = false;
            redMessage("part" , "Participation mark should be number between 0 and 10." , "participation");
        }
        else
        {
            validPart = true;
            clearMessage("part" , "participation");
        }

        var total = firstMark + secondMark + finalMark + partMark;
        if(validFirst && validSecond && validFinal && validPart && validName)
        {
            var grade;
            var abs;
            if(total >= 0 && total <= 40)
                grade = 'F';
            else if(total >= 41 && total <= 60)
                grade = 'E';
            else if(total >= 61 && total <= 69)
                grade = 'D';
            else if(total >= 70 && total <= 79)
                grade = 'C';
            else if(total >= 80 && total <= 90)
                grade = 'B';
            else
                grade = 'A';

            if(more7.checked)
            {
                abs="< 7";
                grade = 'F';
            }
            else
            {
                abs=">= 7";
            }

            var resName = document.getElementById('resName');
            var totalres = document.getElementById('totalres');
            var graderes = document.getElementById('graderes');
            var resDiv = document.getElementById('resDiv');
            var resMsg = document.getElementById('resMsg');

            resName.innerHTML = "Name : " + name.value;
            totalres.innerHTML = "Total : " + total;
            graderes.innerHTML = "Grade : " + grade;

            resDiv.setAttribute('style', 'display:inline-block');
            if(grade=='F')
            {
                resDiv.setAttribute('style', 'background-color: red;');
                resMsg.innerHTML = "You need more effort...";
                playAudio('badresult.mp3');
            }
            else if(grade=='A')
            {
                resDiv.setAttribute('style', 'background-color: blue;');
                resMsg.innerHTML = "Great effort!!!";
                playAudio('Applause.mp3');
            }
            else
            {
                resDiv.setAttribute('style', 'background-color: white;');
                resMsg.innerHTML = "";
                playAudio('birds.mp3');
            }

            if(sessionStorage.getItem('counter') == null)
            {
                sessionStorage.setItem('counter', parseInt(0));
                var counter = 0;

                insertStudent(counter,abs,grade);
            }
            else
            {
                var count = parseInt(sessionStorage.getItem('counter') ) + 1;
                sessionStorage.setItem('counter', count);
                insertStudent(count,abs,grade);
            }
            
            sessionStorage.setItem('flag', true);
            form.reset();
            AddtoTable();
        }
        else
            alert("Some data entered may be not valid! check please!");
    }
    
    
}

function redMessage(key, message, textbox)
{
    var star = key + "Star";
    var msg = key + "Message";

    playAudio("Noisey.mp3");
    document.getElementById(star).innerHTML = "*";
    document.getElementById(msg).innerHTML = message;
    document.getElementById(textbox).setAttribute("style", "border-color:red");
    document.getElementById(textbox).focus();
}

function clearMessage(key , textbox)
{
    var star = key + "Star";
    var msg = key + "Message";

    document.getElementById(star).innerHTML = "";
    document.getElementById(msg).innerHTML = "&nbsp;";
    document.getElementById(textbox).setAttribute("style", "border-color:grey");
}
function validateName(x)
{
    var reg = /^[A-Za-z\s]+$/;
    if(reg.test(x))
        return true;
    else
        return false;
}

function insertStudent(c,ab,gra)
{
    var abs = ab;
    var grade = gra;
    var namee = document.getElementById('student_name').value;
    var first = document.getElementById('first_exam').value;
    var second = document.getElementById('second_exam').value;
    var final = document.getElementById('final_exam').value;
    var part = document.getElementById('participation').value;

    
    sessionStorage.setItem('name'+c , namee);
    sessionStorage.setItem('first'+c , first);
    sessionStorage.setItem('second'+c , second);
    sessionStorage.setItem('final'+c , final);
    sessionStorage.setItem('part'+c , part);
    sessionStorage.setItem('abs'+c , abs);
    sessionStorage.setItem('grade'+c , grade);
}

function AddtoTable()
{
    var c = parseInt(sessionStorage.getItem('counter'));
    var table = document.getElementById('tab');
    var arr = [];
    var x;
    arr[0] = 'name';
    arr[1] = 'first';
    arr[2] = 'second';
    arr[3] = 'final';
    arr[4] = 'part';
    arr[5] = 'abs';
    arr[6] = 'grade';
    var row = table.insertRow(c+2);
    for(var j=0; j<7; j++)
    {
        x = arr[j] + c;
        var add;
        add = row.insertCell(j);
        add.innerHTML = sessionStorage.getItem(x);
    }
}

function showTable()
{
    var table = document.getElementById('tab');
    var rows = table.rows.length;
    if(sessionStorage.getItem('flag') && rows == 2)
    {
        fillTable();
    }

    
    if(table.style.display == 'none')
        table.style.display = "table";
    else
        table.style.display = "none";
    
}

function fillTable()
{
    var c = parseInt(sessionStorage.getItem('counter'));
    var table = document.getElementById('tab');
    var arr = [];
    var x;
    arr[0] = 'name';
    arr[1] = 'first';
    arr[2] = 'second';
    arr[3] = 'final';
    arr[4] = 'part';
    arr[5] = 'abs';
    arr[6] = 'grade';
    
    for(var i=0;i<=c;i++)
    {
        var row = table.insertRow(i+2);
        for(var j=0; j<7; j++)
        {
            x = arr[j] + i;
            var add;
            add = row.insertCell(j);
            add.innerHTML = sessionStorage.getItem(x);
        }
    }
    
}

window.addEventListener( "load", start, false );
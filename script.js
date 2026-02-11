function openFeatures() {
    allElems = document.querySelectorAll('.elem')
    allFullElems = document.querySelectorAll('.fullelems')
    backbutton = document.querySelectorAll('.fullelems .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allFullElems[elem.id].style.display = 'block'
        })
    })

    backbutton.forEach(function (back) {
        back.addEventListener('click', function () {
            allFullElems[back.id].style.display = 'none'
        })
    })
}

openFeatures()

apikey = '471c9b7b4239410d8d3133458261102'

function todolist() {
    forminput = document.querySelector('.addtask input')
    tareainput = document.querySelector('.addtask textarea')
    checker = document.querySelector('.addtask #checkbox')

    currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }

    function renderTask() {
        let tl = document.querySelector('.tasklist');
        let sum = '';

        currentTask.forEach(function (elem, index) {
            sum += `
        <div class="inside-tl">
            <div class="task-left">
                <h3>
                    ${elem.task}
                    ${elem.imp ? '<span class="important">!</span>' : ''}
                </h3>
                <div class="task-details" id="details-${index}">
                    ${elem.details || "No details added"}
                </div>
            </div>

            <div class="task-actions">
                <i class="ri-arrow-down-s-line dropdown" data-id="${index}"></i>
                <button>Mark as Completed</button>
            </div>
        </div>`;
        });

        tl.innerHTML = sum;


        document.querySelectorAll('.task-actions button').forEach(function (btn, index) {
            btn.addEventListener('click', function () {
                currentTask.splice(index, 1);
                localStorage.setItem('currentTask', JSON.stringify(currentTask));
                renderTask();
            });
        });


        attachDropdownEvents();
    }

    function attachDropdownEvents() {
        let arrows = document.querySelectorAll('.dropdown');

        arrows.forEach(function (arrow) {
            arrow.addEventListener('click', function () {
                let id = arrow.getAttribute('data-id');
                let details = document.getElementById(`details-${id}`);

                details.classList.toggle('show');

                arrow.classList.toggle('rotate');
            });
        });
    }



    renderTask()

    form = document.querySelector('.addtask form')
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        currentTask.push(
            {
                task: forminput.value,
                details: tareainput.value,
                imp: checker.checked
            })

        localStorage.setItem('currentTask', JSON.stringify(currentTask));


        forminput.value = ''
        tareainput.value = ''
        checker.checked = false
        renderTask()
    })

}

todolist()

function dailyplanner() {
    var dpc = document.querySelector('.dp-container')

    var dayplandata = JSON.parse(localStorage.getItem('dayplandata', dayplandata)) || {}


    var hours = Array.from({ length: 18 }, (_, idx) => {
        return `${6 + idx}:00 - ${7 + idx}:00`
    })




    var wholedaysum = ''

    hours.forEach(function (elem, idx) {

        var saveddata = dayplandata[idx] || ''
        wholedaysum = wholedaysum + `<div class="inside-dp">
                    <p>${elem}</p>
                    <input id = "${idx}" type="text" placeholder="..." value = "${saveddata}">
                </div>  `
    });

    dpc.innerHTML = wholedaysum

    var dpinput = document.querySelectorAll('.dp-container .inside-dp input')


    dpinput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayplandata[elem.id] = elem.value

            localStorage.setItem('dayplandata', JSON.stringify(dayplandata))
        })
    })
}

dailyplanner()

function motivation() {
    let motivationQuote = document.querySelector('.quote-container .m2');
    let motivationAuthor = document.querySelector('.quote-container .m3');

    const quotes = [
        {content: "Push yourself, because no one else is going to do it for you.", author: "Unknown"},
        {content: "Dream big. Start small. Act now.", author: "Robin Sharma"},
        {content: "Consistency beats motivation.", author: "Anonymous"},
        {content: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown"},
        {content: "Great things never come from comfort zones.", author: "Anonymous"},
        {content: "Don’t stop until you’re proud.", author: "Unknown"},
        {content: "Small steps every day lead to big results.", author: "Anonymous"},
        {content: "Your only limit is your mind.", author: "Unknown"},
        {content: "Difficult roads often lead to beautiful destinations.", author: "Unknown"},
        {content: "Stay positive. Work hard. Make it happen.", author: "Unknown"},
        {content: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln"},
        {content: "Do something today that your future self will thank you for.", author: "Unknown"},
        {content: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt"},
        {content: "Success is the sum of small efforts repeated daily.", author: "Robert Collier"},
        {content: "Focus on progress, not perfection.", author: "Unknown"},
        {content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney"},
        {content: "Your future is created by what you do today.", author: "Unknown"},
        {content: "Hard work beats talent when talent doesn’t work hard.", author: "Tim Notke"},
        {content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson"},
        {content: "You are capable of amazing things.", author: "Unknown"},
        {content: "It always seems impossible until it's done.", author: "Nelson Mandela"},
        {content: "Opportunities don’t happen. You create them.", author: "Chris Grosser"},
        {content: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe"},
        {content: "Success is not for the lazy.", author: "Unknown"},
        {content: "Don’t limit your challenges. Challenge your limits.", author: "Unknown"},
        {content: "Work hard in silence. Let success make the noise.", author: "Frank Ocean"},
        {content: "Every day is a second chance.", author: "Unknown"},
        {content: "Make today count.", author: "Unknown"},
        {content: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar"},
        {content: "Stay hungry. Stay foolish.", author: "Steve Jobs"}
    ];

    let lastIndex = -1;

    function showRandomQuote() {
        let randomIndex;


        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === lastIndex);

        lastIndex = randomIndex;

        motivationQuote.innerHTML = quotes[randomIndex].content;
        motivationAuthor.innerHTML = quotes[randomIndex].author;
    }


    showRandomQuote();

    setInterval(showRandomQuote, 10000);
}

motivation();


motivation()

function pomodoro() {
    let totalSeconds = 25 * 60
    let timerInterval = null
    let stamp = document.querySelector('.pomo-container p')

    let start = document.querySelector('.pomo-buttons #s')
    let pause = document.querySelector('.pomo-buttons #p')
    let reset = document.querySelector('.pomo-buttons #r')

    let currentStatus = document.querySelector('.pomo-container .status h2')
    let sbox = document.querySelector('.pomo-container .status')

    let workSession = true
    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        stamp.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (workSession == true) {
            totalSeconds = 25 * 60
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                }

                else {
                    workSession = false
                    clearInterval(timerInterval)
                    stamp.innerHTML = '05:00'
                    currentStatus.innerHTML = 'Break Time'
                    sbox.style.backgroundColor = 'rgba(9, 157, 190, 0.721)'
                }

            }, 1000)
        } else {
            totalSeconds = 5 * 60
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                }

                else {
                    workSession = true
                    clearInterval(timerInterval)
                    stamp.innerHTML = '25:00'
                    currentStatus.innerHTML = 'Work Session'
                    sbox.style.backgroundColor = 'rgba(12, 141, 12, 0.721)'
                }
            }, 1000)
        }
    }

    function pauseTimer() {
        updateTimer()
        clearInterval(timerInterval);
    }

    function resetTimer() {
        totalSeconds = 25 * 60;
        clearInterval(timerInterval)
        updateTimer()

    }

    start.addEventListener('click', startTimer)
    pause.addEventListener('click', pauseTimer)
    reset.addEventListener('click', resetTimer)

}

pomodoro()

function dailygoals() {
    dgforminput = document.querySelector('.addgoal input')
    dgtareainput = document.querySelector('.addgoal textarea')
    dgchecker = document.querySelector('.addgoal #checkbox')

    currentGoal = []

    if (localStorage.getItem('currentGoal')) {
        currentGoal = JSON.parse(localStorage.getItem('currentGoal'))
    }

    function renderGoal() {
        let gl = document.querySelector('.goallist');
        let dgsum = '';

        currentGoal.forEach(function (elem, index) {
            dgsum += `
        <div class="inside-gl">
            <div class="goal-left">
                <h3>
                    ${elem.goal}
                    ${elem.imp ? '<span class="important">!</span>' : ''}
                </h3>
                <div class="goal-details" id="details-${index}">
                    ${elem.details || "No details added"}
                </div>
            </div>

            <div class="goal-actions">
                <i class="ri-arrow-down-s-line dropdown" data-id="${index}"></i>
                <button>Mark as Completed</button>
            </div>
        </div>`;
        });

        gl.innerHTML = dgsum;


        document.querySelectorAll('.goal-actions button').forEach(function (btn, index) {
            btn.addEventListener('click', function () {
                currentGoal.splice(index, 1);
                localStorage.setItem('currentGoal', JSON.stringify(currentGoal));
                renderGoal();
            });
        });


        attachDropdownEvents();
    }

    function attachDropdownEvents() {
        let arrows = document.querySelectorAll('.inside-gl .dropdown');

        arrows.forEach(function (arrow) {
            arrow.addEventListener('click', function () {
                let id = arrow.getAttribute('data-id');
                let details = document.getElementById(`details-${id}`);

                details.classList.toggle('show');

                arrow.classList.toggle('rotate');
            });
        });
    }



    renderGoal()

    form = document.querySelector('.addgoal form')
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        currentGoal.push(
            {
                goal: dgforminput.value,
                details: dgtareainput.value,
                imp: dgchecker.checked
            })

        localStorage.setItem('currentGoal', JSON.stringify(currentGoal));


        dgforminput.value = ''
        dgtareainput.value = ''
        dgchecker.checked = false
        renderGoal()
    })

}

dailygoals()

function weatherBoard() {

    adate = document.querySelector('.weatherbox .dtc .wdate');
    atime = document.querySelector('.weatherbox .dtc .wtime');

    function timeDate() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsofY = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        setInterval(function () {
            const date = new Date();

            var dow = daysOfWeek[date.getDay()];
            var hours = date.getHours();
            var minu = String(date.getMinutes()).padStart(2, '0');
            var sec = String(date.getSeconds()).padStart(2, '0');
            var dt = date.getDate();
            var moy = monthsofY[date.getMonth()];
            var yr = date.getFullYear()

            atime.innerHTML = `${dow}, ${hours}:${minu}:${sec}`;
            adate.innerHTML = `${dt} ${moy}, ${yr}`
        }, 1000);
    }


    timeDate()


    var city = 'Bhopal';



    tapmaan = document.querySelector('.climate .c1 .tapmaan');
    statu = document.querySelector('.climate .c1 .current-status');

    pct = document.querySelector('.climate .c2 .pct');
    hmd = document.querySelector('.climate .c2 .hmd');
    wd = document.querySelector('.climate .c2 .wd');

    async function weatherAPICall() {
        try {
            var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`);
            var data = await response.json();

            tapmaan.innerHTML = `${data.current.temp_c}°C`;
            statu.innerHTML = data.current.condition.text;
            pct.innerHTML = `Precipitation: ${data.current.precip_mm} mm`;
            hmd.innerHTML = `Humidity: ${data.current.humidity}%`;
            wd.innerHTML = `Wind: ${data.current.wind_kph} km/h`;

        } catch (error) {
            console.log("Weather fetch error:", error);
        }
    }

    function updateBackgroundByTime() {
    const weatherBox = document.querySelector('.weatherbox');
    const currentHour = new Date().getHours();

    if (currentHour >= 18 || currentHour < 6) {
        
        weatherBox.style.backgroundImage = "url('boka-kotorska-night.jpg')";
    } else {
        
        weatherBox.style.backgroundImage = "url('beautiful-landscapes-peak-green-skyline-china.jpg')";
    }

    weatherBox.style.backgroundPosition = "center";
    weatherBox.style.backgroundSize = "cover";
}

    updateBackgroundByTime();
    weatherAPICall();

    


}

weatherBoard()

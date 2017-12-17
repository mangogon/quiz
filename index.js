$(function () {


    // Global variables

    var score = 0;  // The score of the player
    var counter = 0;  // The current number of questions
    var question;  // The current question object
    var questions = {};  // The database, which will be loaded later

    // Handlebars templates

    var question_source = $('#question-template').html();
    var question_template = Handlebars.compile(question_source);


    function initApp() {

        // Hide the "Start" button while the data is not ready
        $('#message').html('loading data...');
        $('#start-btn').hide();

        // Load the JSON data
        $.getJSON('db/database.json', function (data) {

            // Now the data is ready

            // Load the list of objects into "questions"
            questions = data;
            console.log(questions);

            // Show the "Start" button
            $('#start-btn').show();
        })
    }

    function startGame() {

        // Reset the counters ant the state of the game
        score = 0;
        counter = 0;

        // Select the first question
        selectQuestion();
    }


    function selectQuestion() {

        // Pick a random question
        counter++;
        question = questions[Math.floor(Math.random() * 3)];

        // Calculate the rendered template
        var context = {question: question, counter: counter};
        var rendered_template = question_template(context);

        // Insert the rendered template into the main page
        $('#question-block').html(rendered_template);
    }


    function processAnswer() {

        // The correct answer, from the database
        var correct_answer = question.answer;

        // The value of the button which was clicked
        var value = this.value;

        // Is the answer correct?
        if (value == correct_answer) {

            // Correct answer!!!

            // Show success message
            $('#message').html('<div class="alert alert-success">Добре!</div>');

            // Show new score
            score++;
            $('#score').html(score);

            // Select a new question
            selectQuestion();
        }

        else {

            // Wrong answer(((

            // Show failure message
            $('#message').html('<div class="alert alert-danger">Погано :(</div>');

            // Show new score
            score--;
            $('#score').html(score);

            // Game over?
            if (score <= -3) {
                $('#message').html('<div class="alert alert-danger">Гра завершена!<div>')
                $('#buttons').hide();
            }

        }
    }

    // Initialize the app
    initApp();

    $("#start-btn").click(startGame);

    $('#question-block').on('click', 'button', processAnswer);

});


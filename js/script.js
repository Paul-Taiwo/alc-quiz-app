let currentQuestion = 0;
let currentQuestionNo = 0;
let score = 0;
const questionText = document.querySelector('h1.question');
const questionNo = document.querySelector('p.question-no');
const scoreElement = document.querySelector('#score');

// Question bank
const questions = [
  {
    question: 'What sweet food made by bees using nectar from flowers?',
    options: {
      rightAnswer: 'Honey',
      optionA: 'Biscuit',
      optionB: 'Indomie',
      optionC: 'Chin chin',
    }
  },
  {
    question: 'Name the school that Harry Potter attended?',
    options: {
      rightAnswer: 'Hogwarts',
      optionA: 'My school',
      optionB: 'HoneyLand',
      optionC: 'Kings College',
    }
  },
  {
    question: 'Which country is home to the kangaroo?',
    options: {
      rightAnswer: 'Australia',
      optionA: 'Nigeria',
      optionB: 'America',
      optionC: 'Brazil',
    }
  },
  {
    question: 'What is the top colour in a rainbow?',
    options: {
      rightAnswer: 'Red',
      optionA: 'Violet',
      optionB: 'Blue',
      optionC: 'Yellow',
    }
  },
  {
    question: 'Which country sent an Armada to attack Britain in 1588?',
    options: {
      rightAnswer: 'Spain',
      optionA: 'Russia',
      optionB: 'America',
      optionC: 'North Korea',
    }
  },
  {
    question: 'On a farm a kid is a baby of what?',
    options: {
      rightAnswer: 'Goat',
      optionA: 'Pig',
      optionB: 'Bull',
      optionC: 'Sheep',
    }
  },
  {
    question: 'What food do Giant Pandas normally eat?',
    options: {
      rightAnswer: 'Bamboo',
      optionA: 'Lettuce',
      optionB: 'Bitter leaf',
      optionC: 'Grass',
    }
  },
  {
    question: 'How many years are there in a millennium?',
    options: {
      rightAnswer: '1,000',
      optionA: '100',
      optionB: '2,000',
      optionC: '10,000',
    }
  },
  {
    question: ' What is the distance around a circle called?',
    options: {
      rightAnswer: 'Circumference',
      optionA: 'Arc',
      optionB: 'Round about',
      optionC: 'Chord',
    }
  },
  {
    question: 'How many days are there in a fortnight',
    options: {
      rightAnswer: '14',
      optionA: '50',
      optionB: '10',
      optionC: '55',
    }
  },
];

// const copiedQuestions = [...questions];

// Shuffle array function
const shuffleArray = (array) => {
  for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
};

// Check truthy of selected optionDiv
const isAnswerCorrect = (truthy) => {
  const notifyElement = document.querySelector('.notify p');
  if (!truthy) {
    notifyElement.textContent = `Wrong! The correct answer is ${questions[currentQuestion].options.rightAnswer}`;
    document.querySelector('.notify').style.visibility = 'visible';
  } else {
    notifyElement.textContent = `Correct! The answer is ${questions[currentQuestion].options.rightAnswer}`
    document.querySelector('.notify').style.visibility = 'visible';
  }
};

// function to check if answer is correct
const checkAnswer = (answer, field) => {
  if (answer === questions[currentQuestion].options.rightAnswer) {
    score += 1;
    isAnswerCorrect(true);
    scoreElement.textContent = score;
    field.classList.add('correct');
  } else {
    isAnswerCorrect(false);
    field.classList.add('wrong');
  }
};

// Disable buttons function
const disableButtons = (buttonsFields) => {
  [].forEach.call(buttonsFields, (buttonField) => {
    buttonField.disabled = true;
    buttonField.classList.remove('option-btn-hover');
    buttonField.classList.add('btn-disabled');
  });
};

// Add event listener to buttons function
const addListener = () => {
  const buttonsFields = document.querySelectorAll('div.options .option-btn');

  [].forEach.call(buttonsFields, (btn) => {
    btn.addEventListener('click', (evt) => {
      evt.preventDefault();

      disableButtons(buttonsFields);
      checkAnswer(btn.textContent, btn);
    });
  });

};

// Display questions and options
const render = () => {
  const questionObj = questions[currentQuestion];
  questionText.textContent = questionObj.question;
  questionNo.textContent = `Question ${currentQuestionNo += 1}`;

  const optionsArray = Object.keys(questionObj.options).map(x => questionObj.options[x]);
  const shuffledOptions = shuffleArray(optionsArray);

  shuffledOptions.forEach((text) => {
    const button = document.createElement('button');

    button.className = 'btn option-btn option-btn-hover mr-40';
    button.textContent = text;
    document.querySelector('.options').appendChild(button);
  });
  addListener();
};

// Set total score
const renderTotalScore = () => {
  document.querySelector('#final-score h1').textContent = `You got ${score} out of ${questions.length}`;
};

// Add event listener to the next button
document.querySelector('#next').addEventListener('click', (evt) => {
  evt.preventDefault();

  document.querySelector('.notify').style.visibility = 'hidden';

  [].forEach.call(document.querySelectorAll('.btn'), (x) => {
    x.className.includes('btn-next') ? x.style.display = 'block' : x.style.display = 'none';;
  });

  if (currentQuestion >= (questions.length - 1)) {
    currentQuestion = 0;
    document.querySelector('#quiz-content').style.display = 'none';
    renderTotalScore();
    document.querySelector('#final-score').style.display = 'block';
  } else {
    currentQuestion += 1;
  }

  render();
});

document.querySelector('#reset-btn').addEventListener('click', () => {
  window.location.href = '/';
});

// Render Questions and option after page has loaded
document.addEventListener('DOMContentLoaded', () => {
  render();
});

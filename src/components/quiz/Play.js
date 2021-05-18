import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css' ;
import questions from '../../questions.json' ;
import isEmpty from '../../utils/is-empty' ;
import correctNotification from '../../assets/audio/correct-answer.mp3' ;
import wrongNotification from '../../assets/audio/wrong-answer.mp3' ;

class Play extends Component {
    constructor(props) {
        super(props) ;
        this.state =  {
         questions,
         currentQuestion : {},
         nextQuestion: {},
         answer : '',
         numberofQuestions : 0,
         numberOfAnsweredQuestions : 0,
         currentQuestionIndex : 0,
         score : 0,
         currentScore : 0,
         wrongAnswers : 0,
         hints : 5,
         fiftyfifty : 2,
         usedfiftyfifty : false,
         previousRandomNumbers : [],
         time : {} 
        } ;
    }
    

    componentDidMount() {
     const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state ;
     this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion) ;
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
     let { currentQuestionIndex } = this.state ;
     if(!isEmpty(this.state.questions)) {
      questions = this.state.questions ;
      currentQuestion = questions[currentQuestionIndex] ;
      nextQuestion = questions[currentQuestionIndex + 1] ;
      previousQuestion = questions[currentQuestionIndex-1] ;
      const answer = currentQuestion.answer ;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        numberofQuestions : questions.length,
        answer,
        previousRandomNumbers : []
      }, () => {
          this.showOptions() ;
      }) ;
     }
    } ;
  
    handleOptionClick = (e) => {
     if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        setTimeout(() => {
            document.getElementById('correct-answer').play() ;
        }, 500);
        this.correctAnswer() ;
     } else {
         this.wrongAnswer() ;
     }
    } ;

    handleNextButtonClick = () => {
        if(this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
              currentQuestionIndex : prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion) ;
            }) ;
        } 
      };
    
      handlePreviousButtonClick = () => {
        if(this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
              currentQuestionIndex : prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion) ;
            }) ;
        } 
      };

      handleQuitButtonClick = () => {
          if(window.confirm('Are you sure you want to quit?')) {
          this.props.history.push('/') ;
      }
    }
    handleButtonClick = (e) => {
     switch(e.target.id) {
         case 'next-button' : 
            this.handleNextButtonClick() ;
            break ;

         case 'previous-button' :
             this.handlePreviousButtonClick() ;
             break ;

         case 'quit-button' :
             this.handleQuitButtonClick() ;
         default : break ;
     }
    }

    correctAnswer = () => {
      M.toast({
       html : 'Correct Answer!',
       classes : 'toast-valid',
       displayLength : 1000
      });
      this.setState(prevState =>({
       score : prevState.score + 1, 
       correctAnswers : prevState.correctAnswers + 1,
       currentQuestionIndex : prevState.currentQuestionIndex + 1,
       numberOfAnsweredQuestions : prevState.numberOfAnsweredQuestions + 1
      }), () => {
          this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion) ;
      });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000) ;
        M.toast({
         html : 'Wrong Answer!',
         classes : 'toast-invalid',
         displayLength : 1000
        });
        this.setState(prevState =>({
         wrongAnswers : prevState.wrongAnswers + 1,
         currentQuestionIndex : prevState.currentQuestionIndex + 1,
         numberOfAnsweredQuestions : prevState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion) ;
        });
      }
     
      showOptions = () => {
          const options = Array.from(document.querySelectorAll('.option')) ;

          options.forEach(option => {
              option.style.visibility = 'visible' ;
          }) ;
      }

     handleHints = () => {
         if(this.state.hints > 0) {
         const options = Array.from(document.querySelectorAll('.option')) ;
         let indexOfAnswer ;
         options.forEach((option, index) => {
           if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            indexOfAnswer = index ;
           }
         });

         while(true) {
             const randomNumber = Math.round(Math.random() * 3) ;
             if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                 options.forEach((option, index) => {
                   if(index === randomNumber) {
                       option.style.visibility = 'hidden' ;

                       this.setState((prevState) => ({
                        hints : prevState.hints - 1,
                        previousRandomNumbers : prevState.previousRandomNumbers.concat(randomNumber) 
                       })) ;
                   }
                 }) ;
                 break ;
             }
             if(this.state.previousRandomNumbers.length >= 3) break ;
         }
     }
    }

    hanldeFiftyFifty = () => {
        if(this.state.fiftyfifty > 0 && this.state.usedfiftyfifty === false) {
            const options = document.querySelectorAll('.options') ;
            const randomNumbers = [];
            let indexOfAnswer ;
            options.forEach((option, index) => {
             if(option.innerHTML.toLowerCase() === this.state.toLowerCase()) {
                 indexOfAnswer = index; 
             }
            });
            let count = 0 ;
            do {
             const randomNumber = Math.round(Math.random() * 3) ;
             if(randomNumber !== indexOfAnswer) {
                 if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                     randomNumbers.push(randomNumber) ;
                     count ++ ;
                 } else {
                     while(true) {
                        const newRandomNumber = Math.round(Math.random() * 3) ;
                        if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                            randomNumbers.push(newRandomNumber) ;
                            count ++ ;
                            break ;
                        }
                     }
                 }
             }
            } while(count < 2) ;
            options.forEach((option, index) => {
              if(randomNumbers.includes(index)) {
                  option.style.visibility = 'hidden' ;
              }
            });
            this.setState(prevState => ({
             fiftyfifty : prevState.fiftyfifty - 1,
             usedfiftyfifty : true
            }));
        }
    }

    render() {
        const { currentQuestion, currentQuestionIndex, numberofQuestions, hints } = this.state ;
        console.log(questions) ;
        return (
         <Fragment>
             <Helmet><title>Quiz Page</title></Helmet>
             <Fragment>
                 <audio id = "correct-answer" src = {correctNotification}></audio>
                 <audio id = "wrong-answer" src = {wrongNotification}></audio>
             </Fragment>
             <div className = "questions">
                 <h1>Quiz Mode</h1>
                 <div className = "lifeline-container">
                     <p>
                        <span onClick = {this.hanldeFiftyFifty} className = "mdi mdi-set-center mdi-24px lifeline-icon">
                        <span className = "lifeline">2</span>
                        </span>
                     </p>
                     <p>
                        <span  onClick = {this.handleHints} className = "mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
                        <span className = "lifeline">{hints}</span>
                        </span>
                     </p>
                 </div>
                 <div className = "timer-container">
                     <p>
                         <span className = "left">{currentQuestionIndex + 1} of {numberofQuestions}</span>
                         <span className = "right">2:15<span className = "mdi mdi-clock-outline mdi-24px"></span></span>
                     </p>
                 </div>
                  <h5>{currentQuestion.question}</h5>
                 <div className = "options-container">
                     <p onClick = {this.handleOptionClick} class = "option">{currentQuestion.optionA}</p>
                     <p onClick = {this.handleOptionClick} class = "option">{currentQuestion.optionB}</p>
                 </div>
                 <div className = "options-container">
                     <p onClick = {this.handleOptionClick} class = "option">{currentQuestion.optionC}</p>
                     <p onClick = {this.handleOptionClick} class = "option">{currentQuestion.optionD}</p>
                 </div>
                 <div className = "button-container">
                     <button id="previous-button" onClick = {this.handleButtonClick}>Previous</button>
                     <button id="next-button" onClick = {this.handleButtonClick}>Next</button>
                     <button id="quit-button" onClick = {this.handleButtonClick}>Quit</button>
                 </div>
             </div>
         </Fragment>
        ) ;
    }
}

export default Play ;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
//import {makeStyles} from '@material-ui/core/styles';

import MyModal from '../MyModal';
import './Main.css';



const API_QUIZ = 'https://opentdb.com/api.php?amount=10&category=27&type=multiple';

export default function Main(){
    const [quizData, updateQuizData] = useState([]);
    const [selectedAnswer, updateSelectedAnswer] = useState([]);
    const [correctAnswers, updateCorrectAnswers] = useState([]);
    const [score, updateScore] = useState(1);
    const [modal, setModal] = useState(false);
    //const [disable, updateDisable] =useState(false);
  
    /*function openModal(){
        setModal(true)
        updateDisable(!disable);
    }

    function closeModal() {
        setModal(false)
        updateDisable(disable);
    }*/

    //const classes = useStyles();
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    const  selectedCode = {
                            '&amp;': '&',
                            '&uuml;': 'ü',
                            '&hellip;': '…',
                            '&rdquo;': '"',
                            '&#039;': "'",
                            '&quot;': '"',
                            '&ldquo;': '"',
                            '&eacute;': 'é',
                            '&ntilde;': 'ñ',
    }

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(API_QUIZ);
            console.log(response.data);
            updateQuizData(response.data.results);  
            rightAnswer(response.data.results);  
        }
        fetchData();
    }, []);


    function rightAnswer(quizData){
        quizData.map((question, idx) => {
            console.log("Q: "+ question.correct_answer);
            updateCorrectAnswers(correctAnswers =>[...correctAnswers, question.correct_answer]);
            })
               
        }

    function onChange(e){
        //e.preventDefault();
        console.log(e.target.value);
        console.log(correctAnswers.length);
        ifCorrectAnswerUpdateScore(e.target.value);
    }

    function ifCorrectAnswerUpdateScore(choosen){
        for(let i = 0; i < correctAnswers.length; i++){
            //console.log("ca: "+correctAnswers[i] + " === " + choosen);
            if(correctAnswers[i] === choosen){
                updateScore(score +1);
                //console.log("score: "+score); 
            }
        }
    }
      
    function onSubmit(e) {
        
        
        
        }
   
    return (
        <section className = 'section-top'  >
            
            <form className = 'section-form'
                            onSubmit = {onSubmit}>
                
                {quizData.map((quiz, idx) => {
                    let answers = [quiz.correct_answer, ...quiz.incorrect_answers].sort(()=> Math.random() -3);
                    return (
                        <div key = {quiz.idx}>
                            <h4 className = 'radio-quiz'
                                    tabIndex = '0'>
                                        {idx += 1 }{' '}{quiz.question.replace(/&#?\w+;/g, match => selectedCode[match])}
                            </h4>
                                {answers.map((answer, idx) => {
                                    return(
                                    <section className = 'radio-answer' key = {answer.idx} >
                                        <label className = 'radio-label'
                                            id = 'label'>
                                            <input className = 'radio-input'
                                                key = {idx}
                                                id = 'answer'
                                                type = 'radio'
                                                value = {answer}
                                                name = {quiz.question}
                                               // checked ={selectedAnswer === answer}
                                                onChange = {onChange}
                                                />
                                            <span className = 'radio-design'
                                                id = 'design'
                                                tabIndex = '0'>
                                                    
                                                </span>
                                            <span className = 'radio-text}'
                                                id = 'text'
                                                tabIndex = '0'
                                                >
                                                    {answer}
                                            </span>
                                        </label>
                                    </section>
                                    )
                                })}
                        </div>
                        )
                })}
                <div className='radio-button__submit'> 
                    {!modal && <Button className = 'radio-button__button'
                        variant="contained" 
                        color="primary"  
                        type = 'submit' 
                        tabIndex = '0' 
                        onClick = {openModal} >
                        Submit     
                    </Button>}
                    <MyModal closeModal = {closeModal} modal = {modal}  />
            </div> 
            </form>
        </section>
    );
   
}

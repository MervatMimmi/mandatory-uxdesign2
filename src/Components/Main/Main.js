import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {Button, LinearProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import MyModal from '../MyModal/MyModal';
import './Main.css';

const useStyles = makeStyles((theme) => ({
    loading: {
        marginTop: '25%',
        marginBottom: '35%',
        width: '50%',
        '& > * + *': {
            marginTop: theme.spacing(4),
        },
    },
  }));

const API_QUIZ = 'https://opentdb.com/api.php?amount=10&category=27&type=multiple';

export default function Main(){
    const [quizData, updateQuizData] = useState([]);
    const [correctAnswers, updateCorrectAnswers] = useState([]);
    const [score, updateScore] = useState(0);
    const [modal, setModal] = useState(false);
    const [redirect, updateRedirect] = useState(false);
    const [loading, updateLoding] = useState(true);

    const classes = useStyles();
    
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
    
    const fetchData = async() => {
        const response = await axios.get(API_QUIZ);
        //console.log(response.data);
        updateLoding(false);
        updateQuizData(response.data.results);  
        rightAnswer(response.data.results);  
        }
   
    useEffect(() => {   
        fetchData();
    }, []);

    
    function rightAnswer(quizData){
        quizData.map((question, idx) => {
            //console.log("Q: "+ question.correct_answer);
            updateCorrectAnswers(correctAnswers =>[...correctAnswers, question.correct_answer]);
        })
    }

    function onChange(e){
        //e.preventDefault();
        //console.log(e.target.value);
        //console.log(correctAnswers.length);
        ifCorrectAnswerUpdateScore(e.target.value);
    }

    function ifCorrectAnswerUpdateScore(choosen){
        for(let i = 0; i < correctAnswers.length; i++){
           // console.log("ca: "+correctAnswers[i] + " === " + choosen);
            if(correctAnswers[i] === choosen){ 
                updateScore(score => score + 1)
                //updateScore(score +=1);
                //console.log("score: "+score); 
            }
        }
    }
    
    function reStart(){
        updateQuizData([]);
        updateCorrectAnswers([]);
        updateScore([]);
        setModal(false);
        fetchData();
        updateLoding(!false);
    }

    function redirectHome() {
        setModal(false);
        updateRedirect(true);
    }

    if(redirect){
        return <Redirect to ='/'/>
    }
    
    return ( 
        <section className = 'section-top'  >
            <Helmet>
                <title>Main</title>
            </Helmet>
            {loading ? (
            <div className = {classes.loading}>
               <LinearProgress />
               <LinearProgress color="secondary" />
            </div>
           ): ( 
            
            <form className = 'section-form'>
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
                                                onChange = {onChange}/>
                                            <span className = 'radio-design'
                                                id = 'design'
                                                tabIndex = '0'> 
                                            </span>
                                            <span className = 'radio-text}'
                                                id = 'text'
                                                tabIndex = '0'>
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
                    <MyModal closeModal = {closeModal} modal = {modal} score = {score} reStart = {reStart} redirectHome = {redirectHome} />
                </div> 
            </form>
            )}
        </section>
    );
   
}

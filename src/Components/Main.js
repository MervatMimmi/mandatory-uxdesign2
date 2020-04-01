import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import './App.css';
import MyModal from './MyModal';

const useStyles = makeStyles(theme => ({
    section: {
        width: '100%',
        minHeight: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        background: 'rgb(230, 230, 230)',
        margin: 0,
        padding: 0,
    },
    form: {
        width: '50%',
        minHeight: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
    },
    quiz: {
        color: 'rgb(36, 36, 36)',
        padding: '0.5rem 0.25rem',
        borderBottom: '0.125rem solid rgb(36, 36, 36)',
    },
    label: {
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'nowrap',
        margin: '0.75rem 0',
        cursor: 'pointer',
        position: 'relative',
    },
    input: {
        opacity: '0',
        position: 'absolut',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '-1',
        
    },
    design: {
        width: '1rem',
        height: '1rem',
        border:  '0.1rem solid rgb(36, 36, 36)',
        borderRadius: '100%',
        marginRight : '1rem',
        position: 'relative',
        '&:before, &:after': {
            content: '',
            display: 'block',
            width: 'inherit',
            height: 'inherit',
            borderRadius: 'inherit',
            position: 'absolut',
            transform: 'scale(0)',
            transformOrgin: 'center center',
        },
        '&:before': {
            background: 'rgb(36, 36, 36)',
            opacity: '0',
            transition: '.3s',
        },
        '&:after': {
            background: '#3f51b5',
            opacity: '.4',
            transition: '.6s',
        },
    },
    text: {
        color: 'rgb(36, 36, 36)',
        fontWeight: 'bold',
    },
    input: {
        '&checked': {
            design: {
                '&:before': {
                    opacity: '1',
                    transform: 'scale(.6)',
                },
            },
        },
    },
    submitbutton: {
        position: 'relative',
        left: '50%',
        top: '50%', 
        margin: '5rem',
    },
    link: {
        textDecoration: 'none',
    }
}));


const API_QUIZ = 'https://opentdb.com/api.php?amount=10&category=27&type=multiple';

export default function Main(){
    const [quizData, updateQuizData] = useState([]);
    const [selectedAnswer, updateSelectedAnswer] = useState([]);
    const [correctAnswers, updateCorrectAnswers] = useState([]);
    const [score, updateScore] = useState(0);
    const [modal, setModal] = useState(false);
    
    const classes = useStyles();
    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);
    

  
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
    //Get data
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
            console.log(question.correct_answer);
            return
            })
               
        }

    function onChange(e){
        e.preventDefault();
        console.log(e.target.value);
        updateSelectedAnswer(e.target.value);
    }
      
    function onSubmit() {
        
       /* for(let i = 0; i < 10; i ++)
            if(correctAnswers === selectedAnswer) {
                updateScore(score +=1)
                console.log(updateScore);
                
                }
            */
        }

    

    return (
        <section className = {classes.section}>
            
            <form className = {classes.form}
                            onSubmit = {onSubmit}>
                
                {quizData.map((quiz, idx) => {
                    let answers = [quiz.correct_answer, ...quiz.incorrect_answers].sort(()=> Math.random() -3);
                    return (
                        <div>
                            <h4 className = {classes.quiz}
                                    tabIndex = '0'>
                                        {idx += 1 }{' '}{quiz.question.replace(/&#?\w+;/g, match => selectedCode[match])}
                            </h4>
                                {answers.map((answer, idx) => {
                                    return(
                                    <section className = {classes.answers} >
                                        <label className = {classes.label}
                                            id = 'label'>
                                            <input className = {classes.input}
                                                key = {idx}
                                                id = 'answer'
                                                type = 'radio'
                                                value = 'true'
                                                name = {quiz.question}
                                                checked 
                                                onChange = {onChange}
                                                
                                                />
                                            <span className = {classes.design}
                                                id = 'design'
                                                tabIndex = '0'>
                                                    
                                                </span>
                                            <span className = {classes.text}
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
                <div className={classes.submitbutton}>
                   
                    {!modal && <Button className = {classes.button} variant="contained" color="primary"  type = 'submit' tabIndex = '0'
                        onClick = {openModal} >
                        Submit     
                    </Button>}
                    <MyModal closeModal = {closeModal} modal = {modal}  />
                </div>
            </form>
        </section>
    );
   
}

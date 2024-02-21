import React from "react";
import QuestionItem from './QuestionItem.js'
import { v4 as uuidv4 } from 'uuid';

function QuestionList({questions,setQuestions,deleteQuestion,dbUrl}) {

  const updateQuestions = (newQ) => {
    const newQuestions = questions.map((q) => {
      if(q.id === newQ.id){
        return newQ
      } else {
        return q
      }

    })

   setQuestions(newQuestions)

  }

  const editAnswer = (e) => {
    const idSelector = Number(e.target.parentElement.parentElement.querySelector('h4').innerText.split(' ')[1])
  
    fetch(`${dbUrl}/${idSelector}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "correctIndex": e.target.value
      })

    })
    .then(resp => resp.json())
    .then((updatedQ) => updateQuestions(updatedQ))





    
    console.log(idSelector)

  }



  const renderedQuestions = questions.map((q) => <QuestionItem key={uuidv4()} question={q} deleteQuestion={deleteQuestion} editAnswer={editAnswer} />)



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderedQuestions}</ul>
    </section>
  );

}


export default QuestionList;

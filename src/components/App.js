import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  const dbUrl = 'http://localhost:4000/questions';

  useEffect(() => {

    fetch(dbUrl)
    .then(resp => resp.json())
    .then(data => {
      setQuestions(data)
    })

  }, [])

  const deleteQuestion = (e) => {
    const idSelector = Number(e.target.parentElement.querySelector('h4').innerText.split(' ')[1])


    fetch(`${dbUrl}/${idSelector}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setQuestions(questions.filter((q) => q.id !== idSelector))


  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} setQuestions={setQuestions} dbUrl={dbUrl} /> : <QuestionList questions={questions} setQuestions={setQuestions} deleteQuestion={deleteQuestion} dbUrl={dbUrl} />}
    </main>
  );
}

export default App;

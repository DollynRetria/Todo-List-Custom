'use client';
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment, ChangeEvent, useState, useEffect, MouseEventHandler } from "react";
import DatePicker from "react-datepicker"; 
import { addTodoItem } from '@/redux/todo/todoSlice';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import ListesTodo from '@/components/ListesTodo/ListesTodo';

interface TodoState {
  titre: string;
  description: string; 
  statut: string;
  priority: string;
  achieved: string;
}



export default function Home() {
  let todos = useSelector((state) => state.todoSlice.todos);

  const dispatch = useDispatch();
  const [todoState, setTodoState] = useState<TodoState>({
    titre: '',
    description: '',
    statut: 'non-commence',
    priority: 'non-definit',
    achieved: '0',
  })

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [displayFormTodo, setDisplayFormTodo] = useState(false);
  const [displayFiltreAndTri, setDisplayFiltreAndTri] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {id, value} = event.target;
    setTodoState(prevState => ({
      ...prevState, 
      [id]: value
    }));
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    let mydata;
    if(todoState.titre.length > 0 && todoState.description.length > 0){
      mydata = {
        id: uuidv4(),
        title: todoState.titre, 
        description: todoState.description, 
        statut: todoState.statut, 
        priority: todoState.priority, 
        achieved: todoState.achieved, 
        debut: startDate, 
        fin: endDate
      }
      dispatch(addTodoItem(mydata));
      setTodoState({
        titre: '',
        description: '',
        statut: 'non-commence',
        priority: 'non-definit',
        achieved: '0',
      })
      setStartDate(new Date());
      setEndDate(new Date());

    }
  }

  /* displayTodo */
  const displayTodo = () => {
    setDisplayFormTodo(true);
  }

  const filtreOrTri = () => {
    setDisplayFiltreAndTri(!displayFiltreAndTri);
  }

    //export to format json
    const handleExportJSON = () => {
      const jsonData = JSON.stringify(todos);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    //end export to format json

    //export to format csv
    const convertToCSV = (objArray) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
    
        for (let i = 0; i < array.length; i++) {
          let line = '';
          for (const index in array[i]) {
            if (line !== '') line += ',';
            line += array[i][index];
          }
          str += line + '\r\n';
        }
        return str;
    };

    const handleExportCSV = () => {
        const csvData = convertToCSV(todos);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    //end export to format csv

  return (
    <Fragment>
      <h1 className="text-center mt-3 mb-3">Mon App. Todo List</h1>
      <button className="btn btn-primary" onClick={displayTodo}>Ajouter un Todo</button>      
      {
        todos.length > 0 
          && 
        (
          <Fragment>
          <span>&nbsp; &nbsp;</span>
          <button className="btn btn-primary" onClick={filtreOrTri}>Filtrer ou Trier</button>
          <span>&nbsp; &nbsp;</span>
          <button className="btn btn-danger" onClick={handleExportJSON}>Export JSON</button>
          <span>&nbsp; &nbsp; &nbsp;</span>
          <button className="btn btn-success" onClick={handleExportCSV}>Export CSV</button>
          </Fragment>
        )
      }

      

      <div className="mt-3">
        <h3> Listes des Todo : </h3>
        <ListesTodo dFiltreOrTrie={displayFiltreAndTri} />
      </div>


      {/* Formulaire d'ajout d'un todo */}
      {
        displayFormTodo 
        
        && 

        <form id="todo-form" style={{'marginTop':'15px', 'marginBottom':'20px'}}>
        <div><strong>Formulaire d'ajout d'un Todo</strong></div>
        <div className="form-group">
          <label htmlFor="titre">Titre :</label>
          <input type="text" className="form-control" id="titre" placeholder="Titre" value={todoState.titre} onChange={handleChange} onBlur={handleChange}  />  
        </div>
        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <input type="text" className="form-control" id="description" placeholder="Description" value={todoState.description} onChange={handleChange} onBlur={handleChange} />  
        </div>
        <div className="form-group">
          <label htmlFor="statut">Statut :</label>
          <select value={todoState.statut} className="form-control" id="statut" onChange={handleChange}>
            <option value="non-commence">Non commencé</option>
            <option value="en-cours">En cours</option>
            <option value="terminee">Terminé</option>
          </select>  
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priorité :</label>
          <select value={todoState.priority} className="form-control" id="priority" onChange={handleChange}>
            <option value="non-definit">Non définit</option>
            <option value="p0">Immédiat</option>
            <option value="p1">Urgent</option>
            <option value="p2">Moyen</option>
            <option value="p3">Bas</option>
          </select>  
        </div>
        <div className="form-group">
          <label htmlFor="achieved">Pourcentage réalisé :</label>
          <select value={todoState.achieved} className="form-control" id="achieved" onChange={handleChange}>
            <option value="0">0%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
            <option value="60">60%</option>
            <option value="70">70%</option>
            <option value="80">80%</option>
            <option value="90">90%</option>
            <option value="100">100%</option>
          </select>  
        </div>
        <div className="form-group">
          <label htmlFor="achieved">Début :</label>
          <DatePicker  selected={startDate} onChange={(date: Date) => setStartDate(date)} />
          <br />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="achieved">Echeance :</label>
          <DatePicker  selected={endDate} onChange={(date: Date) => setEndDate(date)} />
        </div>

        <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-3">Ajouter</button>
      </form>
      }
      {/* END Formulaire d'ajout d'un todo */}




    </Fragment>
  );
}

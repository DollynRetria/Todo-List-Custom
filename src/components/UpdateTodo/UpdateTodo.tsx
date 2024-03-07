import DatePicker from "react-datepicker"; 
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import React, { Fragment, ChangeEvent, useState, useEffect, MouseEventHandler } from "react";
import { updateTodoItem } from "@/redux/todo/todoSlice";

const UpdateTodo = ({dataTodoPerId, pformUpdate, onDisplayFormUpdate}) => {
    console.log(pformUpdate);

    const dispatch = useDispatch();
    const [todoState, setTodoState] = useState({
        titre: dataTodoPerId[0].title,
        description: dataTodoPerId[0].description,
        statut: dataTodoPerId[0].statut,
        priority: dataTodoPerId[0].priority,
        achieved: dataTodoPerId[0].achieved,
    });

    const [startDate, setStartDate] = useState(dataTodoPerId[0].debut);
    const [endDate, setEndDate] = useState(dataTodoPerId[0].fin);

    //const [formUpdate, setFormUpdate] = useState(true);
  

    
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
            id: dataTodoPerId[0].id, 
            title: todoState.titre, 
            description: todoState.description, 
            statut: todoState.statut, 
            priority: todoState.priority, 
            achieved: todoState.achieved, 
            debut: startDate, 
            fin: endDate
        }


        dispatch(updateTodoItem(mydata));
            onDisplayFormUpdate(false);
        }
    }


    return (
        <Fragment>
            {
                pformUpdate

                &&

                <form id="todo-form" style={{'marginTop':'15px', 'marginBottom':'20px'}}>
                    <div><strong>Formulaire de modification d'un todo</strong></div>
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

        </Fragment>
    )
}

export default UpdateTodo
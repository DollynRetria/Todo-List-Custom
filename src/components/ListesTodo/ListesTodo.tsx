'use client';
import { useDispatch, useSelector } from "react-redux";
import { MouseEventHandler, useState } from 'react';
import { Fragment, ChangeEvent } from "react";
import { removeTodoItem } from "@/redux/todo/todoSlice";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Modal/Modal";
import UpdateTodo from "../UpdateTodo/UpdateTodo";

const ListesTodo = (props) => {
  let todos = useSelector((state) => state.todoSlice.todos);

  const [filterState, setFilterState] = useState({statut: 'non-commence', achieved: '0'})
  const [filterResult, setFilterResult] = useState([]);

  const [triPerPriorityState, setTriPerPriorityState] = useState([]);

  const [triStartDate, setTriStartDate] = useState(new Date());
  const [triEndDate, setTriEndDate] = useState(new Date());
  const [triPerDateState, setTriPerDateState] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  let [todoPerId, setTodoPerId] = useState([]);

  let [todoUpdatePerId, setTodoUpdatePerId] = useState([]);

  const [formUpdate, setFormUpdate] = useState(true);

 

  const dispatch = useDispatch();

  const deleteTodoByID = (id) => {
      dispatch(removeTodoItem(id));
  }

  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {id, value} = event.target;
    setFilterState(prevState => ({
      ...prevState, 
      [id]: value
    }));
  }

  const handleSubmitFilter: MouseEventHandler<HTMLButtonElement>  = (event) => {
    event.preventDefault();

    let todoAfterFilter = todos.filter(element => {
        return element.statut === filterState.statut || element.achieved === filterState.achieved;
    })

    setFilterResult([...todoAfterFilter]);
  }

  const handleInitiazation = () => {
    setFilterResult([]);
  }

  const triPerPriority = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target;

    const objPriority = ['p0', 'p1', 'p2', 'p3',  'non-definit'];
    const objPriorityReverse = ['p3', 'p2', 'p1', 'p0',  'non-definit'];

    if(target.value == "immediatToBas"){
      setTriPerPriorityState([]);
      let dataTodo = [];
      for(let i=0; i < objPriority.length; i++){
          let dataTodoItem = filterResult.length > 0 ? 
              filterResult.filter((element) => element.priority === objPriority[i]) : 
              todos.filter((element) => element.priority === objPriority[i]);
          dataTodo.push(...dataTodoItem);
      }
      setTriPerPriorityState([...dataTodo]);
    }

    if(target.value == "basToImmediat"){
      setTriPerPriorityState([]);
      let dataTodo = [];
      for(let i=0; i < objPriorityReverse.length; i++){
          let dataTodoItem = filterResult.length > 0 ? 
          filterResult.filter((element) => element.priority === objPriorityReverse[i]):
          todos.filter((element) => element.priority === objPriorityReverse[i]);
          dataTodo.push(...dataTodoItem);
      }
      setTriPerPriorityState([...dataTodo]);
    }

    if(target.value === ""){
      setTriPerPriorityState([]);
    }
  }

  const triPerDate = (e) => {
    e.preventDefault();
    let dataTodo = filterResult.length > 0 ? 

        filterResult.filter((element) => {
            let date1 = new Date(triStartDate);
            let date2 = new Date(triEndDate); 
            let diffStartDate = (new Date(element.debut).getTime() - date1.getTime() ) / (1000 * 3600 * 24);
            let diffEndDate = (date2.getTime() - new Date(element.fin).getTime()) / (1000 * 3600 * 24);
            return diffEndDate >= 0 && diffStartDate >= 0;
        }) 
        :
        todos.filter((element) => {
            let date1 = new Date(triStartDate);
            let date2 = new Date(triEndDate); 

            let diffStartDate = (new Date(element.debut).getTime() - date1.getTime() ) / (1000 * 3600 * 24);
            let diffEndDate = (date2.getTime() - new Date(element.fin).getTime()) / (1000 * 3600 * 24);

            return diffEndDate >= 0 && diffStartDate >= 0;
        });
    setTriPerDateState([...dataTodo]);
  }

  const todoItemById = (_id) => {
    let todoFilter = todos.filter((element) => element.id === _id);
    setTodoPerId(todoFilter);
    setIsModalOpen(true);
  }

    const updateTodoById = (_id) => {
      let todoToUpdate = todos.filter((element) => element.id === _id);
      setTodoUpdatePerId(todoToUpdate);
      setFormUpdate(true);
    }

    const displayFormUpdate = (toggle: boolean) => {
      setFormUpdate(toggle);
    }


    const displayTodo = (dataTodos) => {
        if(dataTodos.length > 0){
          let todosLists = dataTodos.map((element, index) => {
            const objStatut = {
              'non-commence': 'Non commencé',
              'en-cours': 'En cours',
              'terminee': 'Terminé'
            }
    
            const objPriority = {
              'non-definit': 'Non définit',
              'p0': 'Immédiat',
              'p1': 'Urgent',
              'p2': 'Moyen',
              'p3': 'Bas'        
            }
            
            return (
                <li className="list-group-item" key={index} style={{ 'backgroundColor': index % 2 !== 0 ? 'rgba(0,0,0,0.075)': 'transparent'}}>
                    <div className="todo-wrapper">
                    <div className="todo-wrapper-title">
                        <div><strong>Titre :</strong> {element.title}</div>
                        <div><strong>Statut :</strong> {objStatut[element.statut]}</div>
                        <div><strong>Priorité :</strong> {objPriority[element.priority]}</div>
                        <div><strong>% Réalisé :</strong> {element.achieved}%</div>
                        <div><strong>Date d'écheance :</strong> {new Date(element.debut).toLocaleDateString("fr")} au {new Date(element.fin).toLocaleDateString("fr") }</div>
                    </div>
                    <div className="todo-wrapper-action">
                        <button className="btn btn-info" onClick={() => todoItemById(element.id)}>Voir Plus</button> | <button onClick={() => updateTodoById(element.id)}  className='btn btn-warning'>Modifier</button> | <button onClick={() => deleteTodoByID(element.id)} className="btn btn-danger">Supprimer</button>
                    </div>
                    </div>
                </li>
            )
          });

          return (
            <ul className="list-group">
              {todosLists}
            </ul>
          )
        }else{
            return (
                <h2>Aucun Todo à afficher. Veuillez ajouter un Todo. Merci !!!</h2>
            )
        }
    }


    let _display;
    if(filterResult.length > 0){
        if(triPerDateState.length > 0){
            _display = displayTodo(triPerDateState);
        } else if (triPerPriorityState.length > 0) {
            _display = displayTodo(triPerPriorityState);
        }else{
            _display = displayTodo(filterResult);
        }
    }else{
        if(triPerDateState.length > 0){
            _display = displayTodo(triPerDateState);
        } else if (triPerPriorityState.length > 0) {
            _display = displayTodo(triPerPriorityState);
        }else{
            _display = displayTodo(todos);
        }
    }

    return (
        <Fragment>
          {
            props.dFiltreOrTrie

            && 

            <div className="filtre-and-tri" style={{'display':'flex', 'justifyContent': 'space-between', 'width': '100%'}}>
              {/* filtre */}
              <div className="filtre">
                  <div><strong>Filtrer par :</strong></div>
                  <form>
                    <div className="form-group mb-4">
                        <label htmlFor="statut"><strong>Statut :</strong></label>
                        <select value={filterState.statut} className="form-control" id="statut" onChange={handleChangeFilter}>
                            <option value="non-commence">Non commencé</option>
                            <option value="en-cours">En cours</option>
                            <option value="terminee">Terminé</option>
                        </select> 
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="achieved"><strong>% Réalisé :</strong></label>
                        <select value={filterState.achieved} className="form-control" id="achieved" onChange={handleChangeFilter}>
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

                    <button className="btn btn-primary" onClick={handleSubmitFilter}>Appliquer le filtre</button>
                    <span>&nbsp; &nbsp; &nbsp;</span>
                    <button className="btn btn-success" onClick={handleInitiazation}>Reinitialiser le filtre</button>
                  </form>
              </div>
              {/* end filtre */}
              {/* Tri */}
              <div className="tri">
                <div><strong>Trier par :</strong></div>
                
                <div style={{'margin': '0 0 15px'}}>
                  <div><strong>Ordre de priorité (Veuillez selectionner) :</strong></div>
                  <div className="form-group">
                      <select className="form-control" onChange={triPerPriority}>
                          <option value="">Priorité</option>
                          <option value="immediatToBas">Immédiat - Bas</option>
                          <option value="basToImmediat">Bas - Immédiat</option>
                      </select>
                  </div>
                </div>
                <div style={{'margin': '15px 0'}}>
                  <div><strong>Date :</strong></div>
                  <form>
                      <div className="mt-1 mb-3" style={{'display': 'flex', 'justifyContent':'flex-between'}}>
                        <div className="form-group" style={{'marginRight': '20px'}}>
                            <div>Début :</div>
                            <DatePicker  selected={triStartDate} onChange={(date: Date) => setTriStartDate(date)} />
                        </div>
                        <div className="form-group" style={{'marginLeft': '20px'}}>
                            <div>Echeance :</div>
                            <DatePicker  selected={triEndDate} onChange={(date: Date) => setTriEndDate(date)} />
                        </div>
                      </div>
                      <button className="btn btn-success" onClick={triPerDate}>Trier par date</button>
                  </form>
                </div>
              </div>
              {/* End Tri */}
            </div>
          }

          {_display}

          <Modal isOpen={isModalOpen} onClose={closeModal} todoPerId={todoPerId} />

          {/* Formulaire de modification */}
          {todoUpdatePerId.length > 0 && <UpdateTodo dataTodoPerId={todoUpdatePerId} pformUpdate={formUpdate} onDisplayFormUpdate={displayFormUpdate}  />}
          {/* End Formulaire de modification */}
        </Fragment>
    )
}

export default ListesTodo;
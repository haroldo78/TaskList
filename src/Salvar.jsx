// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './TudoList.css';
import Icone from './assets/icon.webp';
function TodoList() {

    const listaStorege = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorege ? JSON.parse(listaStorege) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista))
    }, [lista])

    function adicionaItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();
        console.log(document.getElementById('input-entrada').focus());
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1)
        setLista(listaAux);
    }

    function deletaTodos() {
        setLista([]);
    }

    return (
        <div>
            <h1>Task List</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id='input-entrada'
                    type="text"
                    value={novoItem}
                    onChange={(e) => { setNovoItem(e.target.value) }}
                    placeholder='Add the task'
                />
                <button className='add' type='submit'>Add</button>
            </form>
            <div className='listaTarefas'>
                <div style={{ textAlign: 'center' }}>
                {
                        lista.length < 1
                        ?
                        <img className="icone-cental" src={Icone} />
                        :
                        lista.map((item, index) => (
                           //key={index};
                            <div className = {item.isCompleted ? "item completo" : "item"} >
                                <span onClick={()=>{clicou(index)}}> {item.text}</span>
                                <button onClick={()=>{deleta(index)}} className='del'>Delete</button>
                            </div>
                        ))  
                    }
                {
                    lista.length > 0 &&
                    <button onClick={() => { deletaTodos() }} className='deleteAll'>Delete All</button>
                }

            </div>
        </div>
        </div >
    )

}

export default TodoList
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Update from './Update/index'
export const Squad = () => {

    useEffect(() => {
        getSquad()
    }, [])  
    const [squads, setSquads] = useState([])
    const [nameSquad, setNameSquad] = useState('')
    const [ramoSquad, setRamoSquad] = useState('')
    const [selectedIndex, setSelectedIndex] = useState()

    const getSquad = async () => {
        let {data} = await axios.get("http://localhost:3030/squad/")
        setSquads(data)
    }
    const deleteSquad = (id) => {
        axios.delete(`http://localhost:3030/squad/${id}`).then(()=> {
            getSquad()
        })
    }
    const addSquad = () => {
        axios.post("http://localhost:3030/squad/", {
            "name": nameSquad,
            "ramo": ramoSquad            
        }).then(()=> {
            getSquad()
        })
    }
    //CRUD -> C -> Create / R -> Read / U -> Update / D -> Delete
    return (
        <>
        {squads.map((squad, index) => (
            <>

                
                <h4>Nome da squad:</h4>
                <p>{squad.name}</p> <br />
                <h4>Ramo da squad:</h4>
                <p>{squad.ramo}</p> <br />
                <span>Ações:</span>
                <button onClick={e=> deleteSquad(squad.id)}>Deletar</button>
                <button onClick={()=> setSelectedIndex(index)}>Alterar</button>
                <br />
                {selectedIndex == index && <Update id={squad.id} name={squad.name} ramo={squad.ramo} getSquad={getSquad} setSelectedIndex={setSelectedIndex}/> }
            </>
        ))}

        <h3>Adicionar squad</h3>
        <label>Nome da squad</label>
        <input type="text" onChange={e=> setNameSquad(e.target.value)}></input>
        <label>Ramo da squad</label>
        <input type="text" onChange={e=> setRamoSquad(e.target.value)} ></input>
        <button onClick={() => addSquad()}>Adicionar</button>
    </>
    )
}
export default Squad

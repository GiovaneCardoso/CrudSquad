import React, {Fragment, useState} from 'react'
import axios from 'axios'

const Update = (props) => {
    const { name, ramo, id } = props
    const [SquadObject, setSquadObject] = useState({
        name: name || '',
        ramo: ramo || ''
    })
    const updateSquad = () => {
        let header = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.patch(`http://localhost:3030/squad/${id}`, {
            ...SquadObject
        }, header
        ).then(()=> {
            props.getSquad().then(()=> {
                props.setSelectedIndex(null)
            })
        })
    }
    return (
        <Fragment>
            <button onClick={()=> props.setSelectedIndex(null)}>Fechar</button> <br /><br />
            <label>Nome</label>
            <input type="text" defaultValue={name} onChange={e=> setSquadObject({...SquadObject, 'name': e.target.value})}></input> <br />
            <label>Ramo</label>
            <input type="text" defaultValue={ramo} onChange={e=> setSquadObject({...SquadObject, 'ramo': e.target.value})} ></input>
            <button onClick={()=> updateSquad()}>Alterar</button>
        </Fragment>
        )
}
export default Update
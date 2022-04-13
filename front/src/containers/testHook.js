import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'

//exemple de hook
const Counter = (props)=>{
    
    // gestion des state
    //    [nom de state, setter (pour modifier)] = on déclare que c'est une state  avec useState et on initialise sa valeur
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Gégé");
    
    //équivalent d'un componentDidMount dans une class
    //dans le useEffect, en premier argument la callback du code à éxécuter, en deuxième le moment (changement de state, de props)
    useEffect(() => {
        console.log("Mon DOM virtuel est chargé!")
        
    }, [])
    
    // se déclenche au changement de props
    useEffect(() => {
        console.log('Je m\'execute sans rien')
        console.log(props);
    }, [props]);
    
    // se déclenche au changement de state count
    useEffect(() => {
        console.log('Je m\'execute à chaque count')
        console.log(count);
    }, [count]);
    
    // se déclenche au changement de state name
    useEffect(() => {
        console.log('Je m\'execute à chaque name')
        console.log(name);
    }, [name]);
    
    // se déclenche au changement de state count ou name
    useEffect(() => {
        console.log('Je m\'execute à count + name')
        console.log(count);
    }, [count, name]);
    
    //on peut créer des fonctions (comme les méthodes dans les classes)
    const test = () => {
        return (
            <div>
                <p>je suis le test</p>
                {props.user.isLogged ? <p>Utilisateur connecté</p> : <p>Utilisateur déconnecté</p>}
            </div>
        )
    }
    
    //on appel la state directement par son nom de constante (pas de this.state.count)
    return (
        <div>
            <h1>Le compteur</h1>
            <p>Le compteur est à : {count}</p>
            <p>Un props : {props.something}</p>
            <p>Le nom est  : {name}</p>
            {test()}
            <button
                onClick={(e)=>{
                    //mise à jour de la state count
                    setCount(count + 1);
                }}
            >+ 1</button>
            <button
                onClick={(e)=>{
                    //mise à jour de la state name
                    setName('Bernard');
                }}
            >Changer le nom</button>
            <button
                onClick={(e)=>{
                    //mise à jour des states name et count
                    setName('Antoine');
                    setCount(30);
                }}
            >Changer TOUT</button>
        </div>
    )
    
}

const mapStateToProps = (store) => {
  return {
      user: store.user
  }  
}

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

/*class Counter extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    
    render(){
        return (
            <div>
                <h1>Le compteur</h1>
                <p>Le compteur est à : {this.state.count}</p>
                <button
                    onClick={(e)=>{
                        this.setState({count: this.state.count + 1});
                    }}
                >+ 1</button>
            </div>
        )
    }
    
}

export default Counter;*/
import React from "react";
import axios from 'axios';

import './app.scss';

const api = axios.create({
    baseURL: `http://localhost:3001/users`,
})

class App extends React.Component{

    state = {
        users:[]
    }

    constructor(){
        super();
        this.getUsers();
    }

    getUsers = async () => {
        try{
            let data = await axios({
                method:'get',
                url:'http://localhost:3001/users'
            }).then(({data}) => data);
            this.setState({users:data});
        }catch(err){
            console.log(err);
        }
    }

    createUser = async () => {
        let res = await api
            .post('/', {id:11, name:'Dmitry'})
            .catch(err => console.log(err));  
        this.getUsers();
    }

    deleteUser = async (id) => {
        let data = await api.delete(`/${id}`);
        this.getUsers();
    }

    updateUser = async (id, val) => {
        let data = await api.patch(`/${id}`, { name: val })
        this.getUsers(); 
    }

    render() {
        return (
            <div className="users">
                <h1>Users</h1>
                <ul>
                    {this.state.users.map(user => {
                        return(
                            <li onClick={() => this.updateUser(user.id, `${user.name}a`)}>
                                {user.name}
                                <button onClick={() => this.deleteUser(user.id)}>Delete this user</button>
                            </li>          
                        )
                    })} 
                </ul>
                <button onClick={this.createUser}>Create New User</button>   
            </div>
        );  
    }

}

export default App;
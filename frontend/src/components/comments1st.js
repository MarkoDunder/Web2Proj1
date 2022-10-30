import React, {useState} from 'react';
import { useAuth0,  } from "@auth0/auth0-react";
import { Button, Table, Form } from 'react-bootstrap';

/*function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }*/
  /*Date().toLocaleString()  datum postavljanja*/

function Comments1st() {

  const {user, isAuthenticated}=useAuth0();
  let date=new Date();
  let dateFormated=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  
  const [comments,setComments]=useState({
    text:"",
    userName:user!=null ? user.name : "",
    timeCreated:dateFormated
  });

  const [inputArr, setInputArr]=useState([]);
  function handleInputChange(e){
    setComments({
        ...comments,
        text:e.target.value
    })
}
    let {text, userName, timeCreated}=comments;
    function handleChange(){
        setInputArr([...inputArr, {text, userName, timeCreated}]);
        console.log(inputArr);
    }
  return (
    <>
        {isAuthenticated &&
        (<div>
            
            <input type="text" value={comments.text} id="text" name="text" placeholder='enter your comment' onChange={handleInputChange}></input>
            <Button variant="primary" onClick={handleChange}> Add comment</Button>
            
        </div>)
        
        }
        
        
        <Table striped>
        <thead>
        <tr>
          <th scope="col">User Name</th>
          <th scope="col">Time created</th>
          <th scope="col">Comment</th>
        </tr>
      </thead>
        <tbody>
        {
          inputArr.map((comment, index)=>{
            return(<tr key={index}>
              <td>{comment.userName}</td>
              <td>{comment.timeCreated}</td>
              <td>{comment.text}</td>
            </tr>)
          })
        }
        </tbody>
        </Table>
        
    </>
  )
}

export default Comments1st;
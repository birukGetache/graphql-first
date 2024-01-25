import react,{Component} from 'react';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';
class AddBooks extends Component {
    constructor(props){
      super(props);  
      this.state={
         name:'',
         genre:'',
         authorid:''
      } 
    }
    displayAuthor(){
        var data= this.props.data;
        if(data.loading){
            return(<option disabled>Loading Author</option>);
        }
        else {
            return data.authors.map(author=>{return(<option key={author.id} value={author.id}>{author.name}</option>)})
            }
        }
      submitForm(e){
        e.preventDefault();
        console.log(this.state);
      }
  render() {
   return(  
      <form id='add-book' onSubmit={this.submitForm.bind(this)}>
        <div className='field'>
            <label>Book Name:</label>
            <input type='text' onChange={(e)=>this.setState({name:e.target.value})}/>
        </div>
        <div className='field'>
            <label>Genre:</label>
            <input type='text' onChange={(e)=>this.setState({genre:e.target.value})}/>
        </div>
        <div className='field'>
            <label>Author</label>
            <select  onChange={(e)=>this.setState({authorid:e.target.value})}>
                <option>Select author</option>
                {this.displayAuthor()}
            </select>
        </div>
        <button>+</button>
      </form>
        )
  }
}
export default graphql(getAuthorsQuery)(AddBooks);

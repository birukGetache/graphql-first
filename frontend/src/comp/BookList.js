import react,{Component} from 'react';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
class BookList extends Component {
    
    displayBooks(){
        var data= this.props.data;
        if(data.loading){
            return (<div>Loading books...</div>)
        }
        // else {
        //     return data.books.map(book=>{
        //         return(
        //             <li key={book.id}>{books.name}</li>
        //         )
                    
        //     })
        // }
    }
  render (){
    // console.log(this.props);
    var data= this.props.data;
   
    return(  <div className="App">
    <ul>
     {this.displayBooks}
    </ul>
 </div>)
  }
}

export default graphql(getBooksQuery)(BookList);

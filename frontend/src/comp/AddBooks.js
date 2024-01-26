import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorid: ''
        };
    }

    displayAuthors() {
        const data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading Authors...</option>);
        } else {
            return data.authors.map(author => (
                <option key={author.id} value={author.id}>
                    {author.name}
                </option>
            ));
        }
    }

    submitForm(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorid: this.state.authorid
            }
        });
    }

    render() {
        return (
            <form id='add-book' onSubmit={e => this.submitForm(e)}>
                <div className='field'>
                    <label>Book Name:</label>
                    <input type='text' onChange={e => this.setState({ name: e.target.value })} />
                </div>
                <div className='field'>
                    <label>Genre:</label>
                    <input type='text' onChange={e => this.setState({ genre: e.target.value })} />
                </div>
                {/* <div className='field'>
                    <label>Author</label>
                    <select onChange={e => this.setState({ authorid: e.target.value })}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div> */}
                    <div className='field'>
                    <label>author:</label>
                    <input type='text' onChange={e => this.setState({ author: e.target.value })} />
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }), // Use 'name' option to specify the prop name
    graphql(addBookMutation, { name: 'addBookMutation' }) // Use 'name' option to specify the prop name
)(AddBooks);

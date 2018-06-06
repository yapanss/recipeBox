
import React from 'react'
import FaPlus from 'react-icons/lib/fa/plus'
import { Button } from 'mdbreact'

class RecipeForm extends React.Component {
 
constructor(props) {
	super(props)
	this.soumet = this.soumet.bind(this)
  // this.photoUpload = this.photoUpload.bind(this)
}
  
  soumet(e) {
  	e.preventDefault()
	  var donnees = [{
		  title : this.refs.inputTitle.value,
		  description : this.refs.inputDescription.value,
      ingredients: this.refs.inputIngredients.value,
      photo : this.refs.inputFile.files[0]
	  }]
	  this.props.soumet(donnees)
	}

  
  render() {
  	
    return (
    	<div className="mb-3" style={{marginLeft:"10%", marginRight:"10%"}}>
    		<Button color="primary" className="btn btn-block" onClick={this.props.toggleForm}><FaPlus /> Add a new recipe</Button>
    		<form style = {this.props.formDisplay}>
    			<div className = "form-group">
    				<label className="control-label">Title </label>
    				<input type="text" ref="inputTitle" className="form-control"/>
    			</div>
    			<div className = "form-group">
    				<label className="control-label">Description</label>
    				<input type="text" ref="inputDescription" className="form-control"/>
    			</div>
    			<div className = "form-group">
                    <label className="control-label">Ingredients</label>
                    <textarea cols="10" rows="10" type="text" ref="inputIngredients" className="form-control"/>
          </div>
          <div className = "form-group">
            <label className="control-label" >Choisir une photo</label>
            <input type="file" ref="inputFile" className="form-control-file" />
          </div>
    			<Button className="btn btn-success" onClick={this.soumet}>Add</Button>
    		</form>
    	</div>
    )
  }
}

export default RecipeForm
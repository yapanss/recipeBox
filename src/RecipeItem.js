import React from 'react'
import FaInfo from 'react-icons/lib/fa/info'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'


export default class RecipeItem extends React.Component {
	constructor(props) {
		super(props)
		this.hide = this.hide.bind(this)
		this.save = this.save.bind(this)
		this.edit = this.edit.bind(this)
	}

	hide() {
		this.props.hide()
	}
	edit() {
    	this.props.edit()
  	}
	save() {
		var donnees = {
		  title : this.refs.inputTitle.value,
		  description : this.refs.inputDescription.value,
	      ingredients: this.refs.inputIngredients.value,
	      photo : this.refs.inputFile.files[0],
	      id: this.props
		  }
		  this.props.save(donnees)
	}
	

	render() {
		return(
			<div style={{width: "50%", marginLeft:"25%"}} className="mb-3">
			<div className="card">
				<div className="card-header">
					<div className="card-title">
						<h2>{this.props.currentShown.title}</h2>
					</div>
					<div className="card-subtitle">
						<p>{this.props.currentShown.description}</p>
					</div>
				</div>
				<img src={this.props.currentShown.photo} width="100%" height="200" alt="receit image" /> 
				<div className="card-footer">
					<button className="btn btn-block bg-danger text-white" onClick={this.hide}>
						<FaEyeSlash /> Hide
					</button>
					<button className="btn btn-block bg-info text-white" data-toggle="modal" data-target={"#id_"+this.props.currentShown.id} onClick={this.edit}>
						<FaInfo /> Edit
					</button>
				</div>
			</div>

			<div id={"id_"+this.props.currentShown.id} className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body">
							<form >
				    			<div className = "form-group">
				    				<label className="control-label">Title </label>
				    				<input id="editTitle" type="text" ref="inputTitle" className="form-control" defaultValue={this.props.currentShown.title} />
				    			</div>
				    			<div className = "form-group">
				    				<label className="control-label">Description</label>
				    				<input type="text" ref="inputDescription" className="form-control" defaultValue={this.props.currentShown.description} />
				    			</div>
				    			<div className = "form-group">
				                    <label className="control-label">Ingredients</label>
				                    <textarea cols="7" rows="7" type="text" ref="inputIngredients" className="form-control" defaultValue={this.props.currentShown.ingredients} />
				                </div>
				                 <div className = "form-group">
						            <label className="control-label" >Choisir une photo</label>
						            <input type="file" ref="inputFile" className="form-control-file" />
						          </div>
				    		</form>
				    		<div className="modal-footer">
								<button className="btn btn-success" data-dismiss="modal" onClick={this.save}>Save</button>
							    <button className="btn btn-default" data-dismiss="modal">Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
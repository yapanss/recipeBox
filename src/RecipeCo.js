import React from 'react'
import RecipeLi from './RecipeLi'
import RecipeForm from './RecipeForm'
// import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, CardHeader, CardFooter } from 'reactstrap'
import {Button, Popover, PopoverBody, PopoverHeader} from 'mdbreact'
import FaTrash from 'react-icons/lib/fa/trash'
import FaInfo from 'react-icons/lib/fa/info'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'

export default class RecipeContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			formDisplay : false,
			recipes:[],
			modal: false,
			popoverOpen: false,
			currentEdited:{},
			currentShown: {},
			showItem: false,
			id:"",
			photoUrl:""
		}
		this.toggleForm = this.toggleForm.bind(this)
		this.soumet = this.soumet.bind(this)
		this.erase = this.erase.bind(this)
   		// this.photoUpload = this.photoUpload.bind(this)
   		this.togglePopover = this.togglePopover.bind(this)
   		this.edit = this.edit.bind(this)
   		this.show = this.show.bind(this)
   		this.hide = this.hide.bind(this)
   		this.save = this.save.bind(this)
   		this.close = this.close.bind(this)
   		this.getBase64 = this.getBase64.bind(this)
	}

	close() {
		this.setState({ modal: false })
	}

	soumet(donnees) {
		donnees[0].id = this.state.recipes.length+1
		this.getBase64(donnees[0].photo).then(base64 => {
			donnees[0].photo = base64
			let recip = [...this.state.recipes, ...donnees]
			localStorage.setItem('recipes', JSON.stringify(recip))
			this.setState(
				{recipes: recip}
			)
		})
		
	}

	save() {
		var donnees = {
		  title : this.refs.inputTitle.value,
		  description : this.refs.inputDescription.value,
      	  ingredients: this.refs.inputIngredients.value,
      	  id: this.state.currentEdited.id,
      	  photo: this.refs.inputFile.files[0]
	    }

	    if(!donnees.photo) {
	    	donnees.photo = this.state.currentEdited.photo
	    	let recip = this.state.recipes.map((item) => item.id == donnees.id ? donnees : item )
			localStorage.setItem('recipes', JSON.stringify(recip))
	    
		this.setState(prevState=>({
				recipes: prevState.recipes.map((item) => item.id == donnees.id ? donnees : item )
			})
		)
	    } else {this.getBase64(donnees.photo).then(base64 => {
			donnees.photo = base64
			let recip = this.state.recipes.map((item) => item.id == donnees.id ? donnees : item )
			localStorage.setItem('recipes', JSON.stringify(recip))
	    
		this.setState(prevState=>({
				recipes: prevState.recipes.map((item) => item.id == donnees.id ? donnees : item )
			})
		)
		})
		}

		this.setState({ modal: false })
		

	}

	togglePopover(i) {
		this.setState({
     		 popoverOpen: !this.state.popoverOpen,
			 currentEdited: this.state.popoverOpen == false ? this.state.recipes[i] : {}
     		 
    	});
	}

	getBase64(file) {
  			return new Promise((resolve,reject) => {
		     const reader = new FileReader();
		     reader.onload = () => resolve(reader.result);
		     reader.onerror = error => reject(error);
		     reader.readAsDataURL(file);
		  	});
	}

	erase(i) {
		let recip = this.state.recipes.filter((item)=>item != this.state.recipes[i])
		this.setState(prevState=>({
				recipes: prevState.recipes.filter((item)=>item != prevState.recipes[i])
			})
		)
		localStorage.setItem('recipes', JSON.stringify(recip))
	}
	edit(i) {
		this.setState({ 
			modal: true,
			currentEdited:this.state.recipes[i]
			
			
		 })
	
	}

	hide() {
		this.setState({
			currentShown: {},
			showItem: false
		})
	}
	show(i) {
		this.setState({ 
			showItem: true,
			currentShown: this.state.recipes[i]
			
			
		 })
	}

	toggleForm() {
		this.setState(
		 	{formDisplay: !this.state.formDisplay}
		)

 	}
   
 	

 	componentDidMount() {

 		this.setState({
 			recipes:!localStorage.getItem('recipes') ? [] : JSON.parse(localStorage.getItem('recipes'))
 		})
 		alert(localStorage.getItem('recipes'))

 	}

	render() {
	  	var formStyle = this.state.formDisplay ? {display : 'block'} : {display : 'none'}
	  	var displayItem = !this.state.showItem ? <div></div> : (<div style={{width: "80%", marginLeft:"20%", marginRight:"15%"}}>

	  			<Card body outline color="primary" className="mb-3">
	<CardHeader className="text-center text-primary" style={{fontSize: "2em"}}>{this.state.currentShown.title}</CardHeader>
        
        <img src={this.state.currentShown.photo} width="100%" height="200" alt="Card image cap" />
        
          <CardBody>
	          <CardTitle className="text-center mb-2">Description</CardTitle>
	          <CardText style={{height: "75px"}}>{this.state.currentShown.description}</CardText>
	          
	        </CardBody>
        <CardFooter>
        	<div className="row">
	          <div className="col-6">
	          		<Button className="btn btn-block" color="danger"  onClick={this.hide}><FaEyeSlash /> Hide</Button>
				</div>
				<div className="col-6">
					<Popover 
			          component="button"
			          placement="top" 
			          popoverBody="Ingredients" 
			          className="btn  btn-block bg-primary">
			          <PopoverHeader style={{backgroundColor: "#b03060", color:"white"}}>Ingredients of {this.state.currentShown.title}</PopoverHeader>
			          <PopoverBody style={{width: "200px", height:"200px"}}>{this.state.currentShown.ingredients}</PopoverBody>
			        </Popover>
				</div>
				
			</div>
        </CardFooter>
      </Card>

      </div>
	  		)
	  	let displayList = this.state.recipes.length == 0 ? <div></div> : this.state.recipes.map((item, i)=>
						
						<RecipeLi recipe={item} 
									key={i} 
									id={this.state.id}
									index={i}  
									erase={this.erase}
									toggleModal={this.toggleModal}
									togglePopover={this.togglePopover}
									modal={this.state.modal}
									edit={this.edit}
									save={this.save}
									show={this.show}
									displayItem={displayItem}>
							
						</RecipeLi>)
		return(
			<div style={{backgroundColor: "#708090"}}>
			<h1 className="text-center  mt-5">MyRecipeBox</h1>
			<div className="container mt-5 mb-5">
				<RecipeForm formDisplay={formStyle} 
							toggleForm={this.toggleForm}  
							soumet={this.soumet}>
								
				</RecipeForm>
				<div className="row">
				{displayItem}
				<ul style={{width: "100%", listStyle:"none", marginLeft:"20%", marginRight:"20%"}}>
					{displayList}
				</ul>
				</div>				
			</div>


			<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          			<ModalHeader toggle={this.toggle}>{this.state.currentEdited.title}</ModalHeader>
          			<ModalBody>
          				<form >
			    			<div className = "form-group">
			    				<label className="control-label">Title </label>
			    				<input id="editTitle" type="text" ref="inputTitle" className="form-control" defaultValue={this.state.currentEdited.title} />
			    			</div>
			    			<div className = "form-group">
			    				<label className="control-label">Description</label>
			    				<input type="text" ref="inputDescription" className="form-control" defaultValue={this.state.currentEdited.description} />
			    			</div>
			    			<div className = "form-group">
			                    <label className="control-label">Ingredients</label>
			                    <textarea cols="7" rows="7" type="text" ref="inputIngredients" className="form-control" defaultValue={this.state.currentEdited.ingredients} />
			                </div>
			                 <div className = "form-group">
					            <label className="control-label" >Choisir une photo</label>
					            <input type="file" ref="inputFile" className="form-control-file" />
					          </div>
			    		</form>
		          </ModalBody>
		          <ModalFooter>
		            <Button color="primary" onClick={this.save}>Save</Button>{' '}
		            <Button color="default" onClick={this.close}>Cancel</Button>
		          </ModalFooter>
		        </Modal>

			</div>
		)
	}
}
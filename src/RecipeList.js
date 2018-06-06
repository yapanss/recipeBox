
import React from 'react'
import FaTrash from 'react-icons/lib/fa/trash'
import FaInfo from 'react-icons/lib/fa/info'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, CardHeader, CardFooter} from 'reactstrap'
import { Button, Popover, PopoverBody, PopoverHeader } from 'mdbreact'

export default class RecipeList extends React.Component {

	constructor(props) {
		super(props)
		this.erase = this.erase.bind(this)
    	this.toggleModal = this.toggleModal.bind(this)
    	this.togglePopover = this.togglePopover.bind(this)
    	this.edit = this.edit.bind(this)
    	

	}

	
	togglePopover() {
		
		this.props.togglePopover(this.props.index)
	}
	toggleModal(e) {
		console.log(e.target)
		this.props.toggleModal()
	}
	erase() {
   	 this.props.erase(this.props.index)
  	}
  
 	edit() {
    	this.props.edit(this.props.index)
  	}

	render() {

		return(
			
				<div className="col-4" id={this.props.recipe.id}>
				

<Card body outline color="primary" className="mb-3">
	<CardHeader className="text-center text-primary" style={{fontSize: "2em"}}>{this.props.recipe.title}</CardHeader>
        
        <img src={this.props.recipe.photo} width="100%" height="200" alt="Card image cap" />
        
          <CardBody>
	          <CardTitle className="text-center mb-2">Description</CardTitle>
	          <CardText style={{height: "75px"}}>{this.props.recipe.description}</CardText>
	          <Popover 
			          component="button"
			          placement="top" 
			          popoverBody="Ingredients" 
			          className="btn  btn-block bg-primary">
			          <PopoverHeader style={{backgroundColor: "#b03060", color:"white"}}>Ingredients of {this.props.recipe.title}</PopoverHeader>
			          <PopoverBody style={{width: "200px", height:"200px"}}>{this.props.recipe.ingredients}</PopoverBody>
			        </Popover>
	        </CardBody>
        <CardFooter>
        	<div className="row">
	          <div className="col-6">
	          		<Button className="btn btn-block" color="danger"  onClick={this.erase}><FaTrash /> Remove</Button>
				</div>
				<div className="col-6">
					<Button className="btn btn-block" color="info"  onClick={this.edit}><FaInfo /> Edit</Button>
				</div>
				
			</div>
        </CardFooter>
      </Card>
      						
				</div>

		)
	}
}


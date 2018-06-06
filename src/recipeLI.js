

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
    	this.show = this.show.bind(this)

	}

	show() {
		this.props.show(this.props.index)
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
			
				<div>
					
					<li style={{
								
								backgroundColor: "orange", 
								marginBottom: "15px"
								
								}}
						>
						<div className="row">
							<p className="col-10" onClick={this.show} style={{cursor: "pointer", fontSize: "1.7em", 
								color: "white"}}>{this.props.recipe.title}</p>
							<Button className="col-1" color="info" style={{float: "right"}} onClick={this.edit}><FaInfo /></Button>
							<Button className="col-1" color="danger" style={{float: "right"}} onClick={this.erase}><FaTrash /></Button>
						</div>
						
					</li>

      						
				</div>

		)
	}
}


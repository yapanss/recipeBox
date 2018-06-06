

import React from 'react'
import MdDelete from 'react-icons/lib/md/delete-forever'
import FaInfo from 'react-icons/lib/fa/info'
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
								
								marginBottom: "15px"
								
								}}
						>
						<div className="row">
							<p className="col-9 text-center bg-warning" onClick={this.show} style={{cursor: "pointer", fontSize: "1.7em", 
								color: "white"}}>{this.props.recipe.title}</p>
							<Button className="btn  col-3 sm" color="danger" style={{marginBottom: "15px"}} onClick={this.erase}><MdDelete size={28} /> Remove</Button>
						</div>
						
					</li>

      						
				</div>

		)
	}
}


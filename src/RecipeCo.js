import React from 'react'
import RecipeLi from './RecipeLi'
import RecipeForm from './RecipeForm'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, CardHeader, CardFooter } from 'reactstrap'
import {Button, Popover, PopoverBody, PopoverHeader} from 'mdbreact'
import FaTrash from 'react-icons/lib/fa/trash'
import FaInfo from 'react-icons/lib/fa/info'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import RecipeItem from './RecipeItem'
import $ from 'jquery'


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
			id: 0,
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
		donnees[0].id = this.state.id++
		console.log(donnees[0])
		if(!donnees[0].photo) {
	    	let recip = [...this.state.recipes, ...donnees]
			localStorage.setItem('recipes', JSON.stringify(recip))
			localStorage.setItem('ids', JSON.stringify(this.state.id++))
			this.setState({
				recipes: recip,
				id: this.state.id++
			})
		
	    } else {
	    	this.getBase64(donnees[0].photo).then(base64 => {
			donnees[0].photo = base64
			let recip = [...this.state.recipes, ...donnees]
			localStorage.setItem('recipes', JSON.stringify(recip))
			localStorage.setItem('ids', JSON.stringify(this.state.id++))
			this.setState(
				{recipes: recip}
			)
		})
	    }

		
		
	}

	save(donnees) {
		donnees.id = this.state.currentEdited.id
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
	edit() {
		this.setState({ 
			currentEdited: this.state.currentShown,

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
			currentShown: this.state.recipes[i],
			currentEdited: this.state.recipes[i],
			showItem: true
			
		 })
	}

	toggleForm() {
		this.setState({
			formDisplay: !this.state.formDisplay,
		 	showItem: false,
		    currentShown: {}
		    }
		)

 	}
   
 	
 	componentWillMount() {
 		$('body').css({backgroundColor : "#708090" })
 	}
 	componentDidMount() {

 		this.setState({
 			recipes:!localStorage.getItem('recipes') ? [] : JSON.parse(localStorage.getItem('recipes')),
 			id: !localStorage.getItem('ids') ? 0 : parseInt(localStorage.getItem('ids'))
 		})
 		alert(localStorage.getItem('recipes'))

 	}

	render() {
	  	var formStyle = this.state.formDisplay ? {display : 'block'} : {display : 'none'}
	  	var displayItem = !this.state.showItem ? <div></div> : <RecipeItem 	
	  																currentShown={this.state.currentShown}
	  																hide={this.hide}
	  																save={this.save}
	  																edit={this.edit}>
	  															</RecipeItem>
	  	let displayList = this.state.recipes.length == 0 ? <div></div> : this.state.recipes.map((item, i)=>
						
						<RecipeLi recipe={item} 
									key={i} 
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
			<div className="container mt-5 mb-5">
			<h1 className="text-center  mb-5 text-white">MyRecipeBox</h1>
			
				<RecipeForm formDisplay={formStyle} 
							toggleForm={this.toggleForm} 
							hide={this.hide} 
							soumet={this.soumet}>
								
				</RecipeForm>
				<div className="row">
				{displayItem}
				<ul style={{width: "75%", listStyle:"none", marginLeft:"11%"}}>
					{displayList}
				</ul>
				</div>				
			



			</div>
		)
	}
}

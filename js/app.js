// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

import DOM from 'react-dom'
import React, {Component} from 'react'

function app() {
    // start app
    // new Router()
    var ironData = {
        meta: {
            resultsCount: 100,
            perPage: 3
        },
        results: [
            {
              title: "Cute Kitten",
              seller: "not_kitten_mill",
              price: "1500.00",
              descr: "Adorable and friendly, fully potty-trained, loves people, children, and other animals. Enjoys playing with toy mice and sitting on window ledges.",
              image_url: "http://cdn1-www.cattime.com/assets/uploads/2011/08/best-kitten-names-1.jpg"
            },

            {
              title: "Smartest Puppy Ever",
              seller: "notPuppyMill",
              price: "2500.00",
              descr: "Pure-bred, knows many basic commands, loves to play, will win shows as well as everyone's hearts. Needs a truly caring home, and lots of time to bond!",
              image_url: "http://www.pamperedpetz.net/wp-content/uploads/2015/09/Puppy1.jpg"
            },

            {
              title: "Domesticated Fox",
              seller: "forestLove3000",
              price: "4000.00",
              descr: "Mom abandoned this cute little guy as a pup; now he has grown up a bit, is trained to play fetch and go for walks. Very friendly. Also, has luxurious, thick fur, if you'd rather go a different route...",
              image_url: "http://a.abcnews.go.com/images/Lifestyle/ht_pudding_the_fox_03_mt_140821_12x5_1600.jpg"
            }
            
        ]
    }

    var AppView = React.createClass ({ 
        render: function() { //<= built-in keyword
        //console.log(the AppView is...)
        //console.log(this)
    		return (
    			<div className="pageContainer">	
	    			<h1 className="headline">Iron Etsy</h1>
	    			<AboutResults aboutData={this.props.shopData.meta}/> {/* will have prop.aboutData.resultsCount...whatever was in the meta data object */}
	    			<ListingGrid listings={this.props.shopData.results}/> {/* the results array from the ironShop obj will be passed down to the props of this object under the key "listings" */}
	    		</div>	
    		)
    	}
    })

    var AboutResults = React.createClass ({  //<= self-encapsulating, reusable component which can be used in different projects and handle different user interactions
    	render: function() {
            //console.log("AboutResults is...")
            //console.log(this)
    		return ( //<= must return only one parent element, though it can have many children
    			<div className="about">	
	    			<p className="nResults">{this.props.aboutData.resultsCount} results</p>
	    			<p className="nShowing">{this.props.aboutData.perPage} showing</p>
	    		</div>		
    		)
    	}
    })

    var ListingGrid = React.createClass ({

    	_getListingsJSX: function(listingsArr) { //<= should return an array of listings
           //console.log(listingsArr)
         var listingArr = []
    	   for (var i = 0; i < listingsArr.length; i++) {
                var listingObj = listingsArr[i]
                //console.log(listingObj)
                var listingComponent = <Listing key={i} listingData={listingObj}/> //<= when the Listing component will be rendered, each instance will have a listing object under each "listingData" key, with a unique id (react looks for "key" instead of "id"; it will not be accessible in props)
                listingArr.push(listingComponent)
           }
           return listingArr
    	},

    	render: function() { 
            //console.log("here comes ListingGrid")
            //console.log(this)
            var listingsArr = this.props.listings
            //console.log(listingsArr)
    		return (
    			<div className="listingsContainer">
    				{/*js to be evaluated must go inside squirrely brackets*/}
    				{this._getListingsJSX(listingsArr)} 
    			</div>
    		)    		
    	}
    })

    var Listing = React.createClass ({

      _showMoreInfo: function() {
          if (this.state.fullDescription) { //if fullDescirption is already showing
            this.setState({ //<= built-in method that changes/sets the state, causing an automatic reflow of the listing component on the DOM
              fullDescription: false,
              buttonSymbol: "+"
            })
          }
          else {
            this.setState({
               fullDescription: true,
               buttonSymbol: "-"
            })
          }
      },

      getInitialState: function() { //<= a built-in life-cycle function: only runs once when the component is born (aka "mounted"), setting the values for the intiial listing component state. (The default value for a state is "null")
        return {
          fullDescription: false, //<=  the state will be an object with keys=values fullDescription=false, buttonSymbol="+"). 
          buttonSymbol: "+"
        }
      },

    	 render: function() {
            //console.log("here comes Listing component")
        	//console.log(this)
        var listingData = this.props.listingData
            //console.log(listingData)        
        var descriptionToWrite //<= declare variable once, instead of twice in the if/else statement, where it will take on one of two values 
        if (this.state.fullDescription) descriptionToWrite = listingData.descr //<= if fullDesciprtion is true, show full description
        else descriptionToWrite = listingData.descr.substr(0, 140) + "..." //<= if fullDesciprtion is false, show first 140 characters
        return (
    			<div className="listingItem">
              <p className="title">{listingData.title}</p>
	    			  <img style={{display: "block"}} src={listingData.image_url}/>
              <p className="descr">{descriptionToWrite} <button onClick={this._showMoreInfo}className="moreInfo">{this.state.buttonSymbol}</button></p>               
	    			  <p className="seller">{listingData.seller}</p>                   
              <p className="price">${listingData.price}</p>
	    		</div>	
    		)
    	}
    })

    DOM.render(<AppView shopData={ironData}/>,document.querySelector('.container')) //this is where you invoke the AppView. Define everything before invoking. shopData will always be passed to props, which will then need to be passed down to the children.
}

app()

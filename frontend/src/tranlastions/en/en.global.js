export default {
	homePage:{
		hero:{
			"explore": "EXPLORE",
			"unique": "UNIQUE",
			"rarest": "RAREST",
			"collections": "COLLECTIONS",
	
		},
		carousel:{
			largestCollections:'Largest Collections',
			newestItems:'Recently added Items'
		}
	},
	general:{
		collection:'Collection',
		item:"Item",
		author:'by',
		category:'Category',
		nMoreItems:'more',
		cancel:"Cancel",
		delete:"Delete",
		value:"value",
		description:"Description",
		title:"Title",
		characteristics:"Characteristics",
		collapse:"Collapse",
		expand:"Expand",
		items:"Items",
		showMore:"Show More",
		showLess:"Show Less",
		tags:"Tags",
		comments:"Comments",
		create:"Create",
		save:"Save",
		edit:"Edit",
		loading:"Loading...",
	},
	alt:{
		itemImg:"Item image"
	},
	header:{
		home:"Home",
		collections:'Collections',
		logIn:'Log in',
		signUp:'Sign up',
		avatarMenu:{
			myCollection:'My collections',
			logOut:"Logout"
		},
		search:{
			placeHolder:"Search",
			noResults:"No results found"
		}
	},
	fileInput:{
		noFileSelected:"No file selected",
		successUpload:"Image successfully uploaded",
		upload:"Upload",
		errorType:"File must be in IMAGE format"
	},
	collectionPage:{
		typeInput:{
			label:"Select collection type",
			placeHolder:"Pick one"
		},
		"created_collection": "Successfully created collection",
		"updated_collection": "Successfully updated collection",  
		"deleted_collection": "Successfully deleted collection",
		'creatingNewCollection': 'Creating new Collecion',
		noItems:"Collection has no items"
	},
	deleteModal:{
		confirmDelTile:"Confirm Deletion",
		modalText:"Are you sure you want to delete this item? This action cannot be undone."
	},
	itemPage:{
		comment:{
			zeroComments:'No comments yet',
			yourCommentPlaceHolder:"Your comment",
			mustBeLogged:'You must be logged in to comment'
		},
		badges:{
			addNew:'Add new tag',
			reachedMaxCount:"Reached max Badges Count"
		},
		"updated": "Successfully updated item",
		"deleted": "Successfully deleted item",  
		creating:"Creating new Item",
		itemTitle:"Item Title",
		noChrcts1:"There are no Characteristic to add.",
		noChrcts2:"Please add Characteristic at collection page"
	},
	characteristicInput:{
		addNew:"Add new characteristic"
	},
	authForm:{
		passLowLengthErr:'Password should include at least {{length}} characters',
		invalidEmail:'Invalid email',
		login:'Login',
		register:"Register",
		loginGreet:'Welcome back, Please login',
		urPassPlaceholder:'Your password',
		dontHaveAcc:"Don't have an account? Register",
		registerGreet:"New here? Register",
		urNamePlaceholder:"Your name",
		haveAnAcc:"Already have an account? Login"
	},
	seacrhPage:{
		"collection_by_author": "Collectables by {{authorName}}",
		"search_text": "Search for",
		'allCollections':"All collections"
	},
	api:{
		errors:{
			idk:'Something went wrong',
			onlyForAuthed:'Only authenticated users can do this',
			notFound:"Not Found",
			403:'You dont have an access'
		}
	}
}

/* const {t} = useTranslation();
{t('general')}
*/
const meainingsElement = document.querySelector('.meanings')
const wordElement = document.querySelector('.word')
const wordInputElement = document.querySelector('.word-input')
const searchBtn = document.querySelector('.search-btn')


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '61c3215823msh1ce21b5e6bce66ap117f52jsn985a699a8370',
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
	}
};


function getMeaning(word){

	fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, options)
		.then(response => response.json())
		.then(response => {
			console.log(response.list.length)
			if (!response.list.length){
				alert("No Results Found!")
			}
			const definitions = response.list
			let meainings = new Array();
			for (let i= 0 ; i < definitions.length; i++){
				console.log(definitions[i].definition)
				meainings.push(definitions[i].definition)
			}
			// console.log(meainings)
			
			for (let i = 0 ; i < meainings.length; i++){
				const m = document.createElement("li")
				m.classList.add("list-group-item")
				m.classList.add("d-flex")
				m.classList.add("justify-content-between")
				m.classList.add("align-items-center")
				m.innerHTML = meainings[i]
				meainingsElement.appendChild(m)
			}
		})
		.catch(err => console.error(err));
}

searchBtn.addEventListener('click', function(){
	removePreviousMeaning()
	wordElement.textContent = wordInputElement.value
	wordElement.classList.remove('hidden')
	getMeaning(wordInputElement.value)
})

function removePreviousMeaning(){
	const len = document.querySelectorAll('.list-group-item').length
	if (len){
		const elements = document.getElementsByClassName('list-group-item')
		console.log(elements)
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
}


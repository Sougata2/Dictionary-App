const meaningsElement = document.querySelector('.meanings')
const wordElement = document.querySelector('.word')
const wordInputElement = document.querySelector('.word-input')
const searchBtn = document.querySelector('.search-btn')
const loaderBtn = document.querySelector('.loader-btn')


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '61c3215823msh1ce21b5e6bce66ap117f52jsn985a699a8370',
		'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
	}
};

function showLoader(){
	searchBtn.classList.add('hidden')
	loaderBtn.classList.remove('hidden')
}

function hideLoader(){
	searchBtn.classList.remove('hidden')
	loaderBtn.classList.add('hidden')
}

function getMeaning(word){
	showLoader()
	fetch(`https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`, options)
		.then(response => response.json())
		.then(response => {
			// console.log(Object.keys(response).length)
			// console.log(response)
			hideLoader()
			if (!response.valid){
				alert("No Results Found!")
			}
			const meanings = response.definition.split(/[0-9]. /)
			for (let i = 0 ; i < meanings.length; i++){
				if (meanings[i] == ""){
					meanings.splice(i, 1)
				}
			}
			// console.log(meanings.length)
			// for (let i = 0 ; i < meanings.length; i++){
			// 	console.log(`${i+1} : ${meanings[i]}`)
			// }

			// console.log(meanings)
			
			for (let i = 0 ; i < meanings.length; i++){
				const m = document.createElement("li")
				m.classList.add("list-group-item")
				m.classList.add("d-flex")
				m.classList.add("justify-content-between")
				m.classList.add("align-items-center")
				m.innerHTML = meanings[i]
				meaningsElement.appendChild(m)
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


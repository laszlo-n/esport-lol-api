function bginit() {
	document.body.style.backgroundImage = "linear-gradient(to bottom, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.75)), url('bg-" + Math.floor((Math.random() * 5)) + ".jpg')";
}

function riot() {
	document.getElementById('api-key').reportValidity();
	document.getElementById('search').reportValidity();

	let sname = document.getElementById('search').value.trim();
	let apikey = document.getElementById('api-key').value.trim();


	var request = new XMLHttpRequest();
	request.open('GET', "https://cors-anywhere.herokuapp.com/https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + sname + '?api_key=' + apikey, true);
	request.onloadend = function () {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(this.response);

			let namecard = document.getElementById('namecard');
			namecard.innerHTML = "";
			namecard.style.display = "none";

			let tempOuter = document.createElement('div');
			tempOuter.classList.add('media');
			document.getElementById('namecard').appendChild(tempOuter);

			let tempInner = document.createElement('div');
			tempInner.classList.add('media-left');

			let pfp = document.createElement('img');
			pfp.classList.add('profile-img');
			pfp.src = "https://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/" + data["profileIconId"] + ".png";

			tempInner.appendChild(pfp);
			tempOuter.appendChild(tempInner);

			let tempInner2 = document.createElement('div');
			tempInner2.classList.add('media-body');

			let summonerName = document.createElement('h2');
			summonerName.classList.add('media-heading');
			summonerName.innerText = data["name"];

			tempInner2.appendChild(summonerName);

			let summonnerLevel = document.createElement('div');
			summonnerLevel.innerText = "Szint: " + data["summonerLevel"];

			tempInner2.appendChild(summonnerLevel);

			tempOuter.appendChild(tempInner2);

			namecard.style.display = "block";
		} else {
			let namecard = document.getElementById('namecard');
			namecard.innerHTML = "";
			namecard.style.display = "none";

			let tempOuter = document.createElement('div');
			tempOuter.classList.add('media');
			document.getElementById('namecard').appendChild(tempOuter);

			let tempInner2 = document.createElement('div');
			tempInner2.classList.add('media-body');

			let msg = document.createElement('center');
			msg.classList.add('media-heading');
			msg.innerText = "Nem találtam ilyen nevű idézőt, próbáld újra.";
			tempInner2.appendChild(msg);
			document.getElementById('namecard').appendChild(tempInner2);
			namecard.style.display = "block";
		}
	}

	request.send();
}
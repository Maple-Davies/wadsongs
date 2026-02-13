// document.getElementById() returns HTMLElement | null
import type {Song} from './songInterface.ts';


document.getElementById('search')!.addEventListener('click', async()=> {
	const artist = (document.getElementById('theArtist') as HTMLInputElement).value;
	try {
		const response = await fetch(`/artist/${artist}`);
		const songs = await response.json();
		let html = "";
		songs.forEach((song: Song) => {
		//	html += `Title: ${song.title} Year: ${song.year} Downloads: ${song.downloads} Price: ${song.price} Quantity: ${song.quantity} <br />`;
		//	});
		//	document.getElementById('htresults')!.innerHTML = html;
		const p = document.createElement("p");
		const textNode = document.createTextNode(`Title: ${song.title} Year: ${song.year} Downloads: ${song.downloads} Price: ${song.price} Quantity: ${song.quantity} <br />`);
		p.appendChild(textNode);
		document.body.appendChild(p);
	} catch(e) {
		alert(`there was an error: ${e}`);
	}
});
const newSong = {
	title: (document.getElementById('songTitle') as HTMLInputElement).value,
	artist: (document.getElementById('songArtist') as HTMLInputElement).value,
	year: (document.getElementById('songYear') as HTMLInputElement).value,
	downloads: (document.getElementById('songDownloads') as HTMLInputElement).value,
	price: (document.getElementById('songPrice') as HTMLInputElement).value,
	quantity: (document.getElementById('songQuantity') as HTMLInputElement).value
};
document.getElementById('submit')!.addEventListener('click', async() => {
	try {
		const response = await fetch('/song/create', {
		method: 'POST',
		headers: {
			'Content-Type' : 'aplication/json'
		}
		body: JSON.stringify(newSong)
		});
	} catch(e) {
		alert(`there was an error: $(e)`);
	}
});		


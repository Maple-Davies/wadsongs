document.getElementById('search').addEventListener('click', async () => {
    const artist = document.getElementById('theArtist').value;
    try {
        const response = await fetch(`/artist/${artist}`);
        const songs = await response.json();
        let html = "";
        songs.forEach((song) => {
            html += `Title: ${song.title} Year: ${song.year} Downloads: ${song.downloads} Price: ${song.price} Quantity: ${song.quantity} <br />`;
        });
        document.getElementById('htresults').innerHTML = html;
    }
    catch (e) {
        alert(`there was an error: ${e}`);
    }
});
export {};

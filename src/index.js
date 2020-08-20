const init = async()=> {
    const response = await axios.get('/api/friends')
    const friends = response.data;
    const ul = document.querySelector('ul')
    const html = friends.map(friend => {
        return `
        <li id = 'listItem' data-id='${friend.id}'>
            ${friend.name}<br>
            <div id = "rating">
            ${friend.rating}
            </div>
            <button id="rating-increase" class="incread-btn">+</button>
            <button id="rating-decrease" class="decrease-btn">-</button>
            <button id="delete-friend" class="delete-btn">x</button>
        </li>
        `
    }).join('')
    //console.log(html)
    ul.innerHTML = html;
    // var button = 
    ul.addEventListener('click', async function(ev){
        if(ev.target.id === 'rating-increase'){
            //this changes onlythe number for Moe. No matter who's button i press
            // const id = document.getElementById('listItem').getAttribute('data-id')
            // let num = Number(document.getElementById(id).textContent)
            // num += 1
            // console.log(num)
            // document.getElementById(id).innerHTML = `${num}`
            const id = document.getElementById('listItem').getAttribute('data-id')
            const rating = document.getElementById('rating')
            //let ratingValue = Number(rating.textContent)
            //console.log(ev.target)
            //console.log(typeof(ratingValue))
            console.log(rating)
            //console.log(ratingValue)
            console.log(id)
            await axios.put(`/api/friends/${id}`,{ rating })
        }
    })
}

init();
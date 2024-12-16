// async function applyFilters() {
//     const labels = Array.from(document.getElementById('labelFilter').selectedOptions).map(opt => opt.value);
//     const author = document.getElementById('authorFilter').value;
//     const search = document.getElementById('searchBar').value;

//     const res = await fetch(`/projects/<%= project._id %>/bugs?labels=${labels}&author=${author}&search=${search}`);
//     const bugs = await res.json();
//     renderBugs(bugs);
// }

// function renderBugs(bugs) {
//     const bugsList = document.getElementById('bugsList');
//     bugsList.innerHTML = bugs.map(bug => `
//         <div class="card mb-3">
//             <div class="card-body">
//                 <h5 class="card-title">${bug.title}</h5>
//                 <p><strong>Description:</strong> ${bug.description}</p>
//                 <p><strong>Author:</strong> ${bug.author}</p>
//                 <p><strong>Labels:</strong> ${bug.labels.join(", ")}</p>
//             </div>
//         </div>
//     `).join('');
// }
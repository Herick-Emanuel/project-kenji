document.addEventListener("DOMContentLoaded", () => {
    const addQueryBtn = document.getElementById('addQueryBtn');
    const queryForm = document.getElementById('queryForm');
    const cardsContainer = document.getElementById('cardsContainer');
    
    let queryList = [];

    addQueryBtn.addEventListener('click', () => {
      const queryModal = new bootstrap.Modal(document.getElementById('queryModal'));
      queryModal.show();
    });

    queryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const queryTitle = document.getElementById('queryTitle').value;
      const queryText = document.getElementById('queryText').value;
      const queryDescription = document.getElementById('queryDescription').value;

      const queryData = {
        title: queryTitle,
        query: queryText,
        description: queryDescription
      };
  
      queryList.push(queryData);
      displayQueries();
      
      queryForm.reset();
      const queryModal = bootstrap.Modal.getInstance(document.getElementById('queryModal'));
      queryModal.hide();
    });
  
    function displayQueries() {
      cardsContainer.innerHTML = '';
      queryList.forEach((query, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${query.title}</h5>
            <p class="card-text">${query.query}</p>
            <p class="card-text"><small class="text-muted">${query.description}</small></p>
            <button class="btn btn-primary" onclick="runQuery(${index})">Rodar Query</button>
          </div>
        `;
        cardsContainer.appendChild(card);
      });
    }
  
    window.runQuery = (index) => {
      const query = queryList[index].query;
  
      fetch('https://api.flip.eurekahomolog.xyz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
      .then(response => response.json())
      .then(data => {
        alert(`Query Result: ${JSON.stringify(data)}`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Erro ao executar a query.');
      });
    };
  });
  
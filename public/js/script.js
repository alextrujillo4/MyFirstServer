function init() {
    console.log('/api/students');
    fetch('/api/students')
        .then( response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON => {
            let students = responseJSON.students;
            console.log(responseJSON);

            jQuery.each(responseJSON, function(i, val) {
                $('#studentList').append(
                    `
                        <li class="mdc-list-item" tabindex="0">
                            <span class="mdc-list-item__text">${val.firstName}</span>
                        </li>
                    `
                )
            });
        })
        .catch( err => {
            console.log(err)
        })
}

$(init);//of init(); for native js
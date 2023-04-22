// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Adding ingredients
var counter= 4;

function addelement() {
var completelist= document.getElementById("ing-list");

completelist.innerHTML += "<li class=\"list-group-item d-flex justify-content-between lh-sm\">";
completelist.innerHTML += "<div>";
completelist.innerHTML += "<h6 class=\"my-0\">Ingredient</h6>";
completelist.innerHTML += "<small class=\"text-muted\">Optional / Required</small>";
completelist.innerHTML += "</div>";
completelist.innerHTML += "<span class=\"text-muted\">Amount</span>";
completelist.innerHTML += "</li>";

counter++;
}

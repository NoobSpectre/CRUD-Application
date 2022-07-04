const update_user = document.getElementById('update_user');
const response1 = document.querySelector('.response1');
const response2 = document.querySelector('.response2');

//function to serialize all form data into an array
const serializeArray = () => {
  let formData = {};

  const fields = document.querySelectorAll('input');
  for (let field of fields) {
    if (field.type === 'radio') {
      if (field.checked) {
        formData = { ...formData, [field.name]: field.value };
      }
    } else {
      formData = { ...formData, [field.name]: field.value };
    }
  }

  return formData;
};

//async function to make PUT request to the server
const requestFunction = async data => {
  const { _id, name, email, gender, status } = data;
  const userData = { name, email, gender, status };

  try {
    const response = await fetch(`http://localhost:3000/api/users/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      if(!response1.classList.contains('hidden')) response1.classList.add('hidden');
      response2.classList.remove('hidden');
      return;
    } else {
      if (!response2.classList.contains('hidden')) response2.classList.add('hidden');
      response1.classList.remove('hidden');
      const fetchedData = await response.json();
      return fetchedData;
    }
  } catch (err) {
    throw new Error(err.message); //throw exception if error is thrown from server side requestFunction function call to server
  }
};

update_user.addEventListener('submit', e => {
  //prevents default behaviour i.e. form submission on click on save
  e.preventDefault();

  const submittedData = serializeArray();

  requestFunction(submittedData);
});

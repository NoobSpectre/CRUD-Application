const delbtns = document.querySelectorAll('.delete');

//function to detete user
const delUser = async dataId => {
  try {
    const request = await fetch(`http://localhost:3000/api/users/${dataId}`, {
      method: 'DELETE',
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

for (let btn of delbtns) {
  const dataId = btn.getAttribute('data-id');
  btn.addEventListener('click', async () => {
    // console.log(dataId);
    delUser(dataId);
  });
}

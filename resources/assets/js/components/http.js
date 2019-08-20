const getCollege=new Promise(resolve=>{
    fetch(
        '/api/get/college', {method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          })
        }
      )
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
        .catch(e => {

    });
})


const getDepartment=new Promise(resolve=>{
    fetch(
        '/api/get/department', {method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          })
        }
      )
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
        .catch(e => {

    });
})

const getStandard=new Promise(resolve=>{
    fetch(
        '/api/get/standard', {method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          })
        }
      )
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
        .catch(e => {

    });
})

export { getCollege, getDepartment, getStandard };
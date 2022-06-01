const fetch = require("node-fetch");

module.exports = {
    getAllProjects: getAllProjects
}

const auth = "Basic cmVuZTpAODc4UDduYWJYd0k5bDRTJlNGQl50dFRXSDB6Slo="; //Sandbox

/* ***************************************************************************************************** */

//getAllProjects();

/* ***************************************************************************************************** */

async function getAllProjects(){
    let headersList = {
		Authorization: auth,
	};

	const projectsData = await fetch(`https://sandbox.castana.app/api/scripteditor`, {
		method: "GET",
		headers: headersList,
	}).then(function (response) {
		return response.json();
	});

    const projectsArray = [];
    projectsData.map(proData => {
        let project = {
            id: proData.id,
            name: proData.name
        }
        projectsArray.push(project);
    });

    console.log(projectsArray);
}
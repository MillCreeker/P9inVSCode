const fetch = require("node-fetch");
const fs = require("fs-extra");

//String-Konstanten
const con = {
    ts: "ts",
    js: "js",
    globals: "Globals",
    scripts: "Scripts"
}

const auth = "Basic cmVuZTpAODc4UDduYWJYd0k5bDRTJlNGQl50dFRXSDB6Slo="; //Sandbox

//Testdaten
const testProjectId = "db8472fe-cda4-4c45-95e6-6c98dc4be50e";

/* ***************************************************************************************************** */

getProjectData(testProjectId);

/* ***************************************************************************************************** */

async function getProjectData(id){
    let headersList = {
		Authorization: auth,
	};

	const projectData = await fetch(`https://sandbox.castana.app/api/scripteditor/${id}`, {
		method: "GET",
		headers: headersList,
	}).then(function (response) {
		return response.json();
	});

    createFolderStructure(projectData);
    
    getScriptsFromProject(projectData);
    
    //fs.writeFileSync(`${__dirname}\\projectData.json`, JSON.stringify(projectData));
	//return projectData;    
}

/* ***************************************************************************************************** */

function createFolderStructure(projectData){
    _createFolder(`${__dirname}\\${projectData.project.name}`);
    _createFolder(`${__dirname}\\${projectData.project.name}\\${con.globals}`);
    _createFolder(`${__dirname}\\${projectData.project.name}\\${con.scripts}`);
}

function getScriptsFromProject(projectData){
    projectData.project.jsscripts.map(script => {
        let folderDestination = script.useAsGlobalScript === true ? con.globals : con.scripts;
        let fileExtension = script.isTypescript === true ? con.ts : con.js;
        fs.writeFileSync(`${__dirname}\\${projectData.project.name}\\${folderDestination}\\${script.name}.${fileExtension}`, script.content);
    })
}

/* ***************************************************************************************************** */

function _createFolder(folderpath) {
    if (!fs.existsSync(folderpath)) {
      fs.mkdirSync(folderpath);
    }
  }

/* ***************************************************************************************************** */




const fetch = require("node-fetch");
const fs = require("fs-extra");

const auth = "Basic cmVuZTpAODc4UDduYWJYd0k5bDRTJlNGQl50dFRXSDB6Slo="; //Sandbox

const requestData = {
    content: "",
    id: "",
    isTypescript: false
}

//Testdaten
const testProjectId = "db8472fe-cda4-4c45-95e6-6c98dc4be50e";
const testScriptId = "f2dc572c-7649-4ea7-92e2-253d557e4ca1";
const testFilePath = `${__dirname}\\vscode_test\\Scripts\\test_edit.js`;

/* ***************************************************************************************************** */

saveScript(testProjectId, testScriptId);

/* ***************************************************************************************************** */

async function saveScript(projectId, scriptId) {
	requestData.content = fs.readFileSync(testFilePath).toString();
    requestData.id = testScriptId;
	let headersList = {
		"Content-Type": "application/json",
		Authorization: auth,
	};

	const response = await fetch(`https://sandbox.castana.app/api/scripteditor/${projectId}/${scriptId}`, {
		method: "POST",
		body: JSON.stringify(requestData),
		headers: headersList,
	});
}

    


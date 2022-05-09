const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

//* Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const { application } = require('express');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.json({message: 'alive'});
});

//* Cors
const cors=require("cors");

const corsOptions={
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//* Explorer Table
//* ================================================================================
app.get('/explorers', async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
});

app.get('/explorers/:id', async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});

app.post('/explorers', async (req, res) => {
    const explorer = {
        name: req.body.name,
        username: req.body.username,
        mission: req.body.mission
    };
    const message = 'Explorer creado.';
    await prisma.explorer.create({data: explorer});
    return res.json({message});
});

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

//* Partner Table
//* ================================================================================
app.get('/partners', async (req, res) => {
    const allPartners =  await prisma.partner.findMany({});
    res.json(allPartners);
});

app.get('/partners/:id', async (req, res) => {
    const id = req.params.id;
    const partner = await prisma.partner.findUnique({where: {id: parseInt(id)}});
    res.json(partner);
});

app.post('/partners', async (req, res) => {
    const partner = {
        name: req.body.name,
        lang: req.body.lang,
        missionComander: req.body.missionComander,
        enrollments: req.body.enrollments,
        hasCertification: req.body.hasCertification
    };
    const message = 'Partner creado.';
    await prisma.partner.create({data: partner});
    return res.json({message});
});

app.put('/partners/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.partner.update({
		where: {
			id: id
		},
		data: {
			enrollments: req.body.enrollments
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

//*missionCommander Table
//*================================================================================
app.get('/mission', async (req, res) => {
    const allMission =  await prisma.missionCommander.findMany({});
    res.json(allMission);
});

app.get('/mission/:id', async (req, res) => {
    const id = req.params.id;
    const mission = await prisma.missionCommander.findUnique({where: {id: parseInt(id)}});
    res.json(mission);
});

app.post('/mission', async (req, res) => {
    const mission = {
        name: req.body.name,
        username: req.body.username,
        mainStack: req.body.mainStack,
        currentEnrollment: req.body.currentEnrollment,
        hasAzureCertification: req.body.hasAzureCertification
    };
    const message = 'Mission Commander creado.';
    await prisma.missionCommander.create({data: mission});
    return res.json({message});
});

app.put('/mission/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.missionCommander.update({
		where: {
			id: id
		},
		data: {
			mainStack: req.body.mainStack
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/mission/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.missionCommander.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});


app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});